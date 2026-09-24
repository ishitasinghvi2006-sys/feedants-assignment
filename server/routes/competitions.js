const router = require('express').Router();
const Competition = require('../models/Competition');
const Registration = require('../models/Registration');
const { getPhase } = require('../utils/phase');

function ctaFor(c, reg, p) {
  const full = c.registeredCount >= c.maxSpots;
  if (!reg) {
    if (!p.registrationOpen) return 'REGISTRATION_CLOSED';
    if (full) return 'SOLD_OUT';
    return 'REGISTER';
  }
  if (p.phase === 'RESULT_DECLARED') return 'VIEW_RESULTS';
  if (p.phase === 'JUDGING') return 'UNDER_REVIEW';
  if (p.submissionOpen) return reg.status === 'submitted' ? 'SUBMITTED' : 'UPLOAD_SUBMISSION';
  return 'WAIT_FOR_SUBMISSION';
}
router.get('/latest/one', async (req, res) => {
  const c = await Competition.findOne().sort({ createdAt: -1 }).lean();
  if (!c) return res.status(404).json({ error: 'Seed first' });
  res.json({ id: c._id });
});
// GET details
router.get('/:id', async (req, res) => {
  try {
    const c = await Competition.findById(req.params.id).lean();
    if (!c) return res.status(404).json({ error: 'Not found' });
    const reg = req.query.userId
      ? await Registration.findOne({ competitionId: c._id, userId: req.query.userId }).lean()
      : null;
    const now = new Date();
    const p = getPhase(c, now);
    res.json({
      ...c,
      spotsLeft: Math.max(c.maxSpots - c.registeredCount, 0),
      phase: p.phase,
      isRegistered: !!reg,
      registrationStatus: reg?.status || null,
      ctaState: ctaFor(c, reg, p),
      serverTime: now.toISOString(),
    });
  } catch (e) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// POST register (atomic)
router.post('/:id/register', async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  const comp = await Competition.findOneAndUpdate(
    { _id: req.params.id, registrationDeadline: { $gte: new Date() },
      $expr: { $lt: ['$registeredCount', '$maxSpots'] } },
    { $inc: { registeredCount: 1 } }, { new: true });
  if (!comp) return res.status(409).json({ error: 'Full or registration closed' });
  try {
    await Registration.create({ competitionId: comp._id, userId });
    res.json({ success: true, spotsLeft: comp.maxSpots - comp.registeredCount });
  } catch (e) {
    await Competition.updateOne({ _id: comp._id }, { $inc: { registeredCount: -1 } });
    res.status(e.code === 11000 ? 409 : 500)
      .json({ error: e.code === 11000 ? 'Already registered' : 'Failed' });
  }
});

// POST submit
router.post('/:id/submit', async (req, res) => {
  const { userId, submissionUrl } = req.body;
  const c = await Competition.findById(req.params.id).lean();
  if (!c) return res.status(404).json({ error: 'Not found' });
  if (!getPhase(c).submissionOpen) return res.status(409).json({ error: 'Submissions not open' });
  const reg = await Registration.findOneAndUpdate(
    { competitionId: c._id, userId },
    { status: 'submitted', submissionUrl }, { new: true });
  if (!reg) return res.status(403).json({ error: 'Not registered' });
  res.json({ success: true });
});

module.exports = router;