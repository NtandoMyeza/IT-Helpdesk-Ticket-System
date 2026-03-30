# IT Helpdesk Ticket System

A professional, user-friendly internal support system for managing IT issues and helpdesk tickets.

## Features

✅ **Log IT Issues** - Users can submit new support tickets with descriptions
✅ **View Tickets** - Display all submitted tickets in a clean, organized table
✅ **Change Status** - Update ticket status (Open / In Progress / Closed)
✅ **Assign Priority** - Set priority levels (Low / Medium / High)
✅ **Delete Tickets** - Remove resolved or unnecessary tickets
✅ **Professional UI** - Modern, responsive design with gradient themes

## Requirements
- PHP 7.0+
- MySQL 5.7+
- Apache or other PHP-enabled web server
- AMPPS (Apache, MySQL, PHP) recommended for Windows

### 3. Access the Application

If using AMPPS:
- Navigate to: `http://localhost:8080/IT%20Helpdesk%20Ticket%20System/`

Or with your configured virtual host:
- Open `index.php` in your web browser

## Usage

### Submit a Ticket
1. Fill in your name in the "Your Name" field
2. Describe your issue in the "Issue Description" field
3. Select the priority level (Low, Medium, High)
4. Click "Submit Ticket"

### View Tickets
- All submitted tickets appear in the main table
- The most recent tickets are displayed first

### Update Ticket Status
1. Click the "View" button on any ticket
2. Select the new status from the dropdown (Open, In Progress, Closed)
3. Click "Update Status"

### Delete a Ticket
1. Click the "View" button on any ticket
2. Click the "Delete" button in the modal
3. Confirm the deletion when prompted

## Design Features

### Professional UI
- Modern gradient backgrounds (Purple/Blue theme)
- Responsive Bootstrap 5 layout
- Smooth animations and transitions
- Color-coded status and priority badges
- Clean typography and spacing

### User-Friendly
- Simple, intuitive form layout
- Real-time ticket updates
- Modal dialogs for detailed views
- Toast notifications for feedback
- Mobile-responsive design

### Security
- Input validation and sanitization
- SQL injection protection with prepared statements
- XSS protection with HTML escaping
- CSRF-safe AJAX requests

## Status Options

- **Open** - Newly submitted tickets, waiting for assignment
- **In Progress** - Tickets being actively worked on
- **Closed** - Resolved tickets

## Priority Levels

- **Low** - Non-urgent issues, can be addressed later
- **Medium** - Standard issues with normal importance
- **High** - Urgent issues requiring immediate attention

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check database credentials in `php/config.php`
- Verify user account has proper permissions

### Table Not Displaying
- Refresh the page
- Check browser console for JavaScript errors
- Verify PHP is enabled on your server

### Form Not Submitting
- Ensure all fields are filled
- Check that priority dropdown is properly selected
- Verify JavaScript is enabled in your browser

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

- User authentication and authorization
- Email notifications
- Advanced filtering and search
- Ticket assignment to staff
- Comments and attachments
- SLA tracking
- Analytics and reporting

## Support

For issues or questions, please contact your IT department.

---

**Version:** 1.0  
**Last Updated:** February 2026
