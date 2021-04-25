const http = require('http');

// Create server
const server = http.createServer((req, res) => {
    res.end('This is my first res');
});

// Listen to the server var
server.listen(process.env.PORT || 3000);