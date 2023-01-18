interface ICar {
  _id?: string,
  id?: string,
  model: string,
  year: number,
  color: string,
  status?: boolean | undefined,
  buyValue: number,
  doorsQty: number,
  seatsQty: number,
}

export default ICar;