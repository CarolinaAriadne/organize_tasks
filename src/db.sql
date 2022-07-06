DROP DATABASE IF EXISTS OrganizeTasks;

CREATE DATABASE IF NOT EXISTS OrganizeTasks;

CREATE TABLE OrganizeTasks.users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name_user VARCHAR (30) NOT NULL
);

CREATE TABLE OrganizeTasks.tasks(
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    name_task VARCHAR (30) NOT NULL
    
);

CREATE TABLE OrganizeTasks.tasks_users(
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (task_id) REFERENCES tasks (task_id),
    CONSTRAINT PRIMARY KEY (user_id, task_id)

);

INSERT INTO OrganizeTasks.users(name_user) VALUES
('João'),
('Natália'),
('Julia'),
('Alfredo'),
('Irene');

INSERT INTO OrganizeTasks.tasks(name_task) VALUES
('teste_1'),
('teste_2'),
('teste_3'),
('teste_4');

INSERT INTO OrganizeTasks.tasks_users(user_id, task_id)VALUES 
(1, 1),
(2, 2),
(3,3),
(4,4),
(5,1);