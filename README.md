# College Buddy

A web application designed to help manage college-related activities with role-based authentication for students and administrators.

## Features

- Role-based authentication (Student and Admin)
- Secure login and registration system
- Protected routes based on user roles
- Student dashboard
- Admin dashboard
- Modern and responsive UI

## Tech Stack

- **Frontend:**
  - React.js
  - React Router DOM
  - CSS for styling
  - JWT for authentication

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT for authorization

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Create a .env file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/college_buddy
   JWT_SECRET=your_super_secret_key_for_college_buddy
   ```

## Running the Application

1. Start MongoDB:
   ```bash
   mongod
   ```

2. Start the server (in the server directory):
   ```bash
   npm start
   ```

3. Start the client (in the client directory):
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Admin Access

Default admin credentials:
- Email: admin@collegebuddy.com
- Password: admin123

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 