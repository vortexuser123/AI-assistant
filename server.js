const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();
app.use(express.static('public'));
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    const text = msg.toString();
    // simple mood switch by keywords
    let mood = 'neutral';
    if (/happy|great|awesome/i.test(text)) mood = 'happy';
    if (/sad|bad|tired/i.test(text)) mood = 'sad';
    ws.send(JSON.stringify({ reply:`You said: ${text}`, mood }));
  });
});

server.listen(8088, ()=>console.log('Animated assistant: http://localhost:8088'));
