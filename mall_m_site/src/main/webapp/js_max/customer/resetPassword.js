﻿//提交
$("#sub").click(function () {

    Sub(function(){
    var flagsub = false;
     $.ajax({
     type: "post",
     url: $('input[id="basePath"]').val() + "/modifiedUserKeyM.htm",
     async: false,
     dataType: "json",
     data: {customerUsername: $('input[id="mobileInfo"]').val(),newPassWord:$('input[id="r_pass"]').val(),
         newPassWordR:$('input[id="r_pass2"]').val(),code:$('input[id="capform"]').val()},
     success: function (data) {
     if (data == "1")
         flagsub = true;
     }
     });

    if (flagsub) {
        $(".updatetrue").show();
        var t = 2;
        $("#time").text(2);
        var timer = setInterval(function () {
            t--;
            $("#time").text(t);
            if (t == 0) {
                clearInterval(timer);
                $(".prompt").hide();
                window.location.href = $('input[id="basePath"]').val()+"/login.html";
            }
        }, 1000);
    } else {
        $(".updatefalse").show();
        var t = 2;
        $("#timeNo").text(2);
        var timer = setInterval(function () {
            t--;
            $("#timeNo").text(t);
            if (t == 0) {
                clearInterval(timer);
                $(".prompt").hide();
            }
        }, 1000);
    }

    });
});