import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OrderSchema = new Schema({

  oId: {
    type: String,
    required: true
  },

  refNo: {
    type: String,
    required: true
  },

  constructionSiteName: {
    type: String,
    required: true
  },

  managementStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  accountantStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  shopName: {
    type: String,
  },

  shopAddress: {
    type: String
  }

})

const Orders = mongoose.model("orders", OrderSchema);
export default Orders;