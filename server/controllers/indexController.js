const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.index_GET = async (req, res, next) => {
    try {
        res.status(200).json({success: '/index'});
    } catch (err) {
        return next(err);
    }
};
exports.logout_GET = async (req, res, next) => {
//    res.cookie('token', '', { expires: new Date(Date.now() + 1), httpOnly: true} );
    res.clearCookie('token', { httpOnly: true, sameSite: 'Strict' });
    res.status(200).json({success: 'Logout successfully'});
}
exports.signIn_POST = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({ error: 'All input is required' });
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                }
            );
            //         const { password, ...userData } = user._doc;
            //         res.status(200).json( { user: userData, token });
            res.cookie('token', token, { httpOnly: true, sameSite: 'Strict' });
            res.status(200).json({ user, token });
        } else {
            res.status(400).json({ error: 'Invalid Credentials' });
        }
    } catch (err) {
        return next(err);
    }
};
exports.signUp_POST = async (req, res, next) => {
    try {
        const { email, password, firstname, lastname } = req.body;
        if (!(email && password && firstname && lastname)) {
            res.status(400).json({ error: 'All input is required' });
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            res.status(409).json({ error: 'User Already Exist. Please Login' });
        }
        else {
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email,
                password: encryptedPassword,
                firstname,
                lastname,
            }).save(err => {
                if (err) {
                    return next(err);
                }
                res.redirect("/");
            });
        }
    } catch (err) {
        return next(err);
    }
};
