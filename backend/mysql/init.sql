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
    merchant_id INT, 
    FOREIGN KEY (merchant_id) REFERENCES Merchants(merchant_id),
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
    customer_id INT,
    event_id INT,
    PRIMARY KEY(customer_id, event_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id) 
);

-- Dummy data 
INSERT INTO Users (user_id, user_name, password, user_type) VALUES
(1, 'Abel', 'password1', 'customer'),
(2, 'Biruk', 'password2', 'customer'),
(3, 'Chaltu', 'password3', 'customer'),
(4, 'Dawit', 'password4', 'customer'),
(5, 'Ephrem', 'password5', 'merchant'),
(6, 'Frehiwot', 'password6', 'merchant');

INSERT INTO Customers (customer_id, email, sex) VALUES
(1, 'abel@example.com', 1),
(2, 'biruk@example.com', 2),
(3, 'chaltu@example.com', 0),
(4, 'dawit@example.com', 1);

INSERT INTO Merchants (merchant_id, email) VALUES
(5, 'ephrem@example.com'),
(6, 'frehiwot@example.com');

INSERT INTO Tags (tag_id, tag_name) VALUES
(1, 'Birthday'),
(2, 'Wedding'),
(3, 'Concert');

INSERT INTO Events (event_id, merchant_id, description, available_tickets, image) VALUES
(1, 5, 'John\'s Birthday Party', 50, 'example.com/birthday.jpg'),
(2, 6, 'Sarah and Mark\'s Wedding', 100, 'example.com/wedding.jpg'),
(3, 5, 'Summer Concert Series', 200, 'example.com/concert1.jpg'),
(4, 5, 'Hip Hop Festival', 150, 'example.com/concert2.jpg'),
(5, 6, 'New Year\'s Eve Bash', 75, 'example.com/newyear.jpg');

INSERT INTO Event_Tags (event_id, tag_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 3),
(5, 1),
(5, 3);

INSERT INTO Tickets (customer_id, event_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(1, 5),
(2, 5),
(3, 5);

