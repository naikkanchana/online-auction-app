const express = require('express');
const authRoutes = require('./routes/authRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const userRoutes=  require('./routes/userRoutes');
const { sequelize } = require('./models');
const cors = require('cors'); // Import cors
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all requests
app.use(cors()); // Add this line
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auction', auctionRoutes);
app.use('/api/user',userRoutes)

// Start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log('Error connecting to the database', err));
