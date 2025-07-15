import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  userId: String,
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

export default mongoose.model('Todo', todoSchema);
