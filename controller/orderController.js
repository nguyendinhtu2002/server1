const Order = require("../modal/Order.js");
const expressAsyncHandler = require("express-async-handler");
const axios = require("axios")
const cron = require('node-cron');
//Create ORder
const createOrder = expressAsyncHandler(async (req, res, next) => {
    try {
        const orderUpView = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]

        const {
            link,
            quanlity,
            service,
            search,
            name,
            keyword,
            totalPrice,
            orderStatus,
            charge,
            remains,
            start_count
        } = req.body;

        const params = new URLSearchParams()

        params.append('action', 'add')
        params.append('service', service)
        params.append('link', link)
        params.append('quantity', quanlity)
        // params.append('search', search)
        // params.append('search', keyword)

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        var data = {};
        if (orderUpView.includes(service)) {
            params.append('key', process.env.KEY1)
            data = await axios.post(`https://upview.us/api/v2`, params, config);
        }
        else {
            params.append('key', process.env.KEY2)
            data = await axios.post(`https://1dg.me/api/v2`, params, config);
        }
        if (name && name.length === 0) {
            res.status(400);
            throw new Error("No order items");

        } else {
            if (data.error === undefined) {
                const order = new Order({
                    orderItems: {
                        order: data.data.order,
                        link,
                        quanlity,
                        service,
                        name
                    },
                    user: req.user._id,
                    totalPrice,
                    orderStatus,
                    charge,
                    remains,
                    start_count
                });
                const createOrder = await order.save();
                return res.status(201).json(createOrder);
            }
            else {
                return res.status(500).json({ "error": "Error" });
            }
        }
    } catch (error) {
        next(error);
    }
})

//GET ALL ORder 
const getByUser = expressAsyncHandler(async (req, res) => {
    try {
        // const { orders } = req.body
        const order = await Order.find({ user: req.params._id }).sort({ _id: -1 });
        // async function updateOrder(id) {
        //     await axios.post(`http://localhost:5000/api/orders/${id}/status`)
        // }
        // order.map((items) => items.orderStatus !== "Completed" && items.orderStatus !== "Canceled" ? updateOrder(items._id) : null)

        if (order) { res.status(200).json(order) }
    } catch (error) {
        res.status(404).json({ error: "Invalid data" })

    }

})
const getById = expressAsyncHandler(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params._id);

        if (order) {
            res.status(200).json(order);
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        next(error);
    }
})

const updateOrder = expressAsyncHandler(async (req, res, next) => {
    try {
        const { link, qty } = req.body;

        const order = await Order.findByIdAndUpdate(req.params._id);
        if (order) {
            order.orderItems = {
                link,
                qty,
            }
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        }
        else {
            res.status(404);
            throw new Error("Order Not Found");
        }
    } catch (error) {
        next(error);
    }
})

const updateStatus = expressAsyncHandler(async (req, res) => {
    // const {ic} = req.body;
    const order = await Order.findById(req.params._id);
    const params = new URLSearchParams()
    params.append('key', process.env.KEY2)
    params.append('action', 'status')
    params.append('order', order.orderItems[0].order)
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }
    const { data } = await axios.post('https://1dg.me/api/v2', params, config)
    if (order) {
        if (data.error === undefined) {
            order.orderStatus = data.status,
                order.charge = data.charge,
                order.remains = data.remains,
                order.start_count = data.start_count
        }
        const updatedOrder = await order.save();
        res.json({
            updatedOrder
        });
    }
    else {
        res.status(404);
        throw new Error("Order Not Found");
    }

})


const deleteOrderById = expressAsyncHandler(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params._id);

        if (order) {
            await order.remove();
            return res.json({ success: true })
        }
        else return res.json({ success: false })
    } catch (error) {
        next(error);
    }
})
const getALLOrder = expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.find({}).sort({ _id: -1 })
        // console.log(123);
        if (order) { res.status(200).json(order) }
    } catch (error) {
        res.status(404).json({ error: "Invalid data" })

    }

})

const findByStatus = expressAsyncHandler(async (req, res, next) => {
    try {
        const { Status, id, IDorder, link, service } = req.body


        if (IDorder !== "" && IDorder !== undefined) {
            const order = await Order.find({ "orderItems.order": IDorder, user: id }).sort({})
            return res.status(200).json(order)

        }
        if (link !== "" && link !== undefined) {
            const order = await Order.find({ "orderItems.link": link, user: id }).sort({})
            return res.status(200).json(order)

        }
        // console.log(link)
        if (service !== "" && service !== undefined) {
            const order = await Order.find({ "orderItems.service": service, user: id }).sort({})
            return res.status(200).json(order)

        }
        if (Status !== "ALL" && Status !== "") {
            const order = await Order.find({ orderStatus: Status, user: id }).sort({})

            return res.status(200).json(order)
        }
        if (Status === "ALL") {
            const order = await Order.find({ user: id }).sort({})
            return res.status(200).json(order)
        }

    } catch (error) {
        next(error)
    }
})
module.exports = { createOrder, getByUser, getById, updateOrder, deleteOrderById, getALLOrder, updateStatus, findByStatus }
