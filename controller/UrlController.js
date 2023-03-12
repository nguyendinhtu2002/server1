const Url = require("../modal/URL.js");
const expressAsyncHandler = require("express-async-handler");
const randomstring = require("randomstring");



const createUrl = expressAsyncHandler(async (req, res, next) => {
    try {
        const { name, url1, url2, status, user } = req.body;
        const short_url = randomstring.generate(7)
        // const urlCheck = await Url.findOne({ name })
        const urlNew = await Url.create({
            name,
            user,
            url1,
            url2,
            status,
            short_url,

        });
        if (urlNew) {
            res.status(201).json({
                code: 1,
                short_url: urlNew.short_url,
            });
        }
        else {
            res.status(400).json({ message: "Invalid URL Data" })

        }
    } catch (error) {
        next(error);
    }
})

const getbyId = expressAsyncHandler(async (req, res, next) => {
    const url = await Url.find({ user: req.params.user });
    if (url) return res.status(200).json(url)
    else {
        return res.status(404).json({ error: "Invalid data" })
    }

})


const getUrl = expressAsyncHandler(async (req, res, next) => {
    try {

        const { shortURL } = req.params;
        const urlCheck = await Url.find({ short_url: shortURL })
        if (urlCheck ) {
            return res.status(200).json({ "code": 1, "url": urlCheck[0].url2 });
        }
        else {
            return res.status(404).send("URL not found");
        }
    } catch (error) {

    }
})

const getUrlById = expressAsyncHandler(async (req, res, next) => {
    try {
        const url = await Url.findOne({ _id: req.params.id })
        if (url === null) {
            return res.status(404).send({ error: "Err", message: "Url not found" })
        }
        else {
            return res.status(200).json(url);
        }
    } catch (error) {
        next(error);
    }
})

const updateStatus = expressAsyncHandler(async (req, res, next) => {
    try {
        const data = req.body;

        const url = await Url.findOne({ _id: req.params.id })
        if (url === null) {
            return res.status(404).send({ error: "Err", message: "Url not found" })
        }
        else {
            console.log(data)

            const updatedUrl = await Url.findByIdAndUpdate(url._id, data, { new: true })
            return res.status(200).json({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUrl
            })
        }
    } catch (error) {
        next(error);
    }
})

const deleteUrl = expressAsyncHandler(async (req, res, next) => {
    try {

        const user = await Url.findById(req.params.id);
        if (user) {
            await user.remove();
            return res.json({ success: true })
        }
        else return res.json({ success: false })
    } catch (error) {
        next(error);
    }
})
module.exports = { createUrl, getUrl, getbyId, getUrlById, updateStatus, deleteUrl }
