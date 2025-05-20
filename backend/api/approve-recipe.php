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
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !is_numeric($data['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing recipe ID']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE recipes SET approved = 1 WHERE id = ?");
    $stmt->execute([(int)$data['id']]);

    echo json_encode(['message' => 'Recipe approved']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Approval failed: ' . $e->getMessage()]);
}
?>
