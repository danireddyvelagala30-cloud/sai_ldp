CREATE TRIGGER before_student_insert
BEFORE INSERT ON students
FOR EACH ROW
SET NEW.name = UPPER(NEW.name);



DESCRIBE students;

ALTER TABLE students
ADD COLUMN course VARCHAR(50);

INSERT INTO students (id, name, age, course, marks)


SELECT * FROM students;

INSERT INTO students (id, name, age, course, marks)
VALUES (6, 'ramesh', 20, 'Java', 85);

CREATE TRIGGER after_student_insert
AFTER INSERT ON students
FOR EACH ROW
INSERT INTO student_log (student_id, action)
VALUES (NEW.id, 'STUDENT INSERTED');

INSERT INTO students (id, name, age, course, marks)
VALUES (6, 'Rahul', 21, 'Python', 92);

SELECT * FROM students;



CREATE TABLE student_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    action VARCHAR(50)
);


CREATE TRIGGER after_student_insert
AFTER INSERT ON students
FOR EACH ROW
INSERT INTO student_log (student_id, action)
VALUES (NEW.id, 'STUDENT INSERTED');


INSERT INTO students (id, name, age, course, marks)
VALUES (7, 'Rahul', 21, 'Python', 92);


SELECT * FROM students;


SELECT * FROM student_log;