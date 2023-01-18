import { Router } from 'express';
import CarController from '../Controllers/CarController';

const router = Router();

// routes.get('/home', Arquivo Controller);
router.post('/cars', (req, res) => new CarController().create(req, res));

export default router;