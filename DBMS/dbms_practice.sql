use college_db
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    department VARCHAR(50),
    marks INT
);
INSERT INTO students
(id, name, age, department, marks)
VALUES
(2, 'Rahul', 22, 'ECE', 78),
(3, 'Priya', 20, 'CSE', 92),
(4, 'Anil', 21, 'EEE', 65),
(5, 'Sneha', 22, 'CSE', 88);

SELECT *
FROM students
WHERE department = 'CSE';

SELECT *
FROM students
WHERE marks > 80;
SELECT * FROM students;

UPDATE students
SET marks = 90
WHERE id = 1;

DELETE FROM students
WHERE id = 4;

SELECT *
FROM students
ORDER BY marks DESC;

SELECT *
FROM students
ORDER BY marks ASC;

SELECT COUNT(*)
FROM students;

SELECT MAX(marks)
FROM students;

SELECT MIN(marks)
FROM students;

SELECT SUM(marks)
FROM students;

SELECT department, COUNT(*)
FROM students
GROUP BY department;

SELECT department, AVG(marks)
FROM students
GROUP BY department;

SELECT department, AVG(marks)
FROM students
GROUP BY department
HAVING AVG(marks) > 80;

SELECT * FROM students;