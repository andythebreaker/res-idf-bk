var RCWCB = (CB = () => { console.log("not using CB!!") }) => {
    var income_img_height = document.getElementById('SOLUimgPerspectiveTransformation').getAttribute('height');
    var income_img_width = document.getElementById('SOLUimgPerspectiveTransformation').getAttribute('width');
    var squareLengthAndWidth_h = parseInt(income_img_height, 10) * 8.0 / (6.0 + 8.0 + 8.0);
    var squareLengthAndWidth_w = parseInt(income_img_width, 10) / 6.0;
    var sla20_h = squareLengthAndWidth_h * 0.8;
    var sla20_w = squareLengthAndWidth_w * 0.8;
    var crp2 = document.createElement('canvas');
    crp2.style.width = String(Math.round(parseInt(income_img_width, 10) * 0.9 * 0.8 / (1.15 + 0.9 + 1.15))) + 'px';
    crp2.style.height = String(Math.round(parseInt(income_img_height, 10) * 6.0 * 0.8 / (6.0 + 8.0 + 8.0))) + 'px';
    crp2.id = 'myres';
    document.body.appendChild(crp2);

    var backgroundL = document.createElement('canvas');
    backgroundL.style.width = String(Math.round(parseInt(income_img_width, 10) * 1.15 * 0.8 / (1.15 + 0.9 + 1.15))) + 'px';
    backgroundL.style.height = String(Math.round(parseInt(income_img_height, 10) * 6.0 * 0.8 / (6.0 + 8.0 + 8.0))) + 'px';
    backgroundL.id = 'backgroundL';
    document.body.appendChild(backgroundL);

    var backgroundR = document.createElement('canvas');
    backgroundR.style.width = String(Math.round(parseInt(income_img_width, 10) * 1.15 * 0.8 / (1.15 + 0.9 + 1.15))) + 'px';
    backgroundR.style.height = String(Math.round(parseInt(income_img_height, 10) * 6.0 * 0.8 / (6.0 + 8.0 + 8.0))) + 'px';
    backgroundR.id = 'backgroundR';
    document.body.appendChild(backgroundR);

    console.log('good');
    var cropX0 = parseInt(income_img_width, 10) * 0.9 * 0.1 / (1.15 + 0.9 + 1.15) + parseInt(income_img_width, 10) * 1.15 / (1.15 + 0.9 + 1.15);
    var cropY0 = parseInt(income_img_height, 10) * 6.0 * 0.1 / (6.0 + 8.0 + 8.0) + parseInt(income_img_height, 10) * 8.0 / (6.0 + 8.0 + 8.0);
    var cropWidth0 = parseInt(income_img_width, 10) * 0.9 * 0.8 / (1.15 + 0.9 + 1.15);
    var cropHeight0 = parseInt(income_img_height, 10) * 6.0 * 0.8 / (6.0 + 8.0 + 8.0);
    var canvas2 = document.getElementById('myres');
    canvas2.width = cropWidth0;
    canvas2.height = cropHeight0;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(document.getElementById('SOLUimgPerspectiveTransformation'), cropX0, cropY0, cropWidth0, cropHeight0, 0, 0, cropWidth0, cropHeight0);
    toReact(1, canvas2, 225, 150.545454)//cropWidth0, cropHeight0);
    ////////////////
    var cropX0a = parseInt(income_img_width, 10) * 1.15 * 0.1 / (1.15 + 0.9 + 1.15) + parseInt(income_img_width, 10) * 0 / (1.15 + 0.9 + 1.15);
    var cropY0a = parseInt(income_img_height, 10) * 6.0 * 0.1 / (6.0 + 8.0 + 8.0) + parseInt(income_img_height, 10) * 8.0 / (6.0 + 8.0 + 8.0);
    var cropWidth0a = parseInt(income_img_width, 10) * 1.15 * 0.8 / (1.15 + 0.9 + 1.15);
    var cropHeight0a = parseInt(income_img_height, 10) * 6.0 * 0.8 / (6.0 + 8.0 + 8.0);
    var canvas2a = document.getElementById('backgroundL');
    canvas2a.width = cropWidth0a;
    canvas2a.height = cropHeight0a;
    var ctx2a = canvas2a.getContext('2d');
    ctx2a.drawImage(document.getElementById('SOLUimgPerspectiveTransformation'), cropX0a, cropY0a, cropWidth0a, cropHeight0a, 0, 0, cropWidth0a, cropHeight0a);

    var cropX0b = parseInt(income_img_width, 10) * 1.15 * 0.1 / (1.15 + 0.9 + 1.15) + parseInt(income_img_width, 10) * (1.15 + 0.9) / (1.15 + 0.9 + 1.15);
    var cropY0b = parseInt(income_img_height, 10) * 6.0 * 0.1 / (6.0 + 8.0 + 8.0) + parseInt(income_img_height, 10) * 8.0 / (6.0 + 8.0 + 8.0);
    var cropWidth0b = parseInt(income_img_width, 10) * 1.15 * 0.8 / (1.15 + 0.9 + 1.15);
    var cropHeight0b = parseInt(income_img_height, 10) * 6.0 * 0.8 / (6.0 + 8.0 + 8.0);
    var canvas2b = document.getElementById('backgroundR');
    canvas2b.width = cropWidth0b;
    canvas2b.height = cropHeight0b;
    var ctx2b = canvas2b.getContext('2d');
    ctx2b.drawImage(document.getElementById('SOLUimgPerspectiveTransformation'), cropX0b, cropY0b, cropWidth0b, cropHeight0b, 0, 0, cropWidth0b, cropHeight0b);

    overlayCanvases(document.getElementById('backgroundL'), document.getElementById('backgroundR'));
    ///////////////////////////

    for (let index = 0; index < 6; index++) {
        var crp1 = document.createElement('canvas');
        crp1.style.width = String(Math.round(sla20_w)) + 'px';
        crp1.style.height = String(Math.round(sla20_h)) + 'px';
        crp1.id = 'crpU' + String(index);
        document.body.appendChild(crp1);
        console.log('good');
        var cropX = squareLengthAndWidth_w * 0.1 + squareLengthAndWidth_w * (index);
        var cropY = squareLengthAndWidth_h * 0.1;
        var cropWidth = squareLengthAndWidth_w * 0.8;
        var cropHeight = squareLengthAndWidth_h * 0.8;
        var canvas1 = document.getElementById('crpU' + String(index));
        canvas1.width = cropWidth;
        canvas1.height = cropHeight;
        var ctx1 = canvas1.getContext('2d');
        ctx1.drawImage(document.getElementById('SOLUimgPerspectiveTransformation'), cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        toReact(index + 2, canvas1, 133.333333, 200.727272)//cropWidth, cropHeight);
    }
    for (let index = 0; index < 6; index++) {
        var crp1 = document.createElement('canvas');
        crp1.style.width = String(Math.round(sla20_w)) + 'px';
        crp1.style.height = String(Math.round(sla20_h)) + 'px';
        crp1.id = 'crpD' + String(index);
        document.body.appendChild(crp1);
        console.log('good');
        var cropX = squareLengthAndWidth_w * 0.1 + squareLengthAndWidth_w * (index);
        var cropY = squareLengthAndWidth_h * 0.1 + parseInt(income_img_height, 10) * (8.0 + 6.0) / (6.0 + 8.0 + 8.0);
        var cropWidth = squareLengthAndWidth_w * 0.8;
        var cropHeight = squareLengthAndWidth_h * 0.8;
        var canvas1 = document.getElementById('crpD' + String(index));
        canvas1.width = cropWidth;
        canvas1.height = cropHeight;
        var ctx1 = canvas1.getContext('2d');
        ctx1.drawImage(document.getElementById('SOLUimgPerspectiveTransformation'), cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        toReact(index + 8, canvas1, 133.333333, 200.727272)// cropWidth, cropHeight);
    }
    CB();
}

document.getElementById('regionCrop').addEventListener('click', function (e) { RCWCB(); }
);
/* assumes each canvas has the same dimensions */
var overlayCanvases = function (cnv1, cnv2/*, cnv3*/) {//https://stackoverflow.com/questions/38851963/how-to-combine-3-canvas-html-elements-into-1-image-file-using-javascript-jquery
    /*
    ____                       __                             
   / __ \____     ____  ____  / /_   ________  __  __________ 
  / / / / __ \   / __ \/ __ \/ __/  / ___/ _ \/ / / / ___/ _ \
 / /_/ / /_/ /  / / / / /_/ / /_   / /  /  __/ /_/ (__  )  __/
/_____/\____/  /_/ /_/\____/\__/  /_/   \___/\__,_/____/\___/ 
                                                              
    */
    var newCanvas = document.createElement('canvas'),
        ctx = newCanvas.getContext('2d'),
        width = cnv1.width,
        height = cnv1.height * 2;

    newCanvas.width = width;
    newCanvas.height = height;
    ctx.beginPath();

    ctx.drawImage(cnv1, 0, 0, cnv1.width, cnv1.height);
    ctx.drawImage(cnv2, 0, cnv2.height, cnv2.width, cnv2.height);
    newCanvas.id = "overlayCanvases";
    document.body.appendChild(newCanvas);
    //$(".reactTransImagePath:nth-child(0)").val(newCanvas.toDataURL());
    /*document.getElementsByClassName('rtU')[0].innerText = newCanvas.toDataURL();
    document.getElementsByClassName('rtW')[0].innerText = width;
    document.getElementsByClassName('rtH')[0].innerText = height;
    document.getElementsByClassName('reactTransRefresh')[0].click();
    */toReact(0, newCanvas, 200, 191.333333)// width, height);
    /*function setKeywordText(text) {
        var el = document.getElementsByClassName('reactTransImagePath')[0];
        el.value = text;
        var evt = document.createEvent("Events");
        evt.initEvent("onchange", true, true);
        el.dispatchEvent(evt);
    }
    setKeywordText(newCanvas.toDataURL());*/
};

var toReact = function (idd, canv, ww, hh) {
    var tmp_canv_obj = resizeC(canv.id, ww, hh);
    document.getElementsByClassName('rtU')[idd].innerText = tmp_canv_obj.toDataURL();
    document.getElementsByClassName('rtW')[idd].innerText = ww;
    document.getElementsByClassName('rtH')[idd].innerText = hh;
    document.getElementsByClassName('reactTransRefresh')[idd].click();
    $('#' + tmp_canv_obj.id).remove();
}

var resizeC = function (canvDOM, ww, hh) {    /*
____                       __                             
/ __ \____     ____  ____  / /_   ________  __  __________ 
/ / / / __ \   / __ \/ __ \/ __/  / ___/ _ \/ / / / ___/ _ \
/ /_/ / /_/ /  / / / / /_/ / /_   / /  /  __/ /_/ (__  )  __/
/_____/\____/  /_/ /_/\____/\__/  /_/   \___/\__,_/____/\___/ 
                                                          
*/
    console.log(canvDOM);
    let src = cv.imread(canvDOM);
    let dst = new cv.Mat();
    cv.resize(src, dst, { width: ww, height: hh });
    var tmp_canv = document.createElement('canvas');
    var tmpid = "tmpcanvrez" + randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    tmp_canv.id = tmpid;
    tmp_canv.width = ww;
    tmp_canv.classList.add("tmpcanvrez");
    tmp_canv.height = hh;
    document.body.appendChild(tmp_canv);
    cv.imshow(tmpid, dst);
    return document.getElementById(tmpid);
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
