# College Buddy

College Buddy is a comprehensive web application designed to enhance the college experience by providing students with easy access to essential campus services and information.

## Features

### 1. Student Dashboard
- Modern and intuitive user interface
- Quick access to all features
- Personalized welcome section
- Responsive design for all devices

### 2. Class Timetable
- Weekly class schedule view (Monday to Friday)
- Time slots from 8:30 AM to 3:30 PM
- Easy-to-use interface for adding and editing subjects
- Personal timetable for each student
- Real-time updates and storage

### 3. Cafeteria Menu
- View today's menu items
- Categorized food items (Breakfast, Lunch, Dinner, Snacks)
- Price and availability information
- Admin panel for menu management

### 4. Lost and Found
- Report lost items
- List found items
- Search and filter functionality
- Item status tracking
- Image upload support

### 5. Emergency Contacts
- Quick access to important contacts
- Emergency service numbers
- Campus security contacts
- Medical facility information

## Technology Stack

### Frontend
- React.js
- Material-UI
- CSS3 with modern styling
- Responsive design principles

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies for both client and server
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
Create a .env file in the server directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/college-buddy
JWT_SECRET=your_jwt_secret
```

4. Start the application
```bash
# Start MongoDB
mongod

# Start server (from server directory)
npm start

# Start client (from client directory)
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Usage

### Student Access
1. Register/Login with student credentials
2. Access dashboard
3. Navigate to desired features:
   - View/edit class timetable
   - Check cafeteria menu
   - Report/search lost items
   - Access emergency contacts

### Admin Access
Default admin credentials:
- Email: admin@collegebuddy.com
- Password: admin123

Admin features:
1. Manage menu items
2. Update item availability
3. Monitor lost and found reports

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Timetable
- GET `/api/timetable` - Get user's timetable
- POST `/api/timetable` - Update timetable entry

### Menu
- GET `/api/menu/today` - Get today's menu
- POST `/api/menu` - Add new menu item (Admin)
- PUT `/api/menu/:id` - Update menu item (Admin)

### Lost and Found
- GET `/api/lost-found` - Get all items
- POST `/api/lost-found` - Report new item
- PUT `/api/lost-found/:id` - Update item status

### Emergency Contacts
- GET `/api/emergency-contacts` - Get all emergency contacts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- JWT-based authentication
- Protected API endpoints
- Role-based access control
- Secure password hashing
- Input validation and sanitization

## Future Enhancements

- Real-time notifications
- Mobile application
- Online food ordering
- Student attendance tracking
- Event calendar integration
- Chat support system

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

- Material-UI for the component library
- MongoDB for the database solution
- Express.js for the backend framework
- React.js for the frontend framework 