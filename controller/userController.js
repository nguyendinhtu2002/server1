// const express = require('express');
// const User = require('../modal/userModal');
// const bcrypt = require('bcryptjs');
// const expressAsyncHandler = require('express-async-handler');
// const {  generateToken } = require('../utils/generateToken');

import express from 'express';
import User from "../modal/userModal.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken, refreshToken } from "../utils/generateToken.js";
import randomstring from "randomstring"
import nodemailer from "nodemailer"
const register = expressAsyncHandler(async (req, res, next) => {
    try {

        const { name, email, password, apiKey } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" })
        }
        else {
            const user = await User.create({
                name,
                email,
                password,
                apiKey
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                });
            } else {
                res.status(400).json({ message: "Invalid User Data" })

            }
        }

    } catch (error) {
        next(error);
    }
})

const Login = expressAsyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                // createdAt: user.createdAt,
            });
        } else {
            return res.status(401).json({ error: 'Invalid Email or Password' })
        }
    } catch (error) {
        next(error);
    }
})

const forgotPassword = expressAsyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const paswordNew = randomstring.generate(10);
            user.password = paswordNew;
            const updatedUser = await user.save();
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'nguyendinhtu11022002@gmail.com',
                    pass: 'dipotwokkbgjlryq'
                }
            });

            var mailOptions = {
                from: '1dg.com',
                to: email,
                subject: 'Password reset',
                text: `New password: ${paswordNew}
You must change password at next signin
                `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.status(200).json({ message: "Check your email inbox to get new password." })
        }
        else {
            return res.status(400).json({ message: "User not exists" })
        }
    } catch (error) {
        next(error);
    }
})
const getUserById = expressAsyncHandler(async (req, res, next) => {
    try {

        const user = await User.findById(req.params._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                money: user.money,
                createdAt: user.createdAt,
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        next(error)
    }
})

const updateEmail = expressAsyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findById(req.user._id);
        // console.log(user)
        if (user) {
            const userExists = await User.findOne({ email });
            if (userExists) {
                res.status(400).json({ message: "Email already exists" })
            }
            else {
                user.email = email;
                await user.save();
                res.status(200).json({ message: "Email updated" })

            }
        }
    } catch (error) {
        next(error);


    }
})
const updateProfile = expressAsyncHandler(async (req, res, next) => {
    try {

        const { paswordold, paswordNew } = req.body;
        const user = await User.findById(req.params._id);

        if (user) {
            const checkPassword = await (user.matchPassword(paswordold))
            if ((!checkPassword)) {
                res.status(400).json({ message: 'Password incorrect' });
            }
            else {
                if (paswordNew) {
                    user.password = paswordNew;
                }
                const updatedUser = await user.save();
                res.json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                    createdAt: updatedUser.createdAt,

                    token: generateToken(updatedUser._id),
                });
            }
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        next(error);
    }
})

const updateMoney = expressAsyncHandler(async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id);
        const { money } = req.body;
        if (user) {
            if (money) {
                user.money = money;
            }
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                token: generateToken(updatedUser._id),
            });

        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        next(error);
    }
})

const getAllUsers = expressAsyncHandler(async (req, res) => {
    try {

        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error);
    }
})

const deleteUserById = expressAsyncHandler(async (req, res, next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');

        const user = await User.findById(req.params._id);
        if (user) {
            await user.remove();
            return res.json({ success: true })
        }
        else return res.json({ success: false })
    } catch (error) {
        next(error);
    }
})

const updateUser = expressAsyncHandler(async (req, res) => {
    const { money, isAdmin } = req.body;

    const user = await User.findById(req.user._id);
    if (user) {
        user.name = user.name;
        user.email = user.email;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})
const LoginAdmin = expressAsyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log(user);
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,
            });
        } else {
            res.status(401).json({ error: 'Invalid Email or Password' })
        }
    } catch (error) {
        next(error);
    }
})
const getApiKey = expressAsyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.params._id);
        if (user) {
            return res.json({ apiKey: user.apiKey })
        }
        else {
            return res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        next(error);
    }
})
const ChangeApiKey = expressAsyncHandler(async (req, res, next) => {
    try {
        const { apiKey } = req.body;
        const user = await User.findById(req.params._id);
        if (user) {
            user.apiKey = apiKey;
            const updatedKey = await user.save();
            res.json({ apiKey: updatedKey.apiKey })
        }
    } catch (error) {
        next(error);
    }
})
export { register, Login, updateProfile, getUserById, updateMoney, getAllUsers, updateEmail, deleteUserById, updateUser, LoginAdmin, getApiKey, ChangeApiKey, forgotPassword } 