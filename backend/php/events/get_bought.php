<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';

$user_name = $_POST['user_name'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $events = $dbh->prepare("
            SELECT * from Tickets 
            join Events
            on Tickets.event_id = Events.event_id
            where Tickets.customer_id = :user_name
        ");

        $events->bindParam(':user_name', $user_name);
        $events->execute();

        echo json_encode($events->fetchAll());
        $dbh = null;
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Bad Request'));
}
