import { authUser } from './auth';

export async function getCourseHistory(request: Request, env: Env) {
    const { user, error } = await authUser(request, env);
    if (error) {
        throw new Error(error);
    }

    const courseHistory = await env.DB.prepare('SELECT * FROM course_history WHERE user_id = ? order by created_at desc').bind(user.id).all();
    return courseHistory.results;
} 