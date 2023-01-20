import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import CarService from '../Services/CarService';

class CarMiddleware {
  public service;
  constructor() {
    this.service = new CarService();
  }
  public async verifyId(req: Request, res: Response, next: NextFunction) {
    const carList = await this.service.getAll();
    const { id } = req.params;
    const existingId: boolean = carList.some((car) => car.id === id);
    if (!existingId) {
      return res.status(404).json({ message: 'Car not found' });
    } next();
  }

  public validateIdFormat(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { ObjectId } = mongoose.Types;
    const validId = ObjectId.isValid(id);
    if (!validId) {
      return res.status(422).json({ message: 'Invalid mongo id' });
    } next();
  }
}

export default CarMiddleware;