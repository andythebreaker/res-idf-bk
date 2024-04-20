function copyToClipboard(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
}
var walkDOM = function (node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkDOM(node, func);
        node = node.nextSibling;
    }

};
var r = document.getElementsByTagName('tr');
var rl = r.length;
var table_all = [];
for (let i = 0; i < rl; i++) {
    //console.log(r[i]);
    var element = r[i];
    var d = element.getElementsByTagName('td');
    var table_tr = [];
    for (let index = 0; index < d.length; index++) {
        var e = d[index];
        var ous = '';
        walkDOM(e, function (node) {
            if (node.childNodes.length === 0) {
                if (!(node.tagName && node.tagName.toUpperCase() === 'BR')) {
                    if (node.parentNode &&
                        node.parentNode.tagName &&
                        node.parentNode.tagName.toUpperCase() === 'A') {
                        ous += '@href@';
                    }
                    ous += node.data ? node.data.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s+/g, ' ') : '';
                    if (node.parentNode &&
                        node.parentNode.tagName &&
                        node.parentNode.tagName.toUpperCase() === 'A') {
                        ous += '@text@';
                        ous += node.parentNode.href || '';
                        ous += '@url@';
                    }
                }
            }
        });
        table_tr.push(ous);
    }
    table_all.push(table_tr);
}
console.log(table_all);
table_all.shift();
copyToClipboard(JSON.stringify(table_all).substring(1).slice(0, -1));