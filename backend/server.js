const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Contact = require('./models/Contact');
require('dotenv').config(); 

const Token = require('./models/Token'); 

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const dbURI = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : undefined;
mongoose.connect(dbURI)
  .then(() => console.log('✅ Database connection established successfully!'))
  .catch((error) => console.log('⚠️ Running backend on local testing fallback pipeline.', error));

// Configure Multer Disk Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files into /uploads folder
  },
  filename: (req, file, cb) => {
    // Makes unique names so files don't overwrite: 1698765432-123456789.pdf
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

// File Type Filter: Allow PDF, DOC, PPT + Images for payment screenshots
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file format. Only PDF, DOC, PPT, PNG, JPG allowed!'), false); // Reject
  }
};

// Create the upload middleware
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max ← FIXED
});

app.use('/uploads', express.static('uploads'));

// ==========================================
// 🎯 DATA ROUTE ENDPOINTS
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

// 🚀 ROUTE 3: Generate token with file upload + proper error handling
app.post('/api/tokens/generate', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { totalPrice } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Please upload a document." });
    }

    const totalRecords = await Token.countDocuments({});
    const count = totalRecords + 1;
    const letterIndex = Math.floor((count - 1) / 999);
    const number = ((count - 1) % 999) + 1;
    const letter = String.fromCharCode(65 + letterIndex); 
    const tokenStr = `${letter}${String(number).padStart(3, "0")}`;

    const newToken = new Token({
      tokenNumber: tokenStr,
      totalPrice: Number(totalPrice), // ← FIXED: Convert to Number
      documentPath: `/uploads/${req.file.filename}`,
      originalFileName: req.file.originalname
    });
    
    await newToken.save();
    res.status(201).json(newToken);
    
  } catch (error) {
    console.error("Token generation failure:", error);
    res.status(500).json({ error: "Failed to process upload." });
  }
});

// ==========================================================
// 📩 DEDICATED ROUTE FOR ADMIN DASHBOARD MESSAGE LOADS
// ==========================================================
app.get('/api/contact/all', async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Backend message retrieval error:", error);
    res.status(500).json({ error: "Failed to retrieve contact log archives." });
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