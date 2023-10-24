import { expect } from 'chai';
import sinon from 'sinon';
// const { describe, it } = require('mocha');
// const sinon = require('sinon');

import { getAllOrders, getRequestedOrders, updateMangementStatus } from '../../controllers/order-controller';
import Orders from '../../models/Orders/order';

//unit testing for getAllOrders function
describe('getAllOrders', () => {
  it('should return all orders', async () => {
    // Mock the Orders.find() method
    const findStub = sinon.stub(Orders, 'find').resolves(['order1', 'order2']);

    // Mock the response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the function
    await getAllOrders(null, res);

    // Assertions
    expect(findStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ order: ['order1', 'order2'] })).to.be.true;

    // Restore the original method to avoid side effects on other tests
    findStub.restore();
  });

  it('should handle errors and return 404 if nothing is found', async () => {
    // Mock the Orders.find() method to throw an error
    const findStub = sinon.stub(Orders, 'find').throws(new Error('Some error'));

    // Mock the response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the function
    await getAllOrders(null, res);

    // Assertions
    expect(findStub.calledOnce).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Nothing found' })).to.be.true;

    // Restore the original method to avoid side effects on other tests
    findStub.restore();
  });
});

//unit testing for getRequestedOrders function
describe('getRequestedOrders', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return requested orders', async () => {
    const mockOrders = [
      { _id: '1', accountantStatus: 'pending', managementStatus: 'approved', name: 'Order 1' },
      { _id: '2', accountantStatus: 'approved', managementStatus: 'pending', name: 'Order 2' },
    ];
    sinon.stub(Orders, 'find').resolves(mockOrders);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await getRequestedOrders(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ orders: mockOrders })).to.be.true;
  });

  it('should handle no requested orders found', async () => {
    sinon.stub(Orders, 'find').resolves([]);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await getRequestedOrders(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Nothing found' })).to.be.true;
  });

  it('should handle errors', async () => {
    const errorMessage = 'Database error';
    sinon.stub(Orders, 'find').rejects(new Error(errorMessage));

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await getRequestedOrders(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: 'Internal Server Error' })).to.be.true;
  });
});

//unit testing for updateMangementStatus
describe('updateMangementStatus', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should update management status and generate refNo for approved orders', async () => {
    const orderId = '1';
    const req = {
      params: { id: orderId },
      body: { status: 'approved', comments: 'Approval granted' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const mockOrder = {
      _id: orderId,
      accountantStatus: 'approved',
      managementStatus: 'pending',
    };
    sinon.stub(Orders, 'findById').resolves(mockOrder);
    sinon.stub(Orders, 'findByIdAndUpdate').resolves(mockOrder);

    await updateMangementStatus(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ order: mockOrder })).to.be.true;
  });

  it('should update management status and set refNo to null for non-approved orders', async () => {
    const orderId = '2';
    const req = {
      params: { id: orderId },
      body: { status: 'rejected', comments: 'Not approved' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const mockOrder = {
      _id: orderId,
      accountantStatus: 'approved',
      managementStatus: 'pending',
    };
    sinon.stub(Orders, 'findById').resolves(mockOrder);
    sinon.stub(Orders, 'findByIdAndUpdate').resolves(mockOrder);

    await updateMangementStatus(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ order: mockOrder })).to.be.true;
  });

  it('should handle not finding the order', async () => {
    const orderId = '3';
    const req = {
      params: { id: orderId },
      body: { status: 'approved', comments: 'Approval granted' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(Orders, 'findById').resolves(null);

    await updateMangementStatus(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Nothing founded' })).to.be.true;
  });

  it('should handle errors', async () => {
    const orderId = '4';
    const req = {
      params: { id: orderId },
      body: { status: 'approved', comments: 'Approval granted' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(Orders, 'findById').rejects(new Error('Database error'));

    await updateMangementStatus(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: 'Internal Server Error' })).to.be.true;
  });
});

//unit testing for updateAccountantStatus
describe('updateAccountantStatus', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should update accountant status and generate refNo for approved orders', async () => {
    const orderId = '1';
    const req = {
      params: { id: orderId },
      body: { status: 'approved', comments: 'Approval granted' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const mockOrder = {
      _id: orderId,
      managementStatus: 'approved',
      accountantStatus: 'pending',
    };
    sinon.stub(Orders, 'findById').resolves(mockOrder);
    sinon.stub(Orders, 'findByIdAndUpdate').resolves(mockOrder);

    await updateAccountantStatus(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ order: mockOrder })).to.be.true;
  });

  it('should update accountant status and set refNo to null for non-approved orders', async () => {
    const orderId = '2';
    const req = {
      params: { id: orderId },
      body: { status: 'rejected', comments: 'Not approved' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const mockOrder = {
      _id: orderId,
      managementStatus: 'approved',
      accountantStatus: 'pending',
    };
    sinon.stub(Orders, 'findById').resolves(mockOrder);
    sinon.stub(Orders, 'findByIdAndUpdate').resolves(mockOrder);

    await updateAccountantStatus(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ order: mockOrder })).to.be.true;
  });

  it('should handle not finding the order', async () => {
    const orderId = '3';
    const req = {
      params: { id: orderId },
      body: { status: 'approved', comments: 'Approval granted' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(Orders, 'findById').resolves(null);

    await updateAccountantStatus(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Nothing founded' })).to.be.true;
  });

  it('should handle errors', async () => {
    const orderId = '4';
    const req = {
      params: { id: orderId },
      body: { status: 'approved', comments: 'Approval granted' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(Orders, 'findById').rejects(new Error('Database error'));

    await updateAccountantStatus(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: 'Internal Server Error' })).to.be.true;
  });
});