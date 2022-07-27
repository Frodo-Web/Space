const User = require('../models/user');
const Message = require('../models/message');

exports.index = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.user_id).lean();
        const { password, ...userData } = user;
        res.status(200).json(userData);
    } catch (err) {
        next(err);
    }
};
exports.wall_POST = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.user_id);
        const { firstname, lastname } = user;
        if(req.body.text.length > 3200) return res.status(400).json("The message is too long");
        const message = new Message({
            type: 'post',
            from: user._id,
            text: req.body.text,
        });
        message.save(err => {
            if (err) {
                return next(err);
            }
        });

        res.status(200).json("The message has been posted successfully");
    } catch (err) {
        next(err);
    }
};
exports.wall_GET = async (req, res, next) => {

    const postsInResponse = 15;

    const isIsoDate = (str) => {
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
        const d = new Date(str);
        return d.toISOString() === str;
    }

    try {
        const count = await Message.countDocuments({});
        console.log(`total document: ${count}`);
        if (req.query) {
            if (isIsoDate(req.query.bottomPostTime)) {
                const messages = await Message.find({ time: { $lt: req.query.bottomPostTime } }, { _id: 0, from: 1, text: 1, time: 1 })
                    .lean()
                    .sort({ time: -1 })
                    .limit(postsInResponse)
                    .populate('from', { _id: 0, firstname: 1, lastname: 1 });
                res.status(200).json(messages);

            } else {
                const messages = await Message.find({}, { _id: 0, from: 1, text: 1, time: 1 })
                    .lean()
                    .sort({ time: -1 })
                    .limit(postsInResponse)
                    .populate('from', { _id: 0, firstname: 1, lastname: 1 });
                res.status(200).json(messages);
            }
        }

    } catch (err) {
        next(err);
    }
}