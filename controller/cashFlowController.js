import CashFlow from "../modal/CashFlow.js";
import expressAsyncHandler from "express-async-handler";



const createCashFlow = expressAsyncHandler(async (req, res, next) => {
    try {
        const { order, spending, remainingMoney, type } = req.body;

        if (order != "") {
            const cashFlow = await CashFlow.create({
                order,
                spending,
                user: req.user._id,
                remainingMoney,
                type
            })
            const createCashFlow = await cashFlow.save();
            res.status(200).send(createCashFlow)
        }
    } catch (error) {
        next(error);
    }
})

const getByUser = expressAsyncHandler(async (req, res, next) => {
    try {
        const cashFlow = await CashFlow.find({ user: req.user._id }).sort({ _id: -1 });
        res.status(200).json(cashFlow);

    } catch (error) {
        next(error);
    }
})
const getAll = expressAsyncHandler(async (req, res, next) => {
    try {
        const cashFlow = await CashFlow.find({}).sort({ _id: -1});
        res.status(200).json(cashFlow);

    } catch (error) {
        next(error);

    }
})
const getByUserDeposit = expressAsyncHandler(async (req, res, next) => {
    try {
        const cashFlow = await CashFlow.find({ user: req.user._id, type: "DEPOSIT" }).sort({ _id: -1 });
        res.status(200).json(cashFlow);

    } catch (error) {
        next(error);
    }
})
const deleteById = expressAsyncHandler(async (req, res, next) => {
    try {

        const wallet = await Waller.findById(req.params._id);
        if (wallet) {
            await wallet.remove();
            return res.json({ success: true })
        }
        else return res.json({ success: false })
    } catch (error) {
        next(error);
    }
})
export { createCashFlow, getByUser, getAll, getByUserDeposit,deleteById }