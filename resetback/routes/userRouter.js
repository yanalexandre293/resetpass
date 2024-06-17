//routes/userRouter.js

var express = require('express');
var router = express.Router();

router.use(express.json());

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const mailController = require("../controllers/mailController");
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create', async (req, res) => userController.createUser(req, res));
router.get('/getAll', authenticateToken, async (req, res) => userController.getAllUsers(req, res));
router.put('/update', authenticateToken, async (req, res) => userController.updateUser(req, res));
router.post('/login', async (req, res) => authController.login(req, res))
router.post('/resetpass', authenticateToken, async(req, res) => mailController.sendResetMail(req, res));
router.get('/status', authenticateToken, async (req, res) => res.json({ message: 'API is up and running' }));

// Descomente e ajuste conforme necessário
// router.get('/get/:login', async (req, res) => userController.getUserByLogin(req, res));
// router.delete('/delete', async (req, res) => userController.deleteUser(req, res));

module.exports = router;
