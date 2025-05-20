<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: POST, OPTIONS");
  header("Content-Type: application/json");
  http_response_code(200);
  exit();
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user'], $data['week'], $data['plan'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Missing required fields']);
  exit;
}

try {
  $stmt = $pdo->prepare("INSERT INTO user_meal_plans (user, week, data)
                         VALUES (?, ?, ?)
                         ON DUPLICATE KEY UPDATE data = VALUES(data)");
  $stmt->execute([$data['user'], $data['week'], json_encode($data['plan'])]);
  echo json_encode(['message' => 'Plan saved']);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
