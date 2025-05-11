// Dependencies
const express = require('express');
const fetch = require('node-fetch');
const { nanoid } = require('nanoid');
const tinyurl = require('tinyurl'); // TinyURL dependency

const app = express();
const port = 3000;

// Self pinging every 5 minutes
const selfUrl = ["https://your-app.onrender.com"];  // Replace with your actual URL

function uptimePing() {
  selfUrl.forEach(url => {
    fetch(url)
      .then(response => console.log(`Pinging: ${url}, Status: ${response.status}`))
      .catch(err => console.error('Ping failed:', err));
  });
}

// Ping the site every 5 minutes
setInterval(uptimePing, 5 * 60 * 1000);

// Shorten a URL using TinyURL
app.get('/shorten', (req, res) => {
  const urlToShorten = req.query.url;
  
  if (!urlToShorten) {
    return res.status(400).json({ error: 'URL is required' });
  }

  tinyurl.shorten(urlToShorten, function(shortenedUrl) {
    res.json({
      originalUrl: urlToShorten,
      shortenedUrl: shortenedUrl
    });
  });
});

// Serve static HTML files (if needed for front-end)
app.use(express.static('public'));

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});