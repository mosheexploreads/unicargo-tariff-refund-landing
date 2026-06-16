const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Route mapping
  const routes = {
    '/': '/index.html',
    '/apply': '/apply.html',
    '/privacy': '/privacy.html',
    '/terms': '/terms.html',
    '/ace-guide': '/ace-guide.html'
  };
  const urlPath = req.url.split('?')[0]; // strip query string
  let filePath = routes[urlPath] || req.url;

  // Security: prevent directory traversal
  filePath = path.normalize(filePath);
  if (filePath.startsWith('..')) {
    filePath = '/index.html';
  }

  filePath = path.join(__dirname, filePath);

  // Get file extension
  const ext = path.extname(filePath).toLowerCase();

  // Set content type
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };

  const contentType = contentTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Serve index.html as fallback (for SPA-like behavior)
      fs.readFile(path.join(__dirname, 'index.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 - File Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data2);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
