// Shorthand for $( document ).ready()
$(function () {
    console.log("ready!");
    document.getElementById('make_it_html').value = 'html';
    setfmt();
    document.getElementById('xlf').addEventListener('change', () => {
        console.log("file value change");
        document.getElementById('the_file_name').innerText = document.getElementById('xlf').value;

        function do_render() {
            console.log("Prism.highlightAll();");
            document.getElementById("htmlOutCopy").innerHTML = document.getElementById("htmlout").innerHTML;
            //.ui.single.line.striped.selectable.unstackable.table(style='overflow-x: auto;')
            document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('ui');
            //document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('single');
            //document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('line');
            document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('striped');
            document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('selectable');
            document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('unstackable');
            document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].classList.add('table');
            //document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].style.overflowX = 'auto';
        }
        //https://www.polarxiong.com/archives/%E4%BD%BF%E7%94%A8MutationObserver%E5%92%8CDOMSubtreeModified%E7%9B%91%E5%90%ACHTML%E4%B8%ADtitle%E7%9A%84%E5%8F%98%E5%8C%96.html
        var render_prism = function () {
            //do_render();
            var titleEl = document.getElementById("htmlout");
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            if (MutationObserver) {
                var MutationObserverConfig = {
                    childList: true,
                    subtree: true,
                    characterData: true
                };
                var observer = new MutationObserver(function (mutations) {
                    do_render();
                });
                observer.observe(titleEl, MutationObserverConfig);
            }
            else if (titleEl.addEventListener) {
                titleEl.addEventListener("DOMSubtreeModified", function (evt) {
                    do_render();
                }, false);
            }
            else {
                console.log('unsupported browser');
            }
        };
        render_prism();
    });
});

$(function () {//一定要等document loaded
    if (document.getElementById('RegistrationNumberLinkAutomaticallyGenerated')) {
        document.getElementById('RegistrationNumberLinkAutomaticallyGenerated').addEventListener('click', function () {
            var start_do_urlER = false;
            if (document.getElementById("htmlOutCopy")) {
                if (document.getElementById("htmlOutCopy").getElementsByTagName('table').length > 0) {
                    if (document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].getElementsByTagName('tr').length > 0) {
                        for (let index = 0; index < document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].getElementsByTagName('tr').length; index++) {
                            const element = document.getElementById("htmlOutCopy").getElementsByTagName('table')[0].getElementsByTagName('tr')[index];
                            if (element.getElementsByTagName('td').length > 0) {
                                if (start_do_urlER) {
                                    //https://weblis.lib.ncku.edu.tw/search*cht/g?searchtype=l&searcharg=2078318&searchscope=1
                                    element.getElementsByTagName('td')[0].innerHTML = `<a href="https://weblis.lib.ncku.edu.tw/search*cht/g?searchtype=l&searcharg=${element.getElementsByTagName('td')[0].innerText.trim()}&searchscope=1" target="_blank">${element.getElementsByTagName('td')[0].innerText.trim()}</a>`;
                                }
                                if (element.getElementsByTagName('td')[0].innerText.trim().includes('登錄號')) {
                                    console.log('saw 登錄號');
                                    start_do_urlER = true;
                                }
                            }
                        }
                    }
                }
            }
        });
    }
});

//totalSave
$(function () {
    document.getElementById('totalSave').addEventListener('click', function (e) {
        var INexcelHTML = '';
        if (document.getElementById('htmlOutCopy')) {
            INexcelHTML = document.getElementById('htmlOutCopy').innerHTML;
        }
        var INbatabaseClass = '';
        if (document.getElementById('batabaseClass')) {
            if (document.getElementById('batabaseClass').value) {
                INbatabaseClass = document.getElementById('batabaseClass').value;
            } else {
                INbatabaseClass = 'NoCategory';
            }
        }
        var INtopic = '';
        if (document.getElementById('INtopic')) {
            if (document.getElementById('INtopic').value) {
                INtopic = document.getElementById('INtopic').value;
            } else {
                INtopic = 'unnamed' + String(Date.now());
            }
        }
        var INChansuNoJunban = '';
        if (document.getElementById('ChansuNoJunban')) {
            if (document.getElementById('ChansuNoJunban').value) {
                INChansuNoJunban = parseInt(document.getElementById('ChansuNoJunban').value, 10);
            } else {
                INChansuNoJunban = -1;
            }
        }
        $.post("/main/excel", {
            batabaseClass: INbatabaseClass,
            topic: INtopic,
            excelHTML: INexcelHTML,
            ChansuNoJunban: INChansuNoJunban
        }, (res) => {
            if (res.includes('success')) {
                if (document.getElementById('linkAFTERfinish') && document.getElementById('linkAFTERfinish').innerText !== 'no') {
                    var tmp_r = res.replace('success@', '');
                    window.location.href = `/main/eroLink?eID=${tmp_r}&rlID=${document.getElementById('linkAFTERfinish').innerText}`;
                } else {
                    location.reload();
                }
            } else { $('#Data_manipulation_error').modal('show');/*錯誤宣告*/ }
        });
    });
});

$(function () {
    var clickonstart = document.getElementsByClassName('TRIGdissableOnStart');
    clickonstart.forEach(element => {
        element.click();
    });
});
