let currentTicketId = null;
const modal = new bootstrap.Modal(document.getElementById('ticketModal'));

document.addEventListener('DOMContentLoaded', function() {
    loadTickets();
    setupFormSubmit();
});

function setupFormSubmit() {
    document.getElementById('ticketForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitTicket();
    });
}

function submitTicket() {
    const userName = document.getElementById('userName').value;
    const issue = document.getElementById('issue').value;
    const priority = document.getElementById('priority').value;

    if (!userName || !issue || !priority) {
        showAlert('Please fill all fields', 'danger');
        return;
    }

    fetch('submit_ticket.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_name: userName,
            issue: issue,
            priority: priority
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('✓ Ticket submitted successfully!', 'success');
            document.getElementById('ticketForm').reset();
            loadTickets();
        } else {
            showAlert('Error: ' + data.message, 'danger');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Error submitting ticket', 'danger');
    });
}

function loadTickets() {
    fetch('get_tickets.php')
    .then(response => response.json())
    .then(data => {
        if (data.success && data.tickets.length > 0) {
            displayTickets(data.tickets);
        } else {
            displayEmptyState();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Error loading tickets', 'danger');
    });
}

function displayTickets(tickets) {
    let html = `
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Issue</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    tickets.forEach(ticket => {
        const statusBadgeClass = `status-${ticket.status.toLowerCase().replace(' ', '-')}`;
        const priorityBadgeClass = `priority-${ticket.priority.toLowerCase()}`;
        
        html += `
            <tr>
                <td><strong>#${ticket.ticket_id}</strong></td>
                <td>${escapeHtml(ticket.user_name)}</td>
                <td>${escapeHtml(ticket.issue.substring(0, 40))}${ticket.issue.length > 40 ? '...' : ''}</td>
                <td><span class="badge ${priorityBadgeClass}">${ticket.priority}</span></td>
                <td><span class="badge ${statusBadgeClass}">${ticket.status}</span></td>
                <td>${new Date(ticket.created_date).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewTicket(${ticket.ticket_id})">
                        <i class="bi bi-eye"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    document.getElementById('ticketsContainer').innerHTML = html;
}

function displayEmptyState() {
    document.getElementById('ticketsContainer').innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">📋</div>
            <p>No tickets yet. Submit your first ticket to get started!</p>
        </div>
    `;
}


function viewTicket(ticketId) {
    currentTicketId = ticketId;
    
    fetch('get_tickets.php?id=' + ticketId)
    .then(response => response.json())
    .then(data => {
        if (data.success && data.tickets.length > 0) {
            const ticket = data.tickets[0];
            displayTicketModal(ticket);
        }
    })
    .catch(error => console.error('Error:', error));
}

function displayTicketModal(ticket) {
    const statusOptions = ['Open', 'In Progress', 'Closed'];
    let statusSelect = '<select class="form-select" id="statusSelect">';
    
    statusOptions.forEach(status => {
        const selected = status === ticket.status ? 'selected' : '';
        statusSelect += `<option value="${status}" ${selected}>${status}</option>`;
    });
    statusSelect += '</select>';

    const modalBody = `
        <div class="row mb-3">
            <div class="col-md-6">
                <label class="form-label"><strong>Ticket ID:</strong></label>
                <p>#${ticket.ticket_id}</p>
            </div>
            <div class="col-md-6">
                <label class="form-label"><strong>User:</strong></label>
                <p>${escapeHtml(ticket.user_name)}</p>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-6">
                <label class="form-label"><strong>Created Date:</strong></label>
                <p>${new Date(ticket.created_date).toLocaleString()}</p>
            </div>
            <div class="col-md-6">
                <label class="form-label"><strong>Priority:</strong></label>
                <p><span class="badge priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span></p>
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Issue Description:</strong></label>
            <p>${escapeHtml(ticket.issue)}</p>
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Status:</strong></label>
            ${statusSelect}
        </div>
        <div class="mb-3">
            <button class="btn btn-success" onclick="updateTicketStatus()">
                <i class="bi bi-check-circle"></i> Update Status
            </button>
        </div>
    `;

    document.getElementById('modalBody').innerHTML = modalBody;
    modal.show();
}

function updateTicketStatus() {
    const newStatus = document.getElementById('statusSelect').value;

    fetch('update_status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ticket_id: currentTicketId,
            status: newStatus
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('✓ Status updated successfully!', 'success');
            modal.hide();
            loadTickets();
        } else {
            showAlert('Error: ' + data.message, 'danger');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Error updating status', 'danger');
    });
}

function deleteTicket() {
    if (!confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
        return;
    }

    fetch('delete_ticket.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ticket_id: currentTicketId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('✓ Ticket deleted successfully!', 'success');
            modal.hide();
            loadTickets();
        } else {
            showAlert('Error: ' + data.message, 'danger');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Error deleting ticket', 'danger');
    });
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    const alertId = 'alert-' + Date.now();
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" id="${alertId}" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    alertContainer.innerHTML += alertHtml;

    setTimeout(() => {
        const alertElement = document.getElementById(alertId);
        if (alertElement) {
            const alert = new bootstrap.Alert(alertElement);
            alert.close();
        }
    }, 4000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}