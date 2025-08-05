import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  clickCount: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 👈 Add this line
});

export default mongoose.model("Url", urlSchema);
