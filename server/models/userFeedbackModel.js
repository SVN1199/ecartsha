const mongoose = require('mongoose');

const userFeedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true, 
      trim: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const UserFeedback = mongoose.model('UserFeedback', userFeedbackSchema);
module.exports = UserFeedback;