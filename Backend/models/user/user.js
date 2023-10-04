import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  mobile: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  role: {
    type: String,
    enum: ["management-staff", "supplier", "site-manager", "accountant"],
    default: "management-staff",
  },

  shopName: {
    type: String,
  },

  shopAddress: {
    type: String
  }

})

const Users = mongoose.model("users", UserSchema);
export default Users;