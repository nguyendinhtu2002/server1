const express = require('express');
const Product = require("./modal/Product.js")
const products = require("./data/Product.js");
const asyncHandler = require("express-async-handler");
const ImportData = express.Router();


ImportData.post(
    "/products",
    asyncHandler(async (req, res) => {
        await Product.remove({});
        const importProducts = await Product.insertMany(products);
        res.send({ importProducts });
    })
);

module.exports = ImportData;
