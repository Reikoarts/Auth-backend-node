const router = require('express').Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/me', verifyToken, userController.getUsers);

module.exports = router;