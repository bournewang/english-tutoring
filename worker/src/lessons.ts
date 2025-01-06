import { Lesson, Slide } from './types';
// get lessons by course id
export const getLessonsByCourseId = async (courseId: number, env: Env): Promise<Lesson[]> => {
    try {
        const result = await env.DB.prepare('SELECT * FROM lessons WHERE course_id = ?').bind(courseId).all();
        return result;
    } catch (error) {
        console.error('Error fetching lessons:', error);
        throw error;
    }
};

// Get a lesson by ID
export const getLessonById = async (id: number, env: Env): Promise<Lesson | undefined> => {
    try {
        const result = await env.DB.prepare('SELECT * FROM lessons WHERE id = ?').bind(id).first();
        const slides = await env.DB.prepare('SELECT * FROM slides WHERE lesson_id = ?').bind(id).all();
        if (slides.results) {
            result.slides = slides.results;
        }
        return result;
    } catch (error) {
        console.error(`Error fetching lesson with ID ${id}:`, error);
        throw error;
    }
};

// get slides by lesson id
// export const getSlidesByLessonId = async (lessonId: number, env: Env): Promise<Slide[]> => {
//     try {
//         const result = await env.DB.prepare('SELECT * FROM slides WHERE lesson_id = ?').bind(lessonId).all();
//         return result;
//     } catch (error) {
//         console.error('Error fetching slides:', error);
//         throw error;
//     }
// };