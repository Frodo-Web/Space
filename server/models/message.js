const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema(
    {
        type: { type: String, enum: ['post', 'message'], required: true },
        from: { type: Schema.Types.ObjectId, ref: 'User' },
        to: { type: Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        media: [{type: Schema.Types.ObjectId, ref: 'Media'}],
        time: { type: Date, default: () => Date.now() }
    }
);

module.exports = mongoose.model('Message', messageSchema);