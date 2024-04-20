var isBuffer = require('isbuffer');
const { printTable } = require('console-table-printer');
var isempty = require('is-empty');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const PATH = require('path');
const dirTree = require('directory-tree');
const pretty = require('prettysize');
var fileExtension = require('file-extension');
var basename = require('basename');
const del = require('del');
var cpus = require('cpus')


class vid2hls {
    constructor(ffmpegRP, tempy, custom_video_id, custom_video_extension, callback) {
        this.ffmpegRP = ffmpegRP;
        this.tempy = tempy;
        this.custom_video_extension = custom_video_extension;
        this.fsLoc = this.tempy.file({ extension: custom_video_extension });
        this.fsDir = this.tempy.directory();
        this.custom_video_id = custom_video_id;
        fs.open(this.fsLoc, "wx", function (err1, fd) {
            // handle error
            if (err1) callback(`[ERROR] unable to create server-side temporary video file, at start-up @ ${err1}`);
            fs.close(fd, function (err2) {
                // handle error
                if (err2) { callback(`[ERROR] unable to create server-side temporary video file, at end-stage @ ${err2}`); } else {
                    callback(null);
                }
            });
        });
    }

    app_buff(buf, callback) {
        fs.appendFile(this.fsLoc, buf, function (err) {
            if (err) {
                callback('[ERROR] Data table header declared empty, the request is forbidden');
            }
            console.log("The file was saved!");
            callback(null);
        });
    }

    warehouse(ffmpegRP, idx, fileList, finish, warehousing, relay_this_warehouse,
        relay_this_fsLoc, relay_this_custom_video_extension, relay_this_custom_video_id) {
        ffmpegRP(relay_this_custom_video_id, `HLS file database upload, index number:${idx}`)
        console.log("🚀 ~ file: vid2hls.js ~ line 41 ~ vid2hls ~ warehouse ~ idx", idx)
        if (idx < fileList.children.length) {
            fs.readFile(fileList.children[idx].path, function (err, data) {
                if (err) {
                    ffmpegRP(relay_this_custom_video_id, `Error, Unable to read HLS segment file while database is populated:${err}`)
                    finish(err);
                } else {

                    var toW = {
                        date_time: Date.now(),
                        file_name: fileList.children[idx].name,
                        file_extension: fileExtension(fileList.children[idx].name),
                        file_dir: fileList.name,
                        custom_video_title: basename(relay_this_fsLoc),
                        custom_video_info: relay_this_custom_video_extension,
                        custom_video_id: relay_this_custom_video_id
                        , support_resolution: ['TBD', 'TBD', 'TBD'],
                        file_size: Buffer.byteLength(data)
                        , data: data, file_size_pretty: pretty(Buffer.byteLength(data))
                    };
                    console.log("🚀 ~ file: vid2hls.js ~ line 64 ~ vid2hls ~ toW", toW)
                    ffmpegRP(relay_this_custom_video_id, `Progress report, fill data into the database, the current time is:${toW.date_time}`)
                    warehousing(toW
                        , (tf) => {
                            if (tf) {
                                relay_this_warehouse(ffmpegRP, idx + 1, fileList, finish, warehousing, relay_this_warehouse,
                                    relay_this_fsLoc, relay_this_custom_video_extension, relay_this_custom_video_id);
                            } else {
                                console.log("[ERROR] Custom data processing return value display error")
                                ffmpegRP(relay_this_custom_video_id, `[ERROR] Custom data processing return value display error`)
                            }
                        });
                }
            });
        } else {
            del([fileList.children[idx - 1] ? fileList.children[idx - 1].name : ''],{force:true}).then(() => {
                ffmpegRP(relay_this_custom_video_id, `Congrats, all work done`)
                finish(null);
            });
        }
    }

    multi_resolution_synthesis(warehousing, finish, relay_this_fsDir, relay_this_fsLoc, mrs_head_obj) { // do something when encoding is done 
        var FWD_fsDir = relay_this_fsDir;
        var relay_this_warehouse = mrs_head_obj.warehouse;
        var relay_this_custom_video_extension = mrs_head_obj.custom_video_extension;
        var relay_this_custom_video_id = mrs_head_obj.custom_video_id;
        fs.writeFile(`${FWD_fsDir}/index.m3u8`, '#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360\n360p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480\n480p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720\n720p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=6000000,RESOLUTION=1920x1080\n1080p.m3u8', function (err) {
            if (err) {
                mrs_head_obj.this_ffmpegRP(relay_this_custom_video_id, `Error, unable to synthesize multi-resolution index, ${err}`)
                finish(err);
            } else {
                console.log("The file was saved!");
                mrs_head_obj.this_ffmpegRP(relay_this_custom_video_id, 'Progress report, Multi-resolution synthesis completed...')
                // Loop through all the files in the temp directory
                dirTree(FWD_fsDir, {
                    extensions: /\.(ts|m3u8)$/
                }, () => {
                    // Create a table
                    //const dir_tree = [
                    //    { dir_tree: 'MID~~' }];
                    //print
                    //printTable(dir_tree);
                    mrs_head_obj.this_ffmpegRP(relay_this_custom_video_id, 'Progress report, file transfer completed, reading HLS file tree...')
                }, (item, PATH, stats) => {
                    mrs_head_obj.this_ffmpegRP(relay_this_custom_video_id, `Progress report, ${JSON.stringify(item)}, end of progress report...`)
                    console.log(item);
                    relay_this_warehouse(mrs_head_obj.this_ffmpegRP, 0, item, finish, warehousing, relay_this_warehouse,
                        relay_this_fsLoc, relay_this_custom_video_extension, relay_this_custom_video_id);
                });
            }
        })
    }

    ff360(p0, p1, p2, p3, relay_this_mrs, mrs_head_obj, callback) {
        ffmpeg(p3).addOptions([ //360
            // '-profile:v main',
            "-vf scale='w=min(640,trunc((360*dar)/2+0.5)*2):h=min(360,trunc((640/dar)/2+0.5)*2)',pad='w=640:h=360:x=(ow-iw)/2:y=(oh-ih)/2',setsar='sar=1/1'",
            '-c:a aac',
            "-preset:v veryslow",
            // '-ar 48000',
            // '-b:a 96k',
            '-c:v h264',
            '-crf 20',
            // '-g 48',
            // '-keyint_min 48',
            // '-sc_threshold 0',
            // '-b:v 800k',
            // '-maxrate 856k',
            // '-bufsize 1200k',
            '-hls_time 10',
            `-hls_segment_filename ${p0}/360p_%05d.ts`,
            '-hls_playlist_type vod',
            '-f hls',
            `-threads ${(cpus()) ?
                (cpus().length && cpus().length > 0) ?
                    (cpus().length === 1) ?
                        1 : (cpus().length === 2) ?
                            1 : (cpus().length === 3) ?
                                2 : (cpus().length === 4) ?
                                    3 : (cpus().length === 5) ?
                                        3 : (cpus().length === 6) ?
                                            4 : (cpus().length === 7) ?
                                                4 : (cpus().length === 8) ? 4
                                                    : Math.abs(Math.round(cpus().length / 2))
                    : 1
                : 1
            }`
        ]).output(p0 + '/360p.m3u8').on('error', function (err, stdout, stderr) {
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `FFMPEG!!!ERROR!!!, ${stdout}`)
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `FFMPEG!!!ERROR!!!, ${stderr}`)
            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).on('end', () => {
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `Progress report, some halfway announcements, FFMPEG conversion has been partially completed, 360`)
            this.ff480(p0, p1, p2, p3, relay_this_mrs, mrs_head_obj, callback);
            console.log("ffmpeg360");
        }).run()
    }
    ff480(p0, p1, p2, p3, relay_this_mrs, mrs_head_obj, callback) {
        ffmpeg(p3).addOptions([ //480
            // '-profile:v main',
            "-vf scale='w=min(842,trunc((480*dar)/2+0.5)*2):h=min(480,trunc((842/dar)/2+0.5)*2)',pad='w=842:h=480:x=(ow-iw)/2:y=(oh-ih)/2',setsar='sar=1/1'",//why on earth is 842???
            '-c:a aac',
            "-preset:v veryslow",
            // '-ar 48000',
            // '-b:a 128k',
            '-c:v h264',
            '-crf 20',
            // '-g 48',
            // '-keyint_min 48',
            // '-sc_threshold 0',
            // '-b:v 1400k',//292
            // '-maxrate 1498k',//273
            // '-bufsize 2100k',//195
            '-hls_time 7',
            `-hls_segment_filename ${p0}/480p_%05d.ts`,
            '-hls_playlist_type vod',
            '-f hls',
            `-threads ${(cpus()) ?
                (cpus().length && cpus().length > 0) ?
                    (cpus().length === 1) ?
                        1 : (cpus().length === 2) ?
                            1 : (cpus().length === 3) ?
                                2 : (cpus().length === 4) ?
                                    3 : (cpus().length === 5) ?
                                        3 : (cpus().length === 6) ?
                                            4 : (cpus().length === 7) ?
                                                4 : (cpus().length === 8) ? 4
                                                    : Math.abs(Math.round(cpus().length / 2))
                    : 1
                : 1
            }`
        ]).output(p0 + '/480p.m3u8').on('error', function (err, stdout, stderr) {
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `FFMPEG!!!ERROR!!!, ${stdout}`)
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `FFMPEG!!!ERROR!!!, ${stderr}`)
            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).on('end', () => {
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `Progress report, some halfway announcements, FFMPEG conversion has been partially completed, 480`)
            this.ff720(p0, p1, p2, p3, relay_this_mrs, mrs_head_obj, callback);
            console.log("ffmpeg480");
        }).run()
    }
    //https://github.com/atomdeniz/nodejs-mp4-to-hls
    ff720(p0, p1, p2, p3, relay_this_mrs, mrs_head_obj, callback) {
        ffmpeg(p3).addOptions([ //720
            // '-profile:v main',
            "-vf scale='w=min(1280,trunc((720*dar)/2+0.5)*2):h=min(720,trunc((1280/dar)/2+0.5)*2)',pad='w=1280:h=720:x=(ow-iw)/2:y=(oh-ih)/2',setsar='sar=1/1'",
            '-c:a aac',
            "-preset:v veryslow",
            // '-ar 48000',
            // '-b:a 128k',
            '-c:v h264',
            '-crf 20',
            //'-g 48',
            //'-keyint_min 48',
            //'-sc_threshold 0',
            //'-b:v 2800k',//329.14
            //'-maxrate 2996k',//307.61
            //'-bufsize 4200k',//219.42
            '-hls_time 5',
            `-hls_segment_filename ${p0}/720p_%05d.ts`,
            '-hls_playlist_type vod',
            '-f hls',
            `-threads ${(cpus()) ?
                (cpus().length && cpus().length > 0) ?
                    (cpus().length === 1) ?
                        1 : (cpus().length === 2) ?
                            1 : (cpus().length === 3) ?
                                2 : (cpus().length === 4) ?
                                    3 : (cpus().length === 5) ?
                                        3 : (cpus().length === 6) ?
                                            4 : (cpus().length === 7) ?
                                                4 : (cpus().length === 8) ? 4
                                                    : Math.abs(Math.round(cpus().length / 2))
                    : 1
                : 1
            }`
        ]).output(p0 + '/720p.m3u8').on('error', function (err, stdout, stderr) {
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `FFMPEG!!!ERROR!!!, ${stdout}`)
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `FFMPEG!!!ERROR!!!, ${stderr}`)
            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).on('end', () => {
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `Progress report, some halfway announcements, FFMPEG conversion has been partially completed, 720`)
            this.ff1080(p0, p1, p2, p3, relay_this_mrs, mrs_head_obj, callback);
            console.log("ffmpeg720");
        }).run()
    }
    ff1080(p0, p1, p2, p3, mrs, mrs_head_obj, callback) {
        ffmpeg(p3).addOptions([ //1080
            //TODO其實我不知道1080的參數要怎麼設，scale 這個設定黨應該是對的
            // '-profile:v main',
            "-preset:v veryslow",
            "-vf scale='w=min(1920,trunc((1080*dar)/2+0.5)*2):h=min(1080,trunc((1920/dar)/2+0.5)*2)',pad='w=1920:h=1080:x=(ow-iw)/2:y=(oh-ih)/2',setsar='sar=1/1'",//https://www.mobile01.com/topicdetail.php?f=510&t=3782292
            '-c:a aac',
            // '-ar 48000',
            // '-b:a 128k',
            '-c:v h264',
            '-crf 20',
            // '-g 48',
            // '-keyint_min 48',
            // '-sc_threshold 0',
            // '-b:v 17500k',
            // '-maxrate 18000k',//https://www.mobile01.com/topicdetail.php?f=510&t=4500233
            // '-bufsize 25200k',
            '-hls_time 3',
            `-hls_segment_filename ${p0}/1080p_%05d.ts`,
            '-hls_playlist_type vod',
            '-f hls',
            `-threads ${(cpus()) ?
                (cpus().length && cpus().length > 0) ?
                    (cpus().length === 1) ?
                        1 : (cpus().length === 2) ?
                            1 : (cpus().length === 3) ?
                                2 : (cpus().length === 4) ?
                                    3 : (cpus().length === 5) ?
                                        3 : (cpus().length === 6) ?
                                            4 : (cpus().length === 7) ?
                                                4 : (cpus().length === 8) ? 4
                                                    : Math.abs(Math.round(cpus().length / 2))
                    : 1
                : 1
            }`
        ]).output(p0 + '/1080p.m3u8').on('end', () => {
            console.log("ffmpeg1080");
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `Progress report, some halfway announcements, FFMPEG conversion has been partially completed, 1080`)
            callback(p0, p1, p2, p3, mrs, mrs_head_obj);

        }).on('error', function (err, stdout, stderr) {
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `FFMPEG!!!ERROR!!!, ${stdout}`)
            mrs_head_obj.this_ffmpegRP(mrs_head_obj.custom_video_id, `FFMPEG!!!ERROR!!!, ${stderr}`)
            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
        }).run()
    }

    end_trans(pt1, pt2) {
        var this_ffmpegRP = this.ffmpegRP;
        var relay_this_fsDir = this.fsDir;
        var relay_this_fsLoc = this.fsLoc;
        var relay_this_warehouse = this.warehouse;
        var relay_this_custom_video_extension = this.custom_video_extension;
        var relay_this_custom_video_id = this.custom_video_id;
        var mrs_head_obj = {
            this_ffmpegRP: this_ffmpegRP,
            warehouse: relay_this_warehouse,
            custom_video_extension: relay_this_custom_video_extension,
            custom_video_id: relay_this_custom_video_id
        }
        var relay_this_mrs = this.multi_resolution_synthesis;
        this.ff360(relay_this_fsDir, pt1, pt2, relay_this_fsLoc, relay_this_mrs, mrs_head_obj, (p0, p1, p2, p3, mrs, mrs_head_obj) => {
            mrs(p1, p2, p0, p3, mrs_head_obj);
            del([p3],{force:true}).then(() => {//TODO wtf
                console.log('OK')    //TODO tell user that it is ok
                this_ffmpegRP(relay_this_custom_video_id, "Progress report, halfway announcement, FFMPEG conversion completed and original file deleted")
            });
        });

    }
}

var v2h = module.exports = vid2hls;