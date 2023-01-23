import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

describe('Unit tests service layer', function () {
  it('should create a new car', async function () {
    const model = 'Marea Turbo do Matuca';
    const inputCar: ICar = {
      model,
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const expectedResponse: ICar = {
      id: '634852326b35b59438fbea2f',
      model,
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const mockModelCar = {
      _doc: {
        _id: '634852326b35b59438fbea2f',
        model,
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    };

    sinon.stub(Model, 'create').resolves(mockModelCar);

    const service = new CarService();
    const result = await service.create(inputCar);

    expect(expectedResponse).to.be.deep.equal(result);
  });

  it('should get all cars from mongo', async function () {
    const outputList = [
      { _doc: {
        _id: '634852326b35b59438fbea2g',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      } },
      { _doc: {
        _id: '634852326b35b59438fbea2f',
        model: 'Marea Turbo',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      } },
    ];

    const response: ICar[] = [
      {
        id: '634852326b35b59438fbea2g',
        _id: '634852326b35b59438fbea2g',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea2f',
        _id: '634852326b35b59438fbea2f',
        model: 'Marea Turbo',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    ];

    sinon.stub(Model, 'find').resolves(outputList);

    const service = new CarService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(response);
  });

  it('should get an existing car', async function () {
    const dbCar = { _doc: {
      _id: '634852326b35b59438fbea2g',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    } };

    const responseCar = {
      id: '634852326b35b59438fbea2g',
      _id: '634852326b35b59438fbea2g',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findOne').resolves(dbCar);

    const service = new CarService();
    const result = await service.getById('634852326b35b59438fbea2g');

    expect(result.message).to.be.deep.equal(responseCar);
    expect(result.type).to.be.equal(200);
  });

  it('shouldnt find an inexisting car', async function () {
    const dbCar = null;

    sinon.stub(Model, 'findOne').resolves(dbCar);
    const service = new CarService();
    const result = await service.getById('634852326b35b59438fbea2g');

    expect(result.message).to.be.deep.equal({ message: 'Car not found' });
    expect(result.type).to.be.equal(404);
  });

  it('should update an existing car', async function () {
    const newCar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const id = '634852326b35b59438fbea2g';

    const responseCar = { _doc: {
      id: '634852326b35b59438fbea2g',
      _id: '634852326b35b59438fbea2g',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    },
    };

    sinon.stub(Model, 'findOneAndUpdate').resolves(responseCar);

    const service = new CarService();
    const result = await service.updateById(id, newCar);

    expect(responseCar._doc).to.be.deep.equal(result.message);
    expect(result.type).to.be.equal(200);
  });

  it('shouldnt update an inexisting car', async function () {
    const newCar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const id = '634852326b35b59438fbea2gdasdsa';

    const responseCar = null;

    sinon.stub(Model, 'findOneAndUpdate').resolves(responseCar);
    const service = new CarService();
    const result = await service.updateById(id, newCar);

    expect(result.message).to.be.deep.equal({ message: 'Car not found' });
    expect(result.type).to.be.equal(404);
  });

  afterEach(function () {
    sinon.restore();
  });
});