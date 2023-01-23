import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

describe('Unit tests service layer', function () {
  it('should create a new moto', async function () {
    const inputMoto: IMotorcycle = {
      model: 'Hornet',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'street',
      engineCapacity: 600,
    };

    const expectedResponse: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: 'Hornet',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'street',
      engineCapacity: 600,
    };

    const mockModelMoto = {
      _doc: {
        _id: '634852326b35b59438fbea2f',
        model: 'Hornet',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        category: 'street',
        engineCapacity: 600,
      },
    };

    sinon.stub(Model, 'create').resolves(mockModelMoto);

    const service = new MotorcycleService();
    const result = await service.create(inputMoto);

    expect(result).to.be.deep.equal(expectedResponse);
  });

  it('should get all cars from mongo', async function () {
    const mockModelMoto = [
      { _doc: {
        _id: '634852326b35b59438fbea2f',
        model: 'Hornet',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        category: 'street',
        engineCapacity: 600,
      } },
      { _doc: {
        _id: '634852326b35b59438fbea2f',
        model: 'Hornet',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        category: 'street',
        engineCapacity: 600,
      } },
    ];

    const response: IMotorcycle[] = [
      {
        id: '634852326b35b59438fbea2f',
        _id: '634852326b35b59438fbea2f',
        model: 'Hornet',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        category: 'street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea2f',
        _id: '634852326b35b59438fbea2f',
        model: 'Hornet',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        category: 'street',
        engineCapacity: 600,
      },
    ];

    sinon.stub(Model, 'find').resolves(mockModelMoto);

    const service = new MotorcycleService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(response);
  });

  it('should get an existing car', async function () {
    const mockModelMoto = { _doc: {
      _id: '634852326b35b59438fbea2g',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    } };

    const response = {
      type: 200,
      message: {
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

    const id = '634852326b35b59438fbea2g';

    sinon.stub(Model, 'findOne').resolves(mockModelMoto);

    const service = new MotorcycleService();
    const result = await service.getById(id);

    expect(result).to.be.deep.equal(response);
  });

  it('shouldnt find an inexisting car', async function () {
    const mockModelMoto = null;
    const id = '634852326b35b59438fbea2g';

    const expectedResponse = { type: 404, message: { message: 'Motorcycle not found' } };

    sinon.stub(Model, 'findOne').resolves(mockModelMoto);
    const service = new MotorcycleService();
    const result = await service.getById(id);

    expect(result).to.be.deep.equal(expectedResponse);
  });

  it('should update an existing car', async function () {
    const inputMoto: IMotorcycle = {
      model: 'Hornet',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'street',
      engineCapacity: 600,
    };

    const expectedResponse = {
      type: 200,
      message: {
        id: '634852326b35b59438fbea2f',
        _id: '634852326b35b59438fbea2f',
        model: 'Hornet',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        category: 'street',
        engineCapacity: 600,
      },
    };

    const mockModelMoto = {
      _doc: {
        _id: '634852326b35b59438fbea2f',
        model: 'Hornet',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        category: 'street',
        engineCapacity: 600,
      },
    };

    const id = '634852326b35b59438fbea2f';

    sinon.stub(Model, 'findOneAndUpdate').resolves(mockModelMoto);

    const service = new MotorcycleService();
    const result = await service.updateById(id, inputMoto);

    expect(result).to.be.deep.equal(expectedResponse);
  });

  it('shouldnt update an inexisting car', async function () {
    const inputMoto: IMotorcycle = {
      model: 'Hornet',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'street',
      engineCapacity: 600,
    };

    const expectedResponse = { type: 404, message: { message: 'Motorcycle not found' } };

    const mockModelMoto = null;

    const id = '634852326b35b59438fbea2g';

    sinon.stub(Model, 'findOneAndUpdate').resolves(mockModelMoto);

    const service = new MotorcycleService();
    const result = await service.updateById(id, inputMoto);

    expect(result).to.be.deep.equal(expectedResponse);
  });

  afterEach(function () {
    sinon.restore();
  });
});