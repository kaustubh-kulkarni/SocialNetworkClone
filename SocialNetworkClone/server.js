const http = require('http');
const app = require('./Backend/app');
const port = process.env.PORT || 3000;

app.set('port', port);

// Create server
const server = http.createServer(app);

// Listen to the server var
server.listen(port);