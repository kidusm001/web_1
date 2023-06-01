<?php
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';

$merchant_id = $_POST['merchant_id'];
$title = $_POST['title'];
$description = $_POST['description'];
$available_tickets = $_POST['available_tickets'];
$price = $_POST['price'];
$image = $_POST['image'];
$tags = $_POST['tags'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {

        $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $dbh->prepare("
            INSERT INTO Events (merchant_id, title, description, available_tickets, price, date_and_time, image) 
            VALUES (:merchant_id, :title, :description, :available_tickets, :price, CURRENT_TIMESTAMP, :image) 
        ");
        $stmt->bindParam(':merchant_id', $merchant_id);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':available_tickets', $available_tickets);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':image', $image);

        $stmt->execute();

        // insert every tag
        $stmt = $dbh->prepare("
            INSERT INTO Tags (tag_name) 
            VALUES (?)
        ");
        foreach ($tags as $tag) {
            $stmt->bindParam(1, $tag);
            $stmt->execute();
        }

        // bind every tag to event
        $stmt = $dbh->prepare("
            INSERT INTO Event_Tags (event_id, tag_id)
            VALUES (?, ?)
        ");
        foreach ($tags as $tag) {
            $stmt->bindParam(1, $event_id);
            $stmt->bindParam(2, $tag);
            $stmt->execute();
        }

        $dbh = null;

    } catch (PDOException $e) {
        echo $e->getMessage();
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Bad Request'));
}
