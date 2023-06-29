<?php 
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json'); 

$user = 'root'; 
$pass = 'root'; 

// $merchant_id = $_POST['merchant_id']; 
$title = $_POST['title']; 
$description = $_POST['description']; 

// $available_tickets = intval($_POST['available_tickets']); 
// $price = intval($_POST['price']); 
if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
    $merchant_id = $_POST['merchant_id']; 
    $available_tickets = intval($_POST['available-tickets']); 
    $price = intval($_POST['ticket-prices']); 
    if (!$merchant_id) {
      http_response_code(400);
      echo json_encode(array('message' => 'merchant_id is required'));
      exit;
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid request method']);
}

$image = isset($_POST['image']) && !empty($_POST['image']) ? $_POST['image'] : "https://sample.com/image";
$tags = json_decode($_POST['tagi']); 
$date_and_time = $_POST['date_and_time'];


if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
    try {
        $dbh = new PDO('mysql:host=db;port=3306;dbname=project', $user, $pass); 
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        
        $stmt = $dbh->prepare("INSERT INTO Events (title, description, available_tickets, price, image, date_and_time, merchant_id)  
                                   VALUES (:title, :description, :available_tickets, :price, :image, :date_and_time, :merchant_id)");
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);  
        $stmt->bindParam(':available_tickets', $available_tickets);  
        $stmt->bindParam(':price', $price); 
        $stmt->bindParam(':image', $image);
        $stmt->bindParam(':date_and_time', $date_and_time);
        $stmt->bindParam(':merchant_id', $merchant_id);
        $stmt->execute();

        $event_id = $dbh->lastInsertId();
        
        $stmt = $dbh->prepare("INSERT INTO Tags (tag_name) VALUES (?)");         
        foreach ($tags as $tag) { 
            $stmt->bindParam(1, $tag);
            $stmt->execute(); 
            
            $tag_id = $dbh->lastInsertId();
            
            $stm = $dbh->prepare("INSERT INTO Event_Tags (tag_id,event_id)  VALUES (?, ?)");       
            $stm->bindParam(1, $tag_id);                 
            $stm->bindParam(2, $event_id);
            $stm->execute();
        }
        $dbh = null;
    } catch (PDOException $e) { 
        echo $e->getMessage(); 
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Bad Request')); 
}
