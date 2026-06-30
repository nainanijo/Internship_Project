const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Razorpay = require('razorpay');
require('dotenv').config();

const Token = require('./models/Token');
const Contact = require('./models/Contact'); 
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// ================================
// Razorpay
// ================================
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ================================
// Upload Folder
// ================================
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ================================
// MongoDB
// ================================
const dbURI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI.trim()
  : undefined;

mongoose
  .connect(dbURI)
  .then(() =>
    console.log('✅ Database connection established successfully!')
  )
  .catch((error) =>
    console.log(
      '⚠️ Running backend on local testing fallback pipeline.',
      error
    )
  );

// ================================
// Multer Storage
// ================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// ================================
// Allowed File Types
// ================================
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [
    '.pdf',
    '.doc',
    '.docx',
    '.ppt',
    '.pptx',
    '.jpg',
    '.jpeg',
    '.png',
  ];

  const ext = path
    .extname(file.originalname)
    .toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file format. Only PDF, DOC, PPT and Images allowed!'
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

app.use('/uploads', express.static('uploads'));

// ================================
// STATUS
// ================================
app.get('/api/status', (req, res) => {
  res.json({
    message: 'Hello from CampusPrint Backend Server!',
  });
});

// ================================
// GET ALL TOKENS
// ================================
app.get('/api/tokens/all', async (req, res) => {
  try {
    const allTokens = await Token.find({})
      .sort({ createdAt: -1 });

    res.json(allTokens);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch admin dashboard records',
    });
  }
});

// ================================
// GET SINGLE TOKEN
// ================================
app.get('/api/tokens/:number', async (req, res) => {
  try {
    const foundToken = await Token.findOne({
      tokenNumber: req.params.number,
    });

    if (!foundToken) {
      return res.status(404).json({
        message: 'Token reference entry not found.',
      });
    }

    res.json(foundToken);
  } catch (error) {
    res.status(500).json({
      error: 'Server lookup operation failed.',
    });
  }
});

// ================================
// CREATE RAZORPAY ORDER
// ================================
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Number(amount) * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Razorpay Error:', error);

    res.status(500).json({
      success: false,
      message: 'Unable to create payment order',
    });
  }
});
// ================================
// GENERATE TOKEN + UPLOAD FILES
// ================================
app.post('/api/tokens/generate', upload.array('file'), async (req, res) => {
  try {
    const { totalPrice } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: "Please upload at least one document."
      });
    }

    // Generate Token
    const totalRecords = await Token.countDocuments({});
    const count = totalRecords + 1;

    const letterIndex = Math.floor((count - 1) / 999);
    const number = ((count - 1) % 999) + 1;

    const letter = String.fromCharCode(65 + letterIndex);
    const tokenStr = `${letter}${String(number).padStart(3, "0")}`;

    // Store file paths
    const documentPaths = req.files.map(file => `/uploads/${file.filename}`);
    const originalFileNames = req.files.map(file => file.originalname);

    const newToken = new Token({
      tokenNumber: tokenStr,
      totalPrice,
      documentPath: documentPaths,
      originalFileName: originalFileNames
    });

    await newToken.save();

    res.status(201).json(newToken);

  } catch (error) {
    console.error("Token generation failure:", error);

    res.status(500).json({
      error: "Failed to process upload."
    });
  }
});

// ================================
// UPDATE ORDER STATUS
// ================================
app.patch('/api/tokens/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const updatedToken = await Token.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedToken);

  } catch (error) {
    res.status(500).json({
      error: "Failed to update order processing status"
    });
  }
});

// ================================
// CONTACT FORM
// ================================
//  Public endpoint for visitors to submit the contact form
app.post('/api/contact/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All form fields are strictly required." });
    }
    
    const newContactMessage = new Contact({ name, email, message });
    await newContactMessage.save();
    
    res.status(201).json({ message: "Inquiry submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save message inquiry payload to server." });
  }
});

// Admin endpoint to fetch all messages (Put this safe from token clash routes)
app.get('/api/contact/all', async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve contact log archives." });
  }
});

// ================================
// START SERVER
// ================================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server booting cleanly on port ${PORT}`);
});