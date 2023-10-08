import express from 'express';
import { addConstructionSite,updateSiterBySiteId,deleteConstructionSite, getSiteBySiteId, getAllSites, getSitesByManagerId, getSiteCountsByProvince } from '../controllers/constructionsite-controller.js';

const constructionsite_router = express.Router();

constructionsite_router.post("/addConstructionSite", addConstructionSite);
constructionsite_router.get("/", getAllSites);
constructionsite_router.get("/sitebyId/:siteId", getSiteBySiteId);
constructionsite_router.get("/allsitesbyProvince", async (req, res) => {
    try {
      const siteCounts = await getSiteCountsByProvince();
      return res.status(200).json(siteCounts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
constructionsite_router.get('/sitesBymanagerId/:managerId', getSitesByManagerId);
constructionsite_router.patch("/updatesitebyid/:siteId", updateSiterBySiteId);
constructionsite_router.delete("/deleteSite/:siteId", deleteConstructionSite);

export default constructionsite_router;