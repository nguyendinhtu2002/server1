import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        quanlity: { type: Number },
        link: { type: String},
        service: { type: Number },
        order: { type: Number },
        name: { type: String },
        keyword:{ type: String }
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    orderStatus: { type: String, default: 'Pending' },
    charge: { type: Number, default: 0 },
    remains: { type: Number, default: 0 },
    start_count: { type: Number, default: 0 }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
