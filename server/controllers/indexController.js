const User = require('../models/user');

exports.index_GET = (req, res, next) => {
    res.json("Start page");
};
exports.signIn_POST = (req, res, next) => {
    res.json("Sign in");
};
exports.signUp_POST = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }).save(err => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
