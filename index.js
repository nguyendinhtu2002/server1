const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors")
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

dotenv.config();
connectDatabase();
const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/import', ImportData)

app.use('/api/users', userRouter)
app.use("/api/orders", orderRouter);
app.use('/api/products', productRouter)
app.use("/api/report", reportRouter)
app.use("/api/cashFlow", CashFlowRouter)
app.use("/api/addFunds", AddFundsRouter)
app.use("/api/Waller", WallerRouter)
app.use("/api/v2",PublicRouter)
app.listen(process.env.PORT || 5000, () =>
    console.log(`Server started on ${process.env.PORT}`)
);
