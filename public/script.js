document.getElementById('shorten-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const urlInput = document.getElementById('url-input').value;
  const shortenedUrlContainer = document.getElementById('shortened-url-container');
  const shortenedUrlElement = document.getElementById('shortened-url');

  if (urlInput) {
    fetch(`/shorten?url=${encodeURIComponent(urlInput)}`)
      .then(response => response.json())
      .then(data => {
        if (data.shortenedUrl) {
          shortenedUrlContainer.style.display = 'block';
          shortenedUrlElement.textContent = data.shortenedUrl;
        } else {
          alert('There was an error shortening the URL.');
        }
      })
      .catch(error => {
        alert('Something went wrong: ' + error);
      });
  }
}); 