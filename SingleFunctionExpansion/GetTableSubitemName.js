//已棄用!!!
function GetTableSubitemName(eventOBJ) {
    var jelm = $(eventOBJ.target);
    return jelm.closest('.ui.compact.message').text()
}
var This_is_a_global_variable_so_take_a_long_name_tmp_bton=document.createElement('button');
This_is_a_global_variable_so_take_a_long_name_tmp_bton.addEventListener("click",(e)=>{
    GetTableSubitemName(eventOBJ)
})