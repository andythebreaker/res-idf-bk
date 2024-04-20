const virtual_frame_sizeX = 1000;
const virtual_frame_sizeY = 670;//(0.8*2+0.6)*1000/3.19
const border_persent = 0.3;

function transition_coordinate_critical_point(times, domx, domy, callback) {
    const regexxy = /([0-9]+)\*([0-9]+)/gm;
    const strxy = times;
    let mxy;

    while ((mxy = regexxy.exec(strxy)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (mxy.index === regexxy.lastIndex) {
            regexxy.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        mxy.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
        });
        for (let index = 0; index < mxy.length; index++) {
            const element = mxy[index];
            switch (index) {
                case 1:
                    document.getElementById(domx).innerText = element;
                    break;
                case 2:
                    document.getElementById(domy).innerText = element;
                    break;
                default:
                    console.log("message [regex] got into default");
                    break;
            }
        }
    }
    callback();
}

var trig_corner_finish = (CB = () => { console.log("CB = NULL") }) => {

    if (document.getElementById("xmax")) {
        document.getElementById("xmax").innerText = exampleFeaturesCornersMap.length;
    }
    if (document.getElementById("ymax")) {
        document.getElementById("ymax").innerText = exampleFeaturesCornersMap.length;
    }
    /*var oo = []; var wo = []; var oh = []; var wh = [];*/
    var oo = -1.0; var wo = -1.0; var oh = -1.0; var wh = -1.0;
    var ooi = -1; var woi = -1; var ohi = -1; var whi = -1;
    var data_chart = document.getElementById("mapchart");
    var trs = data_chart.getElementsByTagName("tr");
    for (let index = 0; index < trs.length; index++) {
        const element = trs[index];
        if (oo < 0) {
            oo = parseFloat(element.getElementsByTagName("td")[2].innerText);
            ooi = index;
        } else {
            if (parseFloat(element.getElementsByTagName("td")[2].innerText) < oo) {
                oo = parseFloat(element.getElementsByTagName("td")[2].innerText);
                ooi = index;
            }
        }
        if (wo < 0) {
            wo = parseFloat(element.getElementsByTagName("td")[3].innerText);
            woi = index;
        } else {
            if (parseFloat(element.getElementsByTagName("td")[3].innerText) < wo) {
                wo = parseFloat(element.getElementsByTagName("td")[3].innerText);
                woi = index;
            }
        }
        if (oh < 0) {
            oh = parseFloat(element.getElementsByTagName("td")[4].innerText);
            ohi = index;
        } else {
            if (parseFloat(element.getElementsByTagName("td")[4].innerText) < oh) {
                oh = parseFloat(element.getElementsByTagName("td")[4].innerText);
                ohi = index;
            }
        }
        if (wh < 0) {
            wh = parseFloat(element.getElementsByTagName("td")[5].innerText);
            whi = index;
        } else {
            if (parseFloat(element.getElementsByTagName("td")[5].innerText) < wh) {
                wh = parseFloat(element.getElementsByTagName("td")[5].innerText);
                whi = index;
            }
        }
        /*oo.push(parseFloat(element.getElementsByTagName("td")[2].innerText));
        wo.push(parseFloat(element.getElementsByTagName("td")[3].innerText));
        oh.push(parseFloat(element.getElementsByTagName("td")[4].innerText));
        wh.push(parseFloat(element.getElementsByTagName("td")[5].innerText));*/
    }
    /*console.log(Math.max(oo));
    document.getElementById("trig_corner_finish")[oo.indexOf(Math.max(oo))].getElementsByTagName("td")[1].innerText = "oo";
    document.getElementById("trig_corner_finish")[wo.indexOf(Math.max(wo))].getElementsByTagName("td")[1].innerText = "wo";
    document.getElementById("trig_corner_finish")[oh.indexOf(Math.max(oh))].getElementsByTagName("td")[1].innerText = "oh";
    document.getElementById("trig_corner_finish")[wh.indexOf(Math.max(wh))].getElementsByTagName("td")[1].innerText = "wh";*/
    document.getElementById("00_sqrt_of_sum_of_pow").innerText = oo;
    document.getElementById("w0_sqrt_of_sum_of_pow").innerText = wo;
    document.getElementById("0h_sqrt_of_sum_of_pow").innerText = oh;
    document.getElementById("wh_sqrt_of_sum_of_pow").innerText = wh;
    document.getElementById("mapchart").getElementsByTagName("tr")[ooi].getElementsByTagName("td")[1].innerText = "oo";
    document.getElementById("mapchart").getElementsByTagName("tr")[woi].getElementsByTagName("td")[1].innerText = "wo";
    document.getElementById("mapchart").getElementsByTagName("tr")[ohi].getElementsByTagName("td")[1].innerText = "oh";
    document.getElementById("mapchart").getElementsByTagName("tr")[whi].getElementsByTagName("td")[1].innerText = "wh";
    //document.getElementById("wo_pt").innerText=

    var my_canv = document.getElementById("canvasAutoCrop");
    var my_canvH = my_canv.height;
    var my_canvW = my_canv.width;
    var ctx = my_canv.getContext("2d");
    ctx.fillStyle = "#FB8C00";
    transition_coordinate_critical_point(
        document.getElementById("mapchart").getElementsByTagName("tr")[ooi].getElementsByTagName("td")[0].innerText
        , "oo_ptx", "oo_pty", () => {
            transition_coordinate_critical_point(
                document.getElementById("mapchart").getElementsByTagName("tr")[woi].getElementsByTagName("td")[0].innerText
                , "wo_ptx", "wo_pty", () => {
                    transition_coordinate_critical_point(
                        document.getElementById("mapchart").getElementsByTagName("tr")[ohi].getElementsByTagName("td")[0].innerText
                        , "oh_ptx", "oh_pty", () => {
                            transition_coordinate_critical_point(
                                document.getElementById("mapchart").getElementsByTagName("tr")[whi].getElementsByTagName("td")[0].innerText
                                , "wh_ptx", "wh_pty", () => {
                                    ctx.fillRect(Math.floor(parseInt(document.getElementById("wo_ptx").innerText)),
                                        Math.floor(parseInt(document.getElementById("wo_pty").innerText)),
                                        10, 10);
                                    ctx.fillRect(Math.floor(parseInt(document.getElementById("oh_ptx").innerText)),
                                        Math.floor(parseInt(document.getElementById("oh_pty").innerText)),
                                        10, 10);
                                    ctx.fillRect(Math.floor(parseInt(document.getElementById("oo_ptx").innerText)),
                                        Math.floor(parseInt(document.getElementById("oo_pty").innerText)),
                                        10, 10);
                                    ctx.fillRect(Math.floor(parseInt(document.getElementById("wh_ptx").innerText)),
                                        Math.floor(parseInt(document.getElementById("wh_pty").innerText)),
                                        10, 10);
                                    /*document.getElementById("wo_ptx").innerText = Math.floor(my_canvW * parseInt(document.getElementById("wo_ptx").innerText) /
                                        parseInt(document.getElementById("xmax").innerText) - my_canvW *
                                        parseInt(document.getElementById("oo_ptx").innerText) /
                                        parseInt(document.getElementById("xmax").innerText)
                                    );
                                    document.getElementById("wo_pty").innerText = Math.floor(
                                        my_canvH * parseInt(document.getElementById("wo_pty").innerText) /
                                        parseInt(document.getElementById("ymax").innerText) - my_canvH *
                                        parseInt(document.getElementById("oo_pty").innerText) /
                                        parseInt(document.getElementById("ymax").innerText)
                                    );

                                    document.getElementById("oh_ptx").innerText = Math.floor(
                                        my_canvW * parseInt(document.getElementById("oh_ptx").innerText) /
                                        parseInt(document.getElementById("xmax").innerText) - my_canvW *
                                        parseInt(document.getElementById("oo_ptx").innerText) /
                                        parseInt(document.getElementById("xmax").innerText)
                                    );
                                    document.getElementById("oh_pty").innerText = Math.floor(
                                        my_canvH * parseInt(document.getElementById("oh_pty").innerText) /
                                        parseInt(document.getElementById("ymax").innerText) - my_canvH *
                                        parseInt(document.getElementById("oo_pty").innerText) /
                                        parseInt(document.getElementById("ymax").innerText)
                                    );

                                    document.getElementById("wh_ptx").innerText = Math.floor(
                                        my_canvW * parseInt(document.getElementById("wh_ptx").innerText) /
                                        parseInt(document.getElementById("xmax").innerText) - my_canvW *
                                        parseInt(document.getElementById("oo_ptx").innerText) /
                                        parseInt(document.getElementById("xmax").innerText)
                                    );
                                    document.getElementById("wh_pty").innerText = Math.floor(
                                        my_canvH * parseInt(document.getElementById("wh_pty").innerText) /
                                        parseInt(document.getElementById("ymax").innerText) - my_canvH *
                                        parseInt(document.getElementById("oo_pty").innerText) /
                                        parseInt(document.getElementById("ymax").innerText)
                                    );

                                    document.getElementById("oo_ptx").innerText = Math.floor(
                                        my_canvW *
                                        parseInt(document.getElementById("oo_ptx").innerText) /
                                        parseInt(document.getElementById("xmax").innerText)
                                    );
                                    document.getElementById("oo_pty").innerText = Math.floor(
                                        my_canvH *
                                        parseInt(document.getElementById("oo_pty").innerText) /
                                        parseInt(document.getElementById("ymax").innerText)
                                    );*/

                                    //-----------------------call back--------------------------
                                    CB();
                                    //------------------------------------------------------------------

                                });
                        });
                });
        });
}

document.getElementById("trig_corner_finish").addEventListener("click", function () {
    //注意:這裡有流程串聯~!!!!
    console.log("[Automatic Progress Indicator Scale]🛬trig_corner_finish");
    trig_corner_finish(() => {
        console.log("[Automatic Progress Indicator Scale]🛬TARGimgPerspectiveTransformation");
        TARGimgPerspectiveTransformation(() => {
            console.log("[Automatic Progress Indicator Scale]🛬RCWCB");
            RCWCB(() => {
                console.log("[Automatic Progress Indicator Scale]🛬wakuwaku");
                $('.wakuwaku').each((i, obj) => { obj.click() });
            })
        })
    })
});

function canvDraw() {
    console.log("canvDraw");
    var my_canv = document.getElementById("canvasAutoCrop");
    var my_canvL = my_canv.height;
    var my_canvW = my_canv.width;
    var ctx = my_canv.getContext("2d");
    ctx.fillStyle = "#FFC0CB";
    ctx.fillRect(parseInt(document.getElementById("wo_ptx").innerText, 10) + parseInt(document.getElementById("oo_ptx").innerText, 10),
        parseInt(document.getElementById("wo_pty").innerText, 10) + parseInt(document.getElementById("oo_pty").innerText, 10),
        10, 10);
    ctx.fillRect(parseInt(document.getElementById("oh_ptx").innerText, 10) + parseInt(document.getElementById("oo_ptx").innerText, 10),
        parseInt(document.getElementById("oh_pty").innerText, 10) + parseInt(document.getElementById("oo_pty").innerText, 10),
        10, 10);
    ctx.fillRect(parseInt(document.getElementById("wh_ptx").innerText, 10) + parseInt(document.getElementById("oo_ptx").innerText, 10),
        parseInt(document.getElementById("wh_pty").innerText, 10) + parseInt(document.getElementById("oo_pty").innerText, 10),
        10, 10);
    ctx.fillRect(parseInt(document.getElementById("oo_ptx").innerText, 10),
        parseInt(document.getElementById("oo_pty").innerText, 10),
        10, 10);

    for (let bolckI = 0; bolckI < 12; bolckI++) {
        var borderL = -1.0;
        var borderR = -1.0;
        var borderU = -1.0;
        var borderD = -1.0;
        var i = bolckI % 6;
        borderL = virtual_frame_sizeX * (i * 3.19 / 6.0 + border_persent * 3.19 / 6.0) / 3.19;
        borderR = virtual_frame_sizeX * ((i + 1) * 3.19 / 6.0 - border_persent * 3.19 / 6.0) / 3.19;
        if (bolckI < 6) {
            borderU = virtual_frame_sizeY * 0.8 * border_persent / (0.8 + 0.6 + 0.8);
            borderD = virtual_frame_sizeY * (0.8 - 0.8 * border_persent) / (0.8 + 0.6 + 0.8);
        } else {
            borderU = virtual_frame_sizeY * (0.8 + 0.6 + 0.8 * border_persent) / (0.8 + 0.6 + 0.8);
            borderD = virtual_frame_sizeY * (0.8 + 0.6 + 0.8 - 0.8 * border_persent) / (0.8 + 0.6 + 0.8);
        }
        var my_tr = document.createElement("tr");
        my_tr.id = `cc${bolckI}`;
        var td_ulx = document.createElement("td"); td_ulx.classList.add("ulx"); td_ulx.innerText = Math.floor(borderL);
        var td_urx = document.createElement("td"); td_urx.classList.add("urx"); td_urx.innerText = Math.floor(borderR);
        var td_dlx = document.createElement("td"); td_dlx.classList.add("dlx"); td_dlx.innerText = Math.floor(borderL);
        var td_drx = document.createElement("td"); td_drx.classList.add("drx"); td_drx.innerText = Math.floor(borderR);
        var td_uly = document.createElement("td"); td_uly.classList.add("uly"); td_uly.innerText = Math.floor(borderU);
        var td_ury = document.createElement("td"); td_ury.classList.add("ury"); td_ury.innerText = Math.floor(borderU);
        var td_dly = document.createElement("td"); td_dly.classList.add("dly"); td_dly.innerText = Math.floor(borderD);
        var td_dry = document.createElement("td"); td_dry.classList.add("dry"); td_dry.innerText = Math.floor(borderD);
        my_tr.appendChild(td_ulx); my_tr.appendChild(td_uly);
        my_tr.appendChild(td_urx); my_tr.appendChild(td_ury);
        my_tr.appendChild(td_dlx); my_tr.appendChild(td_dly);
        my_tr.appendChild(td_drx); my_tr.appendChild(td_dry);
        document.getElementById("udlrxy").appendChild(my_tr);
    }
    fetch(`./api/perspective-transform-init?srcCorners=0*0*${virtual_frame_sizeX}*0*0*${virtual_frame_sizeY}*${virtual_frame_sizeX}*${virtual_frame_sizeY}&dstCorners=0*0*${document.getElementById('wo_ptx').innerText}*${document.getElementById('wo_pty').innerText}*${document.getElementById('oh_ptx').innerText}*${document.getElementById('oh_pty').innerText}*${document.getElementById('wh_ptx').innerText}*${document.getElementById('wh_pty').innerText}`)
        .then(function (response) {
            console.log(response);
        })
        .then(() => {
            for (let txi = 0; txi < 12; txi++) {
                for (let txi2 = 0; txi2 < 4; txi2++) {
                    trx(txi, txi2);
                }
            }
        });
}

function trx(txi, txi2) {
    var my_canv = document.getElementById("canvasAutoCrop");
    var my_canvL = my_canv.height;
    var my_canvW = my_canv.width;
    var ctx = my_canv.getContext("2d");
    ctx.fillStyle = "#DDB98B";

    var srcx = document.getElementById("udlrxy").getElementsByTagName("tr")[txi].getElementsByTagName("td")[2 * txi2].innerText;
    var srcy = document.getElementById("udlrxy").getElementsByTagName("tr")[txi].getElementsByTagName("td")[2 * txi2 + 1].innerText;
    ctx.fillRect(srcx, srcy, 10, 10);
    fetch(`./api/perspT-transform?x=${srcx}&y=${srcy}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById("udlrxy").getElementsByTagName("tr")[txi].getElementsByTagName("td")[2 * txi2].innerText +=
                `@${myJson.dstPtX}`;
            document.getElementById("udlrxy").getElementsByTagName("tr")[txi].getElementsByTagName("td")[2 * txi2 + 1].innerText +=
                `@${myJson.dstPtY}`;
            var BASEoo_ptx = parseInt(document.getElementById("oo_ptx").innerText);
            var BASEoo_pty = parseInt(document.getElementById("oo_pty").innerText);
            ctx.fillRect(BASEoo_ptx + Math.floor(parseFloat(myJson.dstPtX)), BASEoo_pty + Math.floor(parseFloat(myJson.dstPtY)), 10, 10);
        });
}