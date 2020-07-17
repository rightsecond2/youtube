const express = require('express');
const router = express.Router();


const { Subscriber } = require("../models/Subscriber");

//구독자 수
router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })
})

//구독중인지
router.post('/subscribed', (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
        .exec((err, subscribed) => {
            if (err) return res.status(400).send(err);
            let result = false;
            if (subscribed.length !== 0) {
                result = true
            }
            res.status(200).json({ success: true, subscribed: result })
        })
})
//구독취소
router.post('/unSubscribe', (req, res) => {
    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, doc })
        })
})
//구독하기
router.post('/doSubscribe', (req, res) => {
    const doSubscribe = new Subscriber(req.body)
    doSubscribe.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })
})



module.exports = router;
