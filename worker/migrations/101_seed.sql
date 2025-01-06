   INSERT INTO users (email, password_hash, name, gender, age, english_level, created_at) VALUES
   ('john.doe@example.com',     '$2y$12$FBTZheTtmZUXbOnv51eGF.WWwxSnOYR/ZqwxeAFADN8BWHO8MSvwO', 'John Doe', 'M', 30, 'B2', CURRENT_TIMESTAMP),
   ('jane.smith@example.com',   '$2y$12$FBTZheTtmZUXbOnv51eGF.WWwxSnOYR/ZqwxeAFADN8BWHO8MSvwO', 'Jane Smith', 'F', 25, 'A2', CURRENT_TIMESTAMP),
   ('alice.jones@example.com',  '$2y$12$FBTZheTtmZUXbOnv51eGF.WWwxSnOYR/ZqwxeAFADN8BWHO8MSvwO', 'Alice Jones', 'F', 28, 'B1', CURRENT_TIMESTAMP);

INSERT INTO levels (name, description) VALUES
('Beginner', 'Courses for beginners to start learning.'),
('Intermediate', 'Courses for learners with some experience.'),
('Advanced', 'Courses for advanced learners.');

INSERT INTO categories (name, description) VALUES
('Work', 'Courses related to professional skills and work.'),
('Study', 'Courses related to academic studies.'),
('Travel', 'Courses related to travel and languages.');

INSERT INTO courses (level_id, category_id, name, description) VALUES
(1, 1, 'Basic Office Skills', 'Learn the essential skills needed for office work.'),
(2, 2, 'Intermediate Mathematics', 'Enhance your math skills with intermediate-level courses.'),
(3, 3, 'Advanced Travel Planning', 'Master the art of planning international travel.');

INSERT INTO lessons (course_id, name, description, sort) VALUES
(1, 'Introduction to Office Tools', 'Get started with basic office tools.', 1),
(1, 'Email Etiquette', 'Learn how to write professional emails.', 2),
(2, 'Algebra Basics', 'Understand the basics of algebra.', 1),
(2, 'Geometry Essentials', 'Learn essential geometry concepts.', 2),
(3, 'Visa Requirements', 'Understand visa requirements for different countries.', 1),
(3, 'Booking Flights', 'Learn how to book flights efficiently.', 2);

INSERT INTO slides (lesson_id, title, content, sort) VALUES
(1, 'What are Office Tools?', '<p>Office tools are essential for productivity...</p>', 1),
(1, 'Common Office Software', '<p>Learn about common office software like Microsoft Office...</p>', 2),
(2, 'Writing a Professional Email', '<p>Professional emails should be clear and concise...</p>', 1),
(3, 'Understanding Algebra', '<p>Algebra is a branch of mathematics dealing with symbols...</p>', 1),
(4, 'Basic Geometry Shapes', '<p>Geometry involves the study of shapes and sizes...</p>', 1),
(5, 'Visa Application Process', '<p>The visa application process varies by country...</p>', 1),
(6, 'Finding the Best Flight Deals', '<p>To find the best flight deals, consider using comparison websites...</p>', 1);

-- seed the course history table
INSERT INTO course_history (user_id, course_id, course_name, created_at, completed_at) VALUES
(1, 1, 'Basic Office Skills', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 'Intermediate Mathematics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- not completed
(1, 3, 'Advanced Travel Planning', CURRENT_TIMESTAMP, null); 

-- set the completed_at scatter to simulate a user that has completed some lessons at different day
INSERT INTO lesson_history (user_id, course_id, course_name, lesson_id, lesson_name, created_at, completed_at) VALUES
(1, 1, 'Basic Office Skills', 1, 'Introduction to Office Tools', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Basic Office Skills', 2, 'Email Etiquette', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Basic Office Skills', 3, 'Common Office Software', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 'Intermediate Mathematics', 1, 'Algebra Basics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 'Intermediate Mathematics', 2, 'Geometry Essentials', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 'Advanced Travel Planning', 1, 'Visa Requirements', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 'Advanced Travel Planning', 2, 'Booking Flights', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
