import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const materialSchema = new Schema({
    managerID: {
        type: String,
        required: true,
    },
    managerName: {
        type: String,
        required: true,
    },
    managerEmail: {
        type: String,
        required: true,
    },
    managerPhone: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
      },
})

const Manager = mongoose.model('Manager', materialSchema);

export default Manager;
