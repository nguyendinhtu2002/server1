const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../modal/Product.js");
const axios = require("axios");
const getALL = asyncHandler(async (req, res) => {
    // res.header("Access-Control-Allow-Origin", "azview.us");
    const products = await Product.find({})
    res.json(products)
})
const getUpView = asyncHandler(async (req, res, next) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        const params = new URLSearchParams()
        params.append('key', 'ZmNlMTVlMmEwM2Q3NzVmZWY1MzBiNzBiMWIxNDM1Y2I=')
        params.append('action', 'services')
        const { data } = await axios.post("https://upview.us/api/v2", params, config)

        return res.json(data)

    } catch (error) {
        next(error)
    }
})
// GET SINGLE PRODUCT
const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findOne({ service: req.params.service });

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not Found");
    }
})
const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, rate, min, max, category, platform, service, type } = req.body
        const products = await Product.find({ service })
        if (products) {
            return res.status(400).json({ message: "Product already exist " })
        }
        else {
            const product = await Product.create({
                name,
                rate,
                min,
                max,
                category,
                platform,
            });
            if (product) {
                res.status(201).json({
                    message: "success",
                });
            } else {
                res.status(400).json({ message: "Invalid product Data" })

            }
        }
    } catch (error) {

    }
})



module.exports = { getALL, getProductById, addProduct, getUpView } 
