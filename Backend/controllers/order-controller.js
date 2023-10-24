import Orders from "../models/Orders/order.js";
import Material from "../models/material/material-model.js";

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
  const { constructionSiteId, items, totalPrice, supplierId } = req.body;

  if (totalPrice > 100000) {
    accountantStatus = 'pending'
  }

  const restrictedMaterials = await Material.find({ isRestriced: true });

  const materialIds = restrictedMaterials.map(material => material.id);

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
      constructionSiteId,
      supplierId,
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
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (!orders) {
    return res.status(404).json({ message: "Nothing found" });
  }
  return res.status(200).json({ orders });
};

const getSupplierOrders = async (req, res, next) => {
  const id = req.userId;
  let orders;
  try {
    orders = await Orders.find({ $and: [{ accountantStatus: 'approved' }, { managementStatus: 'approved' }, { supplierId: id }] });
  } catch (err) {
    console.log(err);
  }
  if (!orders) {
    return res.status(404).json({ message: "Nothing found" });
  }
  return res.status(200).json({ orders });
};

const getOneOrder = async (req, res, next) => {
  const id = req.params.id;
  let orders;
  try {
    orders = await Orders.findById(id);
    if (!orders) {
      return res.status(404).json({ message: "Nothing found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ orders });
};

const getItemsInAOrder = async (req, res, next) => {
  const { arrayIds } = req.query;
  console.log(arrayIds)
  try {
    const materials = await Material.find({ _id: { $in: arrayIds } });
    if (!materials) {
      return res.status(404).json({ message: "Nothing founded" });
    }
    return res.status(200).json({ materials });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateMangementStatus = async (req, res, next) => {

  const { status, comments } = req.body;
  const id = req.params.id;
  console.log(id);
  console.log(status, " ", comments)
  let refNo;
  try {

    const orderOne = await Orders.findById(id);
    if (orderOne.accountantStatus === "approved" && status === "approved") {
      let uniqueNo = Math.floor(1000 + Math.random() * 9000);
      refNo = `${uniqueNo}OR`;
    } else if (status !== "approved") {
      refNo = null;
    }
    const order = await Orders.findByIdAndUpdate(id, { managementStatus: status, managementComments: comments, refNo: refNo });
    if (!order) {
      return res.status(404).json({ message: "Nothing founded" });
    }
    console.log(order)
    return res.status(200).json({ order });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal Server Error" });
  }

}

const updateAccountantStatus = async (req, res, next) => {

  const { status, comments } = req.body;
  const id = req.params.id;

  console.log(status)
  let refNo;
  try {

    const orderOne = await Orders.findById(id);
    if (orderOne.managementStatus === "approved" && status === "approved") {
      let uniqueNo = Math.floor(1000 + Math.random() * 9000);
      refNo = `${uniqueNo}OR`;
    } else if (status !== "approved") {
      refNo = null;
    }

    const order = await Orders.findByIdAndUpdate(id, { accountantStatus: status, accountantComments: comments, refNo: refNo });
    if (!order) {
      return res.status(404).json({ message: "Nothing founded" });
    }
    return res.status(200).json({ order });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal Server Error" });
  }

}

export { getAllOrders, createOrder, getRequestedOrders, getSupplierOrders, getOneOrder, getItemsInAOrder, updateMangementStatus, updateAccountantStatus }