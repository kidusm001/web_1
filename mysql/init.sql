CREATE DATABASE if not exists project;
USE project;

CREATE TABLE if not exists users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, password) VALUES ('admin', 'admin');
INSERT INTO users (name, password) VALUES ('user1', 'user');
INSERT INTO users (name, password) VALUES ('user2', 'user');
INSERT INTO users (name, password) VALUES ('user3', 'user');
INSERT INTO users (name, password) VALUES ('user4', 'user');

