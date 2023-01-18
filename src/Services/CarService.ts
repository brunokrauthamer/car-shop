import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';

class CarService {
  public async create(car: ICar): Promise<ICar> {
    const carInstance = new Car(car);
    const carInfo = carInstance.getCarInfo();
    const model = new CarODM();
    const newCar = await model.create(carInfo);
    return {
      id: newCar._id,
      model: newCar.model,
      year: newCar.year,
      color: newCar.color,
      status: newCar.status,
      buyValue: newCar.buyValue,
      seatsQty: newCar.seatsQty,
      doorsQty: newCar.doorsQty,
    };
  }
}

export default CarService;