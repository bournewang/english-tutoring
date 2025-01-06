import bcrypt from 'bcryptjs';

export async function registerUser(request: Request, env: Env) {

	const { email, password } = await request.json();
	const password_hash = await bcrypt.hash(password, 10);

	// check if user already exists
	const user = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
	if (user) {
		throw new Error('User already exists');
	}

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
	return { token, user: userInfo };

}

export async function loginUser(request: Request, env: Env) {

	const { email, password } = await request.json();
	console.log('email: ', email);
	console.log('password: ', password);
	const user = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
	// user may be undefined
	if (user === undefined || !user) {
		throw new Error('User not found');
	}

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
		english_level: user.english_level,
		current_course_id: user.current_course_id,
		current_lesson_id: user.current_lesson_id,
	};
	return { token, user: userInfo };
}

// Function to verify the token and retrieve user information
export async function authUser(request: Request, env: Env) {
	// Extract the token from the Authorization header
	const authHeader = request.headers.get('Authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return { error: 'Unauthorized', status: 401 };
	}

	const token = authHeader.substring(7); // Remove 'Bearer ' prefix

	// Hash the provided token
	const hashedToken = await hashToken(token);

	// Retrieve the user from the database using the hashed token
	const result = await env.DB.prepare('SELECT * FROM users WHERE token = ?').bind(hashedToken).first();

	if (!result) {
		return { error: 'User not found', status: 404 };
	}

	return { user: result };
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
