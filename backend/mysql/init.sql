CREATE DATABASE if not exists project;
USE project;

CREATE TABLE IF NOT EXISTS Users (
    user_name VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    user_type ENUM('customer', 'merchant') NOT NULL
);

CREATE TABLE IF NOT EXISTS Customers (
    customer_id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    sex INT,
    FOREIGN KEY (customer_id) REFERENCES Users(user_name)
);

CREATE TABLE IF NOT EXISTS Merchants (
    merchant_id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    FOREIGN KEY (merchant_id) REFERENCES Users(user_name)
);

CREATE TABLE IF NOT EXISTS Events (
    event_id INT PRIMARY KEY,
    merchant_id VARCHAR(255),
    FOREIGN KEY (merchant_id) REFERENCES Merchants(merchant_id),
    title VARCHAR(60),
    description VARCHAR(700), 
    available_tickets INT,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE Tags (
    tag_id INT PRIMARY KEY,
    tag_name VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS Event_Tags (
    event_id INT,
    tag_id INT,
    FOREIGN KEY (event_id) REFERENCES Events(event_id),
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
);

CREATE TABLE IF NOT EXISTS Tickets (
    customer_id VARCHAR(255),
    event_id INT,
    PRIMARY KEY(customer_id, event_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id) 
);

-- Dummy data 
INSERT INTO Users (user_id, user_name, password, user_type) VALUES
('Abel', 'password1', 'customer'),
('Biruk', 'password2', 'customer'),
('Chaltu', 'password3', 'customer'),
('Dawit', 'password4', 'customer'),
('Ephrem', 'password5', 'merchant'),
('Frehiwot', 'password6', 'merchant');

INSERT INTO Customers (customer_id, email, sex) VALUES
('Abel', 'abel@example.com', 1),
('Biruk', 'biruk@example.com', 2),
('Chaltu', 'chaltu@example.com', 0),
('Dawit', 'dawit@example.com', 1);

INSERT INTO Merchants (merchant_id, email) VALUES
('Ephrem', 'ephrem@example.com'),
('Frehiwot', 'frehiwot@example.com');

INSERT INTO Tags (tag_id, tag_name) VALUES
(1, 'Birthday'),
(2, 'Wedding'),
(3, 'Concert');

INSERT INTO Events (event_id, merchant_id, description, available_tickets, image) VALUES
(1, 'Ephrem', 'John\'s Birthday Party', 50, 'example.com/birthday.jpg'),
(2, 'Frehiwot', 'Sarah and Mark\'s Wedding', 100, 'example.com/wedding.jpg'),
(3, 'Ephrem', 'Summer Concert Series', 200, 'example.com/concert1.jpg'),
(4, 'Ephrem', 'Hip Hop Festival', 150, 'example.com/concert2.jpg'),
(5, 'Frehiwot', 'New Year\'s Eve Bash', 75, 'example.com/newyear.jpg');

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

