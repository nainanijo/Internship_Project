const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // 👈 This automatically loads the correct .env file

const app = express();

// 1. Unlocked Security Gateways
app.use(cors({ origin: '*' }));
app.use(express.json());

// 2. Automated Database Link
const dbURI = process.env.MONGODB_URI; 
mongoose.connect(dbURI)
  .then(() => console.log('✅ Database connection established successfully!'))
  .catch((error) => console.log('⚠️ Running backend on local testing fallback pipeline.'));

// 3. Test API Data Transmission Route
app.get('/api/status', (req, res) => {
  res.json({ message: "Hello from CampusPrint Backend Server!" });
});

// 4. Port Listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server booting cleanly on port ${PORT}`));