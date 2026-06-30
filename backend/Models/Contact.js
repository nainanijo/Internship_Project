const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    default: 'Unread' // Allows the admin dashboard to track open/closed items
  }
}, { 
  timestamps: true // Automatically injects 'createdAt' and 'updatedAt' fields!
});

module.exports = mongoose.model('Contact', contactSchema);