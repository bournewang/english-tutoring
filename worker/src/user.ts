import { authUser } from './auth';
// Updated getUserInfo function using authUser
export async function getUserInfo(request: Request, env: Env) {

	const { user, error, status } = await authUser(request, env);
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
	return userInfo;

}

export async function updateUser(request: Request, env: Env) {

	// Verify the token and get the user
	const { user, error, status } = await authUser(request, env);
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
	const { results } = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(user.id).all();
	const updatedUser = results[0];

	// Return the updated user information
	return updatedUser;

}

export async function updateCurrentCourse(request: Request, env: Env) {
	// Verify the token and get the user
	const { user, error, status } = await authUser(request, env);
	if (error) {
		return new Response(error, { status });
	}

	// Parse the request body
	const { courseId } = await request.json();

	// Update the user's current course ID in the database
	await env.DB.prepare(`
			UPDATE users
			SET current_course_id = ?, current_lesson_id = null, free_dialog = false 
			WHERE id = ?
		`).bind(courseId, user.id).run();

	// Return success response
	return courseId;

}