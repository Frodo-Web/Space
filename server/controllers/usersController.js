const User = require('../models/user');

exports.index = (req, res, next) => {
    async function findUsers(callback) {
        try {
            const users = await User.find({}, '_id firstname lastname registeredAt').sort({registeredAt: 'desc'}).lean();
            return users
        }
        catch(err) {
            next(err);
        }
    }
    findUsers().then((users) => res.status(200).json(users)).catch(err => next(err));
};