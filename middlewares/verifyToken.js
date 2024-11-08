const jwt = require('jsonwebtoken');
const User = require('../models/user');
// Middleware verifyToken
module.exports = async function (req, res, next) {

    /*JWT*/

    // const token = req.header('Authorization')?.replace('Bearer ', '');
    // if (!token) return res.status(401).json({ message: 'Access denied' });

    // try {
    //     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    //     req.user = verified;
    //     next();
    // } catch (error) {
    //     res.status(400).json({ message: 'Invalid token' });
    // }

    /*SESSION*/
    // middleware/authMiddleware.js

    if (!req.session.user) {
        return res.status(401).json({ message: 'Non autorisé' });
    }

    next();
};
