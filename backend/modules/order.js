
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderid: {
        type: String,
        required: true,
        unique: true
    },

    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: false
        },
        productName: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: false
        },
        quantity: {
            type: Number,
            required: false
        },
        productImage: {
            type: String,
            required: false
        }
    }],

    customerName: {
        type: String,
        required: true
    },

    customerEmail: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: false
    },

    address: {
        type: String,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    // delivery status 
    state: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },

    //  payment fields
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        default: 'Pending'
    },

    paymentMethod: {
        type: String,
        default: 'PayHere'
    },

    paymentId: {
        type: String,
        default: null
    },

    orderDate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
