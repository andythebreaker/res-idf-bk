var mongoose = require('mongoose');
/*sn: '123',
  osn: '123',
  provider: '1',
  c: '清單',
  Textafterexternallinkother: '1',
  yPublished_External: '1',
  mPublished_External: '1',
  dPublished_External: '1',
  Remarks_External: '1',
  urle: 'http://aqwertyuikl.345678.com',
  submit2: '送出
  
   {
  no: '23',
  name: '123qwe',
  url: 'https://github.com/andythebreaker/2020arduino.git',
  submit: '送出'
}

*/
var e2Schema = mongoose.Schema({
    new_date: {
        type: Date
    },
    sn: {
        type: Number
    },
    osn: {
        type: String
    },
    provider: {
        type: String
    },
    c: {
        type: String
    },
    Textafterexternallinkother: {
        type: String
    },
    yPublished_External: {
        type: String
    },
    mPublished_External: {
        type: String
    },
    dPublished_External: {
        type: String
    },
    Remarks_External: {
        type: String
    },
    urle: {
        type: String
    },
});

//export JournalInformation schema
var e2 = module.exports = mongoose.model('e2', e2Schema);

//function
module.exports.add = function (newOBJ, callback) {
    newOBJ.save((e, r) => {
        if (e) {
            console.log(e);
            callback(null);
        } else {
            callback(r.id);
        }
    });
}

module.exports.frontend = function (callback) {
    e2.lastTime(r => {
        // console.log(r);
        e2.find({}).sort({ sn: 1 }).exec((err, SearchResult) => {
            if (err) {
                console.log(err);
            }
            callback({ s: SearchResult, r: r });
        });
    });
}

module.exports.lastTime = function (callback) {
    e2.find({}).sort({ new_date: -1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        // console.log(SearchResult[0].new_date);
        //  console.log(SearchResult[0].new_date.getFullYear());
        callback((SearchResult.length > 0) ? SearchResult[0].new_date.getFullYear() : 1997);
    });
}

module.exports.update_url = function (id, uri, callback) {
    //console.log(id, uri);
    e2.findById({ $eq: id }, function (err, contact) {
        if (!err) {
            if (contact) {
                //console.log(contact.bts);
                contact.urle = uri;
                contact.save(function (err) {
                    if (!err) {
                        //console.log("contact " + contact.id + " created at " + contact.createdAt + " updated at " + contact.updatedAt);
                        callback("yes");
                    }
                    else {
                        console.log("Error: could not save contact " + contact.id + "#" + String(err));
                        callback("no");
                    }
                });
            } else { callback("no"); }
        }
    });
}

module.exports.getById = function (id, callback) {
    e2.findById({ $eq: id }, function (err, adventure) {
        if (err) {
            console.log("可忽略的警告");
            console.log(err);
            callback(null);
        } else {
            callback((adventure) ? adventure : null);
        }
    });
}

module.exports.getMaxIndex = function (callback) {
    e2.find({}).sort({ sn: -1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback((SearchResult.length > 0) ? SearchResult[0].sn + 1 : 1);
    });
}

module.exports.delById = function (MODid, callback) {
    e2.findByIdAndDelete({ $eq: MODid }, (err, doc) => callback(err, doc));
};

module.exports.upd = function (MODid, a1, a2, a3, a4, a5, a6, a7, a8, a9, callback) {

    const filter = { $eq: MODid };
    var update = null;

    if (a9) {
        update = {
            osn: a1,
            provider: a2,
            c: a3,
            Textafterexternallinkother: a4,
            yPublished_External: a5,
            mPublished_External: a6,
            dPublished_External: a7,
            Remarks_External: a8,
            urle: a9
        }
    } else {
        update = {
            osn: a1,
            provider: a2,
            c: a3,
            Textafterexternallinkother: a4,
            yPublished_External: a5,
            mPublished_External: a6,
            dPublished_External: a7,
            Remarks_External: a8
        }
    }

   
    e2.findByIdAndUpdate(filter, update, (e, d) => {
        if (e) {
            console.log('error occurs when we try to report update')
            console.log(e); callback(e);
        } else {
            callback(null);
        }
    });
};