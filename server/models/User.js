import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
