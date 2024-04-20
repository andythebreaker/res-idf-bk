var TARGimgPerspectiveTransformation = (CB20220529 = ()=>{console.log("user clicked button, not using call back")}) => {
    let src = cv.imread('imgPerspectiveTransformation');
    const imageHeight = document.getElementById('SOLUimgPerspectiveTransformation').height;
    const imageWidth = document.getElementById('SOLUimgPerspectiveTransformation').width;
    let dst = new cv.Mat();
    let dsize = new cv.Size(imageWidth, imageHeight);
    //非常重要，投影方陣，以左上始，順時鐘給定座標
    let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
        Math.floor(parseInt(document.getElementById("oo_ptx").innerText)),
        Math.floor(parseInt(document.getElementById("oo_pty").innerText)),
        Math.floor(parseInt(document.getElementById("wo_ptx").innerText)),
        Math.floor(parseInt(document.getElementById("wo_pty").innerText)),
        Math.floor(parseInt(document.getElementById("wh_ptx").innerText)),
        Math.floor(parseInt(document.getElementById("wh_pty").innerText)),
        Math.floor(parseInt(document.getElementById("oh_ptx").innerText)),
        Math.floor(parseInt(document.getElementById("oh_pty").innerText))
    ]);
    console.log(
        `SOLUimgPerspectiveTransformation:
    height=${document.getElementById('SOLUimgPerspectiveTransformation').height}
    width=${document.getElementById('SOLUimgPerspectiveTransformation').width}`);
    let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, imageWidth, 0, imageWidth, imageHeight, 0, imageHeight]);
    console.log(
        `SOLUimgPerspectiveTransformation:
    height=${document.getElementById('SOLUimgPerspectiveTransformation').height}
    width=${document.getElementById('SOLUimgPerspectiveTransformation').width}`);
    let M = cv.getPerspectiveTransform(srcTri, dstTri);
    console.log(
        `SOLUimgPerspectiveTransformation:
    height=${document.getElementById('SOLUimgPerspectiveTransformation').height}
    width=${document.getElementById('SOLUimgPerspectiveTransformation').width}`);
    cv.warpPerspective(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    console.log(
        `SOLUimgPerspectiveTransformation:
    height=${document.getElementById('SOLUimgPerspectiveTransformation').height}
    width=${document.getElementById('SOLUimgPerspectiveTransformation').width}`);
    cv.imshow('SOLUimgPerspectiveTransformation', dst);
    console.log(
        `SOLUimgPerspectiveTransformation:
    height=${document.getElementById('SOLUimgPerspectiveTransformation').height}
    width=${document.getElementById('SOLUimgPerspectiveTransformation').width}`);
    //暴力解對調長寬
    //document.getElementById('SOLUimgPerspectiveTransformation').height = imageWidth;
    //document.getElementById('SOLUimgPerspectiveTransformation').width = imageHeight;

    //=============================DO cALL BACK=============================
    CB20220529();
    //---------------------------------------------------
};

document.getElementById("TARGimgPerspectiveTransformation").addEventListener("click", () => {
    TARGimgPerspectiveTransformation();
});