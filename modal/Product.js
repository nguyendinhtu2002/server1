import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
        },
        service: {
            type: Number,
            required: true,
        },
        platform: {
            type: String,
        },
        rate: {
            type: Number,
        },
        min: {
            type: Number,
        },
        max: {
            type: Number,
        },
        type: {
            type: String,
            default:'default'
        },

    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
