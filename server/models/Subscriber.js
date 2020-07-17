const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })//타임스탬프를 줘야 만든날과 업데이트날이 표사가 됨.


const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }