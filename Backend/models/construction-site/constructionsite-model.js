import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const materialSchema = new Schema({
    siteID: {
        type: String,
        required: true,
    },
    siteName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    managerID: {
        type: String,
        required: true,
    },
})

const ConstructionSite = mongoose.model('ConstructionSite', materialSchema);

export default ConstructionSite;
