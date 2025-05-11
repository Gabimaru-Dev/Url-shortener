import express from 'express';
import path from 'path';
import { nanoid } from 'nanoid';
import fetch from 'node-fetch';

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle URL shortening
const links = {};

app.get('/shorten', (req, res) => {
  const { url } = req.query;
  const id = nanoid(6);
  const shortenedUrl = `https://${req.get('host')}/${id}`;
  links[id] = url;
  res.send({ shortenedUrl });
});

// Redirect shortened URLs
app.get('/:id', (req, res) => {
  const url = links[req.params.id];
  if (url) {
    res.redirect(url);
  } else {
    res.status(404).send('URL not found');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Self Uptime Pinger (ping the site every 5 minutes)
  const selfUrl = "https://your-app-name.onrender.com"; // replace with your actual Render app URL
  setInterval(async () => {
    try {
      await fetch(selfUrl);
      console.log('Self-pinged successfully!');
    } catch (err) {
      console.log('Error pinging:', err);
    }
  }, 5 * 60 * 1000); // Ping every 5 minutes
});