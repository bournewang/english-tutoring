import { verifyToken } from './auth';
// Updated getUserInfo function using verifyToken
export async function getUserInfo(request: Request, env: Env) {

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

}

export async function updateUser(request: Request, env: Env) {

	// Verify the token and get the user
	const { user, error, status } = await verifyToken(request, env);
	if (error) {
		return new Response(error, { status });
	}

	// Parse the request body
	const updatedData = await request.json();
    console.log('updatedData', updatedData);

	// Update the user's information in the database
	await env.DB.prepare(`
			UPDATE users
			SET name = ?, gender = ?, age = ?, english_level = ?
			WHERE id = ?
		`).bind(
		updatedData.name,
		updatedData.gender,
		updatedData.age,
		updatedData.english_level,
		user.id
	).run();

	// Fetch the updated user information
	const { results } = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(user.email).all();
	const updatedUser = results[0];

	// Return the updated user information
	return new Response(JSON.stringify({
		message: 'User updated successfully',
		user: updatedUser
	}), { status: 200, headers: { 'Content-Type': 'application/json' } });

}