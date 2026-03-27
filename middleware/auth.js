const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    let token;

    const authHeader = req.header('Authorization');
    if (authHeader) {
        token = authHeader.replace('Bearer ', '');
    } else {
        token = req.header('x-auth-token');
    }

    if (!token) {
        return res.status(401).json({ msg: 'No Token, Authorization Denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId: ... }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};