//https://raw.githubusercontent.com/UIDD2021ElderlyApp/backend_ex/main/public/javascripts/snapshoot_layout.js

//*****************這裡的東西要用browserify!!!!!!!!!!!!!!!!!!!!!!沒的話就拿掉吧，用底下的import
var moment = require('moment');
var html2canvas = require('html2canvas');
var imageClipper = require('image-clipper');
///////////////////////////////////////////////////////////

//import html2canvas from '/js/vendor/html2canvas/dist/html2canvas.esm.js';

var commercialFileName = document.title + ((typeof moment !== 'undefined') ? (`${moment().format('MMMM-Do-YYYY-h-mm-ss-a')}`) : 'could_not_load_current_moment') + '.jpg';

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
var DEF_download_screenshot = true;
var DEF_download_Blob = false;

var DEF_medal_path = "/app/medal/"

document.getElementById("snap_shoot_screen").addEventListener("click", function () {
    document.getElementById("snap_shoot_screen").innerHTML += `
    <span class="loader removeafterSSS"><span class="loader-box"></span><span class="loader-box"></span><span class="loader-box"></span>
    <style>.loader {
        height : 8px;
        width  : 36px; /* (6 * <margin: 2px>) + (3 * <width: 8px>) */
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
    
    .loader-box:nth-child(1) { animation-delay: 250ms; } /* (1/2) * <animation-duration: 500ms */
    .loader-box:nth-child(2) { animation-delay: 500ms; } /* (2/2) * <animation-duration: 500ms */
    .loader-box:nth-child(3) { animation-delay: 750ms; } /* (3/2) * <animation-duration: 500ms */
    
    @keyframes fadeOutIn {
        0%   { background-color : rgba(0,146,255,1); }
        100% { background-color : rgba(0,146,255,0); }
    }
    </style></span>
    `;
    document.getElementById("snap_shoot_finish").innerText = "0";
    //$("body").css({left: 0, top: 0, position:'fixed'});
    html2canvas(document.querySelector("body"), { useCORS: true/*,scrollY: 0,scrollX: 0 */ }).then(canvas => {
        //$("body").css({position:'absolute'});
        var url = window.location.href;
        var window_location_href_host = new URL(url).host;
        console.log(window_location_href_host);

        //canvas.style.display="none";
        //document.body.appendChild(canvas);
        var target_img = canvas.toDataURL("image/jpeg", 1.0);
        imageClipper(target_img, function () {
            this.crop(0, 0, vw, vh)
                .toDataURL(function (dataUrl_c) {
                    console.log('cropped!');
                    //preview.src = dataUrl_c;
                    //console.log(canvas.toDataURL("image/jpeg", 1.0));
                    if (DEF_consolelogdata) {
                        console.log(canvas.toDataURL("image/jpeg", 1.0));
                    }
                    if (DEF_download_screenshot) {
                        var a = document.createElement("a"); //Create <a>
                        a.style = "display: none";
                        a.href = dataUrl_c//canvas.toDataURL("image/jpeg", 1.0); //Image Base64 Goes here
                        a.download = commercialFileName; //File name Here
                        a.click(); //Downloaded file
                        //if (document.getElementById('imgdownloadOK')) document.getElementById('imgdownloadOK').click();
                        if (document.getElementById('snap_shoot_screen').getElementsByClassName('removeafterSSS')) document.getElementById('snap_shoot_screen').getElementsByClassName('removeafterSSS')[0].remove();
                    }

                    var blob_tmp = dataURItoBlob(dataUrl_c);
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
                });


        });
    });
});

document.getElementById("snap_shoot_canvas_tmp").addEventListener("click", function () {
    document.getElementById("snap_shoot_finish").innerText = "0";
    html2canvas(document.querySelector("body"), { useCORS: true, }).then(canvas => {
        document.getElementById("snap_shoot_finish").innerHTML = "";
        canvas.style.display = "none";
        canvas.id = "snap_shoot_canvas_tmp_sub";
        document.body.appendChild(canvas);
        document.getElementById("snap_shoot_finish").innerText = "1";
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
            document.getElementById("snap_shoot_finish").innerText = "2";

        },
        success: function (xhr) {
            //console.log("alert('Ajax request 發生錯誤');");
            //jQuery_3_6_0(e.target).attr('disabled', false);
            document.getElementById("snap_shoot_finish").innerText = "3";
        },
        error: function (xhr) {
            document.getElementById("snap_shoot_finish").innerText = "4";

            console.log("alert('Ajax request 發生錯誤');");
            //jQuery_3_6_0(e.target).attr('disabled', false);
        },
        complete: function (xhr) {
            if (document.getElementById("snap_shoot_finish").innerText === "3") {
                document.getElementById("snap_shoot_finish").innerText = "1";
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

function codeAddress() {
    console.log("ok2")
    $("#waiting_block").css('display', "none")
}
window.onload = codeAddress;