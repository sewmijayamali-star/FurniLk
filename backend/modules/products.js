import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: { 
        type: String,
         required: true,
        unique: true 
    },
    name: { 
        type: String, 
        required: true
    },
    altname: {
        type:  [String],
        required: true,
        default: []
    },
    description: { 
        type: String,
         required: true

    },
    price: { 
        type: Number,
            required: true
    },
    labelprice: {
        type: Number,
        required: true
    },
    imageUrl: { 
        type:[String],   
        required: true
    },
    category: { 
        type: String,
            required: true
    },
    stock: { 
        type: Number,
            required: true,
            default: 0
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product; 