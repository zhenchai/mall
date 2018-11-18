$(function(){
    var location = (window.location+'').split('/');
    //var basePath = location[0]+'//'+location[2]+'/'+location[3];
    var basePath = "";
    var valstr="";
    var carstyleID="";
    $.getJSON(basePath+"/GetRecordByUserId.htm",{},function(data){
        var tt="";

        $.each(data, function(k, v) {
            //if(k)
            var str=v.autoStyleEngine==""?"":v.autoStyleEngine;
            if(typeof(str)=="undefined"){
                str="暂无";
            }
            tt+='<li>'
            +'<a href="javascript:;" target="_self">'+ v.goodsBrandName +" "+ v.autoStyleType+" "+ v.autoStyleSweptVolume +'('+str+')'+" "+ v.autoStyleYear.split(".")[0]+"年产"+'</a>'
            +'<i class="view-det" id="'+ v.autoStyleIdLiyangId+'"></i>'
            +'</li>';
            valstr=v.goodsBrandName +" "+ v.autoStyleType+" "+ v.autoStyleSweptVolume +'('+str+')'+" "+ v.autoStyleYear.split(".")[0]+"年产";
            carstyleID= v.autoStyleIdLiyangId;
        })
        $(".view-list").html(tt);
        $("#selCarType").html(valstr==""?"请先选择车型，方便选择商品！":valstr);
        $("#carstyleID").val(carstyleID);

        if(carstyleID != "" && carstyleID != null){
            changeCarTypeBtnClass("2");
        }else{
            changeCarTypeBtnClass("1");
        }
    })


    $(".choose-tabs a").click(function(){
        var _this = $(this).parent("li");
        var _index = _this.index();
        var _box = _this.parent(".switch-tabs");
        _this.addClass("on").siblings(".on").removeClass("on");
        _box.next(".tabs-wrap").children(".tabs-item:eq("+_index+")").addClass("on").siblings(".on").removeClass("on");
        //
        if($(this).html().indexOf("浏览")>0){
            $.getJSON(basePath+"/GetRecordByUserId.htm",{},function(data){
                var tt="";

                $.each(data, function(k, v) {
                    //if(k)
                    var str=v.autoStyleEngine==""?"":v.autoStyleEngine;
                    if(typeof(str)=="undefined"){
                        str="暂无";
                    }
                    tt+='<li>'
                    +'<a href="javascript:;" target="_self">'+ v.goodsBrandName +" "+ v.autoStyleType+" "+ v.autoStyleSweptVolume +" "+ v.autoStyleYear+"年产"+'</a>'
                    +'<i class="view-det" id="'+ v.autoStyleIdLiyangId+'"></i>'
                    +'</li>';
                    valstr=v.goodsBrandName +" "+ v.autoStyleType+" "+ v.autoStyleSweptVolume +" "+ v.autoStyleYear+"年产";
                })
                $(".view-list").html(tt);
                //$("#selCarType").html(valstr==""?"请先选择车型，方便选择商品！":valstr);
            })
            $(".tabs-wrap").find(".tabs-item:first").hide();
        }else{
            $(".tabs-wrap").find(".tabs-item:first").show();
        }
    });

    $(".choose-process a").click(function(){
        //var _this = $(this).parent("li");
        //_this.addClass("chosen").nextAll(".chosen").removeClass("chosen");
    });

    if($(".chosen-list li").length == 0) {
        $(".chosen-items").hide();
    } else {
        $(".chosen-items").show();
    };
    
    $("ul.brands-filter").on("click","li:not(#first)",function(){
    	var _this = $(this);
    	var _index = _this.index()-1;
    	_this.addClass("on").siblings(".on").removeClass("on");
    	$("div.brands-cont").find(".brand-filter-content").hide();
    	$("div.brands-cont").find(".brand-filter-content:eq("+_index+")").show();
    })
    
    $(".chosen-list").on("click", ".item-det", function(){
        var _index = $(this).parent().index();
        $("div.tabs-item").find(".on").removeClass("on");
        if(_index == 0){
        	$(this).parent().parent().find("li").remove();
            $("#yeartp").show();
            $(".brand-filter-content").first().removeAttr("style");
            $(".brands-filter").find("li").eq(1).addClass("on");
        }else{
        	$(this).parent().parent().find("li:gt("+(_index-1)+")").remove();
        }
       	$("ul.choose-process").find("li.chosen").removeClass("chosen");
       	$("ul.choose-process").find("li:lt("+(_index+1)+")").addClass("chosen");

       	$("div.tabs-item:eq("+(_index+1)+")").addClass("on");
        //$("ul.brands-filter li a:first").parent().addClass("on");
        //$(".brands-cont").find("div").hide();
        //$(".brands-cont").find("div:first").show();
        gethtml();
    });

    $(".choose-wp").on("click","a",function(){
        var _word = $(this).find(".choose-word").text();
        var _index = $(this).parents(".tabs-item").index();
        var _chosen = '<li data-index='+_index+'><span class="chosen-word">'+_word+'</span><i class="item-det"></i></li>';
        $(this).parents(".choose-wp").find(".on").removeClass("on");
        $(this).addClass("on");
        if($(".chosen-list").find("li[data-index="+_index+"]").length == 0) {
            $(".chosen-list").append(_chosen);
            $(".chosen-items").show();
        } else {
            $(".chosen-list").find("li[data-index="+_index+"]").remove();
            $(".chosen-list").append(_chosen);
        };
        
        $("ul.choose-process").find("li:eq("+(_index)+")").addClass("chosen");
        $("div.tabs-item").find(".on").removeClass("on");
        $(this).parent().hide();
       	$("div.tabs-item:eq("+(_index+1)+")").addClass("on");
        $("#yeartp").hide();
        gethtml();



    });
	
    $(".items-content .tabs-item:last").on("click","a",function(){
        $(".choose-tabs, .dia-content").hide();
        var autoStyleYear="";
        var goodsBrandName="";
        var autoStyleSystem="";
        var autoStyleType="";

        $(".chosen-list").find("span").each(function(index,element){
            if(index==0){
                goodsBrandName=$(element).html();
            }
            if(index==1){
                autoStyleSystem=$(element).html();
            }
            if(index==2){
                autoStyleType=$(element).html();
            }
        })

        $("#valText").html(goodsBrandName+" "+autoStyleType+" "+$(this).find("span").html()+" "+autoStyleYear+"年产");
        $("#selCarType").html(goodsBrandName+" "+autoStyleType+" "+$(this).find("span").html()+" "+autoStyleYear+"年产");
        $(".choose-success").show();
        $("#yasuoid").val($(this).attr("yasuoid"));
        $("#carstyleID").val($(this).attr("yasuoid"));


        $.getJSON(basePath+"/AddRecord.htm",{"autoStyleIdLiyangId":$(this).attr("yasuoid"),"autoStyleYear":autoStyleYear,"goodsBrandName":goodsBrandName,"autoStyleSystem":autoStyleSystem,"autoStyleType":autoStyleType},function(data){
            if(data=="err"){
                alert("选择车型异常....请重新选择");
            }
        });
        setTimeout(function(){
            $(".choose-dialog").hide();
            $(".box").hide();
            changeCarTypeBtnClass("2");
        },3000);//1000为1秒钟

    });

    $(".view-list").on("click","i.view-det",function(){
        var id=$(this).attr("id");
        if(id==""){
            $(this).parent("li").remove();
            return;
        }
        $.getJSON(basePath+"/DelRecord.htm",{"autoId":id},function(data){
         if(data=="err"){
         alert("删除异常...");
         }
         })
        var len =$(".view-list").find("li").length;
        /*if(len==1){
         alert(len+"//"+id);
         }*/
        var autoid=$("#carstyleID").val();

        $(this).parent("li").remove();
        var htm=$(".view-list").first("li").find("a").html();
        var yasuid=$(".view-list").first("li").find("i").attr("id");
        if(id==autoid){
            if(len==1){
                $("#selCarType").html("请先选择车型，方便选择商品！");
                $("#yasuoid").val("");
                $("#carstyleID").val("");
            }else{
                $("#selCarType").html(htm);
                $("#yasuoid").val(yasuid);
                $("#carstyleID").val(yasuid);
            }
        }
    });
    
    $(".dia-close").click(function(){
        $(".choose-dialog").hide();
        $(".box").hide();
    });

    $(".view-list").on("click","a",function(){
        $("#selCarType").html($(this).html());
        $("#carstyleID").val($(this).parent().find("i").attr("id"));
        $(".choose-dialog").hide();
        $(".box").hide();
        changeCarTypeBtnClass("2");
    })


    function gethtml(){
        var autoStyleSweptVolume="";
        var goodsBrandName="";
        var autoStyleSystem="";
        var autoStyleType="";

        $(".chosen-list").find("span").each(function(index,element){
            if(index==0){
                //autoStyleYear=$(element).html();
                goodsBrandName=$(element).html();
            }
            if(index==1){
                //goodsBrandName=$(element).html();
                autoStyleSystem=$(element).html();
            }
            if(index==2){
                //autoStyleSystem=$(element).html();
                autoStyleType=$(element).html();
            }
            if(index==3){
                //autoStyleType=$(element).html();
                autoStyleSweptVolume=$(element).html();
            }
        })
        if($(".chosen-list").find("span").length==0){
            return;
        }
        //alert(autoStyleYear+"/"+goodsBrandName+"/"+autoStyleSystem+"/"+autoStyleType);
        //根据年款查品牌
        //根据车型车系查数据
        $.getJSON(basePath+"/GetCarStyleByType.htm",{"autoStyleSweptVolume":autoStyleSweptVolume,"goodsBrandName":goodsBrandName,"autoStyleSystem":autoStyleSystem,"autoStyleType":autoStyleType},function(data){
            var tt = "";
            var sttr=new Array();
            var sttr2=new Array();
            var sttr3=new Array();
            var sttr4=new Array();
            var ii=0;
            var ii2=0;
            var ii3=0;
            var ii4=0;
            $(".models-cont").show();
            $(".models-cont").html("");
            $.each(data, function(k, v) {

                if(autoStyleSystem==""&&autoStyleType==""&&autoStyleSweptVolume==""){
                    if(ii==0){
                        sttr.push(v.auto_style_system);
                        tt+='<a href="javascript:;" target="_self"><span class="choose-word">'+v.auto_style_system+'</span></a>';
                    }else{
                        var tm=0;
                        for (x in sttr)
                        {
                            if(sttr[x]==v.auto_style_system){
                                tm=1;
                            }
                        }
                        if(tm==0){
                            sttr.push(v.auto_style_system);
                            tt+='<a href="javascript:;" target="_self"><span class="choose-word">'+v.auto_style_system+'</span></a>';
                        }
                    }
                    ii++;
                }
                if(autoStyleSystem!=""&&autoStyleType==""&&autoStyleSweptVolume==""){
                    if(ii2==0){
                        sttr2.push(v.auto_style_type);
                        tt+='<a href="javascript:;" target="_self"><span class="choose-word">'+v.auto_style_type+'</span></a>';
                    }else{
                        var  tm1=0;
                        for (x in sttr2)
                        {
                            if(sttr2[x]==v.auto_style_type){
                                tm1=1;
                            }
                        }
                        if(tm1==0){
                            sttr2.push(v.auto_style_type);
                            tt+='<a href="javascript:;" target="_self"><span class="choose-word">'+v.auto_style_type+'</span></a>';
                        }
                    }
                    ii2++;
                }
                if(autoStyleSystem!=""&&autoStyleType!=""&&autoStyleSweptVolume==""){
                    var str=v.auto_style_engine==""?"":v.auto_style_engine;
                    if(typeof(str) == "undefined"){
                        str="暂无";
                    }
                    if(ii3==0){
                        sttr3.push(v.auto_style_swept_volume);
                        tt+='<a href="javascript:;" target="_self"><span class="choose-word">'+v.auto_style_swept_volume+'</span></a>';
                    }else{
                        var tm3=0;
                        for (x in sttr3)
                        {
                            if(sttr3[x]==v.auto_style_swept_volume){
                                tm3=1;
                            }
                        }
                        if(tm3==0){
                            sttr3.push(v.auto_style_swept_volume);
                            tt+='<a href="javascript:;" target="_self"><span class="choose-word">'+v.auto_style_swept_volume+'</span></a>';
                        }
                    }
                    ii3++;
                }
                if(autoStyleSystem!=""&&autoStyleType!=""&&autoStyleSweptVolume!=""){
                    var yearTemp = v.auto_style_year;
                    if(yearTemp != "" && yearTemp != null && yearTemp.indexOf(".")>0){
                        yearTemp = yearTemp.substr(0, yearTemp.indexOf("."));
                    }

                    if(ii4==0){
                        sttr4.push(yearTemp);
                        tt+='<a href="javascript:;" target="_self" yasuoid="'+ v.auto_style_id_LiYang_ID+'"><span class="choose-word">'+yearTemp+'</span></a>';
                    }else{
                        var  tm1=0;
                        for (x in sttr4)
                        {
                            if(sttr4[x]==yearTemp){
                                tm1=1;
                            }
                        }
                        if(tm1==0){
                            sttr4.push(yearTemp);
                            tt+='<a href="javascript:;" target="_self" yasuoid="'+ v.auto_style_id_LiYang_ID+'" ><span class="choose-word">'+yearTemp+'</span></a>';
                        }
                    }
                    ii4++;
                }
            })
            $(".models-cont").html(tt);
        })
    }

    $(".search-btn").click(function(){
        var searchVal=$(".search-input").val();
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
        $.getJSON("/GetCarAutoStyleByVin.htm",{"vin":searchVal},function(data){
            if(data.stat=="ok"){
                $(".search-input").val("");
                if(!data.qpAutoStyleBean && typeof data.qpAutoStyleBean != "undefined" && data.qpAutoStyleBean != 0){
                    $("#errmsg").html("未查询到结果");;
                    return;
                }
                $(".choose-tabs, .dia-content").hide();
                var str=data.qpAutoStyleBean.goodsBrandName+" "+data.qpAutoStyleBean.autoStyleType+" "+data.qpAutoStyleBean.autoStyleSweptVolume+"("+data.qpAutoStyleBean.autoStyleEngine+")"+data.qpAutoStyleBean.autoStyleYear.split('.')[0]+"年产";
                $("#valText").html(str);
                $("#selCarType").html(str);
                $(".choose-success").show();
                $("#yasuoid").val(data.qpAutoStyleBean.autoStyleIdLiyangId);
                $("#carstyleID").val(data.qpAutoStyleBean.autoStyleIdLiyangId);


                $.getJSON(basePath+"/AddRecord.htm",{"autoStyleIdLiyangId":data.qpAutoStyleBean.autoStyleIdLiyangId,"autoStyleYear":data.qpAutoStyleBean.autoStyleYear,"goodsBrandName":data.qpAutoStyleBean.goodsBrandName,"autoStyleSystem":data.qpAutoStyleBean.autoStyleSystem,"autoStyleType":data.qpAutoStyleBean.autoStyleType},function(data){
                    if(data=="err"){
                        alert("选择车型异常....请重新选择");
                    }
                });
                setTimeout(function(){
                    $(".choose-dialog").hide();
                    $(".box").hide();
                    changeCarTypeBtnClass("2");
                },3000);//1000为1秒钟
            }
            else{
                $("#errmsg").html(data.msg);
            }
        })

    })
	
});
