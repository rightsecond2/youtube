const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,//이렇게 넣으면 유저의 모든 정보를 긁어올 수 있음.
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50,
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number,
    },
    filePath: {
        type: String,
    },
    catogory: String,
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })//타임스탬프를 줘야 만든날과 업데이트날이 표사가 됨.


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }