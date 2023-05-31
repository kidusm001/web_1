<?php
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';

$email = $_POST['email'];
$user_name = $_POST['user_name'];
$password  = $_POST['password'];
$sex = $_POST['sex'];

function check_username()
{
    global $user, $pass, $user_name;

    $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $dbh->prepare("SELECT user_name FROM Users WHERE user_name = :user_name");
    $stmt->bindParam(':user_name', $user_name);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $dbh = null;
    return $result;
}

function create_account()
{
    global $user, $pass, $email, $user_name, $password, $sex;
    $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //create a record in the users table
    $stmt = $dbh->prepare("
        INSERT INTO Users (user_name, password, user_type) 
        VALUES (:user_name, :password, :user_type)
    ");
    $stmt->bindParam(':user_name', $user_name);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':user_type', "customer");
    $stmt->execute();

    // create a record in the customers table
    $stmt = $dbh->prepare("
        INSERT INTO Customers (customer_id, email, sex) 
        VALUES (:customer_id, :email, :sex)
    ");

    $stmt->bindParam(':customer_id', $user_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':sex', $sex);
    $stmt->execute();
    $dbh = null;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        if (check_username()) {
            http_response_code(400);
            echo json_encode(array('message' => 'Username already exists'));
            return;
        }

        create_account();
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Bad Request'));
}
