import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import CarService from '../Services/CarService';

class CarMiddleware {
  public service;
  constructor() {
    this.service = new CarService();
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