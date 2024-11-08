require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const app = express();

// //middleware
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        secure: false
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}))

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