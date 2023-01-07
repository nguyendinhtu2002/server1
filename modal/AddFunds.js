import mongoose from "mongoose";

const adsFundsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    data: {
        tranId: { type: Number, required: true },
        amount: { type: Number, required: true },
        comment: { type: String, required: true },
        // decs: { type: String, required: true },
        create_time: { type: String, required: true },
        run_time: { type: String, required: true },
        partnerId: { type: Number, required: true },
        partnerName: { type: String, required: true },
        user: { type: Number, required: true },
    },
    method: { type: String, required: true, default: "AUTO - MoMo" },
    type: { type: String }
}, {
    timestamps: true,
})

const AddFunds = mongoose.model('AddFunds', adsFundsSchema)
export default AddFunds;
