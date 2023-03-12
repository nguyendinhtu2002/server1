const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors")
const rateLimit = require('express-rate-limit')
const userRouter = require("./router/User.js")
const connectDatabase = require("./config/MongoDb.js");
const orderRouter = require("./router/Orders.js")
const productRouter = require("./router/Product.js")
const reportRouter = require("./router/Report.js")
const CashFlowRouter = require("./router/CashFLow.js")
const AddFundsRouter = require("./router/AddFunds.js")
const WallerRouter = require("./router/Waller.js")
const PublicRouter = require("./router/Public.js")
const ImportData = require("./DataImport.js")
const voucherRouter = require("./router/Voucher")
const Singin  = require("./router/Signin")
const path = require("path");

dotenv.config();
connectDatabase();
const app = express();

app.use(express.json())
app.use(cors())
const apiLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use('/api/', apiLimiter)
app.use('/api/import', ImportData)
app.get('/test/libary.js', (req, res) => {
    res.sendFile(path.resolve('libary.js'));
})
app.use('/api/users', userRouter)
app.use("/api/orders", orderRouter);
app.use('/api/products', productRouter)
app.use("/api/report", reportRouter)
app.use("/api/voucher", voucherRouter)
app.use("/api/cashFlow", CashFlowRouter)
app.use("/api/addFunds", AddFundsRouter)
app.use("/api/Waller", WallerRouter)
app.use("/api/v2",PublicRouter)
app.use("/api/Signin",Singin)

app.listen(process.env.PORT || 5000, () =>
    console.log(`Server started on ${process.env.PORT}`)
);
