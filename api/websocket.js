// api/websocket.js
import WebSocket from 'ws';

const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('message', (message) => {
        console.log('Received: ' + message);
        socket.send(`Echo: ${message}`);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

export default async function handler(req, res) {
    // Handling WebSocket connection upgrade request
    if (req.method === 'GET' && req.headers.upgrade === 'websocket') {
        res.socket.server.on('upgrade', (request, socket, head) => {
            wsServer.handleUpgrade(request, socket, head, (ws) => {
                wsServer.emit('connection', ws, request);
            });
        });
    }

    // Respond with HTTP status
    res.status(200).send('WebSocket server is ready.');
}
