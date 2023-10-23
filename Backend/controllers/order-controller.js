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

const createOrder = async (req, res, next) => {
  let accountantStatus;
  const { refNo, constructionSiteName, items, totalPrice } = req.body;

  if (totalPrice > 100000) {
    accountantStatus = 'pending'
  }
  try {
    //creating a new Order
    const order = new Orders({
      refNo,
      constructionSiteName,
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

export { getAllOrders, createOrder }