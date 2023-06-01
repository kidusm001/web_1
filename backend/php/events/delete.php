<?php
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';

$user_name = $_POST['user_name'];
$event_id = $_POST['event_id'];

function check_event_ownership()
{
    global $user, $pass, $user_name, $event_id;

    $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $dbh->prepare("
        SELECT * FROM Events WHERE event_id = :event_id");
    $stmt->bindParam(':event_id', $event_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    $dbh = null;

    return ($result['merchant_id'] == $user_name);
}

function delete_event()
{
    global $user, $pass, $event_id;
    $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $dbh->prepare(" DELETE FROM Events WHERE event_id = :event_id");
    $stmt->bindParam(':event_id', $event_id);
    $stmt->execute();


    $dbh = null;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        if (!check_event_ownership()) {
            http_response_code(400);
            echo json_encode(array('message' => 'Bad event owner'));
            return;
        }

        delete_event();
        echo json_encode(array('message' => 'Event deleted'));
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Bad Request'));
}
