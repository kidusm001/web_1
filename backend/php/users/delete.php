<?php
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';

$user_name = $_POST['user_name'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $dbh->prepare(" DELETE FROM Users WHERE user_name = :user_name");
        $stmt->bindParam(':user_name', $user_name);
        $stmt->execute();


        $dbh = null;
        echo json_encode(array('message' => 'Event deleted'));

    } catch (PDOException $e) {
        echo $e->getMessage();
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Bad Request'));
}
