var currentDate = new Date();
var weekday = [];
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var currentDay = weekday[currentDate.getDay()];

var currentTimeHours = currentDate.getHours();
currentTimeHours = currentTimeHours < 10 ? "0" + currentTimeHours : currentTimeHours;
var currentTimeMinutes = currentDate.getMinutes();
var timeNow = currentTimeHours + "" + currentTimeMinutes;

var currentDayID = "#" + currentDay; //gets todays weekday and turns it into id
$(currentDayID).toggleClass("active"); //this works at hightlighting today

$('#the_open_chart_data tr').children('.no_right_border.no_left_border').each(function (index) {
    if ($(this).hasClass('shutdown')) {
        //TODO:Exception handling
        $(this).text(' ');
        $(this).parent().children('.opens').text($(
            '.openinghours .openinghourscontent .OpeningHoursChineseNameFormDefinitionCollection .shutdownName1'
        ).text());
        $(this).parent().children('.closes').text($(
            '.openinghours .openinghourscontent .OpeningHoursChineseNameFormDefinitionCollection .shutdownName2'
        ).text());
        //使用以下式子來啟用行動裝置的表格支援
        //document.getElementById("openTimeChartLoaded_target").classList.add("openTimeChart_loadded");
    }
});

if ($(currentDayID).children('.no_right_border.no_left_border').hasClass('shutdown')) {
    //this day is colse!!!
    $(".openorclosed").toggleClass("closed");
    //$("#open-status").toggleClass("negative");

    //-TODO:Exception handling
    //$(currentDayID).children('.no_right_border.no_left_border').text(' ');
    //$(currentDayID).children('.opens').text($(
    //    '.openinghours .openinghourscontent .OpeningHoursChineseNameFormDefinitionCollection .shutdownName1'
    //).text());
    //$(currentDayID).children('.closes').text($(
    //    '.openinghours .openinghourscontent .OpeningHoursChineseNameFormDefinitionCollection .shutdownName2'
    //).text());
    //使用以下式子來啟用行動裝置的表格支援
    //document.getElementById("openTimeChartLoaded_target").classList.add("openTimeChart_loadded");
    //console.log("opentime ok");
    document.getElementById("openTimeChartLoaded_target").click();
    //    console.log("wtf2");

} else {
    var openTimeSplit = $(currentDayID).children('.opens').text().split(":");

    var openTimeHours = openTimeSplit[0];
    openTimeHours = openTimeHours < 10 ? "0" + openTimeHours : openTimeHours;

    var openTimeMinutes = openTimeSplit[1];
    var openTimex = openTimeSplit[0] + openTimeSplit[1];

    var closeTimeSplit = $(currentDayID).children('.closes').text().split(":");

    var closeTimeHours = closeTimeSplit[0];
    closeTimeHours = closeTimeHours < 10 ? "0" + closeTimeHours : closeTimeHours;

    var closeTimeMinutes = closeTimeSplit[1];
    var closeTimex = closeTimeSplit[0] + closeTimeSplit[1];

    if (timeNow >= openTimex && timeNow <= closeTimex) {
        $(".openorclosed").toggleClass("open");
        //$("#open-status").toggleClass("positive");
    } else {
        $(".openorclosed").toggleClass("closed");
        //$("#open-status").toggleClass("negative");
    }
    // console.log("opentime ok");
    document.getElementById("openTimeChartLoaded_target").click();
    //     console.log("wtf2");

    //使用以下式子來啟用行動裝置的表格支援
    //document.getElementById("openTimeChartLoaded_target").classList.add("openTimeChart_loadded");
}


