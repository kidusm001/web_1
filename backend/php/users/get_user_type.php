<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $user_id = $_GET['user_id'];
  try {
    $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT user_type FROM Users WHERE user_name = :user_id";
    $stmt = $dbh->prepare($sql);
    $stmt->execute(['user_id' => $user_id]);
    $user_type = $stmt->fetchColumn();
    echo $user_type;
    $dbh = null;
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else {
  http_response_code(400);
  echo json_encode(array('message' => 'Bad Request'));
}

