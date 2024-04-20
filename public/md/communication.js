document.getElementById('sendmd').addEventListener('click', (event) => {
    event.preventDefault();
    //console.log('com...');
    $.post("/main/editmd", {
        usrinpt: document.getElementsByTagName('textarea')[0].value
    }, (res) => {
        //console.log(res);
        const regex = /@=@docmdid@=@(.+)@~@docmdid@~@/gm;
        const str = res;
        let m;
        var need_first_gp = 0;
        var tmp_doc_md_id = '';
        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
                if (need_first_gp === 0 && groupIndex === 1) {
                    tmp_doc_md_id = match;
                }
            });
            need_first_gp++;
        }
        console.log(tmp_doc_md_id);
        var _href = $('#alpha').attr("href");
        $('#alpha').attr("href", _href + 'docid=' + tmp_doc_md_id);
        var oMyBlob = new Blob([res], { type: 'text/html' }); // the blob
        var MYobjectURL = URL.createObjectURL(oMyBlob);
        window.open(MYobjectURL, "_blank");
    });
});