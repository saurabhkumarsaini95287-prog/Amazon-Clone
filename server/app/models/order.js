const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [
            {
                name: String,
                image: String,
                price: Number,
                quantity: Number
            }
        ],

        totalAmount: {
            type: Number,
            required: true
        },

        deliveryAddress: {
            name: String,
            phone: String,
            address: String,
            city: String,
            pincode: String
        },

        paymentMethod: {
        type: String,
        required: true,
        default: "COD"
},

        status: {
            type: String,
            default: "Placed"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);