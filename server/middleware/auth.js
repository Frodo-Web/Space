const jwt = require("jsonwebtoken");
const config = process.env;

const authDrop = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ info: "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        console.log(req.user)
    } catch (err) {
        return res.status(401).json({ info: "Invalid Token" });
    }
    return next();
};

module.exports = authDrop;