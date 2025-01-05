import React, { useState } from 'react';

const CourseContent = () => {
  // Sample course content slides
  const slides = [
    { id: 1, title: 'Introduction', content: 'Welcome to the course! This is the introduction slide.' },
    { id: 2, title: 'Lesson 1', content: 'This is the content for lesson 1.' },
    { id: 3, title: 'Lesson 2', content: 'This is the content for lesson 2.' },
    { id: 4, title: 'Conclusion', content: 'Thank you for completing the course!' },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{slides[currentSlideIndex].title}</h2>
      <p className="mb-4">{slides[currentSlideIndex].content}</p>
      <div className="flex justify-between">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={handlePrevious}
          disabled={currentSlideIndex === 0}
        >
          Previous
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={handleNext}
          disabled={currentSlideIndex === slides.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseContent; 