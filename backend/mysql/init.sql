
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

DROP DATABASE project;
CREATE DATABASE project;

USE project;

CREATE TABLE IF NOT EXISTS Users (
    user_name VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    firstName VARCHAR(60),
    lastName VARCHAR(60),
    email VARCHAR(255),
    user_type ENUM('customer', 'merchant') NOT NULL
);

CREATE TABLE IF NOT EXISTS Customers (
    customer_id VARCHAR(255) PRIMARY KEY,
    sex INT,
    FOREIGN KEY (customer_id) REFERENCES Users(user_name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Merchants (
    merchant_id VARCHAR(255) PRIMARY KEY,
    FOREIGN KEY (merchant_id) REFERENCES Users(user_name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    merchant_id VARCHAR(255),
    FOREIGN KEY (merchant_id) REFERENCES Merchants(merchant_id) ON DELETE CASCADE,
    title VARCHAR(60),
    description VARCHAR(700), 
    available_tickets INT,
    price INT,
    date_and_time DATETIME,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE Tags (
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS Event_Tags (
    event_id INT,
    tag_id INT,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Tickets (
    customer_id VARCHAR(255),
    event_id INT,
    PRIMARY KEY(customer_id, event_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE
);

-- Dummy data 
INSERT INTO Users (user_name, password, user_type, firstName, lastName, email) VALUES
('Abel', 'password1', 'customer', 'Abel', 'Zewde','abel@example.com'),
('Biruk', 'password2', 'customer', 'Biruk', 'Tamirat','biruk@example.com'),
('Chaltu', 'password3', 'customer', 'Chaltu', 'Aramde','chaltu@example.com'),
('Dawit', 'password4', 'customer', 'Dawit', 'Meshesha', 'dawit@example.com'),
('Ephrem', 'password5', 'merchant', 'Ephrem', 'Diriba', 'ephrem@example.com'),
('Frehiwot', 'password6', 'merchant', 'Frehiwot', 'Alem', 'frehiwot@example.com');

INSERT INTO Customers (customer_id, sex) VALUES
('Abel', 1),
('Biruk', 2),
('Chaltu', 0),
('Dawit', 1);

INSERT INTO Merchants (merchant_id) VALUES
('Ephrem'),
('Frehiwot');

INSERT INTO Tags (tag_name) VALUES
('Birthday'),
('Wedding'),
('Concert');

INSERT INTO Events (merchant_id, description, available_tickets, price, image) VALUES
('Ephrem', 'John\'s Birthday Party', 50, 34, 'example.com/birthday.jpg'),
('Frehiwot', 'Sarah and Mark\'s Wedding', 100, 45, 'example.com/wedding.jpg'),
('Ephrem', 'Summer Concert Series', 200, 23, 'example.com/concert1.jpg'),
('Ephrem', 'Hip Hop Festival', 150, 67, 'example.com/concert2.jpg'),
('Frehiwot', 'New Year\'s Eve Bash', 75, 12, 'example.com/newyear.jpg');

INSERT INTO Event_Tags (event_id, tag_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 3),
(5, 1),
(5, 3);

INSERT INTO Tickets (customer_id, event_id) VALUES
('Abel', 1),
('Biruk', 2),
('Chaltu', 3),
('Dawit', 4),
('Abel', 5),
('Biruk', 5),
('Chaltu', 5);

