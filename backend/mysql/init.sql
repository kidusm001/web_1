CREATE DATABASE if not exists project;
USE project;

CREATE TABLE IF NOT EXISTS Customers (
    customer_id INT PRIMARY KEY,
    email VARCHAR(255),
    sex INT
);  

CREATE TABLE IF NOT EXISTS Merchants (
    merchant_id INT PRIMARY KEY,
    email VARCHAR(255)
);  

CREATE TABLE IF NOT EXISTS Events (
    event_id INT PRIMARY KEY,
    merchant_id INT, 
    FOREIGN KEY (merchant_id) REFERENCES Merchants(merchant_id),
    description VARCHAR(700), 
    available_tickets INT
    image_id INT,
    FOREIGN KEY (image_id) REFERENCES Images(id)
);

CREATE TABLE IF NOT EXISTS Users (
    user_id INT  PRIMARY KEY,  
    user_name VARCHAR(255),
    password VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Customers(customer_id) OR REFERENCES Merchants(merchant_id)
);

CREATE TABLE IF NOT EXISTS Tickets (
    customer_id INT,
    event_id INT,
    PRIMARY KEY(customer_id, event_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id) 
);

CREATE TABLE IF NOT EXISTS Images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  filename VARCHAR(255),
  mimetype VARCHAR(255),
  size INT,
  data LONGBLOB
);

