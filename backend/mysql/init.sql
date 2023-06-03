
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

DROP DATABASE project;
CREATE DATABASE project;

USE project;

CREATE TABLE IF NOT EXISTS Users (
    user_name VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    first_name VARCHAR(60),
    last_name VARCHAR(60),
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
INSERT INTO Users (user_name, password, user_type, first_name, last_name, email) VALUES
('Abebe#2314', '1edab1a6606fe647d60ad8f2999e416778244a61c5376b2635f64424a3071d2d', 'customer', 'Abebe', 'Tadesse','abebe@example.com'),
('Birhanu#7865', 'a40f4e3f9b5e0a5e2e73c4bb9d7e9c4f13a012a5e5d4d76c5ea1b5a0e2a4f1c5', 'customer', 'Birhanu', 'Mengistu','birhanu@example.com'),
('Chaltu#8921', 'd6e2e6a88e8ec46f3b3f1d0e2b9b6f6b5c09b0be6c9b8a4a7a5c0e6be7d4d5b9', 'customer', 'Chaltu', 'Abebe','chaltu@example.com'),
('Dereje#4532', '4c1c121a3cc6e8a5f1d3e4a9e4e9c7e2b5fa9aaedf3b6b6d3ab7f8e8c6d6a8b6', 'customer', 'Dereje', 'Mamo', 'dereje@example.com'),
('Eleni#9821', 'f5a3f7b31a3f5e7e9c7f1c3b8e7d5b6d1e2d8f0c6c8b2b1c3f4d9e6a8e3b7d8', 'merchant', 'Eleni', 'Tadesse', 'eleni@example.com'),
('Fikirte#0078', 'a7e9e0d9e8b2c3e1d3b5a1c8f0b1a2a6d1d7b9c8d8b1c7c8a2f1d4a9d0c7c4', 'merchant', 'Fikirte', 'Negash', 'fikirte@example.com'),
('Girma#2345', 'd9d9e3c3d5d3c2c8f6b2b4d5a0e6c3d7f7c3c7a4d2f3e7f9d6e3c6b9d2e6', 'merchant', 'Girma', 'Gebre', 'girma@example.com'),
('Hana#6789', 'e5c4d0d1c7e2b7c8a9e8b4d8b7d5d5d0f7e7d8c0f4c1f6a9c3d8c4d5', 'merchant', 'Hana', 'Girma', 'hana@example.com'),
('Iyasu#1234', 'b4b0f1c9c0f1c2e2b0c5b5c7f7d8e6c8d5b0d5f2a3f8a1b6a9b3d3b0f8d9', 'merchant', 'Iyasu', 'Alemu', 'iyasu@example.com'),
('Jemal#5678', 'b4c5c1e8d7c7e8c8b2d2c8d0a1e2a1e2c9d2c1d9c7f2f1e0b3f2f8', 'customer', 'Jemal', 'Mohammed','jemal@example.com'),
('Kidanemariam#2315', '1edab1a6606fe647d60ad8f2999e416778244a61c5376b2635f64424a3071d2d', 'customer', 'Kidanemariam', 'Tekle','kidanemariam@example.com'),
('Lulit#7866', '3e25960a79dbc69b674cd4ec67a72c62b6d01f05ccfdb6d960a594d4ee09b5be', 'customer', 'Lulit', 'Tadese','lulit@example.com'),
('Mikias#8922', '8a1b699af8e99f1add3cc2537684847c70798be13cc78ed0f572aa2c522b70fe', 'customer', 'Mikias', 'Tesfaye', 'mikias@example.com'),
('Nahom#4533', '80a49073bd6b02b84846a117c3c854b209d2a02a237e67ac8d7fc17e08ce5f12', 'customer', 'Nahom', 'Hagos', 'nahom@example.com'),
('Oliyad#9822', 'a6b46dd0d1ae5e86cbc8f37e75ceeb6760230c1ca4ffbcb0c97b96dd7d9c464b', 'customer', 'Oliyad', 'Mulugeta', 'oliyad@example.com'),
('Petros#0079', '2e81da0faeb8d413db882be3da5b390c9cd633a14e69e181932483dd63d9e3b0', 'customer', 'Petros', 'Wolde', 'petros@example.com');

INSERT INTO Customers (customer_id, sex) VALUES
('Abebe#2314', 1),
('Birhanu#7865', 2),
('Chaltu#8921', 0),
('Dereje#4532', 1),
('Jemal#5678', 1),
('Kidanemariam#2315', 2),
('Lulit#7866', 0),
('Mikias#8922', 1),
('Nahom#4533', 1),
('Oliyad#9822', 2),
('Petros#0079', 1);

INSERT INTO Merchants (merchant_id) VALUES
('Eleni#9821'),
('Fikirte#0078'),
('Girma#2345'),
('Hana#6789'),
('Iyasu#1234');

INSERT INTO Tags (tag_name) VALUES
('Music'),
('Art'),
('Food'),
('Sports'),
('Festival'),
('Conference'),
('Exhibition');

INSERT INTO Events (merchant_id, title, description, available_tickets, price, date_and_time, image) VALUES
('Eleni#9821', 'Ethiopian Jazz Night', 'Enjoy an evening of Ethiopian jazz music with Eleni Tadesse', 100, 50, '2023-06-15 19:30:00', 'https://i.imgur.com/8qF9laQ.jpg'),
('Fikirte#0078', 'Traditional Ethiopian Food Festival', 'Experience the richness of Ethiopian cuisine with Fikirte Negash', 200, 20, '2023-07-01 12:00:00', 'https://i.imgur.com/7khzZTm.jpg'),
('Eleni#9821', 'Ethiopian Art Exhibition', 'Discover the beauty of Ethiopian art with Eleni Tadesse', 50, 100, '2023-08-10 10:00:00', 'https://i.imgur.com/6YtZLz5.jpg'),
('Girma#2345', 'Ethiopian Football Championship', 'Watch the best teams in Ethiopia compete for the championship with Girma Gebre',5000, 30, '2023-09-02 14:00:00', 'https://i.imgur.com/HxvWlPz.jpg'),
('Hana#6789', 'Entrepreneurship Conference', 'Learn from successful Ethiopian entrepreneurs at this conference with Hana Girma', 300, 80, '2023-10-20 09:00:00', 'https://i.imgur.com/9vNvL8N.jpg'),
('Iyasu#1234', 'Ethiopian Fashion Show', 'Experience the latest trends in Ethiopian fashion with Iyasu Alemu', 150, 45, '2023-11-15 18:00:00', 'https://i.imgur.com/2Vv8sZy.jpg'),
('Eleni#9821', 'Ethiopian Music Festival', 'Celebrate the diversity of Ethiopian music with Eleni Tadesse', 500, 25, '2023-12-01 13:00:00', 'https://i.imgur.com/8qF9laQ.jpg'),
('Fikirte#0078', 'Ethiopian Wedding Expo', 'Plan your dream Ethiopian wedding with Fikirte Negash', 1000, 10, '2024-01-07 11:00:00', 'https://i.imgur.com/7khzZTm.jpg'),
('Girma#2345', 'Ethiopian Athletics Championship', 'Watch the best athletes in Ethiopia compete for the championship with Girma Gebre', 5000, 30, '2024-02-18 14:00:00', 'https://i.imgur.com/HxvWlPz.jpg'),
('Hana#6789', 'Ethiopian Film Festival', 'Discover the best of Ethiopian cinema with Hana Girma', 200, 15, '2024-03-22 16:00:00', 'https://i.imgur.com/9vNvL8N.jpg'),
('Iyasu#1234', 'Ethiopian Tech Expo', 'Explore the latest technology innovations in Ethiopia with Iyasu Alemu', 500, 50, '2024-04-15 10:00:00', 'https://i.imgur.com/2Vv8sZy.jpg'),
('Eleni#9821', 'Ethiopian Music Awards', 'Celebrate the best in Ethiopian music with Eleni Tadesse', 1000, 75, '2024-05-05 19:00:00', 'https://i.imgur.com/8qF9laQ.jpg'),
('Fikirte#0078', 'Ethiopian Coffee Festival', 'Discover the best of Ethiopian coffee with Fikirte Negash', 300, 10, '2024-06-07 12:00:00', 'https://i.imgur.com/7khzZTm.jpg'),
('Girma#2345', 'Ethiopian Basketball Championship', 'Watch the best teams in Ethiopia compete for the championship with Girma Gebre', 3000, 20, '2024-07-12 15:00:00', 'https://i.imgur.com/HxvWlPz.jpg'),
('Hana#6789', 'Ethiopian Women Empowerment Conference', 'Join the movement to empower Ethiopian women with Hana Girma', 500, 50, '2024-08-23 09:00:00', 'https://i.imgur.com/9vNvL8N.jpg');

INSERT INTO Event_Tags (event_id, tag_id) VALUES
(1, 1),
(2, 3),
(3, 2),
(4, 4),
(5, 6),
(6, 2),
(6, 5),
(7, 1),
(8, 3),
(9, 4),
(10, 2),
(11, 5),
(12, 3),
(13, 1),
(14, 3),
(15, 6);

INSERT INTO Tickets (customer_id, event_id) VALUES
('Abebe#2314', 1),
('Birhanu#7865', 2),
('Chaltu#8921', 3),
('Dereje#4532', 4),
('Abebe#2314', 5),
('Birhanu#7865', 6),
('Chaltu#8921', 7),
('Dereje#4532', 8),
('Jemal#5678', 9),
('Kidanemariam#2315', 10),
('Lulit#7866', 11),
('Mikias#8922', 12)
