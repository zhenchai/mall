﻿//===========================
//		公共脚本文件
//===========================

/*浏览器相关处理方法类*/
var Browser = {
    Navigate: function () { //检测浏览器是否为UC浏览器
        return navigator.userAgent.indexOf('UCBrowser') > -1 ? true : false;
    }
}


/*图片处理相关方法类*/
var Image = {
    Select: function (id, func) {//选择图片，直接调用该方法
        var fileId = $(id).attr("data-id");
        $(fileId).click().bind("change", function () {
            var url = $(fileId).val();
            if (Image.Filter(url)) {
                var url2 = Image.Upload(url);
                Image.Show(id, url2);
                //func();
            } else {
                if ($(fileId).val() != "") {
                    alert("请上传图片！");
                    $(fileId).val("");
                }
            }
            $(fileId).unbind("change");//在方法里绑定事件，在事件触发后需要解绑，否则多次调用方法会导致事件叠加
        });
    },
    Filter: function (name) {//过滤上传图片格式
        var arr = name.split('.');
        var len = arr.length;
        var suf = arr[len - 1];

        switch (suf) {
            case "jpeg":
            case "jpg":
            case "png":
                return true;
            default:
                return false;
        }
    },
    Upload: function (url) {//图片上传

        //************************************************//*
        //*此处编写ajax上传图片，并返回图片上传后所在地址*//*
        //************************************************//*
        /**
         * 实现图片上传的预览显示效果
         * @param file
         * @param name
         */

        //return "images/test.png";
    },
    Show: function (id, url) {//图片显示
        $(id).css({"background-image": "url(" + url + ")", "background-size": "100%"});
        $(id).children("em").show();
        Image.Clear(id);
    },
    Clear: function (id) {//图片清空
        $(id).children("em").bind("click", function () {
            $(this).hide();
            $(id).removeAttr("style");
            // 清除图片上传的隐藏域属性数据
            var inputId = $(id).attr("data-id");
            $('input[id="' + inputId + '"]').val("");
            $('input[class="picUpload-' + inputId.substring(1) + '"]').val("");
            $($(id).attr("data-id")).val("");
            Write.Must.No(id);
            event.stopPropagation();//阻止冒泡事件
        });
    }
}


/*表单验证*/
var Form = {
    Mobile: function (id) {//手机号验证
        return Form.Check(id, "手机号", /^1(([0-9]{2})+\d{8})$/);
    },
    Email: function (id) {//Email验证
        return Form.Check(id, "邮箱", /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
    },
    Nonull: function (id, str) {//表单不为空
        return Form.Check(id, str, null);
    },
    Pass: function (id) {
        if ($(id).val() != "" && $(id).val().length < 6) {
            $(id).parents(".must").children("code").show().text("密码长度不能小于6位！");
            return false;
        }
        if (Form.Check(id, "密码", /^[0-9]+$/)) {
            $(id).parents(".must").children("code").show().text("密码不能为纯数字！");
            return false;
        }
        if (Form.Check(id, "密码", /^[a-zA-Z]+$/)) {
            $(id).parents(".must").children("code").show().text("密码不能为纯字母！");
            return false;
        }
        if (Form.Check(id, "密码", /^[_]+$/)) {
            $(id).parents(".must").children("code").show().text("密码不能为纯下划线！");
            return false;
        }
        return Form.Check(id, "密码", /^[a-zA-Z0-9_]+$/);
    },
    Captcha: function () {
        var type = $(this).attr("sendtype") ? $(this).attr("sendtype") : "";
        var moblie = $('input[id="mobileInfo"]') ? $('input[id^="mobileInfo"]').val() : "";
        if($('input[id="mobile"]')&&$('input[id="mobile"]').val()&&$('input[id="mobile"]').val().length==11){
            moblie =$('input[id="mobile"]').val();
        }
        if($('input[id="mobileRegig"]')&&$('input[id="mobileRegig"]').val()&&$('input[id="mobileRegig"]').val().length==11){
            moblie =$('input[id="mobileRegig"]').val();
        }
        $.ajax({
            type: "post",
            url: $('input[id="basePath"]').val() + "/sendcode.htm",
            async: false,
            dataType: "json",
            data: {moblie: moblie, type: type},
            success: function (data) {

                $("#code").unbind();
                var n = 60;
                var timer = setInterval(function () {
                    n--;
                    $("#code").css("background", "#efefef").text("发送成功" + n);
                    if (n <= 0) {
                        clearInterval(timer);
                        $("#code").css("background", "#f6ab00").text("获取验证码").bind("click", Form.Captcha);
                    }
                }, 1000);
            },
            error: function () {

            }
        });
    },
    Check: function (id, str, reg) { //通用检测方法
        if ($(id).val() == "") {
            return false;
        }
        var chr = $(id).val();
        if (reg && !chr.match(reg)) {
            $(id).parents(".must").children("code").show().text(str + "格式不正确！");
            return false;
        }
        $(id).removeAttr("style");
        $(id).parents(".must").children("code").hide();
        return true;
    }
}

/*必填项开关及提示*/
var Write = {
    Must: {
        Ok: function (id) {
            $("#login_err").hide();
            return $(id).parents(".must").attr("num", "1").children("code").hide();
        },
        No: function (id) {
            return $(id).parents(".must").attr("num", "0").children("code").show();
        }
    },
    Error: function (id, err) {
        return $(id).parents(".must").children("code").text(err);
    }
}


//初始化
$(".must").append("<code></code>");

//手机号验证
$("#mobileInfo").bind("blur", function () {
    if (Form.Mobile(this)) {
        if(checkUserExist()){
            $("#code").unbind();
            $("#code").css("background", "#f6ab00").bind("click", Form.Captcha);
            Write.Must.Ok(this);
        }else{
            $("#code").css("background", "#efefef").unbind("click");
        }
    } else {
        $("#code").css("background", "#efefef").unbind("click");
    }
});
$("#mobileRegig").bind("blur", function () {
    if (Form.Mobile(this)) {
        if(checkUserNotExist()){
            $("#code").unbind();
            $("#code").css("background", "#f6ab00").bind("click", Form.Captcha);
            Write.Must.Ok(this);
        }else{
            $("#code").css("background", "#efefef").unbind("click");
        }
    } else {
        $("#code").css("background", "#efefef").unbind("click");
    }
});
//手机号验证
$("#mobile").bind("blur", function () {
    if (Form.Mobile(this)) {
            Write.Must.Ok(this);
    }
});

function checkUserExist() {
    var url = $('input[id="basePath"]').val() + "/checkExistCustomerUsername.htm";
    var moblie = $('input[id="mobileInfo"]') ? $('input[id^="mobileInfo"]').val() : ($('input[id^="mobile"]') ? $('input[id^="mobile"]').val() : "");
   var flaguser = false;
    $.ajax({
        type: 'post',
        url: url,
        timeout: 3000,
        async: false,
        data: {customerUsername: moblie},
        dataType: 'json',
        success: function (data) {
            if(data=="1"){
                flaguser = true;
            }else{
                $("#mobileInfo").parents(".must").children("code").show().text("用户不存在！");
                flaguser = false;
            }
        },
        error: function () {
            $("#mobileInfo").parents(".must").children("code").show().text("网络故障！");
            flaguser = false;
        }
    });
    return flaguser;
}
function checkUserNotExist() {
    var url = $('input[id="basePath"]').val() + "/checkExistCustomerUsername.htm";
    var moblie = $('input[id="mobileRegig"]').val();
   var flaguser = false;
    $.ajax({
        type: 'post',
        url: url,
        timeout: 3000,
        async: false,
        data: {customerUsername: moblie},
        dataType: 'json',
        success: function (data) {
            if(data=="0"){
                flaguser = true;
            }else{
                $("#mobileRegig").parents(".must").children("code").show().text("用户已存在！");
                flaguser = false;
            }
        },
        error: function () {
            $("#mobileInfo").parents(".must").children("code").show().text("网络故障！");
            flaguser = false;
        }
    });
    return flaguser;
}

//验证码
$("#capform").blur(function () {
    var code = $('input[id="capform"]').val();
    var mobile = "";
    if( $('input[id="mobileInfo"]')&& $('input[id="mobileInfo"]').val()){
        mobile = $('input[id="mobileInfo"]').val();
    }
    if( $('input[id="mobileRegig"]')&& $('input[id="mobileRegig"]').val()){
        mobile = $('input[id="mobileRegig"]').val();
    }
    var falgcap = false;
    $.ajax({
        type: "post",
        url: $('input[id="basePath"]').val() + "/validate/getMCode.htm",
        async: false,
        dataType: "json",
        data: {code: code,mobile:mobile},
        success: function (data) {
            if (data == "1") {
                falgcap =true;
            } else {
            }
        },
        error: function () {
        }
    });

    if(falgcap){
        Write.Must.Ok(this);
    }else{
        Write.Must.No(this);
        Write.Error(this, "请输入正确的验证码！");
    }
});

//密码
$("#r_pass").blur(function () {
    if (Form.Pass(this)) {
        Write.Must.Ok(this);
        if ($("#r_pass2").val() == $(this).val()) {
            Write.Must.Ok("#r_pass2");
        } else {
            if ($("#r_pass2").val() != "") {
                Write.Error("#r_pass2", "密码错误！");
                Write.Must.No("#r_pass2");
            }
        }
    } else {
        Write.Must.No(this);
    }
});
$("#r_pass2").blur(function () {
    if ($("#r_pass").val() != $(this).val()) {
        if ($(this).val() != "") {
            Write.Error(this, "密码输入错误！");
            Write.Must.No(this);
        }
    } else {
        Write.Must.Ok(this);
    }
});

//邮箱验证
$("#email").bind("blur", function () {
    if (Form.Email(this)) {
        Write.Must.Ok(this);
    }
});

//提交
function Sub(func) {
    var n = 0;
    var m = 0;
    $(".must").each(function () {
        m++;
        if ($(this).children("input").val() == "") {
            var mes = $(this).attr("data-mes");
            $(this).children("code").show().text(mes);
        }
        if ($(this).attr("num") == '1') {
            n++;
        }
    });
    if(n == m){
     func();
     }
}


function picUploadRe(file, name) {
    if (file.files && file.files[0]) {
        var prevDiv = document.getElementById(name + "Url");
        var reader = new FileReader();
        /*var size=file.files[0].size;*/
        reader.onload = function (evt) {
            //var wi= evt.width();
            prevDiv.style.backgroundImage = "url(" + evt.target.result + ")";
            prevDiv.style.backgroundSize = "60px 60px";
        }
        $('input[class="picUpload-' + name + '"]').val("");
        reader.readAsDataURL(file.files[0]);
        if (name == "pic1") {
            Write.Must.Ok("span#pic1Url");
        }else
        if (($("#pic5").val() != ""||$('input[class="picUpload-'+'pic5'+'"]').val()!="") &&
            ($("#pic6").val() != ""||$('input[class="picUpload-'+'pic6'+'"]').val()!="") &&
            ($("#pic7").val() != "")||$('input[class="picUpload-'+'pic7'+'"]').val()!="") {
            Write.Must.Ok("span#pic5Url");
        }
    }
}