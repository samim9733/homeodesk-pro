const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = '/home/z/my-project/homeodesk-pro/dist';
const mime = { '.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.json':'application/json' };

const server = http.createServer((req, res) => {
  let fp = path.join(dir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  const ext = path.extname(fp);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
});

server.on('error', e => { console.error('Error:', e.message); });
server.listen(3000, '0.0.0.0', () => console.log('OK'));
