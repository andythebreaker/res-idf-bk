/**********************************************************************
 * GLOBAL VARIABLES
 *********************************************************************/
var imageExampleFilters,
  imageExampleFiltersOut,
  imageAutoCrop,
  imageFractals;

var images_tp1_jpg = "/images/tp1.jpg";
var cvstart0BTON = document.createElement("button");
cvstart0BTON.id = "cvstart0BTON";
cvstart0BTON.innerText = "/images/tp1.jpg";
cvstart0BTON.addEventListener("click", (e) => { console.log(e); cvstart0(); });
document.body.appendChild(cvstart0BTON);

/**********************************************************************
* LOADING METHODS
*********************************************************************/
var cvstart0 = () => {
  var img_rs = document.getElementById("cvstart0BTON").innerText;
  getMeta(img_rs, (w, h) => {
    console.log("w=" + w + " h=" + h);
    var c000img = document.createElement("img");
    c000img.style.width = w + 'px'; c000img.style.height = h + 'px';
    c000img.onload = function (c000event) {
      // Actual resizing

      var c000 = document.createElement("canvas");
      c000.id = "CR000" + randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      c000.style.width = w + 'px'; c000.style.height = h + 'px';
      c000.width = w; c000.height = h;
      var c000ctx = c000.getContext('2d');
      if (w > h) {
        c000ctx.drawImage(c000img, 0, 0, w, h, 0, 0, w, h);
      } else {
        var xt = w / 2;
        var yt = h / 2;
        var TO_RADIANS = Math.PI / 180;
        c000ctx.translate(xt, yt);
        c000ctx.rotate(-90 * TO_RADIANS);
        c000ctx.drawImage(c000img, -w / 2, -h / 2, w, h);
        c000ctx.rotate(90 * TO_RADIANS);
        c000ctx.translate(-xt, -yt);
      }

      var CR000 = cv.imread(c000);
      var c000dst = new cv.Mat();
      cv.resize(CR000, c000dst, { width: 1000, height: 570 });
      var tmp_canv = document.createElement('canvas');
      var tmpid = "tm" + randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
      tmp_canv.id = tmpid;
      tmp_canv.width = 1000;
      tmp_canv.classList.add("tm555");
      tmp_canv.height = 570;
      document.body.appendChild(tmp_canv);
      cv.imshow(tmpid, c000dst);

      var c000dataurl = tmp_canv.toDataURL('image/jpeg');
      images_tp1_jpg = c000dataurl;
      getMeta(c000dataurl, (w2, h2) => { console.log("w2=" + w2 + " h2=" + h2); });
      if (typeof MarvinImage === 'undefined') {//https://stackoverflow.com/questions/5113374/javascript-check-if-variable-exists-is-defined-initialized
        window.setTimeout(cvstart0, 100); /* this checks the flag every 100 milliseconds*/
      } else {
        /* do something*/
        console.log("[Automatic Progress Indicator Scale]🛬exampleFilters");
        exampleFilters(() => {
          console.log("[Automatic Progress Indicator Scale]🛬exampleAutoCrop");
          exampleAutoCrop(() => {
            console.log("[Automatic Progress Indicator Scale]🛬clickDetectCorners");
            clickDetectCorners(() => {
              /*console.log("[Automatic Progress Indicator Scale]🛬TARGimgPerspectiveTransformation");
              TARGimgPerspectiveTransformation(() => {
                console.log("[Automatic Progress Indicator Scale]🛬RCWCB");
                RCWCB()
              })*/
              //「這裡no call back」
              //會接到public/javascripts/index.js的document.getElementById("trig_corner_finish").addEventListener("click", function () {
            })
          })
        });
      }
    }
    c000img.src = img_rs;
  });
}
function getMeta(url, callback) {
  var img = new Image();
  img.src = url;
  img.onload = function () { callback(this.width, this.height); }
}

//cvstart0();
//--exampleFilters();
//-exampleAutoCrop();
//exampleFractals();

function example1() {
  imageExample1 = new MarvinImage();
  imageExample1.load(images_tp1_jpg, function () {
    imageExample1.draw(document.getElementById("canvasExample1A"));
    Marvin.colorChannel(imageExample1, imageExample1, 14, 0, -8);
    imageExample1.draw(document.getElementById("canvasExample1B"));
  });
}

function exampleFilters(CB20220529) {
  imageExampleFilters = new MarvinImage();
  imageExampleFilters.load(images_tp1_jpg, function () {
    imageExampleFilters.draw(document.getElementById("canvasExampleFilters"));
    imageExampleFiltersOut = new MarvinImage(imageExampleFilters.getWidth(), imageExampleFilters.getHeight());
    /*===============================
    callback added
    ===============================*/
    CB20220529();
  });
}

function exampleAutoCrop(CB20220529) {
  imageAutoCrop = new MarvinImage();
  imageAutoCrop.load(images_tp1_jpg, function () {
    imageAutoCrop.draw(document.getElementById("canvasAutoCrop"));
    /*===============================
    callback added
    ===============================*/
    CB20220529();
  });
}

/*function exampleFractals(){
 imageFractals = new MarvinImage(1000,570);
 itfFractal(ITF_DRAGON);
}*/

function clickExampleFiltersInvertColors() {
  Marvin.invertColors(imageExampleFilters, imageExampleFiltersOut);
  imageExampleFiltersOut.draw(document.getElementById("canvasExampleFilters"));
}


function clickExampleFiltersInvertScale() {
  Marvin.scale(imageExampleFilters, imageExampleFiltersOut, Math.floor(imageExampleFilters.getWidth() / 2), Math.floor(imageExampleFilters.getHeight() / 2));

  // Clear canvas
  var canvas = document.getElementById("canvasExampleFilters");
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

  imageExampleFiltersOut.draw(document.getElementById("canvasExampleFilters"), Math.floor(imageExampleFilters.getWidth() / 4), Math.floor(imageExampleFilters.getHeight() / 4));
  imageExampleFiltersOut.setDimension(imageExampleFilters.getWidth(), imageExampleFilters.getHeight());
}

function clickExampleFiltersCrop() {
  Marvin.crop(imageExampleFilters, imageExampleFiltersOut, 250, 35, 180, 368);

  // Clear canvas
  var canvas = document.getElementById("canvasExampleFilters");
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

  imageExampleFiltersOut.draw(document.getElementById("canvasExampleFilters"), 250, 35);
  imageExampleFiltersOut.setDimension(imageExampleFilters.getWidth(), imageExampleFilters.getHeight());
}

function clickExampleFiltersGrayScale() {
  Marvin.grayScale(imageExampleFilters, imageExampleFiltersOut);
  imageExampleFiltersOut.draw(document.getElementById("canvasExampleFilters"));
}

function clickExampleFiltersBlackAndWhite() {
  Marvin.blackAndWhite(imageExampleFilters, imageExampleFiltersOut, 30);
  imageExampleFiltersOut.draw(document.getElementById("canvasExampleFilters"));
}

function clickExampleFiltersSepia() {
  imageExampleFiltersOut.clear(0xFF000000);
  Marvin.sepia(imageExampleFilters, imageExampleFiltersOut, 30);
  imageExampleFiltersOut.draw(document.getElementById("canvasExampleFilters"));
}

function clickExampleFiltersEmboss() {
  Marvin.emboss(imageExampleFilters, imageExampleFiltersOut);
  imageExampleFiltersOut.draw(document.getElementById("canvasExampleFilters"));
}

function clickExampleFiltersHalftone() {
  Marvin.halftoneErrorDiffusion(imageExampleFilters, imageExampleFiltersOut);
  imageExampleFiltersOut.draw(document.getElementById("canvasExampleFilters"));
}

function clickExampleFiltersEdge() {
  imageExampleFiltersOut.clear(0xFF000000);
  Marvin.prewitt(imageExampleFilters, imageExampleFiltersOut);
  imageExampleFiltersOut.draw(document.getElementById("canvasExampleFilters"))
}

function clickExampleFiltersEdge2() {
  imageExampleFiltersOut.clear(0xFF000000);
  Marvin.prewitt(imageExampleFilters, imageExampleFiltersOut);
  Marvin.invertColors(imageExampleFiltersOut, imageExampleFiltersOut);
  Marvin.thresholding(imageExampleFiltersOut, imageExampleFiltersOut, 150);
  imageExampleFiltersOut.draw(document.getElementById("canvasExampleFilters"))
}

function clickExampleFiltersReset() {
  imageExampleFilters.draw(document.getElementById("canvasExampleFilters"))
}

var exampleFeaturesCornersMap;
var exampleFeaturesCropRect;

function clickDetectCorners(/*CB=()=>{console.log("CB is NULL")}「這裡no call back」*/) {
  var zzz = document.getElementById("canvasAutoCrop");
  var dupNode = zzz.cloneNode(true);
  dupNode.id = "imgPerspectiveTransformation";
  document.body.appendChild(dupNode);
  var destinationCanvas = document.getElementById("imgPerspectiveTransformation");
  var destCtx = destinationCanvas.getContext('2d');//grab the context from your destination canvas
  //call its drawImage() function passing it the source canvas directly
  destCtx.drawImage(zzz, 0, 0);
  //以上拷貝
  var factor = 1000 / 300;
  var image = new MarvinImage(300, 158);
  Marvin.scale(imageAutoCrop, image, 300);
  exampleFeaturesCornersMap = Marvin.moravec(image.clone(), image, 5, 10000);

  var ctx = document.getElementById("canvasAutoCrop").getContext("2d");
  ctx.fillStyle = "#ff0000";
  for (var x = 0; x < exampleFeaturesCornersMap.length; x++) {
    for (var y = 0; y < exampleFeaturesCornersMap.length; y++) {
      if (exampleFeaturesCornersMap[x][y] > 0) {
        if (document.getElementById("mapchart")) {
          document.getElementById("mapchart").innerHTML += `
       <tr><td>
       ${String(Math.floor(x * factor)) + "*" + String(Math.floor(y * factor))}
       </td><td>
       n/a
       </td><td>
       ${Math.sqrt(Math.pow(0 - x, 2) + Math.pow(0 - y, 2))}
       </td><td>
       ${Math.sqrt(Math.pow(exampleFeaturesCornersMap.length - x, 2) + Math.pow(0 - y, 2))}
       </td><td>
       ${Math.sqrt(Math.pow(0 - x, 2) + Math.pow(exampleFeaturesCornersMap.length - y, 2))}
       </td><td>
       ${Math.sqrt(Math.pow(exampleFeaturesCornersMap.length - x, 2) + Math.pow(exampleFeaturesCornersMap.length - y, 2))}
       </td></tr>
       `;
        }
        // scale up the corners coordinates
        ctx.fillRect(Math.floor(x * factor), Math.floor(y * factor), 10, 10);
      }
    }
  }
  if (document.getElementById("trig_corner_finish")) {
    document.getElementById("trig_corner_finish").click();
  }
}

function clickSelectCropArea() {
  imageAutoCrop.draw(document.getElementById("canvasAutoCrop"));

  var factor = 1000 / 300;
  var x1 = 9999;
  var x2 = 0;
  var y1 = 9999;
  var y2 = 0;
  for (var x = 0; x < exampleFeaturesCornersMap.length; x++) {

    var minY = 9999;
    var maxY = 0;
    for (var y = 0; y < exampleFeaturesCornersMap.length; y++) {
      if (exampleFeaturesCornersMap[x][y]) {
        if (y < minY) { minY = y; }
        if (y > maxY) { maxY = y; }
      }
    }

    if (maxY - minY > 30) {
      if (x < x1) { x1 = x; }
      if (x > x2) { x2 = x; }
      if (minY < y1) { y1 = minY; }
      if (maxY > y2) { y2 = maxY; }
    }
  }

  // Scale up to the original resolution
  x1 = Math.floor(x1 * factor);
  x2 = Math.floor(x2 * factor);
  y1 = Math.floor(y1 * factor);
  y2 = Math.floor(y2 * factor);

  // Add some margin
  x1 -= Math.floor((x2 - x1) * 0.2);
  x2 += Math.floor((x2 - x1) * 0.2);
  y1 -= Math.floor((y2 - y1) * 0.05);
  y2 += Math.floor((y2 - y1) * 0.05);

  exampleFeaturesCropRect = [x1, y1, x2 - x1, y2 - y1];

  console.log("x1:" + x1 + ",x2:" + x2 + ",y1:" + y1 + ",y2:" + y2);
  var ctx = document.getElementById("canvasAutoCrop").getContext("2d");
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 4;
  ctx.rect(x1, y1, x2 - x1, y2 - y1);
  ctx.stroke();
}

function clickAutoCropCrop() {
  var image = new MarvinImage(1, 1);
  Marvin.crop(imageAutoCrop, image, exampleFeaturesCropRect[0], exampleFeaturesCropRect[1], exampleFeaturesCropRect[2], exampleFeaturesCropRect[3]);

  // Clear canvas
  var canvas = document.getElementById("canvasAutoCrop");
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

  image.draw(document.getElementById("canvasAutoCrop"), exampleFeaturesCropRect[0], exampleFeaturesCropRect[1]);
}

function clickAutoCropReset() {
  imageAutoCrop.draw(document.getElementById("canvasAutoCrop"));
}


function itfFractal(rules) {
  imageFractals.clear();
  var canvas = document.getElementById("canvasFractals");
  Marvin.iteratedFunctionSystem(imageFractals.clone(), imageFractals, rules[0], rules[1]);
  imageFractals.draw(canvas);
}

/*function clickFractalDragon(){
 itfFractal(ITF_DRAGON);
}*/

function clickFractalBarnsleyLeaf() {
  itfFractal(ITF_BARNSLEY_LEAF);
}

function clickFractalMappleLeaf() {
  itfFractal(ITF_MAPPLE_LEAF);
}

function clickFractalTree() {
  itfFractal(ITF_TREE);
}