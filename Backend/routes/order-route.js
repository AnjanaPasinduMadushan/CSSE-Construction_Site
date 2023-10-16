import express from 'express';
import { getAllOrders } from '../controllers/order-controller.js';

const order_router = express.Router();

order_router.get("/", getAllOrders);
// user_router.patch("/updateProfile", checkToken, updateAcc);

export default order_router;