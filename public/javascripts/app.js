//這個檔案室廢物
var pdf = require('html-pdf');

pdf.create(document.documentElement.outerHTML).toStream(function(err, stream){
    console.log(err);
    console.log(stream);
  });