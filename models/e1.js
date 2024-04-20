var mongoose = require('mongoose');
//often used link
var e1Schema = mongoose.Schema({

    new_date: {
        type: Date
    },
    no: {
        type: Number
    },
    name: {
        type: String
    },
    url: {
        type: String
    },
    subcategory: {
        type: String
    }
});

//export JournalInformation schema
var e1 = module.exports = mongoose.model('e1', e1Schema);

//function
module.exports.add = function (newOBJ, callback) {
    newOBJ.save((e, r) => {
        if (e) {
            console.log(e);
            callback(null);
        } else {
            callback(r);
        }
    });
}

module.exports.frontend = function (callback) {
    e1.lastTime(r => {
        e1.find({}).sort({ no: 1 }).exec((err, SearchResult) => {
            if (err) {
                console.log(err);
            }
            callback({ s: SearchResult, r: r });
        });
    });
}
module.exports.lastTime = function (callback) {
    e1.find({}).sort({ new_date: -1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback((SearchResult.length > 0) ? SearchResult[0].new_date.getFullYear() : 1997);
    });
}

module.exports.getMaxIndex = function (callback) {
    e1.find({}).sort({ no: -1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback((SearchResult.length > 0) ? SearchResult[0].no + 1 : 1);
    });
}

module.exports.delById = function (MODid, callback) {
    e1.findByIdAndDelete({ $eq: MODid }, (err, doc) => callback(err, doc));
};
