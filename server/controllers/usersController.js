const User = require('../models/user');

exports.index = (req, res, next) => {
    async function findUsers(callback) {
        try {
            const users = await User.find({}, '_id firstname lastname').sort({_id: 'desc'}).lean();
            console.log(users)
            return users
        }
        catch(err) {
            next(err);
        }
    }
    findUsers().then((users) => res.json(users)).catch(err => next(err));
};