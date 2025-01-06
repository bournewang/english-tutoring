CREATE TABLE courses ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level_id INT NOT NULL, 
    category_id INT NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    description TEXT, 
    FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);  