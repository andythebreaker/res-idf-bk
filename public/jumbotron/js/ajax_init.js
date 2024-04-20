//Mirror object copy
var outer_urls = document.getElementById("copyRightSidebar_mobile2desktop").classList;
outer_urls.forEach(function (item, i) {
    document.getElementById("copyRightSidebar_mobile2desktop_cli").classList.add(item);
});
document.getElementById("copyRightSidebar_mobile2desktop_cli").innerHTML =
    document.getElementById("copyRightSidebar_mobile2desktop").innerHTML;
function openTimeChartLoaded() {
    console.log("openTimeChartLoaded");
}
//console.log("ajax init");
/*if ($("openTimeChartLoaded_target").hasClass("openTimeChart_loadded")) {
    console.log(`document.getElementById("openTimeChartLoaded_target") === "loadded"`);
}
else {
    console.log("open time mobile support failed!");
}*/
//console.log("wtf?");
document.getElementById('openTimeChartLoaded_target').addEventListener('click', () => {
    //console.log("click init");
    var COC = document.getElementById('copyRightSidebar_opentime_cli');
    if (COC) {
        var full_open_time_chart = document.getElementById('copyRightSidebar_opentime').innerHTML;
        ///////////////////////////////////////////
        //避免重複id 
        const regex1 = /[^a-zA-Z0-9\-_]id="([^ "]+)"/gm;
        const str1 = full_open_time_chart;
        const subst1 = '';

        // The substituted value will be contained in the result variable
        const result1 = str1.replace(regex1, subst1);

        //console.log('Substitution result: ', result1);
        document.getElementById('copyRightSidebar_opentime_cli').innerHTML = result1;
        //////////////////////////////////////////

        var CRSC = document.getElementById('copyRightSidebar_opentime').classList;
        for (var index_tmp = 0; index_tmp < CRSC.length; index_tmp++) {
            COC.classList.add(CRSC[index_tmp]);
        }/*finish all table copy*/
        var chart_data = document.getElementById('the_open_chart_data');
        var ui_segment_mobile_only_inverted = document.createElement('div');
        ui_segment_mobile_only_inverted.classList.add('ui');
        ui_segment_mobile_only_inverted.classList.add('segment');
        ui_segment_mobile_only_inverted.classList.add('inverted');

        var separ = '<div class="ui vertical divider"></div>';

        var ui_two_column_very_relaxed_grid1 = document.createElement('div');
        ui_two_column_very_relaxed_grid1.classList.add('ui');
        ui_two_column_very_relaxed_grid1.classList.add('two');
        ui_two_column_very_relaxed_grid1.classList.add('column');
        ui_two_column_very_relaxed_grid1.classList.add('very');
        ui_two_column_very_relaxed_grid1.classList.add('relaxed');
        ui_two_column_very_relaxed_grid1.classList.add('grid');
        var column_style_border_5px_FFAC55_solid_A1 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_A1.classList.add('column');
        column_style_border_5px_FFAC55_solid_A1.classList.add('RBD');
        var p11 = document.createElement('p');
        p11.innerText = chart_data.getElementsByTagName('td')[0 * 4 + 0].innerText;
        console.log(p11.innerText);
        column_style_border_5px_FFAC55_solid_A1.appendChild(p11);
        var column_style_border_5px_FFAC55_solid_B1 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_B1.classList.add('column'); column_style_border_5px_FFAC55_solid_B1.classList.add('LBD');

        var p12 = document.createElement('p');
        p12.innerText = chart_data.getElementsByTagName('td')[0 * 4 + 1].innerText +
            chart_data.getElementsByTagName('td')[0 * 4 + 2].innerText +
            chart_data.getElementsByTagName('td')[0 * 4 + 3].innerText;
        column_style_border_5px_FFAC55_solid_B1.appendChild(p12);
        ui_two_column_very_relaxed_grid1.appendChild(column_style_border_5px_FFAC55_solid_A1);
        ui_two_column_very_relaxed_grid1.appendChild(column_style_border_5px_FFAC55_solid_B1);
        ui_two_column_very_relaxed_grid1.innerHTML += separ;

        var ui_two_column_very_relaxed_grid2 = document.createElement('div');
        ui_two_column_very_relaxed_grid2.classList.add('ui');
        ui_two_column_very_relaxed_grid2.classList.add('two');
        ui_two_column_very_relaxed_grid2.classList.add('column');
        ui_two_column_very_relaxed_grid2.classList.add('very');
        ui_two_column_very_relaxed_grid2.classList.add('relaxed');
        ui_two_column_very_relaxed_grid2.classList.add('grid');
        //var column_style_border_5px_FFAC55_solid_A2 = document.createElement('div');
        //var column_style_border_5px_FFAC55_solid_B2 = document.createElement('div');
        var column_style_border_5px_FFAC55_solid_A2 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_A2.classList.add('column'); column_style_border_5px_FFAC55_solid_A2.classList.add('RBD');

        var p21 = document.createElement('p');
        p21.innerText = chart_data.getElementsByTagName('td')[1 * 4 + 0].innerText;
        console.log(p21.innerText);
        column_style_border_5px_FFAC55_solid_A2.appendChild(p21);
        var column_style_border_5px_FFAC55_solid_B2 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_B2.classList.add('column'); column_style_border_5px_FFAC55_solid_B2.classList.add('LBD');
        var p22 = document.createElement('p');
        p22.innerText = chart_data.getElementsByTagName('td')[1 * 4 + 1].innerText +
            chart_data.getElementsByTagName('td')[1 * 4 + 2].innerText +
            chart_data.getElementsByTagName('td')[1 * 4 + 3].innerText;
        column_style_border_5px_FFAC55_solid_B2.appendChild(p22);
        ui_two_column_very_relaxed_grid2.appendChild(column_style_border_5px_FFAC55_solid_A2);
        ui_two_column_very_relaxed_grid2.appendChild(column_style_border_5px_FFAC55_solid_B2);

        var ui_two_column_very_relaxed_grid3 = document.createElement('div');
        ui_two_column_very_relaxed_grid3.classList.add('ui');
        ui_two_column_very_relaxed_grid3.classList.add('two');
        ui_two_column_very_relaxed_grid3.classList.add('column');
        ui_two_column_very_relaxed_grid3.classList.add('very');
        ui_two_column_very_relaxed_grid3.classList.add('relaxed');
        ui_two_column_very_relaxed_grid3.classList.add('grid');
        //var column_style_border_5px_FFAC55_solid_A3 = document.createElement('div');
        //var column_style_border_5px_FFAC55_solid_B3 = document.createElement('div');
        var column_style_border_5px_FFAC55_solid_A3 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_A3.classList.add('column'); column_style_border_5px_FFAC55_solid_A3.classList.add('RBD');

        var p31 = document.createElement('p');
        p31.innerText = chart_data.getElementsByTagName('td')[2 * 4 + 0].innerText;
        console.log(p31.innerText);
        column_style_border_5px_FFAC55_solid_A3.appendChild(p31);
        var column_style_border_5px_FFAC55_solid_B3 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_B3.classList.add('column');
        column_style_border_5px_FFAC55_solid_B3.classList.add('LBD');
        var p32 = document.createElement('p');
        p32.innerText = chart_data.getElementsByTagName('td')[2 * 4 + 1].innerText +
            chart_data.getElementsByTagName('td')[2 * 4 + 2].innerText +
            chart_data.getElementsByTagName('td')[2 * 4 + 3].innerText;
        column_style_border_5px_FFAC55_solid_B3.appendChild(p32);
        ui_two_column_very_relaxed_grid3.appendChild(column_style_border_5px_FFAC55_solid_A3);
        ui_two_column_very_relaxed_grid3.appendChild(column_style_border_5px_FFAC55_solid_B3);

        var ui_two_column_very_relaxed_grid4 = document.createElement('div');
        ui_two_column_very_relaxed_grid4.classList.add('ui');
        ui_two_column_very_relaxed_grid4.classList.add('two');
        ui_two_column_very_relaxed_grid4.classList.add('column');
        ui_two_column_very_relaxed_grid4.classList.add('very');
        ui_two_column_very_relaxed_grid4.classList.add('relaxed');
        ui_two_column_very_relaxed_grid4.classList.add('grid');
        //var column_style_border_5px_FFAC55_solid_A4 = document.createElement('div');
        //var column_style_border_5px_FFAC55_solid_B4 = document.createElement('div');
        var column_style_border_5px_FFAC55_solid_A4 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_A4.classList.add('column'); column_style_border_5px_FFAC55_solid_A4.classList.add('RBD');

        var p41 = document.createElement('p');
        p41.innerText = chart_data.getElementsByTagName('td')[3 * 4 + 0].innerText;
        console.log(p41.innerText);
        column_style_border_5px_FFAC55_solid_A4.appendChild(p41);
        var column_style_border_5px_FFAC55_solid_B4 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_B4.classList.add('column'); column_style_border_5px_FFAC55_solid_B4.classList.add('LBD');
        var p42 = document.createElement('p');
        p42.innerText = chart_data.getElementsByTagName('td')[3 * 4 + 1].innerText +
            chart_data.getElementsByTagName('td')[3 * 4 + 2].innerText +
            chart_data.getElementsByTagName('td')[3 * 4 + 3].innerText;
        column_style_border_5px_FFAC55_solid_B4.appendChild(p42);
        ui_two_column_very_relaxed_grid4.appendChild(column_style_border_5px_FFAC55_solid_A4);
        ui_two_column_very_relaxed_grid4.appendChild(column_style_border_5px_FFAC55_solid_B4);

        var ui_two_column_very_relaxed_grid5 = document.createElement('div');
        ui_two_column_very_relaxed_grid5.classList.add('ui');
        ui_two_column_very_relaxed_grid5.classList.add('two');
        ui_two_column_very_relaxed_grid5.classList.add('column');
        ui_two_column_very_relaxed_grid5.classList.add('very');
        ui_two_column_very_relaxed_grid5.classList.add('relaxed');
        ui_two_column_very_relaxed_grid5.classList.add('grid');
        //var column_style_border_5px_FFAC55_solid_A5 = document.createElement('div');
        //var column_style_border_5px_FFAC55_solid_B5 = document.createElement('div');
        var column_style_border_5px_FFAC55_solid_A5 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_A5.classList.add('column'); column_style_border_5px_FFAC55_solid_A5.classList.add('RBD');

        var p51 = document.createElement('p');
        p51.innerText = chart_data.getElementsByTagName('td')[4 * 4 + 0].innerText;
        console.log(p51.innerText);
        column_style_border_5px_FFAC55_solid_A5.appendChild(p51);
        var column_style_border_5px_FFAC55_solid_B5 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_B5.classList.add('column'); column_style_border_5px_FFAC55_solid_B5.classList.add('LBD');
        var p52 = document.createElement('p');
        p52.innerText = chart_data.getElementsByTagName('td')[4 * 4 + 1].innerText +
            chart_data.getElementsByTagName('td')[4 * 4 + 2].innerText +
            chart_data.getElementsByTagName('td')[4 * 4 + 3].innerText;
        column_style_border_5px_FFAC55_solid_B5.appendChild(p52);
        ui_two_column_very_relaxed_grid5.appendChild(column_style_border_5px_FFAC55_solid_A5);
        ui_two_column_very_relaxed_grid5.appendChild(column_style_border_5px_FFAC55_solid_B5);

        //w6
        var ui_two_column_very_relaxed_grid6 = document.createElement('div');
        ui_two_column_very_relaxed_grid6.classList.add('ui');
        ui_two_column_very_relaxed_grid6.classList.add('two');
        ui_two_column_very_relaxed_grid6.classList.add('column');
        ui_two_column_very_relaxed_grid6.classList.add('very');
        ui_two_column_very_relaxed_grid6.classList.add('relaxed');
        ui_two_column_very_relaxed_grid6.classList.add('grid');
        var column_style_border_5px_FFAC55_solid_A6 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_A6.classList.add('column'); column_style_border_5px_FFAC55_solid_A6.classList.add('RBD');

        var p61 = document.createElement('p');
        p61.innerText = chart_data.getElementsByTagName('td')[5 * 4 + 0].innerText;
        console.log(p61.innerText);
        column_style_border_5px_FFAC55_solid_A6.appendChild(p61);
        var column_style_border_5px_FFAC55_solid_B6 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_B6.classList.add('column'); column_style_border_5px_FFAC55_solid_B6.classList.add('LBD');
        var p62 = document.createElement('p');
        p62.innerText = chart_data.getElementsByTagName('td')[5 * 4 + 1].innerText +
            chart_data.getElementsByTagName('td')[5 * 4 + 2].innerText +
            chart_data.getElementsByTagName('td')[5 * 4 + 3].innerText;
        column_style_border_5px_FFAC55_solid_B6.appendChild(p62);
        ui_two_column_very_relaxed_grid6.appendChild(column_style_border_5px_FFAC55_solid_A6);
        ui_two_column_very_relaxed_grid6.appendChild(column_style_border_5px_FFAC55_solid_B6);

        //w7
        var ui_two_column_very_relaxed_grid7 = document.createElement('div');
        ui_two_column_very_relaxed_grid7.classList.add('ui');
        ui_two_column_very_relaxed_grid7.classList.add('two');
        ui_two_column_very_relaxed_grid7.classList.add('column');
        ui_two_column_very_relaxed_grid7.classList.add('very');
        ui_two_column_very_relaxed_grid7.classList.add('relaxed');
        ui_two_column_very_relaxed_grid7.classList.add('grid');
        var column_style_border_5px_FFAC55_solid_A7 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_A7.classList.add('column'); column_style_border_5px_FFAC55_solid_A7.classList.add('RBD');

        var p71 = document.createElement('p');
        p71.innerText = chart_data.getElementsByTagName('td')[6 * 4 + 0].innerText;
        console.log(p71.innerText);
        column_style_border_5px_FFAC55_solid_A7.appendChild(p71);
        var column_style_border_5px_FFAC55_solid_B7 = document.createElement('div');
        column_style_border_5px_FFAC55_solid_B7.classList.add('column'); column_style_border_5px_FFAC55_solid_B7.classList.add('LBD');
        var p72 = document.createElement('p');
        p72.innerText = chart_data.getElementsByTagName('td')[6 * 4 + 1].innerText +
            chart_data.getElementsByTagName('td')[6 * 4 + 2].innerText +
            chart_data.getElementsByTagName('td')[6 * 4 + 3].innerText;
        column_style_border_5px_FFAC55_solid_B7.appendChild(p72);
        ui_two_column_very_relaxed_grid7.appendChild(column_style_border_5px_FFAC55_solid_A7);
        ui_two_column_very_relaxed_grid7.appendChild(column_style_border_5px_FFAC55_solid_B7);

        var hor_sep = '<div class="ui horizontal divider">&ApplyFunction;</div>';
        ui_segment_mobile_only_inverted.appendChild(ui_two_column_very_relaxed_grid1);
        ui_segment_mobile_only_inverted.innerHTML += hor_sep;
        ui_segment_mobile_only_inverted.appendChild(ui_two_column_very_relaxed_grid2); ui_segment_mobile_only_inverted.innerHTML += hor_sep;
        ui_segment_mobile_only_inverted.appendChild(ui_two_column_very_relaxed_grid3); ui_segment_mobile_only_inverted.innerHTML += hor_sep;
        ui_segment_mobile_only_inverted.appendChild(ui_two_column_very_relaxed_grid4); ui_segment_mobile_only_inverted.innerHTML += hor_sep;
        ui_segment_mobile_only_inverted.appendChild(ui_two_column_very_relaxed_grid5); ui_segment_mobile_only_inverted.innerHTML += hor_sep;
        ui_segment_mobile_only_inverted.appendChild(ui_two_column_very_relaxed_grid6); ui_segment_mobile_only_inverted.innerHTML += hor_sep;
        ui_segment_mobile_only_inverted.appendChild(ui_two_column_very_relaxed_grid7);

        var stuff_to_display_none = document.querySelectorAll('.opening-hours-table.ui.celled.table.center.aligned');
        stuff_to_display_none.forEach((element, number) => {
            if (element.id !== 'the_open_chart_data') {
                document.querySelectorAll('.opening-hours-table.ui.celled.table.center.aligned')[number].style.display = 'none';
                document.querySelectorAll('.opening-hours-table.ui.celled.table.center.aligned')[number].parentElement.insertBefore(
                    ui_segment_mobile_only_inverted, document.querySelectorAll('.opening-hours-table.ui.celled.table.center.aligned')[number]);
            }
        });
        /*end of all js-if*/
    } else {
        colsole.log('[open time app] mobile copy failed!');
    }
});

//console.log("wtf+++++++");
