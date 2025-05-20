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

if (!isset(
    $data['title'], $data['description'], $data['image'], $data['calories'],
    $data['prepTime'], $data['category'], $data['ingredients'], $data['instructions'], $data['created_by']
)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$title = $data['title'];
$description = $data['description'];
$image = $data['image'];
$calories = (int) $data['calories'];
$prepTime = (int) $data['prepTime'];
$category = $data['category'];
$ingredients = json_encode($data['ingredients']);
$instructions = json_encode($data['instructions']);
$approved = 0;
$created_by = $data['created_by'];

try {
    $stmt = $pdo->prepare("INSERT INTO recipes (title, description, image, calories, prepTime, category, ingredients, instructions, approved, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $title, $description, $image, $calories, $prepTime,
        $category, $ingredients, $instructions, $approved, $created_by
    ]);

    $id = $pdo->lastInsertId();
    echo json_encode([
        'id' => (int) $id,
        'title' => $title,
        'description' => $description,
        'image' => $image,
        'calories' => $calories,
        'prepTime' => $prepTime,
        'category' => $category,
        'ingredients' => $data['ingredients'],
        'instructions' => $data['instructions'],
        'approved' => false,
        'created_by' => $created_by,
        'created_at' => date('Y-m-d H:i:s')
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add recipe: ' . $e->getMessage()]);
    exit;
}
?>
