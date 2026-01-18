module.exports = function authToken(req, res, next) {
    const token = req.headers['x-api-token'];

    if (!token || token !== process.env.API_TOKEN) {
        return res.status(401).json({
            error: 'Token inválido'
        });
    }

    next();
}
