import MotorcycleODM from '../Models/MotorcycleODM';
import IMotorcycle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';

class MotorcycleService {
  private model;
  constructor() {
    this.model = new MotorcycleODM();
  }
  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    const motorcycleInstance = new Motorcycle(motorcycle);
    const motorcycleInfo = motorcycleInstance.getMotorcycleInfo();
    const newMotorcycle = await this.model.create<IMotorcycle>(motorcycleInfo);
    return {
      id: newMotorcycle._id,
      ...motorcycleInfo,
    };
  }

  public async getAll(): Promise<IMotorcycle[]> {
    const data = await this.model.getAll<IMotorcycle>();
    const list = data.map((motorcycle: any) => {
      const motorcycleInfo = motorcycle._doc;
      motorcycleInfo.id = motorcycleInfo._id;
      return motorcycleInfo;
    });
    return list;
  }

  public async getById(id: string) {
    const data = await this.model.getById<IMotorcycle>(id) as any;
    if (data) {
      const motorcycle = data._doc;
      motorcycle.id = motorcycle._id;
      return { type: 200, message: motorcycle };
    } return { type: 404, message: { message: 'Motorcycle not found' } };
  }

  public async updateById(id: string, updatedMotorcycle: IMotorcycle) {
    const data = await this.model.updateById<IMotorcycle>(id, updatedMotorcycle) as any;
    if (data) {
      const motorcycle = data._doc;
      motorcycle.id = motorcycle._id;
      return { type: 200, message: motorcycle };
    } return { type: 404, message: { message: 'Motorcycle not found' } };
  }
}

export default MotorcycleService;