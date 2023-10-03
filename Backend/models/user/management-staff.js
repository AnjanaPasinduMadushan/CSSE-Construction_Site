import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const managementSchema = new Schema({

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
  }

})

const Management = mongoose.model("management-staff", managementSchema);
export default Management;