$(function(){win();$(window).resize(function(){win()})});var img_src=$("#customer_imgs").attr("src");$(function(){$(".upload_file").change(function(){if($(this).val()!=""){var customerId=$(this).attr("customer_id");$("#upload_form"+customerId).submit();alert($("#customer_imgs").attr());$("#customer_imgs").attr("src","../images/load.jpg")}})});function callback(msg){if(msg.split(",").length<2){if(msg=="101"){$("#titleerr").text("每张图片不超过4M!");dia(4);$("#customer_imgs").attr("src",img_src)}else{if(msg=="102"){$("#titleerr").text("图片格式不正确!");dia(4);$("#customer_imgs").attr("src",img_src)}}return}var imageName=msg.split(",")[0];$("#customer_imgs").attr("src",imageName);img_src=$("#customer_imgs").attr("src")}function win(){var _wd=$(window).width();var _hd=$(window).height();$(".s_dia").css("top",(_hd-$(".dialog").height())/2).css("left",(_wd-$(".s_dia").width())/2)}function dia(n){$(".mask").fadeIn();$(".dia"+n).fadeIn()}function cls(){$(".dialog").fadeOut();$(".mask").fadeOut()};