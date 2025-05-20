<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Content-Type: application/json");
    http_response_code(200);
    exit();
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

require_once '../config/db.php';

try {
    $stmt = $pdo->query("SELECT * FROM recipes ORDER BY created_at DESC");
    $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Decode JSON fields before returning
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
    echo json_encode(['error' => 'Failed to fetch recipes: ' . $e->getMessage()]);
    exit;
}
?>
