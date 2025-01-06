import { Course } from './types';

// get all courses
export const getAllCourses = async (env: Env): Promise<Course[]> => {
  try {
    const result = await env.DB.prepare('SELECT * FROM courses').all();
    return result.results;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get all courses in a level
export const getCoursesByLevelId = async (levelId: number, env: Env): Promise<Course[]> => {
  try {
    const result = await env.DB.prepare('SELECT * FROM courses WHERE level_id = ?').bind(levelId).all();
    return result.results;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get a course by ID
export const getCourseById = async (id: number, env: Env): Promise<Course | undefined> => {
  try {
    const result = await env.DB.prepare('SELECT * FROM courses WHERE id = ?').bind(id).first();
    // fill the lessons
    const lessons = await env.DB.prepare('SELECT * FROM lessons WHERE course_id = ?').bind(id).all();
    if (lessons.results) {
      result.lessons = lessons.results;
    }
    return result;
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }
};
