console.log(`
  _   _   _   _   _   _  
 / \ / \ / \ / \ / \ / \ 
( k | m | e | a | n | s )
 \_/ \_/ \_/ \_/ \_/ \_/ 
`);
//const utils = new Utils('errorMessage');//Uncaught SyntaxError: Identifier 'utils' has already been declared (at index.js:1:1)
//const imageUsed = document.getElementById('sample').getAttribute('src')
//console.log(imageUsed)
const kmeansButton = document.getElementById('kmeansButtonDom');

const kmeansMainFUCNTION = function () {
    console.log(`
    _/                                                                  _/_/_/  _/        _/_/_/    _/_/_/  _/    _/   
   _/  _/    _/_/_/  _/_/      _/_/      _/_/_/  _/_/_/      _/_/_/  _/        _/          _/    _/        _/  _/      
  _/_/      _/    _/    _/  _/_/_/_/  _/    _/  _/    _/  _/_/      _/        _/          _/    _/        _/_/         
 _/  _/    _/    _/    _/  _/        _/    _/  _/    _/      _/_/  _/        _/          _/    _/        _/  _/        
_/    _/  _/    _/    _/    _/_/_/    _/_/_/  _/    _/  _/_/_/      _/_/_/  _/_/_/_/  _/_/_/    _/_/_/  _/    _/       
`);
    //      _ \  __ \   _ \ __ \   __|\ \   / 
    //     (   | |   |  __/ |   | (    \ \ /  
    //    \___/  .__/ \___|_|  _|\___|  \_/   
    //          _|                            
    // console.log(cv.getBuildInformation());//ok
    // let myressrc = cv.imread('myres');
    // console.log(myressrc);
    // define stopping criteria
    // var criteria = new cv.TermCriteria(cv.TERM_CRITERIA_EPS + cv.TERM_CRITERIA_MAX_ITER, 100, 0.2);
    // let Oarray = new cv.Mat();
    // let thisISnone = new cv.Mat();
    // var res_canvas = document.getElementById('myres');
    // const canvasW = res_canvas.getBoundingClientRect().width;
    // const canvasH = res_canvas.getBoundingClientRect().height;
    //console.log(canvasW, canvasH);
    //let srcTri = cv.matFromArray(4, 1, cv.CV_32F, [0, 0, canvasH, 0, canvasH, canvasW, 0, canvasW]);
    //var wtf=cv.kmeans(myressrc, 8, thisISnone, criteria, 10, cv.KMEANS_RANDOM_CENTERS);
    //OpenCV Error: Assertion failed (data0.dims <= 2 && type == 5 && K > 0) in kmeans, file /build/master-contrib_docs-lin64/opencv/modules/core/src/kmeans.cpp, line 243
    //https://blog.csdn.net/wphkadn/article/details/84107552
    //console.log(wtf);
    let mat = cv.imread('myres');
    //https://answers.opencv.org/question/206557/how-can-you-use-k-means-clustering-to-posterize-an-image-using-opencv-javascript/
    let sample = new cv.Mat(mat.rows * mat.cols, 3, cv.CV_32F);
    for (var y = 0; y < mat.rows; y++)
        for (var x = 0; x < mat.cols; x++)
            for (var z = 0; z < 3; z++)
                sample.floatPtr(y + x * mat.rows)[z] = mat.ucharPtr(y, x)[z];
    var clusterCount = 8;
    var labels = new cv.Mat();
    var attempts = 5;
    var centers = new cv.Mat();

    var crite = new cv.TermCriteria(cv.TermCriteria_EPS + cv.TermCriteria_MAX_ITER, 10000,parseFloat(document.getElementById('kmeansTermCriteriaPA').value||0.2));
    var criteria = [1, 10, 0.0001];

    cv.kmeans(sample, clusterCount, labels, crite, attempts, cv.KMEANS_RANDOM_CENTERS, centers);
    console.log(centers);
    var newImage = new cv.Mat(mat.size(), mat.type());
    for (var y = 0; y < mat.rows; y++)
        for (var x = 0; x < mat.cols; x++) {
            var cluster_idx = labels.intAt(y + x * mat.rows, 0);
            newImage.floatPtr(y, x)[0] = centers.floatAt(cluster_idx, 0);
            newImage.floatPtr(y, x)[1] = centers.floatAt(cluster_idx, 1);
            newImage.floatPtr(y, x)[2] = centers.floatAt(cluster_idx, 2);
            newImage.floatPtr(y, x)[3] = 255;

        }
    cv.imshow('kmeansRES', newImage);
    mat.delete();
}
//kmeansButton.setAttribute('disabled','true');
kmeansButton.onclick = kmeansMainFUCNTION;

