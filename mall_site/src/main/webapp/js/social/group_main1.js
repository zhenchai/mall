var iHeight=0;var iTop=0;var clientHeight=0;var iIntervalId=null;var pageNo=1;var loadPage=4;var basePath=$("#basePath").val();var baseUrl=$("#baseUrl").val();getPageHeight();iIntervalId=setInterval("_onScroll();",500);function getPageHeight(){if(document.body.clientHeight&&document.documentElement.clientHeight){clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight}else{clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight}iHeight=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}function reachBottom(){var scrollTop=0;if(document.documentElement&&document.documentElement.scrollTop){scrollTop=document.documentElement.scrollTop}else{if(document.body){scrollTop=document.body.scrollTop}}if((scrollTop>0)&&(scrollTop+clientHeight==iHeight)){return true}else{return false}}function _onScroll(){if($(".handle").html()!="已无更多结果"){iTop=document.documentElement.scrollTop+document.body.scrollTop;getPageHeight();if(((iTop+clientHeight)>parseInt(iHeight*0.99))||reachBottom()){show()}}}function show(){pageNo++;$.ajax({url:"topicessencelist.htm?pageNo="+pageNo,type:"GET",dataType:"text",async:"false",beforeSend:showLoadingImg,error:showFailure,success:showResponse})}function showLoadingImg(){$("#showmore").html(' <img src="images/indicator.gif" />')}function showFailure(){$("#showmore").html("<font color=red> 获取查询数据出错 </font>")}function showResponse(responseData){var returnjson=eval("("+responseData+")");var nextpagehtml="";for(var i=0;i<returnjson.list.length;i++){nextpagehtml+='  <div class="pbl-list">';var topicImg=returnjson.list[i].topicImgs;if(topicImg.length>0){for(var j=0;j<topicImg.length;j++){if(topicImg[j].topicType=="0"&&j<1){nextpagehtml+='<a  href="topicdetail/'+returnjson.list[i].groupId+"-"+returnjson.list[i].topicId+'.html" target="_blank"><img  class="lodingimg" width="160" height="120" src="'+topicImg[j].topicImgUrl+'" /></a>'}}}nextpagehtml+='<div class="pbl-detail clearfix">';nextpagehtml+=' <p class="pbl-top mt10"><a class="u_head" href="customerhomepage/'+returnjson.list[i].customerId+'.html" target="_blank">';if(returnjson.list[i].customerHead==null||returnjson.list[i].customerHead==""){nextpagehtml+='<img width="20" height="20"  title="'+returnjson.list[i].customerName+'" src="'+basePath+'/images/default_head3.jpg" />'+returnjson.list[i].customerName.substring(0,8)+"</a></p>"}else{nextpagehtml+='<img width="20" height="20"  title="'+returnjson.list[i].customerName+'" src="'+baseUrl+returnjson.list[i].customerHead+'" />'+returnjson.list[i].customerName.substring(0,8)+"</a></p>"}nextpagehtml+=' <p class="ml30" style="line-height:20px;">';nextpagehtml+=' <a href="topicdetail/'+returnjson.list[i].groupId+"-"+returnjson.list[i].topicId+'.html" target="_blank" style="color:#333">';var topicContent=returnjson.list[i].topicContent.replace(/<[^>]+>/g,"").replace(/(^\s*)|(\s*$)/g,"");if(topicContent.length>100){topicContent=topicContent.substring(0,100);nextpagehtml+=' <p class="ml30" style="line-height:20px;"><a href="topicdetail/'+returnjson.list[i].groupId+"-"+returnjson.list[i].topicId+'.html" target="_blank" style="color:#333">'+topicContent+"...</a></p>"}else{nextpagehtml+=' <p class="ml30" style="line-height:20px;"><a href="topicdetail/'+returnjson.list[i].groupId+"-"+returnjson.list[i].topicId+'.html" target="_blank" style="color:#333">'+topicContent+"</a></p>"}var reply=returnjson.list[i].replyCount;if(reply==null){reply=0}nextpagehtml+=' <a class="fr" href="topicdetail/'+returnjson.list[i].groupId+"-"+returnjson.list[i].topicId+'.html" target="_blank">评论（'+reply+"）</a>";nextpagehtml+="</div></div>"}if(nextpagehtml!=null&&nextpagehtml!=""){$("#items").append(nextpagehtml);var $container=$("#items");$newElems=$("#items .pbl-list");$newElems.imagesLoaded(function(){$container.masonry("reload");$newElems.animate({opacity:1});if(returnjson.nextPageNo==pageNo){clearInterval(iIntervalId);$("#showmore").hide()}else{$("#showmore").html('<a class="handle" href="javascript:show()">显示更多结果</a>')}})}else{$("#showmore").html('<a class="handle" href="javascript:show()">已无更多结果</a>')}};