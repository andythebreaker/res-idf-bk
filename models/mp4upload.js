var mongoose = require('mongoose');

var mp4Schema = mongoose.Schema({
    date_time: {
        type: Date
    },
    file_name: {
        type: String
    },
    file_extension: {
        type: String
    },
    file_dir: {
        type: String
    },
    custom_video_title: {
        type: String
    },
    custom_video_info: {
        type: String
    },
    custom_video_id: {
        type: String
    }
    , support_resolution: {
        type: Array
    }, file_size: {
        type: Number
    }
    , data: {
        type: Buffer
    }, file_size_pretty: { type: String }
});

//export JournalInformation schema
var mp4in = module.exports = mongoose.model('mp4in', mp4Schema);

//function
module.exports.warehousing = function (incomeJSON, callback) {
    var nobj = new mp4in({
        ... incomeJSON,
    });
    nobj.save((e, r) => {
        if (e) {
            console.log(e);
            callback(null);
        } else {
            callback(r);
        }
    });
}

module.exports.getByFileName = function (id, filename, callback) {
    const filter = {$and:[{file_name:{$eq:filename}},{custom_video_id:{$eq:id}}]};
    mp4in.find(filter).sort({ date_time: 'ascending' }).limit(1).exec((err, SearchResult) => {
        if (err&&SearchResult.length<1) {
            console.log(err);
            console.log("cant find stuff");//TODO ER
        }
        callback(SearchResult[0]);
    });
}


module.exports.delall = function (callback) { mp4in.deleteMany({}, callback) }
