   CREATE TABLE IF NOT EXISTS users (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     email TEXT NOT NULL UNIQUE,
     password_hash TEXT NOT NULL,
     name TEXT,
     gender CHAR(1) CHECK(gender IN ('M', 'F')),
     age INTEGER,
     english_level CHAR(2) CHECK(english_level IN ('A1', 'A2', 'B1', 'B2')),
     current_course_id INTEGER DEFAULT NULL,
     current_lesson_id INTEGER DEFAULT NULL,
     free_dialog BOOLEAN DEFAULT false,
     token TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );