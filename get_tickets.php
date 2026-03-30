<?php
require_once 'config.php';
$ticket_id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($ticket_id) {
    
    $stmt = $conn->prepare("SELECT ticket_id, user_name, issue, status, priority, created_date FROM tickets WHERE ticket_id = ?");
    if (!$stmt) {
        die(json_encode(['success' => false, 'message' => 'Database error']));
    }
    
    $stmt->bind_param("i", $ticket_id);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $conn->query("SELECT ticket_id, user_name, issue, status, priority, created_date FROM tickets ORDER BY created_date DESC");
    if (!$result) {
        die(json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]));
    }
}

$tickets = [];
if (isset($stmt)) {
    while ($row = $result->fetch_assoc()) {
        $tickets[] = $row;
    }
    $stmt->close();
} else {
    while ($row = $result->fetch_assoc()) {
        $tickets[] = $row;
    }
}

echo json_encode(['success' => true, 'tickets' => $tickets]);

$conn->close();
?>