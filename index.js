const express = require('express');
const crypto = require('crypto');
const app = express();
const port = process.env.PORT || 3000;

// IMPORTANT: Replace the following values with your actual verification token and endpoint.
// These must match what you register in your eBay Developer Portal.
const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN || 'your_verification_token_here';
const ENDPOINT_URL = process.env.ENDPOINT_URL || 'https://your-vercel-project.vercel.app/api/ebay-notification';

app.use(express.json());

// GET endpoint: Used by eBay for verification
app.get('/api/ebay-notification', (req, res) => {
  const challengeCode = req.query.challenge_code;
  if (challengeCode) {
    // Create a SHA-256 hash of: challengeCode + verificationToken + endpoint
    const hash = crypto.createHash('sha256');
    hash.update(challengeCode);
    hash.update(VERIFICATION_TOKEN);
    hash.update(ENDPOINT_URL);
    const responseHash = hash.digest('hex');

    // Respond with JSON containing the challengeResponse field
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ challengeResponse: responseHash });
  } else {
    res.status(400).json({ error: 'challenge_code query parameter missing' });
  }
});

// POST endpoint: Used by eBay to send account deletion/closure notifications
app.post('/api/ebay-notification', (req, res) => {
  const notification = req.body;
  // Here you would add logic to process the notification (e.g., delete or anonymize data)
  console.log('Received notification:', notification);
  res.status(200).send('Notification received');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
