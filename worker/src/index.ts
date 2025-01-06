import bcrypt from 'bcryptjs';

// Utility function to add CORS headers
function withCORS(response: Response) {
	const headers = new Headers(response.headers);
	headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
	headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
	headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	return new Response(response.body, {
		...response,
		headers,
	});
}

// Main handler function
async function handleRequest(request: Request, env: Env) {
	const url = new URL(request.url);

	if (url.pathname === '/api/login' && request.method === 'POST') {
		return loginUser(request, env);
	} else if (url.pathname === '/api/register' && request.method === 'POST') {
		return registerUser(request, env);
	} else if (url.pathname === '/api/user' && request.method === 'GET') {
		return getUserInfo(request, env);
	} else if (url.pathname === '/api/user' && request.method === 'PUT') {
		return updateUser(request, env);
	}

	return new Response('Not Found', { status: 404 });
}

// Define the fetch handler object
const fetchHandler = {
	async fetch(request: Request, env: Env) {
		if (request.method === 'OPTIONS') {
			// Handle CORS preflight requests
			return withCORS(new Response(null, { status: 204 }));
		}

		const response = await handleRequest(request, env);
		return withCORS(response);
	},
};

// Export the fetch handler
export default fetchHandler;

async function registerUser(request: Request, env: Env) {
	try {
		const { email, password } = await request.json();
		const password_hash = await bcrypt.hash(password, 10);

		// Generate a unique token
		const token = generateToken();

		// Hash the token
		const hashedToken = await hashToken(token);

		// Insert the new user and hashed token into the database
		await env.DB.prepare(`
			INSERT INTO users (email, password_hash, token, created_at)
			VALUES (?, ?, ?, CURRENT_TIMESTAMP)
		`).bind(email, password_hash, hashedToken).run();

		// Prepare user information to return
		const userInfo = {
			email,
			// Add other user details if needed
		};

		// Return the token and user information
		return new Response(JSON.stringify({
			message: 'User registered successfully',
			token,
			user: userInfo
		}), { status: 201, headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}

async function loginUser(request: Request, env: Env) {
	try {
		const { email, password } = await request.json();
		const { results } = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).all();

		if (results.length === 0) {
			return new Response('User not found', { status: 404 });
		}

		const user = results[0];
		const isPasswordValid = await bcrypt.compare(password, user.password_hash);

		if (!isPasswordValid) {
			return new Response('Invalid credentials', { status: 401 });
		}

		// Generate a unique token inside the handler
		const token = generateToken();

		// Hash the token inside the handler
		const hashedToken = await hashToken(token);

		// Store the hashed token in the database
		await env.DB.prepare('UPDATE users SET token = ? WHERE email = ?').bind(hashedToken, email).run();

		// Prepare user information to return
		const userInfo = {
			email: user.email,
			name: user.name,
			gender: user.gender,
			age: user.age,
			english_level: user.english_level
		};

		// Return the original token and user information
		return new Response(JSON.stringify({ message: 'Login successful', token, user: userInfo }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}

// Function to verify the token and retrieve user information
async function verifyToken(request: Request, env: Env) {
	// Extract the token from the Authorization header
	const authHeader = request.headers.get('Authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return { error: 'Unauthorized', status: 401 };
	}

	const token = authHeader.substring(7); // Remove 'Bearer ' prefix

	// Hash the provided token
	const hashedToken = await hashToken(token);

	// Retrieve the user from the database using the hashed token
	const { results } = await env.DB.prepare('SELECT * FROM users WHERE token = ?').bind(hashedToken).all();

	if (results.length === 0) {
		return { error: 'User not found', status: 404 };
	}

	return { user: results[0] };
}

// Updated getUserInfo function using verifyToken
async function getUserInfo(request: Request, env: Env) {
	try {
		const { user, error, status } = await verifyToken(request, env);
		if (error) {
			return new Response(error, { status });
		}

		// Prepare user information to return
		const userInfo = {
			email: user.email,
			name: user.name,
			gender: user.gender,
			age: user.age,
			english_level: user.english_level
		};

		// Return the user information
		return new Response(JSON.stringify({ user: userInfo }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}

// Function to generate a unique token
function generateToken(length = 32) {
	const array = new Uint8Array(length);
	crypto.getRandomValues(array);
	return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Function to hash a token using SHA-256
async function hashToken(token: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(token);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

async function updateUser(request: Request, env: Env) {
	try {
		// Verify the token and get the user
		const { user, error, status } = await verifyToken(request, env);
		if (error) {
			return new Response(error, { status });
		}

		// Parse the request body
		const updatedData = await request.json();

		// Update the user's information in the database
		await env.DB.prepare(`
			UPDATE users
			SET name = ?, gender = ?, age = ?, english_level = ?
			WHERE email = ?
		`).bind(
			updatedData.name,
			updatedData.gender,
			updatedData.age,
			updatedData.english_level,
			user.email
		).run();

		// Fetch the updated user information
		const { results } = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(user.email).all();
		const updatedUser = results[0];

		// Return the updated user information
		return new Response(JSON.stringify({
			message: 'User updated successfully',
			user: updatedUser
		}), { status: 200, headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}