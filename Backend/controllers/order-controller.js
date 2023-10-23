import Orders from "../models/Orders/order.js";
import Material from "../models/material/material-model.js";
import { getAllMaterials } from "./material-controller.js";

const getAllOrders = async (req, res, next) => {
  let order;
  try {
    order = await Orders.find();
  } catch (err) {
    console.log(err);
  }
  if (!order) {
    return res.status(404).json({ message: "Nothing found" });
  }
  return res.status(200).json({ order });
};

const createOrder = async (req, res, next) => {
  let accountantStatus;
  let managementStatus;
  let refNo;
  const { constructionSiteName, items, totalPrice } = req.body;

  if (totalPrice > 100000) {
    accountantStatus = 'pending'
  }

  const materials = await Material.find({ isRestriced: true });

  const materialIds = materials.map(material => material.id);

  console.log(materialIds)

  const isAtLeastOneItemValid = items.some(item =>
    materialIds.includes(item.itemId)
  );

  if (isAtLeastOneItemValid) {
    managementStatus = 'pending';
  }

  if (managementStatus !== 'pending' && accountantStatus !== 'pending') {
    let uniqueNo = Math.floor(1000 + Math.random() * 9000);
    refNo = `${uniqueNo}OR`;
  }

  try {
    //creating a new Order
    const order = new Orders({
      refNo,
      constructionSiteName,
      managementStatus,
      accountantStatus,
      items,
      totalPrice
    });
    await order.save();
    return res.status(201).json({ message: "Order is placed successfully", Orders: order })//sending the new order details for the response

  } catch (err) {
    console.error(err)
    return res.status(400).json({ message: "Error in saving order in DB" });
  }
}

const getRequestedOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Orders.find({ $or: [{ accountantStatus: 'pending' }, { managementStatus: 'pending' }] });
  } catch (err) {
    console.log(err);
  }
  if (!orders) {
    return res.status(404).json({ message: "Nothing found" });
  }
  return res.status(200).json({ orders });
};

export { getAllOrders, createOrder, getRequestedOrders }