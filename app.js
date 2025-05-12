const express = require('express');
const path = require('path');
const TinyURL = require('tinyurl');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const SELF_URL = "https://url-shortener-1-t0f0.onrender.com"; // Replace with actual Render URL

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/shorten', async (req, res) => {
  const longUrl = req.body.url;

  try {
    const shortUrl = await TinyURL.shorten(longUrl);
    res.json({ shortUrl }); // <-- Send JSON, not HTML
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Self-pinger to prevent sleep on Render
setInterval(() => {
  fetch(SELF_URL)
    .then(() => console.log("Pinged self to stay awake"))
    .catch(err => console.error("Ping failed:", err));
}, 1000 * 60 * 5); // every 5 mins