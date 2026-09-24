const mongoose = require('mongoose');
const s = new mongoose.Schema({
  title: String, category: String, tags: [String],
  prizePool: Number, entryFee: Number, maxSpots: Number,
  registeredCount: { type: Number, default: 0 },
  judge: { name: String, title: String, experience: String, photo: String, introVideo: String },
  registrationDeadline: Date, submissionStart: Date,
  submissionEnd: Date, resultDate: Date,
  about: String, judgingParameters: [String], rules: [String],
  rewards: [{ position: Number, label: String, amount: Number }],
  previousWinners: [{ name: String, position: String, photo: String, video: String }],
  referralReward: { type: Number, default: 10 },
}, { timestamps: true });
module.exports = mongoose.model('Competition', s);