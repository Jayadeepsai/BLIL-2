const http = require('http');
const app = require('c:/Users/jayad/Desktop/BLIL/app/app.js')
// Create an instance of the http server to handle HTTP requests
const port = 5000;

const server = http.createServer(app);
// Start the server on port 8000
server.listen(port);

console.log('Node server running on port',port);
