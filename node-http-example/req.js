var http = require('http');
http.get('http://localhost:3000', (res) => {
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});