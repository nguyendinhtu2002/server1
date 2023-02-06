const mongoose = require("mongoose");


const signInSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    ipAddress: { type: String, required: true },
    device: { type: String, required: true },
    signInTime: { type: Date, default: Date.now },
});


const HistorySignIn = mongoose.model("History", signInSchema);
module.exports = HistorySignIn;