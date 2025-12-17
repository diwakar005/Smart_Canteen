const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  identifier: { type: String, required: true, unique: true }, // Admission No or Teacher ID
  email: { type: String, unique: true, sparse: true }, // Sparse to allow nulls for existing/other users
  password: { type: String }, // Required for students
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  // For delivery
  department: { type: String },
  building: { type: String },
  classroom: { type: String },
  canteen: { type: String }, // For admins
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
