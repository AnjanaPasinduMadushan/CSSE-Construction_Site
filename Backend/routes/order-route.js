import express from 'express';
import { createOrder, getAllOrders, getRequestedOrders ,getSupplierOrders} from '../controllers/order-controller.js';

const order_router = express.Router();

order_router.get("/", getAllOrders);
order_router.post("/create", createOrder);
order_router.post("/requested", getRequestedOrders);
order_router.get("/supplier/:id", getSupplierOrders);

// user_router.patch("/updateProfile", checkToken, updateAcc);

export default order_router;