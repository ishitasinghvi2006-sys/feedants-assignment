const mongoose = require('mongoose');
const r = new mongoose.Schema({
  competitionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition', index: true },
  userId: String,
  status: { type: String, default: 'registered' }, // registered | submitted
  submissionUrl: String,
}, { timestamps: true });
r.index({ competitionId: 1, userId: 1 }, { unique: true }); // prevents double registration
module.exports = mongoose.model('Registration', r);