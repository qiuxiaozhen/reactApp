const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use('/', express.static(path.resolve(__dirname, '../dist')));

const indexHtml = fs.readFileSync(path.resolve(__dirname, `../dist/index.html`));

http.createServer(app).listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

app.use('*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.send(indexHtml.toString());
  res.end();
});
