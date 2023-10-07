import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const materialSchema = new Schema({ 
    name: {
        type: String,
        required: true,    
        },
    quantity: { 
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      }

})

const Material = mongoose.model('Material', materialSchema);

export default Material;
