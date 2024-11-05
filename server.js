require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// //middleware
app.use(express.json());
app.use(cors());

// //routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

// //utilisation des routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

//connexion mongo
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

//démarer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
