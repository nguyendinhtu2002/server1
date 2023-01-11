const mongoose = require("mongoose");

const cashFlowSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    order: { type: Number },
    type: {
        type: String,
        required: true,
    },
    spending: {
        type: Number,
        required: true,
    },
    remainingMoney: {
        type: Number,
        required: true,
    }

}, {
    timestamps: true,
})

const CashFlow = mongoose.model('CashFlow', cashFlowSchema)

module.exports = CashFlow