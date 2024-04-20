var mongoose = require('mongoose');

var JournalInformationSchema = mongoose.Schema({
    //Boolean
    new_date: {//?
        type: Date
    },
    frameNumber: {
        type: String
    },
    ISSN: {
        type: String
    }, bookName: {
        type: String
    },
    STAT: {
        type: String
    },
    ES: {
        type: String
    },
    PS: {
        type: String
    },
    Volume: {
        type: String
    },
    REMK: {
        type: String
    },
    eissn: {
        type: String
    },
    LIVstart: {
        type: Number
    },
    LIVend: {
        type: Number
    },
    LIVx: {
        type: Array
    },
    history: {
        type: Array
    },
    LIrange: {
        type: Array
    }
});

//export JournalInformation schema
var JournalInformation = module.exports = mongoose.model('JournalInformation', JournalInformationSchema);

//function
module.exports.addJournal = function (newPersonal, callback) {
    newPersonal.save(callback);
}

module.exports.getAll = function (callback) {
    var ft = {};
    JournalInformation.find(ft).sort({ frameNumber: 'descending' }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);

        }//TODO:error handle
        callback(SearchResult);
    });
}

module.exports.checkissnExistence = function (issn_num, callback) {
    var ft = { ISSN: { $eq: issn_num } };
    JournalInformation.exists(ft, function (err, doc) {
        if (err) {
            console.log(err);
            callback(false);
        } else {
            //console.log("Result :", doc) // false
            if (doc) {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
}

module.exports.getByNameStart = function (headALPHA, callback) {
    var ft = null;
    if (headALPHA === "1") {//現勘
        ft = { STAT: { $eq: '現刊' } };
    } else if (headALPHA === "2") {//電子
        ft = { ES: { $ne: '無' } };
    } else if (headALPHA === "3") {//紙本
        ft = { PS: { $ne: '無' } };
    } else {
        ft = { bookName: { $regex: "^" + headALPHA, $options: 'i' } };//TODO資安問題
    }
    JournalInformation.find(ft).sort({ frameNumber: 'descending' }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);

        }//TODO:error handle
        callback(SearchResult);
    });
}

module.exports.FormatER = function (d) {
    var rowsDATA = [];
    d.forEach(element => {
        var tmpobj = {};
        tmpobj.id = element.id;
        tmpobj.placeNumber = element.frameNumber;
        tmpobj.issn = element.ISSN;
        tmpobj.mainName = element.bookName;
        tmpobj.stat = element.STAT;
        tmpobj.eSource = element.ES;
        tmpobj.pSource = element.PS;
        tmpobj.datas = element.Volume;
        tmpobj.someStuff = element.REMK;
        tmpobj.existTime = `起始:${element.LIVstart};終止:${element.LIVend};停定年分(負面表列):${element.LIVx};`;
        tmpobj.updateTime = element.new_date;
        tmpobj.eissn = element.eissn;
        tmpobj.TIMEs = element.LIVstart;
        tmpobj.TIMEe = element.LIVend;
        tmpobj.TIMEn = JSON.stringify(element.LIVx).replace('[', '').replace(']', '');
        rowsDATA.push(tmpobj);
    });
    return rowsDATA;
}

module.exports.getAllFormat = function (callback) {
    JournalInformation.getAll((d) => {
        callback(JournalInformation.FormatER(d));
    });
}

module.exports.getByYear = function (callback) {

    //TODO痾....這裡長草了是吧
}

module.exports.getByNameStartFormat = function (headALPHA, callback) {
    JournalInformation.getByNameStart(headALPHA, (d) => {
        callback(JournalInformation.FormatER(d));
    });

}

module.exports.gethis = function (id2del, callback) {
    JournalInformation.findById({ $eq: id2del }, (e, ans) => {
        if (e) {//error occurs
            callback(null);
        } else {
            if (ans) {
                var this_all = Object.assign({}, ans);
                var this_his = Object.assign([], ans ? ans.history : []);
                //console.log(ans.history);
                this_all.history = [];
                //console.log(this_all);
                this_his.push(this_all);
                callback(this_his);
            } else {
                callback([]);
            }
        }
    });
}

module.exports.del = function (id2del, callback) {
    JournalInformation.findByIdAndDelete({ $eq: id2del }, callback);
}

module.exports.findDuplicate0 = function (callback) {
    JournalInformation.aggregate([
        { "$group": { "_id": "$frameNumber", "count": { "$sum": 1 } } },
        { "$match": { "_id": { "$ne": null }, "count": { "$gt": 1 } } },
        { "$sort": { "count": -1 } },
        { "$project": { "frameNumber": "$_id", "_id": 0 } }
    ]).exec((err, SearchResult) => {
        if (err) { console.warn(err) }
        callback(SearchResult)
    });
}

module.exports.findDuplicate1 = function (callback) {
    JournalInformation.aggregate([
        { "$group": { "_id": "$ISSN", "count": { "$sum": 1 } } },
        { "$match": { "_id": { "$ne": null }, "count": { "$gt": 1 } } },
        { "$sort": { "count": -1 } },
        { "$project": { "ISSN": "$_id", "_id": 0 } }
    ]).exec((err, SearchResult) => {
        if (err) {
            console.warn(err);
            callback(null)
        } else {

            callback(SearchResult)
        }
    });
}

module.exports.findDuplicate2 = function (callback) {
    JournalInformation.aggregate([
        { "$group": { "_id": "$eissn", "count": { "$sum": 1 } } },
        { "$match": { "_id": { "$ne": null }, "count": { "$gt": 1 } } },
        { "$sort": { "count": -1 } },
        { "$project": { "eissn": "$_id", "_id": 0 } }
    ]).exec((err, SearchResult) => {
        if (err) {
            console.warn(err);
            callback(null)
        } else {

            callback(SearchResult)
        }
    });
}

module.exports.findDuplicate3 = function (callback) {
    JournalInformation.aggregate([
        { "$group": { "_id": "$bookName", "count": { "$sum": 1 } } },
        { "$match": { "_id": { "$ne": null }, "count": { "$gt": 1 } } },
        { "$sort": { "count": -1 } },
        { "$project": { "bookName": "$_id", "_id": 0 } }
    ]).exec((err, SearchResult) => {
        if (err) {
            console.warn(err);
            callback(null)
        } else {

            callback(SearchResult)
        }
    });
}
/**
 * FDpostProcessing都是格式化過的
 * @param {*} preP 
 * @param {*} callback 
 */
module.exports.FDpostProcessing0 = function (preP, callback) {
    if (preP && preP.length > 0) {
        var tmpA = [];
        function findinner(i) {
            if (i < preP.length) {
                var ft = { frameNumber: { $eq: preP[i].frameNumber } };
                JournalInformation.find(ft).sort({ frameNumber: 'descending' }).exec((err, SearchResult) => {
                    if (err) {
                        console.log(err);
                        callback(null);
                    } else {
                        tmpA = tmpA.concat(SearchResult);
                        findinner(i + 1);
                    }
                });
            } else {
                callback(JournalInformation.FormatER(tmpA));
            }
        }
        findinner(0);
    } else {
        callback(null);
    }
}
module.exports.FDpostProcessing1 = function (preP, callback) {
    if (preP && preP.length > 0) {
        var tmpA = [];
        function findinner(i) {
            if (i < preP.length) {
                var ft = { ISSN: { $eq: preP[i].ISSN } };
                JournalInformation.find(ft).sort({ ISSN: 'descending' }).exec((err, SearchResult) => {
                    if (err) {
                        console.log(err);
                        callback(null);
                    } else {
                        tmpA = tmpA.concat(SearchResult);
                        findinner(i + 1);
                    }
                });
            } else {
                callback(JournalInformation.FormatER(tmpA));
            }
        }
        findinner(0);
    } else {
        callback(null);
    }
}
module.exports.FDpostProcessing2 = function (preP, callback) {
    if (preP && preP.length > 0) {
        var tmpA = [];
        function findinner(i) {
            if (i < preP.length) {
                var ft = { eissn: { $eq: preP[i].eissn } };
                JournalInformation.find(ft).sort({ eissn: 'descending' }).exec((err, SearchResult) => {
                    if (err) {
                        console.log(err);
                        callback(null);
                    } else {
                        tmpA = tmpA.concat(SearchResult);
                        findinner(i + 1);
                    }
                });
            } else {
                callback(JournalInformation.FormatER(tmpA));
            }
        }
        findinner(0);
    } else {
        callback(null);
    }
}
module.exports.FDpostProcessing3 = function (preP, callback) {
    if (preP && preP.length > 0) {
        var tmpA = [];
        function findinner(i) {
            if (i < preP.length) {
                var ft = { bookName: { $eq: preP[i].bookName } };
                JournalInformation.find(ft).sort({ bookName: 'descending' }).exec((err, SearchResult) => {
                    if (err) {
                        console.log(err);
                        callback(null);
                    } else {
                        tmpA = tmpA.concat(SearchResult);
                        findinner(i + 1);
                    }
                });
            } else {
                callback(JournalInformation.FormatER(tmpA));
            }
        }
        findinner(0);
    } else {
        callback(null);
    }
}