import { getAllCourses, getCoursesByLevelId, getCourseById } from './courses';
import { getLessonsByCourseId, getLessonById } from './lessons';
import { loginUser, registerUser, verifyToken } from './auth';
import { getUserInfo, updateUser } from './user';
// Utility function to add CORS headers
function withCORS(response: Response) {
	const headers = new Headers(response.headers);
	headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
	headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
	headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}
type Handler = (request: Request, params: Record<string, string>) => Promise<Response>;

const routes: Record<string, { [method: string]: Handler }> = {
	// get all courses
	'/api/courses': {
		GET: async (request, env, params) => {
			const courses = await getAllCourses(env);
			return new Response(JSON.stringify(courses), { status: 200, headers: { 'Content-Type': 'application/json' } });
		},
	},
	// get all courses in a level
	'/api/levels/:levelId/courses': {
		GET: async (request, env, params) => {
			console.log('get all courses in a level', params);
			const courses = await getCoursesByLevelId(Number(params.levelId), env);
			return new Response(JSON.stringify(courses), { status: 200, headers: { 'Content-Type': 'application/json' } });
		},
	},
	'/api/courses/:courseId': {
		GET: async (request, env, params) => {
			console.log('get course by id', params);
			const course = await getCourseById(Number(params.courseId), env);
			return new Response(JSON.stringify(course), { status: 200, headers: { 'Content-Type': 'application/json' } });
		},
	},
	'/api/courses/:courseId/lessons': {
		GET: async (request, env, params) => {
			const lessons = await getLessonsByCourseId(Number(params.courseId), env);
			return new Response(JSON.stringify(lessons), { status: 200, headers: { 'Content-Type': 'application/json' } });
		},
	},
	'/api/lessons/:lessonId': {
		GET: async (request, env, params) => {
			const lesson = await getLessonById(Number(params.lessonId), env);
			return new Response(JSON.stringify(lesson), { status: 200, headers: { 'Content-Type': 'application/json' } });
		},
	},
	'/api/login': {
		POST: async (request, env, params) => {
			// console.log('login request: ', await request.json());
			const { user, token } = await loginUser(request, env);
			return new Response(JSON.stringify({ user, token }), { status: 200, headers: { 'Content-Type': 'application/json' } });
		},
	},
	'/api/register': {
		POST: async (request, env, params) => {
			const { user, token } = await registerUser(request, env);
			console.log('user: ', user);
			console.log('token: ', token);
			return new Response(JSON.stringify({ user, token }), { status: 201, headers: { 'Content-Type': 'application/json' } });
		},
	},
	'/api/user': {
		GET: async (request, env, params) => {
			const user = await getUserInfo(params, env);
			return new Response(JSON.stringify(user), { status: 200, headers: { 'Content-Type': 'application/json' } });
		},
		PUT: async (request, env, params) => {
			const user = await updateUser(request, env);
			return new Response(JSON.stringify(user), { status: 200, headers: { 'Content-Type': 'application/json' } });
		},
	},
};

addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const method = request.method;

	try {
		for (const [pattern, handlers] of Object.entries(routes)) {
			const match = matchRoute(pattern, url.pathname);
			if (match && handlers[method]) {
				return await handlers[method](request, env, match.params);
			}
		}
	} catch (error: any) {
		console.error('Error in handleRequest:', error);
		return new Response(JSON.stringify({ message: error.message || 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return new Response('Not Found', { status: 404 });
}

function matchRoute(pattern: string, pathname: string): { params: Record<string, string> } | null {
	const patternParts = pattern.split('/');
	const pathParts = pathname.split('/');

	if (patternParts.length !== pathParts.length) {
		return null;
	}

	const params: Record<string, string> = {};

	for (let i = 0; i < patternParts.length; i++) {
		if (patternParts[i].startsWith(':')) {
			const paramName = patternParts[i].slice(1);
			params[paramName] = pathParts[i];
		} else if (patternParts[i] !== pathParts[i]) {
			return null;
		}
	}
	console.log('params', params);

	return { params };
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