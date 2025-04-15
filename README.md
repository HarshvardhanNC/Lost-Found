# Lost & Found System

A web application for managing lost and found items in a college environment. This system allows students to report lost items, post found items, and claim items that they've lost.

## Features

- **User Authentication**: Secure login and registration system
- **Lost Item Reporting**: Students can report items they've lost
- **Found Item Posting**: Students can post items they've found
- **Item Claiming**: Only the person who posted a found item can mark it as claimed
- **Item Status Tracking**: Clear indication of claimed items with timestamps
- **Filtering**: Filter items by type (lost/found) or view all items
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/HarshvardhanNC/Lost-Found.git
   cd Lost-Found
   ```

2. Install dependencies for both client and server:
   ```
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory with:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. Start the application:
   ```
   # Start the server
   cd server
   npm start

   # Start the client (in a new terminal)
   cd client
   npm start
   ```

5. Access the application at `http://localhost:3000`

## Usage

1. **Register/Login**: Create an account or log in to an existing one
2. **Report Lost Item**: Click "Report Item" and fill in the details of your lost item
3. **Post Found Item**: Click "Report Item" and select "Found Item" to post an item you've found
4. **Claim Items**: If you posted a found item, you can mark it as claimed when someone retrieves it
5. **Browse Items**: Use the filter buttons to view all items, lost items, or found items

## Project Structure

```
Lost-Found/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # Source files
│       ├── components/     # React components
│       ├── App.js          # Main application component
│       └── index.js        # Entry point
├── server/                 # Node.js backend
│   ├── middleware/         # Express middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── server.js           # Server entry point
└── README.md               # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- MongoDB for the database
- Express.js for the backend framework
- React for the frontend framework 