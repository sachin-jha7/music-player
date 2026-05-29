const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/user");


const signup = async (req, res, next) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json("Invalid Data");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    next();
}


const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("login needed");
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json("Wrong email or password!");
    }

    // console.log(existingUser)

    const checkUser = await bcrypt.compare(password, existingUser.password);
    if (!checkUser) {
        return res.status(400).json("Wrong email or password!");
    }

    const token = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    next();
}


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


const logout = (req, res, next) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });
    next();
}


module.exports = { login, logout, signup, verify };
