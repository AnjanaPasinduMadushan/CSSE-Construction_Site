import { expect } from 'chai';
import sinon from 'sinon';
const ConstructionSite = require('../models/construction-site/constructionsite-model.js');
const {
  addConstructionSite,
  updateSiterBySiteId,
  deleteConstructionSite,
  getSiteBySiteId,
  getAllSites,
  getSitesByManagerId,
  getSiteCountsByProvince,
} = require('./constructionSite.js');

describe('Construction Site Functions', () => {

  const ConstructionSiteMock = sinon.mock(ConstructionSite);

  afterEach(() => {
    ConstructionSiteMock.restore();
  });

  describe('addConstructionSite', () => {
    it('should add a construction site', async () => {
      const req = {
        body: {
          ConstructionSiteDTO: {
            // Add the required properties here
          },
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const fakeConstructionSite = new ConstructionSite(req.body.ConstructionSiteDTO);

      ConstructionSiteMock.expects('findOne').resolves(null);
      ConstructionSiteMock.expects('create').returns(fakeConstructionSite);

      await addConstructionSite(req, res);

      ConstructionSiteMock.verify();
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    // Add more test cases for addConstructionSite function
  });

  describe('updateSiterBySiteId', () => {
    it('should update a construction site', async () => {
      const req = {
        params: {
          siteId: 'testSiteId',
        },
        body: {
          // Add the updated properties here
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const fakeConstructionSite = new ConstructionSite(req.body);

      ConstructionSiteMock.expects('findOne').resolves(fakeConstructionSite);
      ConstructionSiteMock.expects('findOne').withArgs({ siteName: fakeConstructionSite.siteName, siteID: { $ne: req.params.siteId } }).resolves(null);
      ConstructionSiteMock.expects('findByIdAndUpdate').returns(fakeConstructionSite);

      await updateSiterBySiteId(req, res);

      ConstructionSiteMock.verify();
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    // Add more test cases for updateSiterBySiteId function
  });

  describe('deleteConstructionSite', () => {
    it('should delete a construction site', async () => {
      const req = {
        params: {
          siteId: 'testSiteId',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      ConstructionSiteMock.expects('deleteOne').resolves({ deletedCount: 1 });

      await deleteConstructionSite(req, res);

      ConstructionSiteMock.verify();
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    // Add more test cases for deleteConstructionSite function
  });

  describe('getSiteBySiteId', () => {
    it('should get a construction site by siteId', async () => {
      const req = {
        params: {
          siteId: 'testSiteId',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const fakeConstructionSite = new ConstructionSite(/* Construct your fake data here */);

      ConstructionSiteMock.expects('findOne').resolves(fakeConstructionSite);

      await getSiteBySiteId(req, res);

      ConstructionSiteMock.verify();
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

  });

});
