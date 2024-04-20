$(function () {
    init_err_msg();
});
function init_err_msg() {
    console.log("!!!!!!!!!!!!!!!!");
    document.getElementById('error_msg_gui_start').addEventListener('click', show_err_msg);
    document.getElementById('error_msg_gui_close').addEventListener('click', disp_err_msg);
    document.getElementById('error_msg_gui_init_msg_if_yes').addEventListener('click', init_msg_if_yes);
}

function init_msg_if_yes(){
    if (document.getElementById('error_msg_gui_start').innerText === "yes") {
        console.log("???????????????????");
        document.getElementById('error_msg_gui_start').click();
    }
}

function show_err_msg(params) {
    console.log("function show_err_msg(params) {");
    var simhtml = document.createElement("div");
    var backcolor = document.createElement("div");
    var exit_bton_copy = document.createElement("div");
    var txt_copy = document.createElement("div");
    var pic1 = document.createElement("img");
    var pic2 = document.createElement("img");
    txt_copy.id = "choose_text_copy";
    txt_copy.classList.add("show_err_msg_gen");
    txt_copy.classList.add("word_break_break_all");
    txt_copy.innerText = document.getElementById('error_msg_gui_text_1').innerText;
    var obj_p_txt = document.createElement("p");
    obj_p_txt.innerText = document.getElementById('error_msg_gui_text_2').innerText;
    obj_p_txt.style.color = document.getElementById('error_msg_gui_word_part_color_2').innerText;
    obj_p_txt.classList.add("show_err_msg_gen");
    obj_p_txt.classList.add("word_break_break_all");
    txt_copy.appendChild(obj_p_txt);
    txt_copy.style.color = document.getElementById('error_msg_gui_word_part_color_1').innerText;
    exit_bton_copy.id = "exit_button_copy";
    exit_bton_copy.classList.add("show_err_msg_gen");
    pic1.src = "../login/if_you_donT_add_this_The_front_end_will_spray_wrong/p1.svg";
    pic2.src = "../login/if_you_donT_add_this_The_front_end_will_spray_wrong/p2.svg";
    pic2.classList.add("show_err_msg_gen");
    pic1.classList.add("show_err_msg_gen");
    pic2.id = "show_err_msg_pic2";
    pic1.id = "show_err_msg_pic1";
    simhtml.classList.add("show_err_msg_gen");
    simhtml.id = "show_err_msg_simhtml";
    backcolor.classList.add("show_err_msg_gen");
    backcolor.id = "show_err_msg_backcolor";
    simhtml.style.backgroundColor = document.getElementById("error_msg_gui_blank_part_color").innerText;
    document.getElementById("error_msg_obj").appendChild(simhtml);
    document.getElementById("error_msg_obj").appendChild(backcolor);
    document.getElementById("error_msg_obj").appendChild(pic1);
    document.getElementById("error_msg_obj").appendChild(pic2);
    document.getElementById("error_msg_obj").appendChild(exit_bton_copy);
    document.getElementById("error_msg_obj").appendChild(txt_copy);
    $("#exit_button_copy").bind('touchstart', function () {
        $(this).animate({ 'opacity': 0.7 }, 100)
    });
    $("#exit_button_copy").bind('touchend', function () {
        $(this).animate({ 'opacity': 1 }, 100)
    });
    document.getElementById("exit_button_copy").addEventListener("click", () => {
        document.getElementById('error_msg_gui_close').click();
    });
    document.getElementById("error_msg_obj").style.display = "block";
}

function disp_err_msg() {
    console.log("document.getElementById('error_msg_gui_close').click();");
    document.getElementById("error_msg_obj").style.display = "none";
    $('.show_err_msg_gen').remove();
}