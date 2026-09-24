require('dotenv').config();
const mongoose = require('mongoose');
const Competition = require('./models/Competition');
const Registration = require('./models/Registration');

const H = 3600 * 1000, D = 24 * H;
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Competition.deleteMany({});
  await Registration.deleteMany({});
  const now = Date.now();
  const c = await Competition.create({
    title: 'Feedants Classical Dance', category: 'Dance', tags: ['Dance', 'Multi-Win'],
    prizePool: 1500, entryFee: 99, maxSpots: 20, registeredCount: 1,
    judge: { name: 'Manju Dubey', title: 'Professional Kathak Dancer', experience: '12+ Years of Experience' },
    registrationDeadline: new Date(now + 30 * H),
    submissionStart: new Date(now - D),
    submissionEnd: new Date(now + 20 * D),
    resultDate: new Date(now + 22 * D),
    about: 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent.',
    judgingParameters: ['Technique', 'Expression', 'Rhythm', 'Creativity'],
    rules: ['Video must be original', 'Max 3 minutes', 'One entry per participant'],
    rewards: [
      { position: 1, label: '1st Winner', amount: 550 }, { position: 2, label: '2nd Winner', amount: 300 },
      { position: 3, label: '3rd Winner', amount: 240 }, { position: 4, label: '4th Winner', amount: 200 },
      { position: 5, label: '5th Winner', amount: 130 }, { position: 6, label: '6th Winner', amount: 80 },
    ],
    previousWinners: [
      { name: 'Riya Shah', position: '1st Winner' }, { name: 'Aarav Mehta', position: '1st Winner' },
      { name: 'Neha Verma', position: '2nd Winner' }, { name: 'Ishika C', position: '3rd Winner' },
    ],
  });
  await Registration.create({ competitionId: c._id, userId: 'user1' });
  console.log('Seeded. Competition ID:', c._id.toString());
  process.exit();
})();