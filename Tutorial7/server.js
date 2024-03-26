// Import Node.js HTTP module for creating an HTTP server
const http = require('http');

// Import Express app present in the app.js 
const app = require('./app');

// Default port numebr 3000 
const port = 3000;

// Create=ing a HTTP server using Express
const server = http.createServer(app);

// Start server listening on above port number
server.listen(port);

