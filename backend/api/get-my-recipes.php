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

if (!isset($data['created_by'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing creator identifier']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM recipes WHERE created_by = ? ORDER BY created_at DESC");
    $stmt->execute([$data['created_by']]);
    $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($recipes as &$recipe) {
        $recipe['ingredients'] = json_decode($recipe['ingredients'], true);
        $recipe['instructions'] = json_decode($recipe['instructions'], true);
        $recipe['approved'] = (bool) $recipe['approved'];
        $recipe['calories'] = (int) $recipe['calories'];
        $recipe['prepTime'] = (int) $recipe['prepTime'];
    }

    echo json_encode($recipes);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch user recipes: ' . $e->getMessage()]);
    exit;
}
?>
