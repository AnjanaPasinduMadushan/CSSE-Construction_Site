import { addManager, getAllManagers, getManagerByUserId, getManagerByManagerId, deleteManager, updateManagerByManagerId,getAllManagerIds} from '../controllers/manager-controller.js';
import express from 'express';

const manager_router = express.Router();

manager_router.post("/addManager", addManager);
manager_router.get("/", getAllManagers);
manager_router.get("/managerbyId/:managerId", getManagerByManagerId);
manager_router.get('/managerbyuserId/:userId', getManagerByUserId);
manager_router.get('/getallmanagerIds', getAllManagerIds);
manager_router.patch("/updatemanager/:managerId", updateManagerByManagerId);
manager_router.delete("/deleteManager/:id", deleteManager);

export default manager_router;