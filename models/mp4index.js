var mongoose = require('mongoose');
const mp4upload = require('./mp4upload');


var mp4indexSchema = mongoose.Schema({
    date_time: {
        type: Date
    },
    cid: {
        type: String
    },
    name: {
        type: String
    },
    info: {
        type: String
    },
    mustbefinish: {
        type: Boolean
    },
    pub: {
        type: Boolean
    }, ffmpeginfo: { type: Array }
});

//export JournalInformation schema
var mp4index = module.exports = mongoose.model('mp4index', mp4indexSchema);

//function
module.exports.add = function (incomeJSON, callback) {
    console.log("🚀 ~ file: mp4index.js ~ line 28 ~ incomeJSON", incomeJSON)
    var nobj = new mp4index({
        ...incomeJSON,
        pub: true,//TODO 這裡留了一個欄位可以選擇是否公開影片，並未實作此功能
        date_time: Date.now()
    });
    console.log("🚀 ~ file: mp4upload.js ~ line 43 ~ nobj", nobj)
    nobj.save((e, r) => {
        /**
         * if error occurs, will callback return err-msg, else (aka success) return null
         */
        if (!e) {
            callback(null);
        } else {
            callback(e);
        }
    });
}

module.exports.all = function (callback) {
    const filter = {};
    mp4index.find(filter).sort({ date_time: 'ascending' }).exec((err, SearchResult) => {
        console.log("🚀 ~ file: mp4index.js ~ line 49 ~ mp4index.find ~ SearchResult", SearchResult)
        if (err) {
            console.log(err);
        }
        callback(SearchResult);
    });
};

module.exports.getByCid = function (mocid, callback) {
    const filter = { cid: { $eq: mocid } };
    mp4index.find(filter).sort({ date_time: 'ascending' }).limit(1).exec((err, SearchResult) => {
        if (err && SearchResult.length !== 1) {
            console.log(err);
            callback(null);
        } else {
            callback(SearchResult[0]);
        }
    });
};

module.exports.delById = function (MODid, callback) {
    mp4index.findById({ $eq: MODid }, (e, ans) => {
        if (e) {//error occurs
            callback(e, null);
        } else {
            if (ans) {
                mp4upload.deleteMany({ custom_video_id: { $eq: ans.cid } }).then(function () {
                    mp4index.findByIdAndDelete({ $eq: MODid }, (a, b) => {//a is error b is success
                        callback(a, b);
                    });
                }).catch(function (error) {
                    callback(error, null); // Failure
                });
            } else {
                callback('no this id, peace out!', null);
            }
        }
    });

};

module.exports.appffmpeg = function (MODid, appinfo, callback) {//這是上升

    const filter = { cid: { $eq: MODid } };
    const update = { $push: { ffmpeginfo: String(appinfo) } };

    mp4index.findOneAndUpdate(filter, update, (e, d) => {
        if (e) {
            console.log('error occurs when we try to report ffmpeg info')
            console.log(e)
        }
        callback();
    });
};