const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const cors = require('cors');
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

const app = express();

// Middleware rules setup
app.use(cors({
  origin: '*',
}));
app.use(express.json());

// CONNECT TO THE DATABASE
const dbURI = "mongodb://campus_admin:PrintShop2026@ac-2tmb8xg-shard-00-00.2tmb8xg.mongodb.net:27017,ac-2tmb8xg-shard-00-01.2tmb8xg.mongodb.net:27017,ac-2tmb8xg-shard-00-02.2tmb8xg.mongodb.net:27017/CampusPrint?ssl=true&replicaSet=atlas-2tmb8xg-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(dbURI)
  .then(() => console.log('✅ MongoDB Database connection established successfully!'))
  .catch((error) => console.error('❌ MongoDB connection error failed:', error));
mongoose.connect(dbURI)
  .then(() => console.log('✅ MongoDB Database connection established successfully!'))
  .catch((error) => console.error('❌ MongoDB connection error failed:', error));

// Test server route checkpoint
app.get('/', (req, res) => {
  res.send('CampusPrint Backend Server Template Is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server booting on port ${PORT}`));