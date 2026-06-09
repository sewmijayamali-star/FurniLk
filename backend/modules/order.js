import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderid: {
        type: String,
        required: true,
        unique: true
    },
    items: {

        ProductId: {
            type: String,
            required: false
        },
        name: {
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
        image :{
            type: String,
            required: false
        }},


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
        required: true 
     },
    address: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        default: Date.now

    }   
});

const Order = mongoose.model("Order", orderSchema); 
export default Order;