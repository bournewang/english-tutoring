CREATE TABLE slides ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id INT NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    content TEXT, -- HTML content 
    sort INT NOT NULL, 
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE 
);