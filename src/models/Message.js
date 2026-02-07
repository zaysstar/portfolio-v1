import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// This checks if the model exists before defining it (prevents errors in Next.js)
export default mongoose.models.Message || mongoose.model('Message', MessageSchema);