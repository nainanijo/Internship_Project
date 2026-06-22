const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const cors = require('cors');
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

const app = express();

// Middleware rules setup
app.use(cors());
app.use(express.json());

// CONNECT TO THE DATABASE
mongoose.connect("mongodb+srv://campus_admin:PrintShop2026@cluster0.2tmb8xg.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ MongoDB Database connection established successfully!'))
  .catch((error) => console.error('❌ MongoDB connection error failed:', error));

// Test server route checkpoint
app.get('/', (req, res) => {
  res.send('CampusPrint Backend Server Template Is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server booting on port ${PORT}`));