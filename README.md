# Feedants: Competition Details (Full-Stack)

React Native (Expo) + Node/Express + MongoDB.

## Run
**Server**
```
cd server
npm install
# create .env: MONGO_URI=mongodb://127.0.0.1:27017/feedants  PORT=5000
node seed.js
node index.js
```
**App**
```
cd app
npm install
npx expo start   # press w for web
```
Set `API_URL` and `USER_ID` in `app/src/config.js` (use `user2` for a fresh user, `user1` for a registered one).

## Assumptions
- Auth is mocked with a `userId`; Razorpay payment is mocked.
- Submission uses a placeholder URL instead of a real file upload.
- Seed dates are relative to the current time so the countdown is always live.

## Technical decisions
- **No overselling:** registration uses an atomic `findOneAndUpdate` with a conditional filter (spots left and registration open) plus `$inc`.
- **No double registration:** unique compound index on `(competitionId, userId)`, with a rollback of the counter on failure.
- **Phase is derived, not stored:** computed from server time (registration open, submission open, judging, result), so it is never stale.
- **CTA state comes from the backend:** the app only renders it, so the rules live in one place.
- **Countdown:** offset against `serverTime`, so changing the device clock does not affect it.
- **Components:** each section of the screen is a separate reusable component. ENG/हिंदी toggle via an i18n map.

## Trade-offs
- The counter lives on the competition document. It is fast and simple, but it needs the rollback logic.

## Production improvements
- JWT auth, Razorpay order and webhook confirmation, and real video upload to S3.
- Redis caching for the read-heavy details endpoint, and rate limiting.
- MongoDB transactions (replica set) for registration and payment.
- Tests, logging and monitoring, and pagination for the winners list.