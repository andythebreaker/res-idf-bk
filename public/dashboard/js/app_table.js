//const { default: fetch } = require("node-fetch")

var $table = $('#table')
var $remove = $('#remove')
var selections = []

function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id
    })
}

function responseHandler(res) {
    $.each(res.rows, function (i, row) {
        row.state = $.inArray(row.id, selections) !== -1
    })
    return res
}

function detailFormatter(index, row) {
    var html = []
    $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>')
    })
    return html.join('')
}

function operateFormatter(value, row, index) {
    return [
        '<a class="like" href="javascript:void(0)" title="Like">',
        '<i class="fa fa-pen"></i>',
        '</a>  ',
        '<a class="remove" href="javascript:void(0)" title="Remove">',
        '<i class="fa fa-trash"></i>',
        '</a>'
    ].join('')
}

window.operateEvents = {
    'click .like': function (e, value, row, index) {
        window.open(
            `/main/add_periodical?EDITframeNumber=${Base64.encodeURI(row.placeNumber)}&EDITISSN=${Base64.encodeURI(row.issn)}&EDITbookName=${Base64.encodeURI(row.mainName)}&EDITeissn=${Base64.encodeURI(row.eissn)}&EDITSTAT=${Base64.encodeURI(row.stat)}&EDITES=${Base64.encodeURI(row.eSource)}&EDITPS=${Base64.encodeURI(row.pSource)}&EDITREMK=${Base64.encodeURI(row.someStuff)}&EDITLIVstart=${Base64.encodeURI(row.TIMEs)}&EDITLIVend=${Base64.encodeURI(row.TIMEe)}&EDITLIVx=${Base64.encodeURI(row.TIMEn)}&id=${row.id}`,
            "_blank");
    },
    'click .remove': function (e, value, row, index) {
        /*$table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })*/
        fetch(`/main/delJ?id=${row.id}`)
            .then((r) => { return r.text() })
            .then((t) => {
                /* $('#quickPOPUPtopic').text('操作完成');
                 $('#quickPOPUPinfo').text(t ? '狀態:成功~' : `錯誤說明:${t}`);
                 $('#quickPOPUPyes').text('(按我!按我!)重新整理');
                 $('#quickPOPUPyes').on("click", function () {
                     $('.ui.button[name="refresh"]').click();
                     $('#sidebar').hide();
                 });
                 $('#quickPOPUPno').text('不重新整理就繼續(不建議但較快)');
                 $('#quickPOPUP')
                     .modal('show')
                     ;*/
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'ui button green btn btn-success large',
                        cancelButton: 'ui button red btn btn-danger large'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: '操作完成',
                    text: t ? `錯誤說明:${t}` : '狀態:成功~',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '好',
                    cancelButtonText: '重新整理',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('.ui.button[name="refresh"]').click();
                        $('#sidebar').hide();
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        location.reload();
                    }
                })
            });
    }
}

function totalTextFormatter(data) {
    return 'Total'
}

function totalNameFormatter(data) {
    return data.length
}

function totalPriceFormatter(data) {
    var field = this.field
    return '$' + data.map(function (row) {
        return +row[field].substring(1)
    }).reduce(function (sum, i) {
        return sum + i
    }, 0)
}

function LinkFormatter(value, row, index) {

    function reg_step_1(ins) {
        const regex = /@url@([^@]*)@href@/gm;
        const str = ins;//`qwdewfr@href@電子期@text@http://intlpress.com/site/pub/pages/journals/items/cjm/content/vols/index.html@url@(wqdefewfrwr)@href@電子期@text@http://intlpress.com/site/pub/pages/journals/items/cjm/content/vols/index.html@url@448pijij@href@電子期@text@http://intlpress.com/site/pub/pages/journals/items/cjm/content/vols/index.html@url@448pijij`;
        const subst = `@url@;;;$1;;;@href@`;

        // The substituted value will be contained in the result variable
        const result = str.replace(regex, subst);

        console.log('Substitution result: ', result);
        return result;
    }

    function reg_step_2(ins) {
        const regex = /@href@([^:|@]*)@text@(http[s]?:\/\/.?[www]?\.?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=*]*)@url@/img;
        //const regex = /@href@([^:|@]*)@text@(http[s]?:\/\/.*?\/[a-zA-Z-_]+[^@]*)@url@/gm;
        //hotfix220324
        //using https://regexr.com/3e6m0
        //not working https://pastebin.com/9i7FSQ23、https://pastebin.com/raw/qyv6gmQe
        const str = ins;//`qwdewfr@href@電子期@text@http://intlpress.com/site/pub/pages/journals/items/cjm/content/vols/index.html@url@wqdefewfrwr@href@電子期@text@http://intlpress.com/site/pub/pages/journals/items/cjm/content/vols/index.html@url@448pijij`;
        const subst = `<a href='$2'>$1</a>`;

        // The substituted value will be contained in the result variable
        const result = str.replace(regex, subst);

        console.log('Substitution result: ', result);
        return result;
    }

    var tmpa = reg_step_1(value).split(';;;');
    var ous = '';
    tmpa.forEach(element => {
        ous += reg_step_2(element) || element;
    });


    return ous;
}

function initTable() {
    $table.bootstrapTable('destroy').bootstrapTable({
        height: 0.8 * vh, search: true,
        locale: $('#locale').val(),
        sortOrder: 'asc',
        sortName: 'placeNumber',
        columns: [
            [//{
                // field: 'state',
                // checkbox: true,
                //rowspan: 2,
                //align: 'center',
                //valign: 'middle'
                //},
                {
                    title: '語言',
                    field: 'placeNumber',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    searchable: true,
                    formatter: LinkFormatter
                    //footerFormatter: totalTextFormatter
                }
                , {
                    title: '類別',
                    field: 'issn',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: true, formatter: LinkFormatter
                    //footerFormatter: totalTextFormatter
                }, {
                    title: '系統框架',
                    field: 'eissn',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: true, formatter: LinkFormatter
                    //footerFormatter: totalTextFormatter
                }, {
                    title: '名稱',
                    field: 'mainName',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    searchable: true, formatter: LinkFormatter
                    //footerFormatter: totalTextFormatter
                }, {
                    title: '狀況',
                    field: 'stat',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: false, formatter: LinkFormatter
                    //footerFormatter: totalTextFormatter
                }, {
                    title: '程式碼',
                    field: 'eSource',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: false,
                    formatter: LinkFormatter
                    //footerFormatter: totalTextFormatter
                }, {
                    title: '參考',
                    field: 'pSource',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: false, formatter: LinkFormatter
                    //footerFormatter: totalTextFormatter
                }
                //, {
                //  title: '卷期-年代',
                //field: 'datas',
                //        rowspan: 2,
                //      align: 'center',
                //    valign: 'middle',
                //  sortable: true,formatter: LinkFormatter
                //-footerFormatter: totalTextFormatter
                //}
                , {
                    title: '備註',
                    field: 'someStuff',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: false, formatter: LinkFormatter
                    //footerFormatter: totalTextFormatter
                }
                , {
                    title: '資料細節',
                    colspan: 4,
                    align: 'center',
                    visible: (document.getElementById('isUSER').innerText === 'no') ? true : false,
                    formatter: LinkFormatter
                }],
            [{
                field: 'updateTime',
                title: '更新日期',
                sortable: true,
                //footerFormatter: totalNameFormatter,
                align: 'center', searchable: false,
                visible: (document.getElementById('isUSER').innerText === 'no') ? true : false
            }, {
                field: 'existTime',
                title: '存在年分',
                sortable: true,
                align: 'center', searchable: false,
                visible: (document.getElementById('isUSER').innerText === 'no') ? true : false
                //footerFormatter: totalPriceFormatter
            }, {
                field: 'id',
                title: '識別碼',
                sortable: true,
                align: 'center', searchable: false,
                visible: (document.getElementById('isUSER').innerText === 'no') ? true : false
                //footerFormatter: totalPriceFormatter
            }, {
                field: 'operate',
                title: '管理操作',
                align: 'center', searchable: false,
                clickToSelect: false,
                events: window.operateEvents,
                formatter: operateFormatter,
                visible: (document.getElementById('isUSER').innerText === 'no') ? true : false
            }

                , {
                field: 'TIMEs',
                title: '年代紀錄(不顯示在使用者/管理端)[起始]',
                sortable: true,
                align: 'center', searchable: false,
                visible: false
                //footerFormatter: totalPriceFormatter
            }, {
                field: 'TIMEe',
                title: '年代紀錄(不顯示在使用者/管理端)[停止]',
                sortable: true,
                align: 'center', searchable: false,
                visible: false
                //footerFormatter: totalPriceFormatter
            }, {
                field: 'TIMEn',
                title: '年代紀錄(不顯示在使用者/管理端)[負面]',
                sortable: true,
                align: 'center', searchable: false,
                visible: false
                //footerFormatter: totalPriceFormatter
            }

            ]
        ]
    })
    $table.on('load-success.bs.table', function (e, name, args) {
        //console.log("load-success.bs.table");
        if (document.querySelector(".bootstrap-table.semantic")) {
            document.querySelector(".bootstrap-table.semantic").setAttribute("style", "width:100%;");

            if (document.getElementsByClassName("fixed-table-toolbar")) {
                //document.getElementsByClassName("fixed-table-toolbar")[0].classList.add("ui");
                //document.getElementsByClassName("fixed-table-toolbar")[0].classList.add("menu");
            } else {
                console.log("[ERROR] <table> onevent:load-success.bs.table -> can't find **.bootstrap-table.semantic**");
            }
        } else {
            console.log("[ERROR] <table> onevent:load-success.bs.table -> can't find **class=fixed-table-toolbar**");
        }
        table_user();
    })
    $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table',
        function () {
            $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)

            // save your data, here just save the current page
            selections = getIdSelections()
            // push or splice the selections if you want to save all data selections
        })
    $table.on('all.bs.table', function (e, name, args) {
        //console.log(name, args)
    })
    $remove.click(function () {
        var ids = getIdSelections()
        $table.bootstrapTable('remove', {
            field: 'id',
            values: ids
        })
        $remove.prop('disabled', true)
    })
}

$(function () {
    initTable()

    $('#locale').change(initTable)
    var el = $("#sidebar").find('.active');
    el[0].scrollIntoView(true);
    $("#menutxt").text($("#mobilemenu").find('.active')[0].text);
})

/*TODO
下載按鈕無法收回
*/
