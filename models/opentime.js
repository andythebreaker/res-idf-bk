const { Binary } = require('mongodb');//what on earth is this ??? XD
var mongoose = require('mongoose');
var moment = require('moment');
var momentTZ = require('moment-timezone');
var addZero = require('add-zero');
const keepinrange = require('keep-in-range');

var opentimeSchema = mongoose.Schema({
    new_date: {
        type: String//momentTZ().tz("Asia/Taipei").format('YYYY/MM/DD-HH:mm:ss')
    }, weekday: {
        type: Number
    },
    dateCHInoTime: {
        type: String
    },
    old_date: {
        type: Date
    },
    todayONOFF: {
        type: Boolean
    },
    sh: {
        type: Number
    },
    sm: {
        type: Number
    },
    eh: {
        type: Number
    },
    em: {
        type: Number
    },
    p: {
        type: Number
        // mon=0,tue=1,wed=2,thu=3,fri=4,sat=5,sun=6,today=7
    }
});

//export JournalInformation schema
var opentime = module.exports = mongoose.model('opentime', opentimeSchema);

//function
module.exports.add = function (tmp, callback) {
    tmp.new_date = momentTZ().tz("Asia/Taipei").format('YYYY/MM/DD-HH:mm:ss');
    tmp.old_date = Date.now();
    tmp.dateCHInoTime = momentTZ().tz("Asia/Taipei").format('YYYY年MM月DD日');
    tmp.weekday = momentTZ().tz("Asia/Taipei").day();
    tmp.save(callback);
};

module.exports.today = function (callback) {
    opentime.find({ $and: [{ p: 7 }, { dateCHInoTime: momentTZ().tz("Asia/Taipei").format('YYYY年MM月DD日') }] }).sort({ old_date: -1 }).limit(1).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback(
            (SearchResult && SearchResult[0] && SearchResult[0].old_date) ?
                {
                    e: err,
                    weekday: SearchResult[0].weekday - 1,
                    oh: SearchResult[0].sh,
                    o: SearchResult[0].sm,
                    ch: SearchResult[0].eh,
                    cm: SearchResult[0].em,
                    cl: SearchResult[0].todayONOFF
                }
                : null);
    });
};

module.exports.getbyweekday = function (weekday, callback) {
    opentime.find({ p: weekday }).sort({ old_date: -1 }).limit(1).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback(
            (SearchResult && SearchResult[0] && SearchResult[0].old_date) ?
                {
                    e: err,
                    weekday: SearchResult[0].p,
                    oh: SearchResult[0].sh,
                    o: SearchResult[0].sm,
                    ch: SearchResult[0].eh,
                    cm: SearchResult[0].em,
                    cl: SearchResult[0].todayONOFF
                }
                : null);
    });
};

module.exports.frontend = function ( callback) {
    var tmpobj = {
        ary: [
            //0: 
            { oh: '09', o: '00', ch: '15', cm: '30', cl: true },
            //1: 
            { oh: '09', o: '00', ch: '15', cm: '30', cl: true },
            //2:
            { oh: '09', o: '00', ch: '15', cm: '30', cl: true },
            //3:
            { oh: '09', o: '00', ch: '15', cm: '30', cl: true },
            //4: 
            { oh: '09', o: '00', ch: '15', cm: '30', cl: true },
            //5: 
            { oh: '09', o: '00', ch: '15', cm: '30', cl: true },
            //6:
            { oh: '09', o: '00', ch: '15', cm: '30', cl: true }
        ]
    };
    function for07(index,callback) {
        if (index === 7) {
            opentime.today((rtobj) => {
                if (rtobj && !rtobj.e) {
                    tmpobj.ary[rtobj.weekday].oh = okh(rtobj.oh);
                    tmpobj.ary[rtobj.weekday].o = okm(rtobj.o);
                    tmpobj.ary[rtobj.weekday].ch = okh(rtobj.ch);
                    tmpobj.ary[rtobj.weekday].cm = okm(rtobj.cm);
                    tmpobj.ary[rtobj.weekday].cl = rtobj.cl;
                }
                callback(tmpobj);
            });
        } else {
            opentime.getbyweekday(index, (rtobj) => {
                if (rtobj && !rtobj.e) {
                    tmpobj.ary[index].oh = okh(rtobj.oh);
                    tmpobj.ary[index].o = okm(rtobj.o);
                    tmpobj.ary[index].ch = okh(rtobj.ch);
                    tmpobj.ary[index].cm = okm(rtobj.cm);
                    tmpobj.ary[index].cl = rtobj.cl;
                }
                for07(index + 1,callback);
            });
        }
    }
    for07(0,callback);
};

function okh(i) {
    var betw = keepinrange(i, 0, 24);
    return addZero(betw, 2);
} function okm(i) {
    var betw = keepinrange(i, 0, 60);
    return addZero(betw, 2);
}