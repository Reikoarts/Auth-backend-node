const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/logout', authController.logout);
router.get('/checkauth', authController.checkAuth);

module.exports = router;