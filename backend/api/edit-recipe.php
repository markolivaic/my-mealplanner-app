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

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing recipe ID']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE recipes
        SET title = ?, description = ?, image = ?, calories = ?, prepTime = ?, category = ?, ingredients = ?, instructions = ?, approved = 0
        WHERE id = ?
    ");
    $stmt->execute([
        $data['title'],
        $data['description'],
        $data['image'],
        (int)$data['calories'],
        (int)$data['prepTime'],
        $data['category'],
        json_encode($data['ingredients']),
        json_encode($data['instructions']),
        (int)$data['id']
    ]);

    echo json_encode(['message' => 'Recipe updated successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update recipe: ' . $e->getMessage()]);
}
?>
