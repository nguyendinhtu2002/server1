const Report = require("../modal/Report.js");
const expressAsyncHandler = require("express-async-handler");


const createReport = expressAsyncHandler(async (req, res, next) => {
    try {

        const { reportOrder } = req.body;

        const report = new Report({
            reportOrder,
            user: req.user._id,
            // order:req.order._id,
        });
        const createReport = await report.save();
        res.status(201).json(createReport);
    } catch (error) {
        next(error)
    }
})

const getAllReport = expressAsyncHandler(async (req, res) => {
    try {

        const report = await Report.find({})
        res.json(report)
    } catch (error) {
        next(error)
    }
})

const getByIDUser = expressAsyncHandler(async (req, res, next) => {
    try {

        const report = await Report.find({ user: req.user._id }).sort({ _id: -1 });
        if (report) {
            res.status(200).json(report);
        }
        else {
            res.status(404).json({ message: 'Report not found' });
        }

    } catch (error) {
        next(error)
    }
})


const getByID = expressAsyncHandler(async (req, res, next) => {
    try {

        const report = await Report.findById(req.params._id);
        if (report) {
            res.status(200).json(report);
        }
        else {
            res.status(404).json({ message: 'Report not found' });
        }

    } catch (error) {
        next(error)
    }
})

const updateReport = expressAsyncHandler(async (req, res) => {

    const { repmessage, status } = req.body;
    const report = await Report.findById(req.params._id);
    // console.log(report.reportOrder[0].message)
    if (report) {

        report.reportOrder[0].message = report.reportOrder[0].message
        report.reportOrder[0].repmessage = repmessage
        report.reportOrder[0].status = status
        report.reportOrder[0].order = report.reportOrder[0].order
        report.reportOrder[0].Request = report.reportOrder[0].Request

        const updateReport = await report.save();
        res.json(updateReport);
    } else {
        res.status(404);
        throw new Error("Report not found");
    }
})

module.exports = { createReport, getAllReport, getByIDUser, getByID, updateReport }
