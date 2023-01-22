import IVehicle from './IVehicle';

interface IMotorcycle extends IVehicle {
  _id?: string,
  id?: string,
  model: string,
  year: number,
  color: string,
  status?: boolean | undefined,
  buyValue: number,
  category: string,
  engineCapacity: number,
}

export default IMotorcycle;