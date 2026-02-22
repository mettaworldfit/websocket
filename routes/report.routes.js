const express = require('express');
const router = express.Router();

module.exports = function (broadcast) {

    router.post('/box/open', (req, res) => {
        broadcast({
            type: 'caja_abierta',
            list_id: req.body.list_id || null
        });
        res.json({ ok: true });
    });

    router.post('/box/close', (req, res) => {
        broadcast({
            type: 'caja_cerrada',
            list_id: req.body.list_id || null
        });
        res.json({ ok: true });
    });

    return router;
};