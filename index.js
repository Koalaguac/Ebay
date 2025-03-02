const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint for eBay verification
app.get('/api/ebay-notification', (req, res) => {
  const challengeCode = req.query.challenge_code;
  if (challengeCode) {
    res.status(200).send(challengeCode);
  } else {
    res.status(400).send('Challenge code missing');
  }
});

// Endpoint to handle account deletion/closure notifications
app.post('/api/ebay-notification', (req, res) => {
  const notification = req.body;
  // Process the notification as needed
  console.log('Received notification:', notification);
  res.status(200).send('Notification received');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
