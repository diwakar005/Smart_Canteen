const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  identifier: { type: String, required: true, unique: true }, // Admission No or Teacher ID
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  // For delivery
  department: { type: String },
  building: { type: String },
  classroom: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
