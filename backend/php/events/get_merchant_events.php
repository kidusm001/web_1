<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';
// if ($_SERVER['REQUEST_METHOD'] == 'GET') {
//   try {
//     $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
//     $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//     $sql = "SELECT event_id FROM Events WHERE merchant_id = :merch_id";
//     $stmt = $dbh->prepare($sql);
//     $stmt->bindParam(':merch_id', $merch_id, PDO::PARAM_STR);
//     $merch_id = $_GET['merchant_id'];
//     $stmt->execute();
//     $events = $stmt->fetchAll();
//     echo json_encode($events);
//     $dbh = null;
//   } catch (PDOException $e) {
//       echo $e->getMessage();
//   } 
// } else {
//   http_response_code(400);
//   echo json_encode(array('message' => 'Bad Request'));
// }
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['merchant_id'])) {
        $merchant_id = $_GET['merchant_id'];
        try {
            $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare('SELECT event_id FROM Events WHERE merchant_id = :merchant_id');
            $stmt->bindParam(':merchant_id', $merchant_id);
            $stmt->execute();
            $event_ids = $stmt->fetchAll(PDO::FETCH_COLUMN);
            echo json_encode($event_ids);
            $dbh = null;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    } else {
        http_response_code(400);
        echo json_encode(array('message' => 'Missing merchant_id parameter'));
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Bad Request'));
}
