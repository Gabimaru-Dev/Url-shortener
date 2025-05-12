document.getElementById('shorten-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const url = document.getElementById('url-input').value;
  const resultBox = document.getElementById('result');

  try {
    const response = await fetch('/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `url=${encodeURIComponent(url)}`
    });

    const data = await response.json();

    if (data.shortUrl) {
      resultBox.innerHTML = `
        <p style="font-family: sans-serif;">
          Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>
        </p>`;
    } else if (data.error) {
      resultBox.innerHTML = `<p style="color: red;">${data.error}</p>`;
    }
  } catch (err) {
    resultBox.innerHTML = `<p style="color: red;">An error occurred: ${err.message}</p>`;
  }
}); 