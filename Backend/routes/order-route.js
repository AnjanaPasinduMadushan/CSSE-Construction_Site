import express from 'express';
import { createOrder, getAllOrders, getItemsInAOrder, getOneOrder, getRequestedOrders, getSupplierOrders } from '../controllers/order-controller.js';

const order_router = express.Router();

order_router.get("/", getAllOrders);
order_router.post("/create", createOrder);
order_router.get("/requested", getRequestedOrders);
order_router.get("/supplier/:id", getSupplierOrders);
order_router.get("/itemsOrdered", getItemsInAOrder);
order_router.get("/:id", getOneOrder);

// user_router.patch("/updateProfile", checkToken, updateAcc);

export default order_router;