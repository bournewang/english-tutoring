CREATE TABLE lessons ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INT NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    description TEXT, 
    sort INT NOT NULL, 
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE 
);