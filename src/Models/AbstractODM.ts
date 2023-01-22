// import IVehicle from '../Interfaces/IVehicle';
// import { Model } from 'mongoose';
// import IVehicle from '../Interfaces/IVehicle';

class AbstractODM {
  protected model: any;

  public async create<T>(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async getAll<T>(): Promise<T[]> {
    return this.model.find({});
  }

  public getById<T>(id: string): Promise<T> {
    return this.model.findOne({ _id: id });
  }

  public updateById<T>(id: string, updatedVehicle: T) {
    const filter = { _id: id };
    const update = updatedVehicle;
    return this.model.findOneAndUpdate(filter, update, { new: true });
  }
}

export default AbstractODM;