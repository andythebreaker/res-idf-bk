const { Binary } = require('mongodb');
var mongoose = require('mongoose');

var swipe_editSchema = mongoose.Schema({
    new_date: {
        type: Date
    },
    topic: {
        type: String
    },
    txt: {
        type: String
    },
    btons: {
        type: Array
    },
    pic: {
        type: String
    },
    ChansuNoJunban: {//排序
        type: Number
    }
});

//export JournalInformation schema
var swipe_edit = module.exports = mongoose.model('swipe_edit', swipe_editSchema);

//function
module.exports.addswipe_edit = function (newexcelData, callback) {//這只是一個別名，跟excel沒關係
    newexcelData.save(callback);
};

module.exports.getList = function (callback) {
    const filter = {};
    swipe_edit.find(filter).sort({ ChansuNoJunban: 'descending' }).exec((err, SearchResult) => {
        if (err) {
            console.log("======================");
            console.log(err);
            console.log("======================");
        }
        callback(SearchResult);
    });
};

module.exports.delById = function (MODid, callback) {//L側板上升
    swipe_edit.findByIdAndDelete({$eq:MODid}, callback);
};

module.exports.MODFdn = function (MODid, callback) {//L側板下降
    if (MODid) {
        var ChansuNoJunban_tmp = -1;
        swipe_edit.findById({$eq:MODid}, function (err, stuff) {
            if (err) {
                console.log(err);
            }
            ChansuNoJunban_tmp = stuff.ChansuNoJunban;
            //logic:
            if (ChansuNoJunban_tmp - 1 >= 0) {
                const filter = { ChansuNoJunban: { $lt: ChansuNoJunban_tmp } };
                swipe_edit.find(filter).sort({ ChansuNoJunban: 'descending' }).exec((err2, SearchResult) => {
                    if (err2) {
                        console.log(err2);
                    }
                    if (SearchResult.length > 0) {
                        ChansuNoJunban_tmp = SearchResult[0].ChansuNoJunban;
                        swipe_edit.findByIdAndUpdate({$eq:SearchResult[0].id}, { $set: { ChansuNoJunban: stuff.ChansuNoJunban } }, {}, () => {
                            swipe_edit.findByIdAndUpdate({$eq:MODid}, { $set: { ChansuNoJunban: ChansuNoJunban_tmp } }, {}, callback);
                        });
                    }
                });
            } else { callback(); }
        });
    }
    else {
        callback();
    }
};

module.exports.MODFup = function (MODid, callback) {//L側板上升
    if (MODid) {
        var ChansuNoJunban_tmp = -1;
        swipe_edit.findById({$eq:MODid}, function (err, stuff) {
            if (err) {
                console.log(err);
            }
            ChansuNoJunban_tmp = stuff.ChansuNoJunban;
            //logic:
            //if (ChansuNoJunban_tmp - 1 >= 0) {
            const filter = { ChansuNoJunban: { $gt: ChansuNoJunban_tmp } };
            swipe_edit.find(filter).sort({ ChansuNoJunban: 'ascending' }).exec((err2, SearchResult) => {
                if (err2) {
                    console.log(err2);
                }
                if (SearchResult.length > 0) {
                    ChansuNoJunban_tmp = SearchResult[0].ChansuNoJunban;
                    swipe_edit.findByIdAndUpdate(SearchResult[0].id, { $set: { ChansuNoJunban: stuff.ChansuNoJunban } }, {}, () => {
                        swipe_edit.findByIdAndUpdate(MODid, { $set: { ChansuNoJunban: ChansuNoJunban_tmp } }, {}, callback);
                    });
                } else { callback(); }
            });
        });
    } else {
        callback();
    }
};