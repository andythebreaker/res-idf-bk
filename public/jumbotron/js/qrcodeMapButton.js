/*author:andythebreaker*/

// Select the node that will be observed for mutations
const targetNode = document.getElementById('qrcode');

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Create an observer instance linked to the callback function
const observer = new MutationObserver(function (mutationsList, observer) {
    console.log(1);
    if (document.querySelector('#qrcode img')) {
        console.log(1);

        if (document.querySelector('#qrcode img').src) {

            var qrcodeimg = document.querySelector('#qrcode img').src;

            var map_button_img = document.createElement("img");

            map_button_img.src = qrcodeimg;

            document.getElementById('qrcode').innerHTML = "";

            document.getElementById('qrcode').appendChild(map_button_img);

            var map_button_inner_html = document.createElement("i");

            map_button_inner_html.classList.add('map');

            map_button_inner_html.classList.add('marker');

            map_button_inner_html.classList.add('alternate');

            map_button_inner_html.classList.add('icon');

            document.getElementById('qrcode').appendChild(map_button_inner_html);
            document.getElementById('qrcode').innerHTML += " 地圖 &raquo;";
            observer.disconnect();
        }else{
            document.querySelector('#qrcode canvas').toBlob(function(blob){ 
                var qrcodeimg = window.URL.createObjectURL(blob);
    
            var map_button_img = document.createElement("img");

            map_button_img.src = qrcodeimg;

            document.getElementById('qrcode').innerHTML = "";

            document.getElementById('qrcode').appendChild(map_button_img);

            var map_button_inner_html = document.createElement("i");

            map_button_inner_html.classList.add('map');

            map_button_inner_html.classList.add('marker');

            map_button_inner_html.classList.add('alternate');

            map_button_inner_html.classList.add('icon');

            document.getElementById('qrcode').appendChild(map_button_inner_html);
            document.getElementById('qrcode').innerHTML += " 地圖 &raquo;";
            observer.disconnect();
            }, 'image/jpeg', 0.95);
            
        }
    }
});

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

var QRCodeOBJ = new QRCode(document.getElementById("qrcode"), document.getElementById("qrcode").innerText);
