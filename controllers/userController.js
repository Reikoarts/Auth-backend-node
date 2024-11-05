const User = require('../models/user');

//obtenir les info
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findByIsd(req.user.id).select('-password')
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error });
    }
}