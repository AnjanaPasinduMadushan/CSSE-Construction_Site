import Orders from "../models/Orders/order.js";

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

export { getAllOrders }