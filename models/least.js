var mongoose = require('mongoose');
var moment = require('moment');

var leastSchema = mongoose.Schema({
    //Boolean
    new_date: {//?
        type: Date
    },
    old_date: {//?
        type: Date
    },
    YYYY: {
        type: Number
    },
    M: {
        type: Number
    },
    D: {
        type: Number
    },
    h: {
        type: Number
    },
    mm: {
        type: Number
    },
    tp: {
        type: String
    },
    ab: {
        type: String
    },
    lab: {
        type: Array
    },
    uri: {
        type: String
    }
});

//export JournalInformation schema
var least = module.exports = mongoose.model('least', leastSchema);
//function
module.exports.add = function (newOBJ, callback) {
    var day_time = moment(`${newOBJ.YYYY||1970}-${newOBJ.M||1}-${newOBJ.D||1} ${newOBJ.h||0}:${newOBJ.mm||0}`);
    newOBJ.old_date=day_time.toDate();
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
    least.countDocuments({}, function (err, count) {
        //console.log((count - count % 4) / 4);
        least.find({}).sort({ old_date: 'descending' }).exec((err, SearchResult) => {
            if (err) {
                console.log(err);
            }
            callback(
                {
                    c: count < 4 ? 1 : 1 + (count - count % 4) / 4,
                    s: SearchResult
                });
        });
    });

}

module.exports.SETuri = function (id, uri, callback) {
    least.findById({$eq:id}, function (err, contact) {
        if (!err) {
            if (contact) {
                console.log(contact.tp);
                contact.uri = uri;
                contact.save(function (err) {
                    if (!err) {
                        console.log("contact " + contact.id + " created at " + contact.createdAt + " updated at " + contact.updatedAt);
                        callback("yes");
                    }
                    else {
                        console.log("Error: could not save contact " + contact.id);
                        callback("no");
                    }
                });
            } else { callback("no"); }
        }
    });
}

module.exports.getById = function (id, callback) {
    least.findById({$eq:id}, function (err, adventure) {
        if (err) {
            console.log("可忽略的警告");
            console.log(err);
            callback(null);
        } else {
            callback((adventure) ? adventure : null);
        }
    });
}

module.exports.delById = function (MODid, callback) {
    least.findByIdAndDelete({$eq:MODid},(err,doc)=>callback(err,doc));
};