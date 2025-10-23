import express from 'express';
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET

export default function(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) {
        res.status(401).json({message: "No token, authorization denied"})
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({message: "Token is not valid"})
    }
}