<?php
require_once 'config.php';

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($input['ticket_id'])) {
    die(json_encode(['success' => false, 'message' => 'Missing ticket ID']));
}

$ticket_id = intval($input['ticket_id']);

// Validate ticket_id
if ($ticket_id <= 0) {
    die(json_encode(['success' => false, 'message' => 'Invalid ticket ID']));
}

// Check if ticket exists
$check = $conn->prepare("SELECT ticket_id FROM tickets WHERE ticket_id = ?");
if (!$check) {
    die(json_encode(['success' => false, 'message' => 'Database error']));
}

$check->bind_param("i", $ticket_id);
$check->execute();
$result = $check->get_result();

if ($result->num_rows === 0) {
    die(json_encode(['success' => false, 'message' => 'Ticket not found']));
}

$check->close();

// Delete ticket
$stmt = $conn->prepare("DELETE FROM tickets WHERE ticket_id = ?");
if (!$stmt) {
    die(json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]));
}

$stmt->bind_param("i", $ticket_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Ticket deleted successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
