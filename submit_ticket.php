<?php
require_once 'config.php';

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($input['user_name']) || !isset($input['issue']) || !isset($input['priority'])) {
    die(json_encode(['success' => false, 'message' => 'Missing required fields']));
}

// Sanitize input
$user_name = trim($input['user_name']);
$issue = trim($input['issue']);
$priority = trim($input['priority']);

// Validate
if (empty($user_name) || empty($issue) || empty($priority)) {
    die(json_encode(['success' => false, 'message' => 'All fields are required']));
}

// Validate priority
$valid_priorities = ['Low', 'Medium', 'High'];
if (!in_array($priority, $valid_priorities)) {
    die(json_encode(['success' => false, 'message' => 'Invalid priority']));
}

// Check user_name length
if (strlen($user_name) > 100) {
    die(json_encode(['success' => false, 'message' => 'Name is too long']));
}

if (strlen($issue) > 5000) {
    die(json_encode(['success' => false, 'message' => 'Issue description is too long']));
}

// Insert into database
$stmt = $conn->prepare("INSERT INTO tickets (user_name, issue, priority, status) VALUES (?, ?, ?, 'Open')");
if (!$stmt) {
    die(json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]));
}

$stmt->bind_param("sss", $user_name, $issue, $priority);

if ($stmt->execute()) {
    $ticket_id = $stmt->insert_id;
    echo json_encode(['success' => true, 'message' => 'Ticket submitted successfully', 'ticket_id' => $ticket_id]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
