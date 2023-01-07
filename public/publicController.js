import User from "../modal/userModal.js";
import Product from "../modal/Product.js";
import Order from "../modal/Order.js";
import CashFlow from "../modal/CashFlow.js";
import Waller from "../modal/Waller.js";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";
const apiPublic = expressAsyncHandler(async (req, res, next) => {
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    try {
        const { apiKey, action } = req.body;
        if (apiKey === "" && action === "") {
            res.json({ "error": "Incorrect request" })
        }
        else {
            const user = await User.findOne({ apiKey })

            if (user) {
                const userId = user._id
                if (action === "services") {
                    try {
                        const products = await Product.find({})
                        res.status(200).json(products)
                    } catch (error) {
                        next(error)
                    }
                }
                else if (action === "add") {
                    const { service, link, quantity } = req.body;
                    if (service === "" && quantity === "" && quantity === "") {
                        res.json({ "error": "All fields can not empty" })
                    }
                    else {
                        const wallet = await Waller.findOne({ user: userId });
                        const product = await Product.findOne({ service });
                        if (product) {
                            const totalPrice = (quantity * product.rate) / 1000
                            const params = new URLSearchParams()

                            params.append('key', '625b170a0e19b79d9e97c36b0d0d8225')
                            params.append('action', 'add')
                            params.append('service', service)
                            params.append('link', link)
                            params.append('quantity', quantity)

                            if (quantity >= product.min && quantity <= product.max) {
                                if (wallet.balance > totalPrice) {
                                    try {

                                        const { data } = await axios.post(`https://1dg.me/api/v2`, params, config);

                                        const order = new Order({
                                            orderItems: {
                                                qty: quantity,
                                                link: link,
                                                service,
                                                order: 123,
                                                name: product.name.split(`${product.category} | `)[1]
                                            },
                                            user: userId,
                                            totalPrice,
                                        });
                                        const wallet = await Waller.findOneAndUpdate(
                                            { user: userId },
                                            { $inc: { balance: -(totalPrice) } },
                                            { new: true }
                                        );
                                        const cashFlow = await CashFlow.create({
                                            order:123,
                                            spending:123,
                                            user: userId,
                                            remainingMoney:123,
                                            type:"Add order"
                                        })
                                        const createCashFlow = await cashFlow.save();
                                        const createOrder = await order.save();
                                        res.status(201).json(createOrder);
                                    } catch (error) {
                                        next(error)
                                    }
                                }
                                else {
                                    return res.json({ "error": "Not enough funds" })
                                }
                            }
                            else {
                                return res.json({ "error": `Min/Max order is: ${product.min}/${product.max}` })


                            }
                        }
                        else {
                            res.json({ "error": "Service incorrect request" })

                        }
                    }
                }
                else if (action === "status") {
                    try {
                        const { order } = req.body
                        if (order === undefined || order === "") {

                            res.json({ "error": "All fields can not empty" })
                        }
                        else {
                            const params = new URLSearchParams()
                            params.append('key', '6b45b91c3ab933089e7c5619ca4d4f8c')
                            params.append('action', 'add')
                            params.append('service', order)
                            const { data } = await axios.post(`https://1dg.me/api/v2`, params, config);
                            if (data.error === undefined) {
                                return res.json(data)
                            }
                            else {
                                return res.json({ "error": "Order Incorrect request" })
                            }

                        }
                    } catch (error) {
                        next(error)
                    }
                }
                else if (action === "balance") {
                    const wallet = await Waller.findOne({ user: userId });
                    return res.json({ "balance": wallet.balance })

                }
            }
            else {
                return res.json({ "error": "Incorrect request" })
            }
        }
    } catch (error) {
        next(error);
    }
})

export default apiPublic