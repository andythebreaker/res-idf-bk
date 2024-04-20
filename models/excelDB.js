var mongoose = require('mongoose');
const { printTable } = require('console-table-printer');

var excelSchema = mongoose.Schema({
    new_date: {
        type: Date
    },
    batabaseClass: {
        type: String
    },
    topic: {
        type: String
    },
    payload: {
        type: String
    },
    ipaddress: {
        type: String
    },
    ChansuNoJunban: {//排序
        type: Number
    }
});

//export JournalInformation schema
var excelData = module.exports = mongoose.model('excelData', excelSchema);

//function
module.exports.addexcelData = function (newexcelData, callback) {
    newexcelData.save((e, r) => { callback(e, r); });
};

module.exports.countClass = function (excelclass, callback) {
    var stuf2return = -1;
    const filter = { batabaseClass: { $eq: excelclass } };
    excelData.count(filter, (err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        //stuf2return = SearchResult.length;
        callback(SearchResult);
    });
};

module.exports.getMAXChansuNoJunban = function (excelclass, callback) {
    var stuf2return = -1;
    const filter = { batabaseClass: { $eq: excelclass } };
    excelData.find(filter).sort({ ChansuNoJunban: 'descending' }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        if (SearchResult[0]) {
            stuf2return = SearchResult[0].ChansuNoJunban;
        } else {
            stuf2return = 1;
        }
        callback(stuf2return);
    });
};

module.exports.getIDofMINChansuNoJunban = function (excelclass, callback) {
    var stuf2return = -1;
    const filter = { batabaseClass: { $eq: excelclass } };
    excelData.find(filter).sort({ ChansuNoJunban: 'ascending' }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        if (SearchResult[0]) {
            stuf2return = SearchResult[0].id;
        }
        callback(stuf2return);
    });
};

module.exports.arrayAllClass = function (excelclass, callback) {
    const filter = { batabaseClass: { $eq: excelclass } };
    excelData.find(filter).sort({ ChansuNoJunban: 'ascending' }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        var RTname = [];
        var RTid = [];
        for (let index = 0; index < SearchResult.length; index++) {
            //TODO如果資料量太大是不是會爆掉
            const element = SearchResult[index];
            RTname.push(element.topic || "[ERROR] DB item is NULL");
            RTid.push(element.id || "[ERROR] DB item is NULL");
        }
        callback(RTid, RTname);
    });
};

module.exports.getPayloadById = function (dbclassname, MODid, callback) {
    var ST = "Sorry, there seems to be something wrong!";
    var SP = "Sorry, there seems to be something wrong!";
    var doAGAINwithDEFAULT = false;
    excelData.findById({ $eq: MODid }, function (err, stuff) {
        if (err) {
            //Create a table
            const err_msg = [
                { mistake: '101@models/excelDB.js', message: String(err), handled_properly: "You don't need to worry about this error" }];

            //print
            printTable(err_msg);
            doAGAINwithDEFAULT = true;
        }
        if (stuff) {
            if (stuff.topic) {
                ST = stuff.topic;
            } else {
                doAGAINwithDEFAULT = true;
            }
            if (stuff.payload) {
                SP = stuff.payload;
            } else {
                doAGAINwithDEFAULT = true;
            }
        } else {
            doAGAINwithDEFAULT = true;
        }
        if (doAGAINwithDEFAULT) {
            console.log("use min");
            excelData.getIDofMINChansuNoJunban(dbclassname, (min_id) => {
                //這一段是用複製的，跑預設index最小
                excelData.findById(min_id, function (err2, stuff2) {
                    if (err2) {
                        console.log(err2);
                    }
                    if (stuff2) {
                        if (stuff2.topic) {
                            ST = stuff2.topic;
                        } if (stuff2.payload) {
                            SP = stuff2.payload;
                        }
                    }
                    callback(ST, SP);
                });
            });
        } else { callback(ST, SP); }
    });
};

module.exports.MODFdn = function (MODid, callback) {//L側板下降
    var ChansuNoJunban_tmp = -1;
    excelData.findById({ $eq: MODid }, function (err, stuff) {
        if (err) {
            console.log(err);
        }
        ChansuNoJunban_tmp = stuff.ChansuNoJunban;
        //logic:
        if (ChansuNoJunban_tmp - 1 >= 0) {
            const filter = { $and: [{ batabaseClass: { $eq: stuff.batabaseClass } }, { ChansuNoJunban: { $lt: ChansuNoJunban_tmp } }] };
            excelData.find(filter).sort({ ChansuNoJunban: 'descending' }).exec((err2, SearchResult) => {
                if (err2) {
                    console.log(err2);
                }
                if (SearchResult.length > 0) {
                    ChansuNoJunban_tmp = SearchResult[0].ChansuNoJunban;
                    excelData.findByIdAndUpdate({ $eq: SearchResult[0].id }, { $set: { ChansuNoJunban: stuff.ChansuNoJunban } }, {}, () => {
                        excelData.findByIdAndUpdate(MODid, { $set: { ChansuNoJunban: ChansuNoJunban_tmp } }, {}, callback);
                    });
                }
            });
        }
    });
};

module.exports.MODFup = function (MODid, callback) {//L側板上升
    var ChansuNoJunban_tmp = -1;
    excelData.findById({ $eq: MODid }, function (err, stuff) {
        if (err) {
            console.log(err);
        }
        ChansuNoJunban_tmp = stuff.ChansuNoJunban;
        //logic:
        //if (ChansuNoJunban_tmp - 1 >= 0) {
        const filter = { $and: [{ batabaseClass: { $eq: stuff.batabaseClass } }, { ChansuNoJunban: { $gt: ChansuNoJunban_tmp } }] };
        excelData.find(filter).sort({ ChansuNoJunban: 'ascending' }).exec((err2, SearchResult) => {
            if (err2) {
                console.log(err2);
            }
            if (SearchResult.length > 0) {
                ChansuNoJunban_tmp = SearchResult[0].ChansuNoJunban;
                excelData.findByIdAndUpdate({ $eq: SearchResult[0].id }, { $set: { ChansuNoJunban: stuff.ChansuNoJunban } }, {}, () => {
                    excelData.findByIdAndUpdate({ $eq: MODid }, { $set: { ChansuNoJunban: ChansuNoJunban_tmp } }, {}, callback);
                });
            }
        });
        //}
    });
};

module.exports.delById = function (MODid, callback) {//L側板上升
    excelData.findByIdAndDelete({ $eq: MODid }, callback);
};