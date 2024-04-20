function solution1(base64Data) {

    var arrBuffer = base64ToArrayBuffer(base64Data);

    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([arrBuffer], { type: "application/pdf" });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    var data = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    document.body.appendChild(link); //required in FF, optional for Chrome
    link.href = data;
    link.download = "file.pdf";
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
}

function base64ToArrayBuffer(data) {
    var binaryString = window.atob(data);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
};

//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket(`ws${(location.protocol !== 'https:') ? '' : 's'}://${window.location.hostname}${window.location.hostname === 'localhost' ? ':5000' : ''}/websocket`);

var pdf_b64 = "";
function downpdf() {
    solution1(pdf_b64);
}
//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
    console.log('open connection');
    ws.send(document.getElementById('tkn').innerText);
}

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('close connection');
}

//接收 Server 發送的訊息
ws.onmessage = event => {
    console.log(event.data)
    if (event.data === "解析失敗!") {
        if (document.getElementById('wslab')) {
            document.getElementById('wslab').innerHTML = `<div class="ui label"><a href="https://cse.google.com/cse?cx=d613870f87198941e&q=解析失敗" target="_blank">解析失敗!</a></div>`;
            //TODO cse.google.com
        }

    } else if (event.data.startsWith('pdf||')) {
        console.error('無法生成pdf');
    } else if (event.data.startsWith('[')) {
        if (document.getElementById('wslab')) {
            document.getElementById('wslab').innerHTML = '';
            var JSON_parse_event_data = JSON.parse(event.data);
            for (var i = 0; i < JSON_parse_event_data.length; i++) {
                document.getElementById('wslab').innerHTML += `<div class="ui label"><a href="https://cse.google.com/cse?cx=d613870f87198941e&q=${JSON_parse_event_data[i]}" target="_blank">${JSON_parse_event_data[i]}</a></div>`;
            }
        }
    } else {
        pdf_b64 = event.data;

    }

}
