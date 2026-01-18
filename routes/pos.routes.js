const express = require('express');
const router = express.Router();

module.exports = function (broadcast) {
    
    // Actualizar detalle 
    router.post('/detail/update', (req, res) => {
        broadcast({
            type: 'detalle_actualizado',
            order_id: req.body.order_id || null
        });
        res.json({ ok: true });
    });

    // Actualizar orden completa
    router.post('/order/update', (req, res) => {
        broadcast({
            type: 'orden_actualizada',
            order_id: req.body.order_id || null
        });
        res.json({ ok: true });
    });

    return router;
};

