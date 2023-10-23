import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  refNo: {
    type: String,
    default: null,
  },
  constructionSiteName: {
    type: String,
    required: true
  },
  managementStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "approved",
  },
  accountantStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "approved",
  },
  items: [{
    itemId: String,
    quantity: Number,
    requiredDate: Date,
    deliveryStatus: {
      type: String,
      default: 'pending'
    },
    isDelivered: {
      type: Boolean,
      default: false
    }

  }],
  totalPrice: {
    type: Number,
    required: true
  }
});

const Orders = mongoose.model("orders", OrderSchema);
export default Orders;
