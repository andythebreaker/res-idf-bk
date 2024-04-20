var isBuffer = require('isbuffer');
var randomstring = require("randomstring");
const { printTable } = require('console-table-printer');
var isempty = require('is-empty');
const vid2hls = require('./vid2hls');
const mp4upload = require('./mp4upload');
const mp4id = require('./mp4index');
var isJSON = require('is-json');
/**
 * TODO
 * 要在轉檔完後更新mp4index來讓使用者一目了然到底轉完黨沒
 * @param {*} stuff 
 * @param {*} stuff_callback 
 */

var relayW = function (stuff, stuff_callback) {
    mp4upload.warehousing(stuff, stuff_callback);
    //if callback send null => error occurs
}

/**
 * TODO
 * 這裡有一個嚴重的邏輯問題
 * 但是在少數編輯者狀態下
 * 不會發生
 * =================================================================
 * 這段的說明，使用者指的都是有admin權限的編輯者，aka進得去/main的人
 * ====================================
 * 
 * 說明如下
 * 當A使用者WS開啟通訊
 * 開始上傳後到傳輸完成前
 * 如果有
 * 任何第二個使用者要上傳
 * 整個程式應該會爛掉
 * 
 * 需要做分別不同使用者
 */

var mp4wsobj = {
    name: 'n/a',
    info: 'n/a',
    index: 0,
    v2h: null,
    cid: randomstring.generate(),
    fsLoc: null, tempy: null, tempy_esm_include: function (stuff) {
        /**
         * you need to call in www.mjs   ;
         * import tempy from 'tempy';
         * mp4Ulogic.tempy_esm_include(tempy);
         */
        this.tempy = stuff;
    },
    ffmpegRP: function (Cid,msg){
        mp4id.appffmpeg(Cid,msg,()=>{})
    }
    ,
    input: function (data, callback) {
        if (!this.tempy && typeof this.tempy != "undefined" && this.tempy != 0) {
            callback('[ERROR] tempy is not defined, You need to call modern mods to use this feature. More info @ https://www.npmjs.com/package/tempy');
        } else {
            //Create a table
            //const isBuffer_msg = [
            //    { isBuffer: String(isBuffer(data)) }];
            //print
            //printTable(isBuffer_msg);
            if (isBuffer(data)) {
                this.index++;
                var Parent_object_child_object_connection = this.index;
                this.v2h.app_buff(data, (errv2h) => {
                    if (errv2h) {
                        callback(`[ERROR] Error pushing stream buffer segment @ ${errv2h}`);
                    } else {
                        callback(Parent_object_child_object_connection);
                    }
                });
            } else {
                try {
                    var dadaP = JSON.parse(data);
                    if (dadaP && dadaP.info && dadaP.name && dadaP.file_extension && !dadaP.endindex) {
                        if (dadaP.info === 'n/a' && dadaP.name === 'n/a') {
                            callback('[ERROR] Data table header declared empty, the request is forbidden');
                        } else {
                            if (!isempty(dadaP.name) && !isempty(dadaP.info)) {
                                this.index = 0;
                                this.cid = randomstring.generate();
                                this.name = dadaP.name;
                                this.info = dadaP.info;
                                var tmp_i = this.index;
                                ///////////////////////////////////////////////////////////////////////////
                                this.v2h = new vid2hls(this.ffmpegRP,this.tempy, this.cid, 'mp4', (tf) => {
                                    if (!tf) {
                                        callback(tmp_i);
                                    } else {
                                        callback(`[ERROR] An error occurred when creating a new video transfer and warehousing entity @ ${tf}`);
                                    }
                                });
                            } else {
                                callback('[ERROR] Data table header declared empty, the request is forbidden');
                            }
                        }
                    } else if (dadaP && dadaP.endindex && !dadaP.name && !dadaP.info && !dadaP.file_extension) {
                        if (dadaP.endindex === 'n/a') {
                            callback('[ERROR] Data table end declared empty, the request is forbidden');
                        } else {

                            if (!isempty(dadaP.endindex) && !isNaN(parseInt(dadaP.endindex, 10)) && parseInt(dadaP.endindex, 10) === this.index) {
                                // Create a table
                                const ffmpeg_msg = [
                                    { ffmpeg_msg: 'trans. success' }];
                                //print
                                printTable(ffmpeg_msg);
                                var relay_v2h = this.v2h;
                                mp4id.add({
                                    cid: this.cid,
                                    name: this.name,
                                    info: this.info
                                }, (error_null) => {
                                    if (!error_null) {
                                        relay_v2h.end_trans(relayW, (mustbefinish) => {
                                            /**
                                             * mustbefinish will be null if all convert and db-upload is success; if error occurs, we can find error value in mustbefinish
                                             */
                                            console.log("🚀 ~ file: mp4Ulogic.js ~ line 77 ~ this.v2h.end_trans ~ mustbefinish", mustbefinish)
                                            callback("[SUCCESS] File conversion and database writing succeeded")
                                        });
                                    } else {
                                        callback(`[ERROR] Video indexing error @ ${error_null}`)
                                    }
                                });
                            } else {
                                callback('[ERROR] Data table end declared empty, the request is forbidden');
                            }
                        }
                    } else {
                        callback('[ERROR] The incoming profile has no valid data, the request is forbidden');
                    }
                } catch (error) {
                    console.log("🚀 ~ file: mp4Ulogic.js ~ line 110 ~ error", error)
                    callback(`[ERROR] Throwing exception when parsing WS incoming content @ ${error}`);
                }
            }
        }
    }
}

var mp4in = module.exports = mp4wsobj;