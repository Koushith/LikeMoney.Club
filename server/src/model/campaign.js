import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission'
  }],
  // ... other campaign-related fields ...
}, {
  timestamps: true
});

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
