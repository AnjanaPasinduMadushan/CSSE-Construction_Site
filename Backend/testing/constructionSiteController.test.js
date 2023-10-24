const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { addConstructionSite, updateSiterBySiteId, deleteConstructionSite, getSiteBySiteId, getAllSites, getSitesByManagerId, getSiteCountsByProvince } = require('../controllers/constructionsite-controller');
const ConstructionSite = require('../models/construction-site/constructionsite-model');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Construction Site Controller', () => {
  describe('addConstructionSite', () => {
    it('should add a construction site', async () => {
      // Create a fake request and response
      const req = {
        body: {
          ConstructionSiteDTO: {
            // Provide valid construction site data here
          },
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Mock the ConstructionSite model functions as needed

      // Call the controller function
      await addConstructionSite(req, res);

      // Assert the response
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Construction Site is Added'))).to.be.true;
      // Add more assertions as needed
    });

    it('should handle errors when adding a construction site', async () => {
      // Create a fake request and response
      const req = {
        body: {
          ConstructionSiteDTO: {
            // Provide invalid construction site data here
          },
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Mock the ConstructionSite model functions as needed

      // Call the controller function
      await addConstructionSite(req, res);

      // Assert the response
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message', 'Error occurred in adding Construction Site'))).to.be.true;
      // Add more assertions as needed
    });
  });

  // Create similar test cases for other controller functions
});
