const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    category: {
      type: String,
      enum: ['Bug Report', 'Feature Request', 'General Feedback', 'Complaint', 'Compliment'],
      default: 'General Feedback',
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', FeedbackSchema);