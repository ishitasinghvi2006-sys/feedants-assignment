// server/utils/phase.js
function getPhase(c, now = new Date()) {
  const registrationOpen = now <= c.registrationDeadline;
  const submissionOpen = now >= c.submissionStart && now <= c.submissionEnd;
  let phase;
  if (now > c.resultDate) phase = 'RESULT_DECLARED';
  else if (now > c.submissionEnd) phase = 'JUDGING';
  else if (submissionOpen) phase = 'SUBMISSION_OPEN';
  else if (registrationOpen) phase = 'REGISTRATION_OPEN';
  else phase = 'REGISTRATION_CLOSED';
  return { phase, registrationOpen, submissionOpen };
}
module.exports = { getPhase };