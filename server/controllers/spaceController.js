const User = require('../models/user');

exports.index = async (req, res, next) => {
   try {
       const user = await User.findById(req.user.user_id).lean();
       const { password, ...userData } = user;
       res.status(200).json(userData);
   } catch(err) {
       next(err);
   }
};