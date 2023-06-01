<?php
// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';

$user_name = $_POST['user_name'];
$password  = $_POST['password'];

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

function login()
{
    global $user, $pass,  $user_name, $password;
    $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $dbh->prepare("
        SELECT * from Users
        WHERE user_name = :user_name AND password = :password
    ");
    $stmt->bindParam(':user_name', $user_name);
    $stmt->bindParam(':password', $password);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode("Successfully logged in");
    } else {
        http_response_code(400);
        echo json_encode("Wrong username or password");
    }

    $dbh = null;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        if (!check_username()) {
            http_response_code(400);
            echo json_encode(array('message' => 'No user by this username exists'));
            return;
        }

        login();
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Bad Request'));
}
