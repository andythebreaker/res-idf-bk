//我不確定，但是我猜這個東西經荒廢了

/*//const translate = require('translate-google')
//var pdf = require('html-pdf');
const streamToBlob = require('stream-to-blob');
var moment = require('moment');
//const { jsPDF } = require("jspdf"); // will automatically load the node version
const linkCheck = require('link-check');


function saveData(blob, filename) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
};
var commercialFileName = document.title + ((typeof moment !== 'undefined') ? (`${moment().format('MMMM-Do-YYYY-h-mm-ss-a')}`) : 'could_not_load_current_moment') + '.pdf';
var pdfutils = document.getElementsByClassName("pdfutils");
for (var i = 0; i < pdfutils.length; i++) {
    pdfutils[i].addEventListener('click', async (e) => {
        /////////////////////////VVVVVVVVVVVVVVVVVVVVVVvv
        pdf.create(document.documentElement.outerHTML).toStream(async function (err, stream) {
            const blob = await streamToBlob(stream);
            saveData(blob, commercialFileName);
        });
        var pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addHTML(document.body, function () {
            saveData(pdf.output('Blob'), commercialFileName);
        });

        translate('I speak Chinese', { to: 'zh-cn' }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
        ////////////////^^^^^^^^^^^^^^^^^^^^^^^^
        linkCheck('http://example.com', function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`${result.link} is ${result.status}`);
});
    });
}
*/

/* 
const toString = (...args) => import('nlcst-to-string').then(({ default: toString }) => toString(...args));
const retext = (...args) => import('retext').then(({ default: retext }) => retext(...args));
const retextPos = (...args) => import('retext-pos').then(({ default: retextPos }) => retextPos(...args));
const retextKeywords = (...args) => import('retext-keywords').then(({ default: retextKeywords }) => retextKeywords(...args));


retext()
  .use(retextPos) // Make sure to use `retext-pos` before `retext-keywords`.
  .use(retextKeywords)
  .process(`Interlibrary cooperation

  Books and periodicals not collected in this room can be entrusted to the librarian in this room or transferred from the National Document Delivery Service System (NDDS) by the National Cheng Kung University Graphic and Western Periodicals Team to obtain the required information. Application materials for other libraries should be sent to the main library first, and then to the periodical section of the main library to obtain interlibrary loan books and photocopy materials. (Interlibrary cooperation service is a paid service method that provides resource sharing between libraries. It provides readers with books and periodicals borrowing and photocopying services to exchange availability and effectively maximize the value of the limited resources of each library).
  
  Application Form-Department of Mathematics Library-Agency interlibrary cooperation
  
  Department of Mathematics image to apply for paper and electronic journals, e-books on behalf of the library service
  
  How to get: The application materials should arrive at the library, and the applicant will be notified by email or phone to get the mathematics drawing.
  
  Free service: Academia Sinica inter-library loan, data photocopying
  
  Paid service: Except for the interlibrary loan and material photocopying outside the Academia Sinica, the fees are subject to interlibrary cooperation regulations.`)
  .then((file) => {
    console.log('Keywords:')
    file.data.keywords.forEach((keyword) => {
      console.log(toString(keyword.matches[0].node))
    })

    console.log()
    console.log('Key-phrases:')
    file.data.keyphrases.forEach((phrase) => {
      console.log(phrase.matches[0].nodes.map((d) => toString(d)).join(''))
    })
  })*/


//https://raw.githubusercontent.com/UIDD2021ElderlyApp/backend_ex/main/public/javascripts/snapshoot_layout.js


//import html2canvas from '/js/vendor/html2canvas/dist/html2canvas.esm.js';
var lineHeight = require('line-height');
var domtoimage = require("dom-to-image-more"); var SVGtoPDF = require("svg-to-pdfkit");
const PDFDocument = require('pdfkit'); const blobStream = require('blob-stream');
var commercialFileName = document.title + ((typeof moment !== 'undefined') ? (`${moment().format('MMMM-Do-YYYY-h-mm-ss-a')}`) : 'could_not_load_current_moment') + '.pdf';
var pdfdebug = false;
function saveData(blob, filename) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
};

var DEF_app_img = "/app/img";
var DEF_DEBUG = true;
var DEF_consolelogdata = false;
var DEF_download_screenshot = false;
var DEF_download_Blob = false;
var useold = false;

var DEF_medal_path = "/app/medal/"

if (document.getElementsByClassName("pdfutils")) document.getElementsByClassName("pdfutils")[0].addEventListener("click", function () {
/*
    if (document.getElementsByClassName("pdfutils")) document.getElementsByClassName("pdfutils")[0].innerHTML += `
    <span class="loader removeafterSSP"><span class="loader-box"></span><span class="loader-box"></span><span class="loader-box"></span>
    <style>.loader {
        height : 8px;
        width  : 36px; // (6 * <margin: 2px>) + (3 * <width: 8px>)
    }
    
    .loader-box {
        display                   : inline-block;
        height                    : 8px;
        width                     : 8px;
        margin                    : 0px 2px;
        background-color          : rgb(0,146,255);
        animation-name            : fadeOutIn;
        animation-duration        : 500ms;
        animation-iteration-count : infinite;
        animation-direction       : alternate;
    }
    
    .loader-box:nth-child(1) { animation-delay: 250ms; } /// (1/2) * <animation-duration: 500ms 
    .loader-box:nth-child(2) { animation-delay: 500ms; }// (2/2) * <animation-duration: 500ms 
    .loader-box:nth-child(3) { animation-delay: 750ms; } // (3/2) * <animation-duration: 500ms 
    
    @keyframes fadeOutIn {
        0%   { background-color : rgba(0,146,255,1); }
        100% { background-color : rgba(0,146,255,0); }
    }
    </style></span>
    `;
    if (document.getElementsByClassName("pdfutils")) document.getElementById("snap_shoot_finish_pdf").innerText = "0";
    html2canvas(document.querySelector("body"), { useCORS: true, scrollY: 0, scrollX: 0 }).then(canvas => {//@ 
        if (useold) {
            //$("body").css({ left: 0, top: 0, position: 'fixed' });
            //@   domtoimage.toSvg(document.querySelector("body"))
            //@       .then(function (dataUrl) {console.log(dataUrl)});

            //@   domtoimage.toPng(document.querySelector("body"))
            //@      .then(function (dataUrl) {
            //var img = new Image();
            //img.src = dataUrl;
            //document.body.appendChild(img);

            //@        var img = Buffer.from(base64.substr(23), 'base64');
            //@        var canvas = sizeOf(img);
            //@        console.log(canvas.width, canvas.height);


            //<!--這裡面的方式是:htnl2canvas->to pdf using jspdf-->>
            //console.log(`canvas.width, canvas.height=${canvas.width}, ${canvas.height}`);
            var jsPDF = window.jspdf.jsPDF;
            // var doc = new jsPDF();
            //   doc.text(10, 15, "Hello World from jsPDF.");
            //    doc.save("jsPDF-Hello_World.pdf");
            var doc = new jsPDF({
                orientation: 'portrait', // landscape
                unit: 'pt', // points, pixels won't work properly
                format: [canvas.width, canvas.height] // set needed canvas for any element
            });
            var target_img = dataUrl//canvas.toDataURL("image/jpeg", 1.0);
            doc.addFont('SourceHanSans-Normal.ttf', 'SourceHanSans-Normal', 'normal');
            doc.setFont('SourceHanSans-Normal');
            doc.addImage(target_img, 'PNG', 0, 0, canvas.width, canvas.height, 'a', 'NONE', 0);

            getallvisabletext(doc);

            doc.save(commercialFileName);
            document.getElementById('snap_shoot_screen').getElementsByClassName('removeafterSSS')[0].remove();
            //   $("body").css({ position: 'absolute' });
            var url = window.location.href;
            var window_location_href_host = new URL(url).host;
            console.log(window_location_href_host);

            if (DEF_consolelogdata) {
                console.log(canvas.toDataURL("image/jpeg", 1.0));
            }
            if (DEF_download_screenshot) {//在pdfutils狀態下不會被觸發....反正懶得改了
                var a = document.createElement("a"); //Create <a>
                a.style = "display: none";
                a.href = canvas.toDataURL("image/jpeg", 1.0); //Image Base64 Goes here
                a.download = commercialFileName; //File name Here
                a.click(); //Downloaded file
                if (document.getElementById('snap_shoot_screen').getElementsByClassName('removeafterSSS')) document.getElementById('snap_shoot_screen').getElementsByClassName('removeafterSSS')[0].remove();
            }

            var blob_tmp = dataURItoBlob(target_img);
            if (DEF_download_Blob) {
                saveData(blob_tmp, "download_blob.jpg");
            }
            if (blob_tmp.size < 6000000) {
                send_pic_to_backend(blob_tmp);
            } else {
                console.log("compress_ratio");
                var compress_ratio = 0.9;
                while (compress_ratio > 0 && (dataURItoBlob(canvas.toDataURL("image/jpeg", compress_ratio)).size > 6000000)) {
                    compress_ratio = compress_ratio - 0.1;
                }
                if (dataURItoBlob(canvas.toDataURL("image/jpeg", compress_ratio)).size > 6000000) {
                    console.error("this is a error, the page is tooooooooooooooooo large, so you can't trans this file to backend!!!!")
                }
                send_pic_to_backend(dataURItoBlob(canvas.toDataURL("image/jpeg", compress_ratio)));
            }

            // });->
            //@    })
            //@    .catch(function (error) {
            //@        console.error('oops, something went wrong!', error);

        } else {
            // create a document the same way as above
            //#  const doc = new PDFDocument;
            // pipe the document to a blob
            //#   const stream = doc.pipe(blobStream());
            // add your content to the document here, as usual
            domtoimage.toSvg(document.querySelector("body"))
                .then(function (dataUrl) {
                    var jsPDF = window.jspdf.jsPDF;
                    // var doc = new jsPDF();
                    //   doc.text(10, 15, "Hello World from jsPDF.");
                    //    doc.save("jsPDF-Hello_World.pdf");
                    var doc = new jsPDF({
                        orientation: 'portrait', // landscape
                        unit: 'pt', // points, pixels won't work properly
                        format: [canvas.width, canvas.height] // set needed canvas for any element
                    });
                    var target_img = dataUrl//canvas.toDataURL("image/jpeg", 1.0);
                    doc.addFont('SourceHanSans-Normal.ttf', 'SourceHanSans-Normal', 'normal');
                    doc.setFont('SourceHanSans-Normal');
                    //# doc.addImage(target_img, 'PNG', 0, 0, canvas.width, canvas.height, 'a', 'NONE', 0);
                    doc.addSvgAsImage(dataUrl.split(';base64,')[1], 0, 0, canvas.width, canvas.height, 'a', 'NONE', 0)

                    getallvisabletext(doc);

                    doc.save(commercialFileName);
                    //console.log(dataUrl);
                    //#SVGtoPDF(doc, dataUrl.split(';base64,')[1], 0, 0, {});
                    // get a blob when you're done
                    //#    doc.end();
                    //#    stream.on('finish', function () {
                    // or get a blob URL for display in the browser
                    //#        const url = stream.toBlobURL('application/pdf');
                    //#        window.open(url);
                    //#    });
                });

        }
    });*/


});

document.getElementById("snap_shoot_canvas_tmp_pdf").addEventListener("click", function () {
    document.getElementById("snap_shoot_finish_pdf").innerText = "0";
    html2canvas(document.querySelector("body"), { useCORS: true, }).then(canvas => {
        document.getElementById("snap_shoot_finish_pdf").innerHTML = "";
        canvas.style.display = "none";
        canvas.id = "snap_shoot_canvas_tmp_pdf_sub";
        document.body.appendChild(canvas);
        document.getElementById("snap_shoot_finish_pdf").innerText = "1";
    });
});

function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], { type: mimeString });
}

function send_pic_to_backend(img_blob) {
    var form = (typeof jQuery_3_6_0 !== 'undefined') ? jQuery_3_6_0('form')[0] : null; // You need to use standard javascript object here
    var formData = (form) ? new FormData(form) : null;

    if (formData) formData.append('img', img_blob);

    if (typeof jQuery_3_6_0 !== 'undefined') jQuery_3_6_0.ajax({
        url: `${DEF_app_img}`,
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        accepts: {
            text: "text/html"
        },
        //http://blog.twbryce.com/jquery-ajax-callback-method/
        beforeSend: function (xhr) {
            document.getElementById("snap_shoot_finish_pdf").innerText = "2";

        },
        success: function (xhr) {
            //console.log("alert('Ajax request 發生錯誤');");
            //jQuery_3_6_0(e.target).attr('disabled', false);
            document.getElementById("snap_shoot_finish_pdf").innerText = "3";
        },
        error: function (xhr) {
            document.getElementById("snap_shoot_finish_pdf").innerText = "4";

            console.log("alert('Ajax request 發生錯誤');");
            //jQuery_3_6_0(e.target).attr('disabled', false);
        },
        complete: function (xhr) {
            if (document.getElementById("snap_shoot_finish_pdf").innerText === "3") {
                document.getElementById("snap_shoot_finish_pdf").innerText = "1";
            }
        },
    });
    /*$.post(DEF_medal_path, {
        medal: JSON.stringify({
            "type": 3,
            "goal": 1
        })
    });*/

}

function getallvisabletext(doc) {
    function isHidden(el) {
        var style = window.getComputedStyle(el);
        return ((style.display === 'none') || (style.visibility === 'hidden'))
    }

    // get the body tag
    var body = document.querySelector('body');

    // get all tags inside body
    var allTags = body.getElementsByTagName('*');


    //console.log(allTags);


    for (var i = 0, max = allTags.length; i < max; i++) {
        if (isHidden(allTags[i])) {
            // hidden
        }
        else {
            console.log(allTags[i].innerText);

            console.log(cumulativeOffset(allTags[i]));
            var tmpc = allTags[i].children;
            var childnohavetext = true;
            for (var j = 0; j < tmpc.length; j++) {
                if (tmpc[j].innerText) {
                    childnohavetext = false;
                    break;
                }
            }
            if (doc && allTags[i].innerText && (!allTags[i] || childnohavetext)) {
                if (pdfdebug) doc.rect(cumulativeOffset(allTags[i]).top, cumulativeOffset(allTags[i]).left,
                    allTags[i].getBoundingClientRect().width, allTags[i].getBoundingClientRect().height, 'S');
                console.log(`wtf${allTags[i].getBoundingClientRect().x},${allTags[i].getBoundingClientRect().y},
                ${allTags[i].getBoundingClientRect().width},${allTags[i].getBoundingClientRect().height}`);
                if (pdfdebug) doc.text(String(allTags[i].classList), cumulativeOffset(allTags[i]).left, cumulativeOffset(allTags[i]).top);
                doc.saveGraphicsState();
                doc.setGState(new doc.GState({ opacity: 0 }));
                doc.text(allTags[i].innerText, cumulativeOffset(allTags[i]).left, cumulativeOffset(allTags[i]).top,
                    {
                        maxWidth: `${allTags[i].getBoundingClientRect().width}`,
                        lineHeightFactor: lineHeight(allTags[i])
                    });
                doc.restoreGraphicsState();
            }
        }
    }
}
var cumulativeOffset = function (element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    return {
        top: top,
        left: left
    };
};
//window.onload = getallvisabletext;

