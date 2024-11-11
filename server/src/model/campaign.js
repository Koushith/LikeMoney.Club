import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    bannerImage: {
      type: String,
      default: 'https://framerusercontent.com/images/zoCYa3hQ3F2G4JtvWzpYa4yBNdA.png?scale-down-to=2048',
    },
    taggedBusiness: {
      type: [String], //TODO: check this later
    },
    minViews: {
      type: Number,
    },
    budget: {
      type: Number,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
      },
    ],
    // ... other campaign-related fields ...
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
