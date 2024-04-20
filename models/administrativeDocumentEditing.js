var mongoose = require('mongoose');
var Url = require('url-parse');


var administrativeDocumentEditingSchema = mongoose.Schema({
    new_date: {
        type: Date
    },
    name: {
        type: String
    },
    doclink: {
        type: String
    },
    uri: {
        type: String
    },
    no: {
        type: Number
    }
});

//export JournalInformation schema
var administrativeDocumentEditing = module.exports = mongoose.model('administrativeDocumentEditing', administrativeDocumentEditingSchema);

//function
module.exports.add = function (newOBJ, callback) {
    var url = new Url(newOBJ.uri);
    if (url.host === '127.0.0.1') {
        newOBJ.doclink = String(url.pathname).replace('/', '');
        newOBJ.uri = '';
    }
    newOBJ.save((e, r) => {
        if (e) {
            console.log(e);
            callback(null);
        } else {
            callback(r);
        }
    });
}

module.exports.getAll = function (callback) {
    administrativeDocumentEditing.find({}).sort({ no: 1 }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        callback({ r: SearchResult, e: err });
    });
}

module.exports.delById = function (MODid, callback) {
    administrativeDocumentEditing.findByIdAndDelete({$eq:MODid}, (err, doc) => callback(err, doc));
};

module.exports.MODFdn = function (MODid, callback) {//這是上升
    var ChansuNoJunban_tmp = -1;
    administrativeDocumentEditing.findById({$eq:MODid}, function (err, stuff) {
        if (err) {
            console.log(err);
        }
        ChansuNoJunban_tmp = stuff.no;
        //logic:
        if (ChansuNoJunban_tmp - 1 >= 0) {
            const filter = { no: { $lt: ChansuNoJunban_tmp } };
            administrativeDocumentEditing.find(filter).sort({ no: 'descending' }).exec((err2, SearchResult) => {
                if (err2) {
                    console.log(err2);
                }
                if (SearchResult.length > 0) {
                    ChansuNoJunban_tmp = SearchResult[0].no;
                    administrativeDocumentEditing.findByIdAndUpdate({$eq:SearchResult[0].id}, { $set: { no: stuff.no } }, {}, () => {
                        administrativeDocumentEditing.findByIdAndUpdate({$eq:MODid}, { $set: { no: ChansuNoJunban_tmp } }, {}, callback);
                    });
                }
            });
        }
    });
};

module.exports.MODFup = function (MODid, callback) {//這是下降
    var ChansuNoJunban_tmp = -1;
    administrativeDocumentEditing.findById({$eq:MODid}, function (err, stuff) {
        if (err) {
            console.log(err);
        }
        ChansuNoJunban_tmp = stuff.no;
        //logic:
        const filter = { no: { $gt: ChansuNoJunban_tmp } };
        administrativeDocumentEditing.find(filter).sort({ no: 'ascending' }).exec((err2, SearchResult) => {
            if (err2) {
                console.log(err2);
            }
            if (SearchResult.length > 0) {
                ChansuNoJunban_tmp = SearchResult[0].no;
                administrativeDocumentEditing.findByIdAndUpdate({$eq:SearchResult[0].id}, { $set: { no: stuff.no } }, {}, () => {
                    administrativeDocumentEditing.findByIdAndUpdate({$eq:MODid}, { $set: { no: ChansuNoJunban_tmp } }, {}, callback);
                });
            }
        });
    });
};

module.exports.getMAXno = function (callback) {
    var stuf2return = -1;
    const filter = {};
    administrativeDocumentEditing.find(filter).sort({ no: 'descending' }).exec((err, SearchResult) => {
        if (err) {
            console.log(err);
        }
        if (SearchResult[0]) {
            stuf2return = SearchResult[0].no;
        } else {
            stuf2return = 0;
        }
        callback(stuf2return + 1);
    });
};

module.exports.setDocx = function (id, uri, callback) {
    administrativeDocumentEditing.findById({$eq:id}, function (err, contact) {
        if (!err) {
            if (contact) {
                contact.doclink = uri;
                contact.uri = '';//LOGIC:優先權:文件大於url
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
    administrativeDocumentEditing.findById({$eq:id}, function (err, adventure) {
        console.log("adventure");
        if (err) {
            console.log("可忽略的警告");
            console.log(err);
            callback(null);
        } else {
            callback((adventure) ? adventure : null);
        }
    });
}