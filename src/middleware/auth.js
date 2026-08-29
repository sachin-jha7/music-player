const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const User = require("../models/user");



const verify = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        // res.redirect("/tunes");
        req.user = null;
        return next();
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json(err);
        next();
    }
}



module.exports = { verify };