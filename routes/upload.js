var express = require('express');
var router = express.Router();
var multer = require('multer');
const storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { /*fields: 1, */fileSize: 6000000, files: 1/*, parts: 2 */ } });
var empty = require('is-empty');
var Isemail = require('isemail');
var isEqual = require('is-equal');
var passport = require('passport');
var sanitizer = require('sanitizer');
var LocalStrategy = require('passport-local').Strategy;
var randomstring = require("randomstring");
const sharp = require('sharp');

//import Data Model
var swipe_edit = require('../models/swipe_edit');

router.post('/swipe_edit', ensureAuthenticated, upload.single('pic'), function (req, res, next) {

    var topic = req.body.topic;
    var txt = req.body.txt;
    var btons = req.body.btons;
    const pic = req.file.buffer;


    image = "data:image/jpeg;base64," + pic.toString('base64');

    //console.log(JSON.parse(btons));
    //console.log(btons);
    //console.log(`
    //console.log(JSON.parse(btons));
    //console.log(btons);`);

    var newswipe_edit = new swipe_edit({
        topic: topic,
        txt: txt,
        btons: JSON.parse(btons),
        pic: image,
        ChansuNoJunban: req.body.ChansuNoJunban
    });

    swipe_edit.addswipe_edit(newswipe_edit, function (err, user) {
        if (err) {
            res.status(500).send("db error")

        } else {
            res.status(200).send("success")

        }
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.error("@routes/upload.js Authenticated faild")
        res.redirect('/users/login');
    }
}

module.exports = router;
