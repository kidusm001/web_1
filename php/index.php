<?php
$user = 'root';
$pass = 'root';

try {
    $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $users = $dbh->query('SELECT * FROM users');
    foreach ($users as $user) {
        echo $user['name'] . '<br>';
    }
    $dbh = null;
} catch (PDOException $e) {
    echo $e->getMessage() ;
}
?>
