var mongoose = require('mongoose');
var hash = require('object-hash');

var e3Schema = mongoose.Schema({
    new_date: {
        type: Date
    },
    sn2: {
        type: Number
    },
    osn2: {
        type: String
    },
    provider2: {
        type: String
    },
    c2: {
        type: String
    },
    Textafterexternallinkother2: {
        type: String
    },
    yPublished_External2: {
        type: String
    },
    mPublished_External2: {
        type: String
    },
    dPublished_External2: {
        type: String
    },
    Remarks_External2: {
        type: String
    }, file: {
        type: Buffer
    }, sub: {//副檔名
        type: String
    }, objhash: {
        type: String
    }
});

//export JournalInformation schema
var e3 = module.exports = mongoose.model('e3', e3Schema);

//function
module.exports.add = function (newOBJ, callback) {
    newOBJ.objhash = hash({ file: newOBJ.file });
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
    e3.lastTime(r => {

        e3.find({}).sort({ sn2: 1 }).exec((err, SearchResult) => {
            if (err) {
                console.log(err);
            }
            callback({ s: SearchResult, r: r });
        });
    });
}

module.exports.lastTime = function (callback) {
    e3.find({}).sort({ new_date: -1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback((SearchResult.length > 0) ? SearchResult[0].new_date.getFullYear() : 1997);
    });
}

module.exports.getMaxIndex = function (callback) {
    e3.find({}).sort({ sn: -1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback((SearchResult.length > 0) ? SearchResult[0].sn2 + 1 : 1);
    });
}

module.exports.delById = function (MODid, callback) {
    e3.findByIdAndDelete({ $eq: MODid }, (err, doc) => callback(err, doc));
};

module.exports.fileById = function (req_id, Ahash, callback) {
    e3.findById({ $eq: req_id }, function (err, adventure) {
        if (err) {
            console.log("可忽略的警告");
            console.log(err);
            callback(null);
        } else {
            if (adventure.objhash === Ahash) {
                callback((adventure.file && adventure.sub) ? { f: adventure.file, s: adventure.sub } : null);
            } else {
                console.log("hash of file is not same");
                callback(null);
            }
        }
    });
}

module.exports.upd = function (MODid, a1, a2, a3, a4, a5, a6, a7, a8, callback) {

    const filter = { $eq: MODid };
    const update = {
        osn2: a1,
        provider2: a2,
        c2: a3,
        Textafterexternallinkother2: a4,
        yPublished_External2: a5,
        mPublished_External2: a6,
        dPublished_External2: a7,
        Remarks_External2: a8
    };

    e3.findByIdAndUpdate(filter, update, (e, d) => {
        if (e) {
            console.log('error occurs when we try to report update')
            console.log(e); callback(e);
        } else {
            callback(null);
        }
    });
};