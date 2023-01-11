const AddFunds = require("../modal/AddFunds.js");
const expressAsyncHandler = require("express-async-handler");


//Create ORder
const createAddFunds = expressAsyncHandler(async (req, res, next) => {
    try {
        const {
            data,
            type,
        } = req.body;
        if (data && data.length === 0) {
            res.status(400);
            throw new Error("No addFunds items");
            return;
        } else {
            const funds = new AddFunds({
                data,
                user: req.user._id,
                type,
            });
            const createAddFunds = await funds.save();
            res.status(201).json(createAddFunds);
        }
    } catch (error) {
        next(error);
    }
})

const getAddFundsAll = expressAsyncHandler(async (req, res, next) => {
    try {
        const products = await AddFunds.find({})
        res.json(products)

    } catch (error) {
        next(error);
    }
})

const getByUser = expressAsyncHandler(async (req, res) => {
    try {
        const funds = await AddFunds.find({ user: req.user._id }).sort({ _id: -1 });
        if (funds) { res.status(200).json(funds) }
    } catch (error) {
        res.status(404).json({ error: "Invalid data" })

    }

})
// const getMoneyByUser = expressAsyncHandler(async (req, res) => {
//     try {
//         const funds = await AddFunds.find()
//         console.log(123)
//         // res.json(funds)
//     } catch (error) {

//     }
// })

module.exports = { createAddFunds, getAddFundsAll, getByUser }