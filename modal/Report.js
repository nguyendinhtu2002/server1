const mongoose = require("mongoose");
const Inc = require("mongoose-sequence");
const AutoIncrement = Inc(mongoose);

const reportSchema = mongoose.Schema({
    _id: Number,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    // order: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Order",
    // },
    reportOrder: [
        {
            Request: { type: String, required: true },
            message: { type: String, required: true },
            subject: { type: String },
            repmessage: { type: String, required: true, default: "Chúng tôi sẻ kiểm tra và xử lý sớm đơn hàng của bạn. Nếu bạn cần hỗ trợ gì hãy nhắn lại chúng tôi sẻ xử lý giúp bạn . Thanks very much ! AZO support team ." },
            order: { type: Number, required: true },
            status: { type: String, required: true, default: "waiting" }
        },
    ],
}, {
    timestamps: true,

})
reportSchema.plugin(AutoIncrement, { id: 'report_id_counter', inc_field: '_id' });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;