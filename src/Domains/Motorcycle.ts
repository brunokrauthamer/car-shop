import IMotorcycle from '../Interfaces/IMotorcycle';

export default class Motorcycle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  private category: string;
  private engineCapacity: number;
  constructor(motorcycle: IMotorcycle) {
    this.model = motorcycle.model;
    this.year = motorcycle.year;
    this.color = motorcycle.color;
    this.buyValue = motorcycle.buyValue;
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
    if (motorcycle.status === undefined) {
      this.status = false;
    } else {
      this.status = motorcycle.status;
    }
  }
  public getMotorcycleInfo() {
    return {
      model: this.model,
      year: this.year,
      color: this.color,
      status: this.status,
      buyValue: this.buyValue,
      category: this.category,
      engineCapacity: this.engineCapacity,
    };
  }
}