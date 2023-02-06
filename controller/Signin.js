const expressAsyncHandler = require("express-async-handler");
const HistorySignIn = require("../modal/Signin.js")



const getHistoryById = expressAsyncHandler(async (req, res, next) => {
    try {

        const History = await HistorySignIn.find({ user: req.params._id }).sort({ _id: -1 });
        if (History) {
            res.json(History);
        } else {
            res.status(404);
            throw new Error("History not found");
        }
    } catch (error) {
        next(error)
    }
})

module.exports = getHistoryById