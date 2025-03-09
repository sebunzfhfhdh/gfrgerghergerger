// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('A new client connected');
    
    // Send a welcome message to the client
    ws.send('Welcome to the WebSocket server!');

    // Handle incoming messages from clients
    ws.on('message', (message) => {
        console.log('Received:', message);
        // Echo the message back to the client
        ws.send(`Echo: ${message}`);
    });

    // Handle client disconnect
    ws.on('close', () => {
        console.log('A client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');
