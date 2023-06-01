<?php
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';

$user_name = $_POST['user_name'];
$event_id  = $_POST['event_id'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // create a ticket
        $stmt = $dbh->prepare("
            INSERT INTO Tickets (customer_id, event_id) 
            VALUES (:customer_id, :event_id)
        ");
        $stmt->bindParam(':customer_id', $user_name);
        $stmt->bindParam(':event_id', $event_id);
        $stmt->execute();

        echo json_encode(array('message' => 'Ticket successfully bought'));
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Bad Request'));
}
