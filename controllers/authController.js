const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //verification si l'utilisateur existe
        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: "User already exists" });

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //creation d'un nouvel utilisateur
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        //enregistrement de l'utilisateur
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //verification si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist" });

        //verification du mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid password" });

        //creation du token
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.TOKEN_SECRET,
            { expiresIn: '1h' }
        )

        res.header('auth-token', token).json({ token })
    } catch (error) {
        res.status(500).json({ message: error });
    }
}