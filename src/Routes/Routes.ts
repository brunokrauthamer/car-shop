import { Router, Request, Response, NextFunction } from 'express';
import CarController from '../Controllers/CarController';
import VehicleMiddleware from '../Middlewares/VehicleMiddleware';
import MotorcycleController from '../Controllers/MotorcycleController';

const router = Router();

// routes.get('/home', Arquivo Controller);
router.post('/cars', (req: Request, res: Response) => new CarController().create(req, res));

router.get('/cars', (req: Request, res: Response) => new CarController().getAll(req, res));

router.get(
  '/cars/:id',
  (req: Request, res: Response, next: NextFunction) => new VehicleMiddleware()
    .validateIdFormat(req, res, next),
  (req: Request, res: Response) => new CarController().getById(req, res),
);

router.put(
  '/cars/:id',
  (req: Request, res: Response, next: NextFunction) => new VehicleMiddleware()
    .validateIdFormat(req, res, next),
  (req: Request, res: Response) => new CarController().updateById(req, res),
);

router.post(
  '/motorcycles',
  (req: Request, res: Response) => new MotorcycleController().create(req, res),
);

router.get(
  '/motorcycles',
  (req: Request, res: Response) => new MotorcycleController().getAll(req, res),
);

router.get(
  '/motorcycles/:id',
  (req: Request, res: Response, next: NextFunction) => new VehicleMiddleware()
    .validateIdFormat(req, res, next),
  (req: Request, res: Response) => new MotorcycleController().getById(req, res),
);

router.put(
  '/motorcycles/:id',
  (req: Request, res: Response, next: NextFunction) => new VehicleMiddleware()
    .validateIdFormat(req, res, next),
  (req: Request, res: Response) => new MotorcycleController().updateById(req, res),
);

export default router;