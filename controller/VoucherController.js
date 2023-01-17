const Voucher = require('../modal/Voucher')
const expressAsyncHandler = require("express-async-handler");


const createVoucher = expressAsyncHandler(async (req, res, next) => {
    try {

        const { nameVoucher, quantity, originalPrice } = req.body;
        const voucherExists = await Voucher.findOne({ nameVoucher });
        if (voucherExists) {
            res.status(400).json({ message: "Voucher already exists" })
        }
        else {
            const report = new Voucher({
                nameVoucher,
                quantity,
                originalPrice
            });
            const createVoucher = await report.save();
            res.status(201).json(createVoucher);
        }
    } catch (error) {
        next(error)
    }
})
const updateVoucher = expressAsyncHandler(async (req, res, next) => {
    const { nameVoucher, quantity, originalPrice } = req.body;
    const voucherCheck = await Voucher.findOne({ nameVoucher });
    if (!voucherCheck) {
        res.status(400).json({ message: "Voucher not found" })
    }
    else {
        if (voucherCheck.quantity > 0) {
            // voucherCheck.nameVoucher=nameVoucher;
            voucherCheck.quantity = voucherCheck.quantity - 1;
            // voucherCheck.originalPrice = originalPrice;
            const updateVoucher = await voucherCheck.save();
            res.json({
                updateVoucher
            })
        }
        else{
            res.status(400).json({ message: "Voucher not found" })
        }
    }
})

module.exports = { createVoucher, updateVoucher }