const Product = require("../models/Product");

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, description } = req.body;

        const newProduct = new Product({
            productName,
            price,
            category,
            description
        });

        await newProduct.save();

        res.status(201).json({
            status: true,
            message: "Product added successfully",
            product: newProduct
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: false,
            message: "Product add failed"
        });
    }
};

module.exports = { addProduct };