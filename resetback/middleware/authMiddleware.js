//middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Acesso negado' });

    try {
        const verified = jwt.verify(token, 'yan');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
}

module.exports = authenticateToken;