const express = require('express');
const router = express.Router();

module.exports = function (broadcast) {

    router.post('/new/purchase', (req, res) => {
        broadcast({
            type: 'nueva_venta',
            list_id: req.body.list_id || null
        });
        res.json({ ok: true });
    });

    return router;
};
