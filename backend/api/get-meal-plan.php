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
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once '../config/db.php';

$user = $_GET['user'] ?? '';
$week = $_GET['week'] ?? '';

if (!$user || !$week) {
  http_response_code(400);
  echo json_encode(['error' => 'Missing user or week']);
  exit;
}

try {
  $stmt = $pdo->prepare("SELECT data FROM user_meal_plans WHERE user = ? AND week = ?");
  $stmt->execute([$user, $week]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);

  echo json_encode($row ? json_decode($row['data'], true) : []);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
