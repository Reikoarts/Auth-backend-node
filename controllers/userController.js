const User = require('../models/user');

// Obtenir les informations de l'utilisateur
exports.getUsers = async (req, res) => {

    // try {
    //     const user = await User.findById(req.user._id).select('-password');
    //     if (!user) {
    //         return res.status(404).json({ message: 'Utilisateur non trouvé' });
    //     }
    //     res.json(user);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: error.message });
    // }

    try {
        // Vérifier si la session utilisateur existe
        if (!req.session.user) {
            return res.status(401).json({ message: 'Vous devez être connecté pour accéder à cette ressource.' });
        }

        // Récupérer les informations de l'utilisateur en utilisant l'ID de la session
        const user = await User.findById(req.session.user._id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

