const orderModel = require("../models/order");


const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, deliveryAddress ,  paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Cart is empty"
            });
        }

        const newOrder = new orderModel({
            userId: req.user.id,
            items: items,
            totalAmount: totalAmount,
            deliveryAddress: deliveryAddress,
            paymentMethod: paymentMethod
        });

        await newOrder.save();

        res.status(201).json({
            status: true,
            message: "Order placed successfully",
            order: newOrder
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: false,
            message: "Order placement failed"
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            orders: orders
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: false,
            message: "Orders fetch failed"
        });
    }
};

module.exports = {
    createOrder ,  getMyOrders
};