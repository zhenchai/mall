var bastpath="http://"+window.location.host;
$('.cate').click(function(){
    if($(this).attr('class').indexOf('hover')>=0){
        $(this).removeClass('cate_hover');
    }
    else{
        $('.cate').removeClass('cate_hover');
        $(this).addClass('cate_hover');
    }
});

$(".navCar .row div").click(function(){
    $(".navCar span").removeClass("nav_selectCar");
    $(this).children("span").addClass("nav_selectCar");
    var n = $(this).index();
    if(n == 0){
        $(".vinBox").show();
        $(".handBox").hide();
        $("#sel_vin_btn").css("background-image","url(images/qp_cvi.png)");
        $("#sel_hand_btn").css("background-image","url(images/qp_csx.png)");
        $(".scanning").show();
        $(".inp").width("90%").html("选车型");
    }else{
        $(".vinBox").hide();
        $(".handBox").show();
        $("#sel_vin_btn").css("background-image","url(images/qp_cv.png)");
        $("#sel_hand_btn").css("background-image","url(images/qp_csxz.png)");
        $(".scanning").hide();
        $(".inp").width("90%");
        if(str != "已选车型:"){
            $(".inp").html(str);
        }
    }
});

/*$(".selec li i").click(function(){
    $(this).parent().remove();
});*/



$(".letter li").click(function(){
    $(".letter li a").css("color","#000");
    $(this).children("a").css("color","#f6ab00");
});


$("#moreYear").click(function(){
    $(this).hide();
    for(var n=2005;n>=1980;n--) {
        $(".modelYear .block ul").append("<li>" + n + "年</li>");
    }
    bindClick();
});

function changeSty(id1,id2,chr){
    $("#"+id1).removeClass("border_left").css("color","#f6ab00");
    $("."+id1).hide();
    $("#"+id2).addClass("border_left").parent().css({"background-color":"#fff","background-image": "url(images/qp_cx"+chr+"0.png)"});
    $("."+id2).show();
}
var str = "已选车型:";
var str2 = "";//隐藏域保存选择值格式 xx,xx,xx
var str3='';//隐藏域保存选择值格式 品牌,车系（取中括号值）,xx
function bindClick() {
    $(".block").on("click","li", function () {
        $(".block li").removeClass("liSty");
        $(this).addClass("liSty");
        var arrt = $(this).parent().parent().parent().attr("data").split("-");
        var chr = $(this).parent().parent().parent().attr("data-chr");
        var text = $(this).html();
        str += " "+text;
        str2 += ","+text;
        if($(this).attr("salesName")!=null){
            str3=$(this).attr("salesName");//.find("#salesName").val();
        }
        var temp=str2.split(",");
        var htm='<input type="hidden" id="selectVal" value="'+str2+'" />';
        $(".inp").html(htm+str);
        //根据品牌查询车系
        if("brandBox"==arrt[0]){
            getDataByBrand(text);
        }
        //根据品牌车系查询车型
        if("car"==arrt[0]){
            getDataBySystem(temp[1],temp[2])
        }
        //根据品牌车系车型查询发动机/变速箱
        if("motorcycleType"==arrt[0]){
            getDataByType(temp[1],temp[2],temp[3]);
        }
        //根据品牌车系车型发动机/变速箱查询年款
        if("gearEng"==arrt[0]){
            var eng=temp[4].split("/");
            getDataByEngine(temp[1],temp[2],temp[3],(eng[0]=="暂无"?"":eng[0]),(eng[1]=="暂无"?"":eng[1]))
        }

        changeSty(arrt[0], arrt[1], chr);


    });
    //根据年款显示完整车型
    $(".modelYear .block").on("click","li",function(){
        var yasuoid=$(this).attr("yasuoid");
        var carType = str.split(":")[1];
        var tmp=$("#selectVal").val().split(",");

        var SalesName=tmp[3].match(/\[([^\"]*)]/);
        var tmpsd='';
        if(SalesName==null){
            tmpsd=tmp[3];
        }
        else{
            tmpsd=SalesName[1];
        }
        var carType2=tmp[1]+" "+tmpsd+" "+str3+" "+tmp[5]+"年产"

        $.getJSON(bastpath+"/AddRecord.htm",{"autoStyleIdLiyangId":yasuoid,"customerId":$("#customerId").val(),"autoStyleYear":tmp[5],"goodsBrandName":tmp[1],"autoStyleSystem":tmp[2],"autoStyleType":tmpsd},function(data){
            if(data=="err"){
                alert("选择车型异常....请重新选择");
            }
        });
        $.getJSON(bastpath+"/mobile/saveRecode.htm",{"selectVal":carType2},function(data){

        })

        $(".sucMes").show();
        $("#cartype2").html(carType);
        var n = 2;
        var timer = setInterval(function(){
            $("#timeJump").html(n--);
            if(n==0){
                clearInterval(timer);
                goIndex(carType2,yasuoid);
            }
        },1000);
    });
}

//首次加载所有品牌和获取选择记录
$(function(){
    $.getJSON(bastpath+"/GetAutoStyleByBrand.htm",{"carYearStr":"2013"},function(data){
        $("#Letter").html("");
        $(".brand").html("");
        var tt='';
        var tab='';
        $.each(data, function(k, v) {
            tt+='<li><a href="#'+ v.key+'">'+ v.key+'</a></li>';

            tab+='<div class="block"><p id="'+ v.key+'">'+ v.key+'</p><ul>';
            for(var i=0;i< v.value.length;i++){

                tab+='<li>'+v.value[i].goods_brand_name+'</li>'

            }
            tab+='</ul></div>';
        });
        $("#Letter").html($(tt));
        $(".brand").html($(tab));
        bindClick();
    })
    //获取浏览记录
    $.getJSON(bastpath + "/GetRecordByUserId.htm", {}, function (data) {
        $("#selectRecode").html("");
        var tt = "";
        var count=0;
        for(var k=data.length-1;k>=0;k--){
            if(count>5){
                break;
            }
            count++;
            var v=data[k];
            var str = v.autoStyleEngine == "" ? "" : v.autoStyleEngine;
            var str2 = v.autoStyleGearbox == "" ? "" : v.autoStyleGearbox;
            if (typeof(str) == "undefined") {
                str = "暂无";
            }
            if (typeof(str2) == "undefined") {
                str2 = "暂无";
            }
            var SalesName = v.autoStyleType.match(/\[([^\"]*)]/);
            var tmpd='';
            if (SalesName == null) {
                tmpd = v.autoStyleType;
            }else{
                tmpd=SalesName[1];
            }
            var mmt=v.goodsBrandName + " " + tmpd + " " + v.autoStyleSalesName + " " + v.autoStyleProductiveYear+"年产";
            tt += "<li onclick=\"goIndex('"+mmt+"','"+v.autoStyleIdLiyangId+"')\">" + mmt + "<i onclick=\"delRocd(this,'"+v.autoStyleIdLiyangId+"')\" id=\"' + v.autoStyleIdLiyangId + '\">X</i></li>";
        }
        /*$.each(data, function (k, v) {
            if(k>5){
                return;
            }
            //if(k)

        })*/
        $("#selectRecode").html(tt);
    });

})

//根据vin码查车型
$(".btn_search2").click(function(){
    var searchVal=$("#selectV").val();
    if(searchVal==""){
        return;
    }
    if(searchVal.length!=17){
        $("#errmsg").html("VIN码格式错误(长度17位)");
        return;
    }
    if(searchVal.indexOf('O')!=-1||searchVal.indexOf('I')!=-1||searchVal.indexOf('Q')!=-1){
        $("#errmsg").html("VIN码不包含'O','I','Q'");
        return;
    }
    $.getJSON(bastpath+"/GetCarAutoStyleByVin.htm",{"vin":searchVal},function(data){
        if(data.stat=="ok") {
            $(".selectV").val("");
            if (!data.qpAutoStyleBean && typeof data.qpAutoStyleBean != "undefined" && data.qpAutoStyleBean != 0) {
                $("#errmsg").html("未查询到结果");
                return;
            }
            var SalesName=data.qpAutoStyleBean.autoStyleType.match(/\[([^\"]*)]/);
            var tmp='';
            if(SalesName==null){
                tmp=data.qpAutoStyleBean.autoStyleType;
            }
            else{
                tmp=SalesName[1];
            }
            var str2=data.qpAutoStyleBean.goodsBrandName+" "+tmp+" "+data.qpAutoStyleBean.autoStyleSalesName+" "+data.qpAutoStyleBean.autoStyleProductiveYear+"年产";

            var liyaID=data.qpAutoStyleBean.autoStyleIdLiyangId;

            $.getJSON(bastpath+"/AddRecord.htm",{"autoStyleIdLiyangId":liyaID,"customerId":$("#customerId").val(),"autoStyleYear":data.qpAutoStyleBean.autoStyleProductiveYear,"goodsBrandName":data.qpAutoStyleBean.goodsBrandName,"autoStyleSystem":data.qpAutoStyleBean.autoStyleSystem,"autoStyleType":tmp},function(data){
                if(data=="err"){
                    alert("选择车型异常....请重新选择");
                }
            });

            $.getJSON(bastpath+"/mobile/saveRecode.htm",{"selectVal":str2},function(data2){

            })

            $(".sucMes").show();
            $("#cartype2").html(str2);
            var n = 4;
            var timer = setInterval(function(){
                $("#timeJump").html(n--);
                if(n==0){
                    clearInterval(timer);
                    goIndex(str2,liyaID);
                }
            },1000);
        }
    });
});

//删除浏览记录
function delRocd(e,id){
    if(id==""){
        return;
    }
    $.getJSON(bastpath+"/DelRecord.htm",{"autoId":id},function(data){
        if(data=="err"){
            alert("删除异常...");
        }
    });
    $.getJSON(bastpath+"/mobile/delRecode.htm",{"selectVal":id},function(data){

    })
    $(e).parent().remove();
    event.stopPropagation();//阻止冒泡事件
}

//调转到首页
function goIndex(carType,liyaID){
    //alert(carType);
    $.getJSON(bastpath+"/mobile/saveRecode.htm",{"selectVal":carType},function(data){

    })
    window.location.href="/mobile/main.html?liyaID="+liyaID+"&selectVal="+encodeURI(carType);
}

//根据品牌查询车系
function getDataByBrand(goodsBrandName){
    $("#cartype").html('<img class="loading" src="images/loading4.gif" />');
    $.getJSON(bastpath+"/GetCarStyleByType.htm",{"autoStyleEngine":"","autoStyleGearbox":"","goodsBrandName":goodsBrandName,"autoStyleSystem":"","autoStyleType":""},function(data){
        var sttr5=data.brandMake;
        var sttr=new Array();
        var ii=0;
        var tt = "";

        for(y in sttr5){
            tt+='<div class="block"><p>'+sttr5[y]+'</p><ul>';
            $.each(data.newlist, function(k, v) {
                if(sttr5[y]==v.autoStyleBrandMake){
                    if(ii==0){
                        sttr.push(v.autoStyleSystem+v.autoStyleBrandMake);
                        tt+='<li>'+v.autoStyleSystem+'</li>';
                    }else{
                        var tm=0;
                        for (x in sttr)
                        {
                            if(sttr[x]==v.autoStyleSystem+v.autoStyleBrandMake){
                                tm=1;
                            }
                        }
                        if(tm==0){
                            sttr.push(v.autoStyleSystem+v.autoStyleBrandMake);
                            tt+='<li>'+v.autoStyleSystem+'</li>';
                        }
                    }
                }
                ii++;
            });
            tt+='</ul></div>';
        }
        $("#cartype").html($(tt));
        bindClick();
    });
}

//根据品牌车系查询车型
function getDataBySystem(goodsBrandName,autoStyleSystem) {
    $("#carSystem").html('<img class="loading" src="images/loading4.gif" />');

    $.getJSON(bastpath+"/GetCarStyleByType.htm",{"autoStyleEngine":"","autoStyleGearbox":"","goodsBrandName":goodsBrandName,"autoStyleSystem":autoStyleSystem,"autoStyleType":""},function(data){
        var sttr2=new Array();
        var ii2=0;
        var tt = '<div class="block"><ul>';
        $.each(data.newlist, function(k, v) {
            if (ii2 == 0) {
                sttr2.push(v.autoStyleType);
                tt += '<li salesName="'+v.autoStyleSalesName+'">'+v.autoStyleType+'</li>';
            } else {
                var tm1 = 0;
                for (x in sttr2) {
                    if (sttr2[x] == v.autoStyleType) {
                        tm1 = 1;
                    }
                }
                if (tm1 == 0) {
                    sttr2.push(v.autoStyleType);
                    tt += '<li salesName="'+v.autoStyleSalesName+'">'+v.autoStyleType+'</li>';//<input type="hidden" id="salesName" value="">
                }
            }
            ii2++;
        });
        tt+='</ul></div>';
        $("#carSystem").html($(tt));
        bindClick();
    });
}

//根据品牌车系车型查询发动机/变速箱
function getDataByType(goodsBrandName,autoStyleSystem,autoStyleType) {
    $("#carType").html('<img class="loading" src="images/loading4.gif" />');
    $.getJSON(bastpath+"/GetCarStyleByType.htm",{"autoStyleEngine":"","autoStyleGearbox":"","goodsBrandName":goodsBrandName,"autoStyleSystem":autoStyleSystem,"autoStyleType":autoStyleType},function(data){
        var sttr3=new Array();
        var ii3=0;
        var tt = '<div class="block"><ul>';
        $.each(data.newlist, function(k, v) {
            //var str = v.autoStyleEngine == "" ? "" : v.autoStyleEngine;
            var str = v.autoStyleEngine;
            //var str2 = v.autoStyleGearbox == "" ? "" : v.autoStyleGearbox;
            var str2 = v.autoStyleGearbox;
            var sweptVolume = v.autoStyleSweptVolume;
            if (typeof(str) == "undefined"||str=="") {
                str = "暂无";
            }
            if (typeof(str2) == "undefined"||str2=="") {
                str2 = "暂无";
            }
            if (ii3 == 0) {
                sttr3.push(str + str2);
                tt += '<li>'+ str + '/' + str2 +'</li>';
            } else {
                var tm3 = 0;
                for (x in sttr3) {
                    if (sttr3[x] == str + str2) {
                        tm3 = 1;
                    }
                }
                if (tm3 == 0) {
                    sttr3.push(str + str2);
                    tt += '<li>'+ str + '/' + str2 +'</li>';
                }
            }
            ii3++;
        });
        tt+='</ul></div>';
        $("#carType").html($(tt));
        bindClick();
    });
}

//根据品牌车系车型发动机/变速箱查询年款
function getDataByEngine(goodsBrandName,autoStyleSystem,autoStyleType,autoStyleEngine,autoStyleGearbox) {
    $("#carEngine").html('<img class="loading" src="images/loading4.gif" />');

    $.getJSON(bastpath+"/GetCarStyleByType.htm",{"autoStyleEngine":autoStyleEngine,"autoStyleGearbox":autoStyleGearbox,"goodsBrandName":goodsBrandName,"autoStyleSystem":autoStyleSystem,"autoStyleType":autoStyleType},function(data){
        var sttr4=new Array();
        var ii4=0;
        var tt = '<div class="block"><ul>';
        $.each(data.newlist, function(k, v) {
            if (ii4 == 0) {
                sttr4.push(v.autoStyleProductiveYear);//<li>2015年</li>
                tt += '<li yasuoid='+v.autoStyleIdLiyangId+'>'+v.autoStyleProductiveYear+'</li>';
            } else {
                var tm1 = 0;
                for (x in sttr4) {
                    if (sttr4[x] == v.autoStyleProductiveYear) {
                        tm1 = 1;
                    }
                }
                if (tm1 == 0) {
                    sttr4.push(v.autoStyleProductiveYear);
                    tt += '<li yasuoid='+v.autoStyleIdLiyangId+'>'+v.autoStyleProductiveYear+'</li>';
                }
            }
            ii4++;
        });
        tt+='</ul></div>';
        $("#carEngine").html($(tt));
        bindClick();
    });
}