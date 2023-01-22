import { Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private service;
  constructor() {
    this.service = new MotorcycleService();
  }

  public async create(req: Request, res: Response) {
    const motorcycleInfo = req.body;
    const response = await this.service.create(motorcycleInfo);
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
    const updatedMotorcycle = req.body;
    const { type, message } = await this.service.updateById(id, updatedMotorcycle);
    res.status(type).json(message);
  }
}

export default MotorcycleController;