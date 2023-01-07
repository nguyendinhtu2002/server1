import express from 'express';
import Product from "./modal/Product.js"
import products from "./data/Product.js";
import asyncHandler from "express-async-handler";
const ImportData = express.Router();


ImportData.post(
    "/products",
    asyncHandler(async (req, res) => {
        await Product.remove({});
        const importProducts = await Product.insertMany(products);
        res.send({ importProducts });
    })
);

export default ImportData;
