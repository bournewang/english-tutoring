import React, { useState } from 'react';

const CourseContent = () => {
  // Sample course content slides
  const slides = [
    { id: 1, title: 'Introduction', content: "A wave is a pattern of motion that carries energy. When a wave travels through a material, the material is called a medium. Maya is exercising with battle ropes. Energy from her arms is transferred to the ropes, creating waves. As a wave moves through each rope, the rope moves up and down. Select the true statements. <br/> A wave is a pattern of motion that carries energy. When a wave travels through a material, the material is called a medium. Maya is exercising with battle ropes. Energy from her arms is transferred to the ropes, creating waves. As a wave moves through each rope, the rope moves up and down. Select the true statements. <br/>A wave is a pattern of motion that carries energy. When a wave travels through a material, the material is called a medium. Maya is exercising with battle ropes. Energy from her arms is transferred to the ropes, creating waves. As a wave moves through each rope, the rope moves up and down. Select the true statements. <br> When a wave travels through a material, the material is called a medium. Maya is exercising with battle ropes. Energy from her arms is transferred to the ropes, creating waves. As a wave moves through each rope, the rope moves up and down. Select the true statements. When a wave travels through a material, the material is called a medium. Maya is exercising with battle ropes. Energy from her arms is transferred to the ropes, creating waves. As a wave moves through each rope, the rope moves up and down. Select the true statements." },
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
      <h1 className="text-xl font-semibold mb-2">Tourism English Chapter-2</h1>
      <h2 className="text-lg font-semibold mb-2">{slides[currentSlideIndex].title}</h2>
      {/* Render content as HTML */}
      <div
        className="flex-grow overflow-y-auto mb-4" style={{ maxHeight: '300px' }}
        dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex].content }}
      />
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