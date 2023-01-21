import { Model, Schema, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';

class VehicleODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async getAll(): Promise<ICar[]> {
    return this.model.find({});
  }

  public getById(id: string) {
    return this.model.findOne({ _id: id });
  }

  public updateById(id: string, updatedCar: ICar) {
    const filter = { _id: id };
    const update = updatedCar;
    return this.model.findOneAndUpdate(filter, update, { new: true });
  }
}

export default VehicleODM;