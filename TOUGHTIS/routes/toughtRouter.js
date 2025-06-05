import express from 'express';
import ToughtController from '../controllers/ToughtController.js';

const router = express.Router();

router.get('/', ToughtController.showTought);


export default router;