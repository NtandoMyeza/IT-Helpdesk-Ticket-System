CREATE DATABASE IF NOT EXISTS it_helpdesk;
USE it_helpdesk;

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    issue TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'Open',
    priority VARCHAR(20) DEFAULT 'Medium',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_created (created_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tickets (user_name, issue, status, priority) VALUES
('John Mthembu', 'Cannot access email account - getting authentication error', 'Open', 'High'),
('Sizwe Nkosi', 'Printer is not responding on network', 'In Progress', 'Medium'),
('Duduzile Myeni', 'Request for password reset', 'Closed', 'Low'),
('Anele Mathebula', 'VPN connection drops intermittently', 'In Progress', 'High'),
('Ayanda Masombuka', 'Need additional disk space on C drive', 'Open', 'Medium');

SELECT * FROM tickets;