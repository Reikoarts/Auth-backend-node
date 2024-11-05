const User = require('../models/user');

// Obtenir les informations de l'utilisateur
exports.getUsers = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

