<?php
header('Content-Type: application/json');

$user = 'root';
$pass = 'root';


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $users = $dbh->query(
// get top 10 events by tickets sold
"
SELECT Events.*, COUNT(Tickets.event_id) AS tickets_sold
FROM Events
INNER JOIN Tickets ON Events.event_id = Tickets.event_id
GROUP BY Events.event_id
ORDER BY tickets_sold DESC
LIMIT 10;
");
        echo json_encode($users->fetchAll());
        $dbh = null;
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Bad Request'));
}
