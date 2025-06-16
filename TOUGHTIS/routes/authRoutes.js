import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.get('/login', AuthController.login);
router.get('/register', AuthController.register);
router.post('/register', AuthController.registerUserPost);// POST que cadastra mesmo
router.post('/check-email', AuthController.checkEmailExists);// POST que só checa email

export default router;
