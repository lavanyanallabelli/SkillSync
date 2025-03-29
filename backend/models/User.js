// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  profilePicture: {
    type: String,
    default: '/default-profile.jpg',
  },
  
  bio: String,
  skills: [String],
  education: [
    {
      degree: String,
      institution: String,
      year: String,
    },
  ],
  experience: [
    {
      title: String,
      company: String,
      years: String,
    },
  ],
  reviews: [
    {
      reviewer: String,
      content: String,
      rating: Number,
    },
  ],
  teachingSkills: [
    {
      type: String,
    },
  ],
  learningSkills: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model('User', userSchema);
module.exports = User;

