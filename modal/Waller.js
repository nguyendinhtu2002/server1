const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
    {
        balance: { type: Number, default: 0 },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);
const Waller = mongoose.model("Waller", walletSchema);

module.exports = Waller