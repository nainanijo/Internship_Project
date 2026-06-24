const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const Token = require('./models/Token'); 

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const dbURI = process.env.MONGODB_URI; 
mongoose.connect(dbURI)
  .then(() => console.log('✅ Database connection established successfully!'))
  .catch((error) => console.log('⚠️ Running backend on local testing fallback pipeline.', error));

// ==========================================
// 🎯 DATA ROUTE ENDPOINTS (FIXED CONFIGURATION)
// ==========================================

app.get('/api/status', (req, res) => {
  res.json({ message: "Hello from CampusPrint Backend Server!" });
});

// 🚀 ROUTE 1: ALL MUST BE FIRST to stop it clashing with dynamic tracking codes!
app.get('/api/tokens/all', async (req, res) => {
  try {
    const allTokens = await Token.find({}).sort({ createdAt: -1 });
    res.json(allTokens);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin dashboard records" });
  }
});

// 🚀 ROUTE 2: Dynamic lookup sits BELOW static words
app.get('/api/tokens/:number', async (req, res) => {
  try {
    const foundToken = await Token.findOne({ tokenNumber: req.params.number });
    if (!foundToken) {
      return res.status(404).json({ message: "Token reference entry not found." });
    }
    res.json(foundToken);
  } catch (error) {
    res.status(500).json({ error: "Server lookup operation failed." });
  }
});

app.post('/api/tokens/generate', async (req, res) => {
  try {
    const { totalPrice } = req.body;
    const totalRecords = await Token.countDocuments({});
    const count = totalRecords + 1;
    const letterIndex = Math.floor((count - 1) / 999);
    const number = ((count - 1) % 999) + 1;
    const letter = String.fromCharCode(65 + letterIndex); 
    const tokenStr = `${letter}${String(number).padStart(3, "0")}`;
    const newToken = new Token({ tokenNumber: tokenStr, totalPrice });
    await newToken.save();
    res.status(201).json(newToken);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate server token sequence" });
  }
});

app.patch('/api/tokens/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedToken = await Token.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedToken);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order processing status" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server booting cleanly on port ${PORT}`));