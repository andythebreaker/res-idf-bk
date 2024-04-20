var INframeNumber;
var INISSN;
var INbookName;
var INSTAT;
var INES;
var INPS;
var INVolume;
var INREMK;
var INLIVstart;
var INLIVend;
var INLIVx;

var INeissn;

document.getElementById('submit').addEventListener('click', function () {
    INframeNumber = document.getElementById('frameNumber').value;
    INISSN = document.getElementById('ISSN').value;
    INbookName = document.getElementById('bookName').value;
    INSTAT = document.getElementById('STAT').value;
    INES = document.getElementById('ES').value;
    INPS = document.getElementById('PS').value;
    INVolume = document.getElementById('Volume').value;
    INREMK = document.getElementById('REMK').value;
    INLIVstart = document.getElementById('LIVstart').value;
    INLIVend = document.getElementById('LIVend').value;
    INLIVx = document.getElementById('LIVx').value;

    INeissn = document.getElementById('eissn').value;

    console.log("dats->");
    console.log(INframeNumber);
    console.log(INISSN);
    console.log(INSTAT);
    console.log(INES);
    console.log(INPS);
    console.log(INVolume);
    console.log(INREMK);
    console.log(INLIVstart);
    console.log(INLIVend);
    console.log(INLIVx);
    console.log("<-dats");
    $.post("/main/add_periodical", {
        frameNumber: INframeNumber,
        ISSN: INISSN,
        bookName: INbookName,
        STAT: INSTAT,
        ES: INES,
        PS: INPS,
        Volume: INVolume,
        REMK: INREMK,
        LIVstart: INLIVstart,
        LIVend: INLIVend,
        LIVx: INLIVx,
        eissn: INeissn,
        id: (document.getElementById('EDITid')) ? document.getElementById('EDITid').innerText : null
    }, (res) => {
        if (res.status === 200) {//TODO BUG RES會回傳html文字而不含status
         /*   document.getElementById("quickPOPUPtopic").innerText = "成功☆請重新整理這個網頁";
            document.getElementById("quickPOPUPinfo").innerText = "請點選下方任意按鈕離開";
            $('#quickPOPUP')
                .modal('show')
                ;*/
                Swal.fire({
                    title: "成功☆請重新整理這個網頁",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "請點選紅色按鈕離開",
                    denyButtonText: '好',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        window.location.href = "/main";

                    } else if (result.isDenied) {
                        window.location.href = "/main";

                    }
                  })
        } else {
         /*   document.getElementById("quickPOPUPtopic").innerText = "成功☆請「關閉」這個網頁";
            document.getElementById("quickPOPUPinfo").innerText = "請點選下方任意按鈕離開";
            $('#quickPOPUP')
                .modal('show')
                ;*/
                Swal.fire({
                    title: "成功☆請「關閉」這個網頁",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "請點選紅色按鈕離開",
                    denyButtonText:'好' ,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        window.location.href = "/main";

                    } else if (result.isDenied) {
                        window.location.href = "/main";

                    }
                  })
        }
    });
});

function DOCE(e) {
    //console.log(e.srcElement.value);
    var selectvalue = e.srcElement.value;
    if (selectvalue) {
        var selindex = parseInt(selectvalue);
        var ops = e.target.getElementsByTagName('option');
        for (let index = 0; index < ops.length; index++) {
            const element = ops[index];
            if (element.value === String(selindex)) {
                document.getElementById('STAT').value = element.innerText;
            }
        }
        //document.getElementById('STAT').value = e.target.getElementsByTagName('option')[parseInt(selectvalue)].innerText;
    }
}

document.getElementById('isbnjson').addEventListener('click', function () {
    document.getElementsByClassName("loader")[0].style.display = "inline-block";
    console.log("isbnjson");
    $.post("/tool/isbn2json", {
        //TODO:沒有做例外處理
        isbn: document.getElementById('ISSN').value
    }, (res) => {
        document.getElementsByClassName("loader")[0].style.display = "none";

        if (res) {
            if (res.book_name) {
                document.getElementById('bookName').value = res.book_name;
            } else {
                console.log("無法取得書名");
            }
            if (res.book_info_s) {
                var book_info_s = res.book_info_s;
                for (let index = 0; index < book_info_s.length; index++) {
                    const element = book_info_s[index];
                    if (element.stor_loc) {
                        if (element.stor_loc.includes("總圖")) {
                            if ($('.ui.slider.checkbox').checkbox("is checked")) {
                                document.getElementById('Volume').value = element.stor_loc + '&#8227;' + element.stor_s;
                            } else {
                                document.getElementById('PS').value = element.stor_loc + '&#8227;' + element.stor_s;
                            }
                        } else if (element.stor_loc.includes("數學系")) {
                            document.getElementById('PS').value = element.stor_loc + '&#8227;' + element.stor_s;
                        } else {
                            console.log(`${element.stor_loc}館藏地不屬數學系或總圖`);
                        }
                    }
                }
            } else {
                console.log("無法取得書籍資料");
            }
        } else {
            console.error("與總圖書館通聯時發生錯誤!");
        }
    });
    $.post("/main/checkissnExistence", {
        //TODO:沒有做例外處理
        isbn: document.getElementById('ISSN').value
    }, (res) => {
        //console.log(res);
        if(res==='yes'){
$('#issnEX').text('已經存在');
document.getElementById('issnEXs').classList.remove('info');
document.getElementById('issnEXs').classList.add('warning');
        }else if(res==='no'){
            $('#issnEX').text('不存在');
            document.getElementById('issnEXs').classList.remove('info');
document.getElementById('issnEXs').classList.add('success');
        }else{
            $('#issnEX').text('測試錯誤');
            document.getElementById('issnEXs').classList.remove('info');
document.getElementById('issnEXs').classList.add('error');
        }
    });
});

$('.ui.mini.image').click(() => {
    document.getElementById("quickPOPUPtopic").innerText = "功能建置中(預計2022年1月上線)";
    document.getElementById("quickPOPUPinfo").innerText = "請點選下方任意按鈕離開";
    $('#quickPOPUP')
        .modal('show')
        ;
});

function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}