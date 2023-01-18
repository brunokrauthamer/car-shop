import { Request, Response } from 'express';
import CarService from '../Services/CarService';

class CarController {
  private service;
  constructor() {
    this.service = new CarService();
  }
  public async create(req: Request, res: Response) {
    const carInfo = req.body;
    const response = await this.service.create(carInfo);
    res.status(201).json(response);
  }
}

export default CarController;