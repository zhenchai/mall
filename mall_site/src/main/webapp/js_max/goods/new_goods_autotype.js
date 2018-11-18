$(function(){
    $.getJSON("/getAutoCarTypeList.htm",{"productId":$("#productId").val()},function(data){
        $(".auto_box").html("");
        var str="";
        $.each(data,function(k,v){
            str+='<div class="clearfix ml20 mt20">'
                    +'<div class="clearfix goods-carmodel">'
                        +'<img src="'+ (v.imageLog==''?'/images/brand/imageload.jpg': v.imageLog)+'" />'
                        +'<p>'+ v.key+'</p>'
                    +'</div>';
            $.each(v.valList2,function(k2,v2){
                str+='<div class="AudiList">'
                        +'<div class="title mt20 goods-carmodel-title">'
                            +'<i onclick="addcss(this)" class="carmodel-expand"></i>'
                            +'<p>'+v2.key+'</p>'
                        +'</div>'
                        +'<div class="clearfix">';
                $.each(v2.valList2,function(k3,v3){
                    if(k3%3==0){
                        str+='<div class="goods-carmodel-container">';
                    }
                            str+='<div class="AudiCar c'+k3%3+1+'">';
                                str+='<p onclick="audiCar(this)">'+v3.key+'</p>';
                                str+='<div class="goods-carmodel-detail">';
                                str+='<div class="goods-carmodel-detail-list">';
                    $.each(v3.valList,function(k4,v4){
                        str+='<a>';
                        str+=(v4.autoStyleEngine==''?'暂无':v4.autoStyleEngine)+'&nbsp;';
                        str+=(v4.autoStyleGearbox==''?'暂无':v4.autoStyleGearbox)+'&nbsp;';
                        str+=(v4.autoStyleProductiveYear==''?'暂无':v4.autoStyleProductiveYear)+'&nbsp;';
                        str+='</a>';
                    })
                    str+='</div></div></div>';
                    if(k3%3==2|| (k3+1)!=v.valList2.length){
                        str+='</div>';
                    }
                })
                str+='</div></div>';
            })
            str+='</div>';
        })
        $(".auto_box").html($(str));
        //alert(str);
    });
})

function audiCar(e){
    $(e).next(".AudiDet").toggle();
    $(e).find("s").toggle();
    if($(e).find("s").css("display") == "none"){
        $(e).css("color", "#333333");
    }else{
        $(e).css("color", "#cf4541");
    }
    $(".AudiDet").not($(e).next(".AudiDet")).hide();
    $(".AudiCar").find("s").not($(e).find("s")).hide();
    $(".AudiCar p").not($(e)).css("color", "#333333");
}

function addcss(e){
    if($(e).hasClass("carmodel-expand")){
        $(e).addClass("carmodel-collapsible").removeClass("carmodel-expand");
        $(e).parent().next().find(".goods-carmodel-detail").show();
    }else{
        $(e).addClass("carmodel-expand").removeClass("carmodel-collapsible");
        $(e).parent().next().find(".goods-carmodel-detail").hide();
    }
}