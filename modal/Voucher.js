const mongoose = require("mongoose");

const voucherSchema = mongoose.Schema({
    nameVoucher:{
        type: String,
        required: true,
    },
    quantity:{
        type:Number,
        required: true,
    },
    originalPrice:{
        type:Number,
        required: true,
    }

}, {
    timestamps: true,
})

const Voucher = mongoose.model('Voucher', voucherSchema)

module.exports = Voucher