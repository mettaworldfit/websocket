require('dotenv').config();

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const authToken = require('./middlewares/authToken');

const app = express();
app.use(cors());
app.use(express.json());

/* ===============================
   SERVER + Websocket
================================ */
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('🟢 Websocket conectado');

    ws.on('close', () => {
        console.log('🔴 Websocket desconectado');
    });
});

/* ===============================
   BROADCAST
================================ */
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

/* ===============================
   ROUTES
================================ */
const posRoutes = require('./routes/pos.routes')(broadcast);
const reportRoutes = require('./routes/report.routes')(broadcast);
const homeRoutes = require('./routes/home.routes')(broadcast);
 

app.use('/api', authToken, posRoutes); // Punto de venta
app.use('/api', authToken, reportRoutes); // Reportes
app.use('/api', authToken, homeRoutes); // Inicio

/* ===============================
   HEALTH
================================ */
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
}); 

/* ===============================
   START
================================ */
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`✅ Websocket activo en ${PORT}`);
});
