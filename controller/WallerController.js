import Waller from "../modal/Waller.js";
import expressAsyncHandler from "express-async-handler";

const validateUserWallet = expressAsyncHandler(async (req, res, next) => {
    try {
        const userWallet = await Waller.findOne({ user: req.params.user });

        if (userWallet === null) {
            const wallet = new Waller({
                user: req.params.user,
            });
            const createWalle = await wallet.save();
            return res.status(201).json(createWalle);
        }
        return res.status(200).json(userWallet);
    }
    catch (error) {
        next(error);
    }
})
const updateWaller = expressAsyncHandler(async (req, res, next) => {
    try {
        // update wallet
        const { amount } = req.body;

        const wallet = await Waller.findOneAndUpdate(
            { user: req.params.user },
            { $inc: { balance: amount } },
            { new: true }
        );
        return res.json(wallet);
    } catch (error) {
        next(error);
    }
})

const getMoneyByIdUser = expressAsyncHandler(async (req, res, next) => {
    try {
        // const { userId } = req.body;

        const wallet = await Waller.findOne({ user: req.params.user });
        // user
        // console.log(wallet.balance)
        res.status(200).json({ balance: wallet.balance });
    }
    catch (error) {
        next(error);
    }
})

const getAll = expressAsyncHandler(async (req, res, next) => {
    try {

        const wallet = await Waller.find();
        
        res.status(200).json(wallet);

    } catch (error) {
        next(error);
    }
})
const deleteWallet = expressAsyncHandler(async (req, res, next) => {
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
export { validateUserWallet, updateWaller, getMoneyByIdUser,getAll,deleteWallet }