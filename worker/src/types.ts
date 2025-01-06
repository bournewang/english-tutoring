// define level type
export type Level = {
    id: number;
    name: string;
  }

//   define category type
export type Category = {
    id: number;
    name: string;
  }

// Define types for course data
export interface Course {
    id?: number;
    level_id: number;
    category_id: number;
    name: string;
    description: string;
    lessons: Lesson[];
  }

// define lesson type
export type Lesson = {
    id: number;
    course_id: number;
    name: string;
    description: string;
    // have many slides
    slides: Slide[];
  }

// define slide type
export type Slide = {
    id: number;
    lesson_id: number;
    content: string;
  }