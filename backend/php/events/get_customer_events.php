<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  try {
    $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT event_id FROM Tickets WHERE customer_id = :cust_id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindParam(':cust_id', $cust_id, PDO::PARAM_STR);
    $cust_id = $_GET['customer_id'];
    $stmt->execute();
    $events = $stmt->fetchAll();
    echo json_encode($events);
    $dbh = null;
  } catch (PDOException $e) {
    echo $e->getMessage();
  } 
} else {
  http_response_code(400);
  echo json_encode(array('message' => 'Bad Request'));
}
