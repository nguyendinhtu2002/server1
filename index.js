import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import userRouter from "./router/User.js"
import connectDatabase from "./config/MongoDb.js";
import orderRouter from "./router/Orders.js"
import productRouter from "./router/Product.js"
import reportRouter from "./router/Report.js"
import CashFlowRouter from "./router/CashFLow.js"
import AddFundsRouter from "./router/AddFunds.js"
import WallerRouter from "./router/Waller.js"
import PublicRouter from "./router/Public.js"
import ImportData from "./DataImport.js"

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
