const express = require('express');
const tinyurl = require('tinyurl');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS)
app.use(express.static('public'));

// Route to handle URL shortening
app.post('/shorten', (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send('No URL provided.');
    }

    // Create a shortened URL using TinyURL API
    tinyurl.shorten(url, (shortenedUrl) => {
        if (shortenedUrl) {
            return res.json({ shortUrl: shortenedUrl });
        } else {
            return res.status(500).send('Error shortening URL');
        }
    });
});

// Self-ping to keep the app alive on Render (or any cloud service)
setInterval(() => {
    const selfUrl = 'https://your-app.onrender.com';  // Replace with your actual URL
    fetch(selfUrl)
        .then(res => res.text())
        .then(body => console.log('Ping successful:', body))
        .catch(err => console.error('Error pinging:', err));
}, 5 * 60 * 1000); // Ping every 5 minutes

// Route to handle redirection from shortened URLs
app.get('/:shortenedUrl', (req, res) => {
    const { shortenedUrl } = req.params;

    // Here, you would lookup the shortened URL in your database or memory store
    // For simplicity, we’ll just redirect to the TinyURL service
    res.redirect(`https://tinyurl.com/${shortenedUrl}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});