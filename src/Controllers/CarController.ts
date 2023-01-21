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

  public async getAll(_req: Request, res: Response) {
    const response = await this.service.getAll();
    res.status(200).json(response);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await this.service.getById(id);
    res.status(type).json(message);
  }

  public async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const updatedCar = req.body;
    const { type, message } = await this.service.updateById(id, updatedCar);
    res.status(type).json(message);
  }
}

export default CarController;