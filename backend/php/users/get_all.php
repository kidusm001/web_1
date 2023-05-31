<?php
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $users = $dbh->query('SELECT * FROM Users');
        echo json_encode($users->fetchAll());
        $dbh = null;
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Bad Request'));
}
