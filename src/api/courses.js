import request from './request';

// Fetch all courses
export const getCourses = async () => {
  try {
    const courses = await request('/api/courses', {
      method: 'GET',
    });
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Update course selection
export const updateCourseSelection = async (courseId) => {
  try {
    const updatedCourse = await request(`/api/courses/${courseId}/select`, {
      method: 'POST',
    });
    return updatedCourse;
  } catch (error) {
    console.error('Error updating course selection:', error);
    throw error;
  }
}; 