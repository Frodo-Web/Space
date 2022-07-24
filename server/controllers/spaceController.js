const User = require('../models/user');
const Message = require('../models/message');

exports.index = async (req, res, next) => {
   try {
       const user = await User.findById(req.user.user_id).lean();
       const { password, ...userData } = user;
       res.status(200).json(userData);
   } catch(err) {
       next(err);
   }
};
exports.wall_POST = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.user_id);
        const { firstname, lastname } = user;
        const message = new Message({
            type: 'post',
            from: user._id,
            text: req.body.text,
        });
        message.save(err => {
            if(err) {
                return next(err);
            }
        });
        
        res.status(200).json("The message has been posted successfully");
    } catch(err) {
        next(err);
    }
};
exports.wall_GET = async (req, res, next) => {
    try {
        const messages = await Message.find({}, { _id: 0, from: 1, text: 1, time: 1 }).lean().populate('from', { _id: 0, firstname: 1, lastname: 1});
        res.status(200).json(messages);
    } catch(err) {
        next(err);
    }
}