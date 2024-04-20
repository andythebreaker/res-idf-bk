document.getElementById('checkvidinfo').addEventListener('click', () => {
    let ws = new WebSocket(`ws${(location.protocol !== 'https:') ? '' : 's'}://${window.location.hostname}${window.location.hostname === 'localhost' ? ':5000' : ''}/websocket`);
    //開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行

    var head_obj_str = {
        name: document.getElementById('This_is_a_well_crafted_film') ? document.getElementById('This_is_a_well_crafted_film').value : 'n/a',
        info: document.getElementById('Let_users_know_more_about_the_content_of_the_video') ? document.getElementById('Let_users_know_more_about_the_content_of_the_video').value : 'n/a'
    };
    console.log("🚀 ~ file: mp4upload.js ~ line 9 ~ document.getElementById ~ head_obj_str", head_obj_str)
    ws.onopen = () => {
        console.log('open connection');
        //ws.send(head_obj_str);
        $('#stp1').text('伺服器上線');
    }

    //關閉後執行的動作，指定一個 function 會在連結中斷後執行
    ws.onclose = () => {
        console.log('close connection');$('#stp1').text('伺服器離線或連線逾時');
    }

    var stream = null;
    var reader = null;
    var file_stream_index = 0;
    var pro_bar = 0;
    var file_size = null;
    var WSmod = 0;
    //var go_next_block = true;

    function Client_cargo_sequence_self_check(check_index) {
        if (check_index && !isNaN(parseInt(check_index, 10)) && parseInt(check_index, 10) === file_stream_index) {
            return true;
        } else { return false; }
    }

    function getFileNameWithExt(event) {

        if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
            return;
        }

        const name = event.target.files[0].name;
        const lastDot = name.lastIndexOf('.');

        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);

        //outputfile.value = fileName;
        //extension.value = ext;
        console.log("🚀 ~ file: mp4upload.js ~ line 47 ~ getFileNameWithExt ~ ext", ext)
        return ext;
    }

    //接收 Server 發送的訊息
    ws.onmessage = async (event) => {
        //if (WSmod === 1) { 

        // } else {
        console.log(event.data);
        if (Client_cargo_sequence_self_check(event.data)) {

            var { done, value } = await reader.read();
            if (done) {
                console.log("all finish...");
                $('#stp4').text('傳輸成功');// WSmod = 1;
                var tmp_end = JSON.stringify({
                    endindex: file_stream_index
                });

                ws.send(tmp_end);
            } else {
                file_stream_index++;
                handleChunk(value);
            }

        } else {
            if (event.data) {
                const regex1 = /success/gmi;
                const str1 = String(event.data);
                let m1;

                while ((m1 = regex1.exec(str1)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m1.index === regex1.lastIndex) {
                        regex1.lastIndex++;
                    }

                    // The result can be accessed through the `m`-variable.
                    m1.forEach((match, groupIndex) => {
                        console.log(`Found match, group ${groupIndex}: ${match}`);
                        $('#stp4').text('傳輸成功');
                    });
                }

                const regex2 = /error/gmi;
                const str2 = String(event.data);
                let m2;

                while ((m2 = regex2.exec(str2)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m2.index === regex2.lastIndex) {
                        regex2.lastIndex++;
                    }

                    // The result can be accessed through the `m`-variable.
                    m2.forEach((match, groupIndex) => {
                        console.log(`Found match, group ${groupIndex}: ${match}`);
                        $('#stp3').text('傳輸過程發生錯誤');
                    });
                }

            } else {
                $('#stp3').text('傳輸過程發生錯誤');
            }
            console.log("sequence error...");
        }
        //   }
    }

    try {
        stream = null;
        reader = null;
        file_stream_index = 0;
        go_next_block = true; pro_bar = 0; file_size = 0;// WSmod = 0;
        inp.onchange = async (evt) => {
            file_size = inp.files[0].size;
            stream = inp.files[0].stream();
            reader = stream.getReader();
            ws.send(JSON.stringify({
                ...head_obj_str,
                file_extension: getFileNameWithExt(evt)
            }));
            console.log("stream file start...");
            $('#stp2').text('已經開始傳送');
        };
    } catch (error) {
        //console.log("This is a bug that doesn't need to be noticed");
        console.log(error);
        $('#stp2').text('無法開始傳送');
    }


    function handleChunk(buf) {
        ws.send(buf);
        console.log("received a new buffer", buf.byteLength);
        file_size += buf.byteLength;
        $('#uploadPB').css('width', Math.round((file_size / file_size) * 100) + '%').attr('aria-valuenow', Math.round((file_size / file_size) * 100)).text(`${Math.round((file_size / file_size) * 100)}%`);
    }
    $('#showfilebton').show();
});

$('#uploadPB').css('width', 0 + '%').attr('aria-valuenow', 0).text('0%');