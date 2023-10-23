import { addMaterial, getById, getAllMaterials, getBySupplierId, updateMaterial, deleteMaterial, updateMaterialStatus } from '../controllers/material-controller.js'
import { ManagementRole, siteManagerRole, supplierRole } from '../middlewares/user.js';
import { checkToken } from '../middlewares/user.js';
import express from 'express';

const material_router = express.Router();

material_router.post("/add", checkToken, supplierRole, addMaterial);
material_router.get("/getid/:id", checkToken, supplierRole, getById);
material_router.get("/get", checkToken, getAllMaterials);
material_router.get("/getSupplier/:id", checkToken, supplierRole, getBySupplierId);
material_router.put("/update/:id", checkToken, supplierRole, updateMaterial);
material_router.delete("/delete/:id", checkToken, supplierRole, deleteMaterial);
material_router.patch("/updateStatusMaterial/:id", checkToken, updateMaterialStatus);

export default material_router;