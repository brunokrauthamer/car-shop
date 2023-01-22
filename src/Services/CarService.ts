import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';

class CarService {
  private model;
  constructor() {
    this.model = new CarODM();
  }
  public async create(car: ICar): Promise<ICar> {
    const carInstance = new Car(car);
    const carInfo = carInstance.getCarInfo();
    const newCar = await this.model.create(carInfo);
    return {
      id: newCar._id,
      ...carInfo,
    };
  }

  public async getAll(): Promise<ICar[]> {
    const data = await this.model.getAll();
    const list = data.map((car: any) => {
      const carInfo = car._doc;
      carInfo.id = carInfo._id;
      return carInfo;
    });
    return list;
  }

  public async getById(id: string) {
    const data = await this.model.getById(id) as any;
    if (data) {
      const car = data._doc;
      car.id = car._id;
      return { type: 200, message: car };
    } return { type: 404, message: { message: 'Car not found' } };
  }

  public async updateById(id: string, updatedCar: ICar) {
    const data = await this.model.updateById(id, updatedCar) as any;
    if (data) {
      const car = data._doc;
      car.id = car._id;
      return { type: 200, message: car };
    } return { type: 404, message: { message: 'Car not found' } };
  }
}

export default CarService;