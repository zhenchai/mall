$(".sex").bind("click",function(){
    var _this = this;
	$(".sex,.sex i").removeAttr("style");
    var sexid = $(this).children("i").attr("sexid");
    var customerId = $(this).children("i").attr("custId");
    var url = $(this).children("i").attr("url");
    var basesexid = $('input[name="basesexid"]').val();
    if(sexid !="" && sexid != basesexid){
        //ajax 修改性别
        $.ajax({
            url: url,
            type: 'post',
            async: false,
            data:{customerId:customerId,infoGender:sexid},
            success: function (data) {
                if(data == "1"){
                    $('input[name="basesexid"]').val(sexid);
                    $(_this).css({"border":"1px solid #F6AB00","color":"#F6AB00"}).children("i").css("background-color","#F6AB00");
                }
            }
        });

    }
});

$(".homePic span").bind("click",function(){
	Image.Select(this);
});
