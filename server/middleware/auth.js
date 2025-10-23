const express = require('express');
const jwt = require("jsonwebtoken")
const JWT_TOKEN = process.env.JWT_TOKEN

module.exports = function(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) {
        res.status(401).json({message: "No token, authorization denied"})
    }
    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({message: "Token is not valid"})
    }
}