const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        email: { type: String, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        avatar:
        {
            url: { type: String },
            contentType: { type: String }
        },
        friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
    }
);

module.exports = mongoose.model('User', userSchema);