const router = require('express').Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/checkauth', verifyToken, authController.checkAuth);

module.exports = router;