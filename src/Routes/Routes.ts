import { Router, Request, Response, NextFunction } from 'express';
import CarController from '../Controllers/CarController';
import CarMiddleware from '../Middlewares/CarMiddleware';

const router = Router();

// routes.get('/home', Arquivo Controller);
router.post('/cars', (req: Request, res: Response) => new CarController().create(req, res));
router.get('/cars', (req: Request, res: Response) => new CarController().getAll(req, res));
router.get(
  '/cars/:id',
  (req: Request, res: Response, next: NextFunction) => new CarMiddleware()
    .validateIdFormat(req, res, next),
  (req: Request, res: Response) => new CarController().getById(req, res),
);

export default router;