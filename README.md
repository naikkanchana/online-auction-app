# online-auction-system
The Auction Web Application is a full-stack platform that enables users to participate in online auctions. Built with React for the frontend and Node.js with Express for the backend, this application allows users to create, manage, and bid on auction items in real-time

# Technologies Used

Frontend: React.js
Backend: Node.js, Express.js
Database: PostgreSQL
ORM: Sequelize
Security: JWT for authentication, Bcrypt for password hashing

# Setup Instructions
1. Clone the Repository

https://github.com/naikkanchana/online-auction-system.git
cd auction-app

2. Install Dependencies

For the backend:

cd server
npm install

# For the frontend:
cd client
npm install

# Setup Environment Variables
Create a .env file under the server directory and configure the following:
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=auctionuser
DB_PASSWORD=password123
DB_NAME=auctiondb
JWT_SECRET=your_jwt_secret

# Setup Database
Make sure PostgreSQL is installed and running.

Create the database using Sequelize:

npx sequelize db:create
npx sequelize db:migrate

#  Run the Backend
cd server
npm start

# Run the Frontend
cd client
npm start

# Access the Application
Open your browser and navigate to http://localhost:3000. You can now register and start using the auction application.