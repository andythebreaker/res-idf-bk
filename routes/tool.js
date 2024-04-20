var express = require('express');
var nckulib = require('nckulib');
const textToImage = require('text-to-image');
var text2png = require('text2png');
const fontList = require('font-list');
const sharp = require('sharp');
var router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


router.post('/isbn2json', function (req, res, next) {
    try {
        nckulib.isbn_to_json(req.body.isbn, (ok) => {
            if (ok) {
                res.status(200).send(ok);
            } else {
                res.status(510).send("An error occurred in the communication with the general library, please contact the relevant technical staff to eliminate the error.");
            }
        });
    } catch (error) {
        res.status(510).send("An error occurred in the communication with the general library, please contact the relevant technical staff to eliminate the error.");

    }

});

router.get('/t2i', function (req, res, next) {
    //生成數字圖片的功能
    var img = text2png(req.query.txt, {
        color: 'blue', font: '70px Montserrat',
        localFontPath: 'Montserrat-Bold.ttf',
        localFontName: 'Montserrat'
    });
    sharp(img)
        .resize({
            width: 200,
            height: 200,
            fit: sharp.fit.contain, background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toFormat('png')
        .toBuffer()
        .then(data => {
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': data.length,
            });
            res.end(data);
        });

});

module.exports = router;
