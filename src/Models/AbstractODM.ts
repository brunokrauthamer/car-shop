// import IVehicle from '../Interfaces/IVehicle';
import { Model, models } from 'mongoose';
// import IVehicle from '../Interfaces/IVehicle';

interface IMongo<D> {
  _doc: D
}

class AbstractODM<T> {
  protected model: Model<IMongo<T>>;

  constructor() {
    this.model = models.Bypass;
  }

  public async create(vehicle: T): Promise<IMongo<T>> {
    return this.model.create({ ...vehicle });
  }

  public async getAll(): Promise<IMongo<T>[]> {
    return this.model.find({});
  }

  public async getById(id: string): Promise<IMongo<T> | null> {
    return this.model.findOne({ _id: id });
  }

  public updateById(id: string, updatedVehicle: T) {
    const filter = { _id: id };
    const update = updatedVehicle;
    return this.model.findOneAndUpdate(filter, update, { new: true });
  }
}

export default AbstractODM;