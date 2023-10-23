import express from 'express';
import { createOrder, getAllOrders } from '../controllers/order-controller.js';

const order_router = express.Router();

order_router.get("/", getAllOrders);
order_router.post("/create", createOrder);
// user_router.patch("/updateProfile", checkToken, updateAcc);

export default order_router;