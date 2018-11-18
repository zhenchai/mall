var basePath = $("#basePath").val();
var baseUrl = $("#baseUrl").val();
function savephoto(){
var groupId = $("#groupId").val();
     $.ajax({
    	 url: basePath+"/savegroupimg.htm",  
    	 type:'post',
    	 data:$('#photoForm').serialize(),
    	 success: function(result){  
    		 if (result==1){  
    			 window.location.href=basePath+"/groupimgalbums/"+groupId+".html";
    		 } else{   
    			 alert("保存失败");
    		 }  
    	 }  
     });
}

//删除选中的图片
function delgroupImg(id){
	//var page=$("#page").val();
	var groupId=$("#groupId").val();
	/*var pageNo = $("#page").val();
	var ta = $("#ta").val();*/
	if(confirm("你确定要删除此图片？")){
		 $.post(basePath+'/deletegroupimgs.htm',{groupImgId:id},function(result){  
	          if (result==1){  
	        	  window.location.href=basePath+'/groupimgalbums/'+groupId +'.html';
				 // location.reload();
	        	  //page(pageNo,ta);
	          } else { 
	        	  alert("删除失败！");
	          }  
	      },'json');  
		}
}

//批量删除图片
function delgroupImgs(){
	var pageNo = $("#page").val();
	var ta = $("#ta").val();
		if(checkChecked('groupImgId')){
			if(confirm("你确定要删除此图片？")){
				$.ajax({
					type:'post',
					url:basePath+'/deletegroupimgs.htm',
					data:{groupImgIds:checkedList},
					async:false,
					error:function(request){
						alert("Connection error");
					},
					success:function(result){
						if(result > 0){
//							location.reload();
							 page(pageNo,ta);
						}else{
							alert("删除失败，请稍后再试...");
						}
					}
				});
			}
		}else{
			alert("请先选择图片");
		}
	 }

//获取选中的图片
var checkedList = new Array();
function checkChecked(objId){
		 $("input[name='"+objId+"']:checked").each(function(){
			 checkedList.push($(this).val());
		 });
		 if(checkedList.length > 0){
			 return true;
		 }else{
			 return false;
		 }
	 } 

//分页
function page(page,customerId){
	    $("#ta").val(customerId);
		$("#page").val(page);
	//	$("#page_groupId").val($("#groupId").val());
		document.group_page_form.submit();
}
//小组相片详情上翻
function prev(){
	var groupId=$("#groupId").val();  
	var groupImgId= $("#prev").val();
		  $.ajax({
			url: basePath+'/nextgroupimg.htm?groupImgId='+groupImgId+"&groupId="+groupId,
		    type: 'POST',
		    dataType: 'text',
		    timeout: 4000,
		    success:showResponse
		  });
}
	
//小组相片详情下翻
function next(){
	 var groupId=$("#groupId").val();  
	 var groupImgId = $("#next").val();
			  $.ajax({
			    url: basePath+'/nextgroupimg.htm?groupImgId='+groupImgId+"&groupId="+groupId,
			    type: 'POST',
			    dataType: 'text',
			    timeout: 4000,
			    success:showResponse
			  });
	}

//根据ajax取出来的json数据转换成html
 function showResponse(responseData) {  
	//用户信息浮动层
  var returnjson = eval("(" +responseData+")");	
	$("#prev").val(returnjson[0].prev);
	$("#next").val(returnjson[0].next);
	$("#groupImgId").val(returnjson[0].nowId);
	$("#rph").val(returnjson[0].nowId);  
	$("#remark").html(returnjson[0].img.groupImgDes);
	$("#lz").html('<a class="from_user" href="../customerhomepage/'+returnjson[0].img.customerId+'.html">'+returnjson[0].img.customerName+'</a>');
	var cusId=$("#cusId").val();
	var isSiteManager=$("#isSiteManager").val();
	if(cusId!=''&& cusId!=null){
		var customerPower=$("#cusPower").val();
		if(customerPower=='1'||customerPower=='2'){ 
				$("#dphoto").html(' <a class="pic_delete fr" href="javascript:delgroupImg('+returnjson[0].nowId+');">删除</a>');
				$("#dphoto").append(' <a class="pic_edit fr" href="javascript:dia1(2);">编辑</a>');
				
		}else{ 
			if(cusId==returnjson[0].img.customerId){
				$("#dphoto").html('<a class="pic_delete fr" href="javascript:delgroupImg('+returnjson[0].nowId+');">删除</a>');
				$("#dphoto").append('<a class="pic_edit fr" href="javascript:dia1(2);">编辑</a>');
			}else if(isSiteManager!=null && isSiteManager!='' && isSiteManager==1){
				$("#dphoto").html('<a class="pic_delete fr" href="javascript:delgroupImg('+returnjson[0].nowId+');">删除</a>');
				$("#dphoto").append('<a class="pic_edit fr" href="javascript:dia1(2);">编辑</a>');
			}else{
				$("#dphoto").html('');
				$("#ephoto").html('');
			}
		}
	}else{
		$("#dphoto").html('');
	}
	
	$("#sc").html(returnjson[0].img.groupImgCreateTime);

	$("#groupImgTitle").html(returnjson[0].img.groupImgTitle);
	$("#editId").val(returnjson[0].img.groupImgId);
	$("#editCusId").val(returnjson[0].img.customerId);
	$("#editName").val(returnjson[0].img.groupImgTitle);
	$("#editRemark").val(returnjson[0].img.groupImgDes);
	$("#replyShipId").val(returnjson[0].nowId);
	var viewmid=$("#customerId").val();
	var omemberId=$("#ocustomerId").val();
	var replylist = returnjson[0].pb.list;
	var inhtml='';
	for(var i=0;i<replylist.length;i++){
		inhtml+='<li class="clearfix">';
		inhtml+='  <div class="rowElem"><input type="checkbox" /></div>';
		inhtml+='  <div class="fl"><a href="javascript:;">';
		if(replylist[i].customerHeadimg == ''){
			inhtml+='	<img alt="'+replylist[i].customerName+'" width="50" height="50" src="'+basePath+'/images/default_head3.jpg" /></a></div>';
		}else{
			inhtml+='	<img alt="'+replylist[i].customerName+'" width="50" height="50" src="'+replylist[i].customerHeadimg+'" /></a></div>';
		}
		inhtml+='     <div class="cmt_wp fl ml10">';
		inhtml+='        <div class="cmt_hd clearfix">';
		inhtml+='          <a class="cmt_name fl " ';
		inhtml+='                >'+replylist[i].customerName+'</a>';
		inhtml+='          <a class="cmt_only  fl" href="javascript:onlyhe(\''+replylist[i].customerId+'\');">只看TA</a>';

		if(viewmid==omemberId ||customerPower=='1' ||customerPower=='2' ||isSiteManager=='1'){
			inhtml+='          <a class="cmt_del  fr" href="javascript:delreply(\''+replylist[i].replyId+'\');">删除</a>';
			}
		inhtml+='        </div>';
		var replyRemark = replylist[i].replyRemark;
		replyRemark = replyRemark.replace('<img src="face/face/','<img src="'+basePath+'/face/face/');
		inhtml+=replyRemark;
		var replyContent = replylist[i].replyContent;
		replyContent = replyContent.replace('<img src="face/face/','<img src="'+basePath+'/face/face/');
		inhtml+='        <p class="cmt_cont">'+replyContent+'</p>';
		inhtml+='        <p class="cmt_date">'+replylist[i].replyTime+'</p>';
		
		inhtml+=' 		<div style="display:none;" id="hf'+replylist[i].replyId+'">'+replylist[i].replyContent+'</div> ';
		inhtml+='     <div class="cmt_op clearfix"><a class="fr" href="javascript:javascript:re(\''+replylist[i].customerId+'\',\''+replylist[i].customerName+'\',\''+replylist[i].replyId+'\',\'1\');">引用</a><a class="fr" href="javascript:re(\''+replylist[i].customerId+'\',\''+replylist[i].customerName+'\',\''+replylist[i].replyId+'\',\'0\');">回复</a></div>';
		inhtml+='  </div>';
		inhtml+='</li>'; 
	}
	$("#rep").html(inhtml);
	$("#pagecount").html(returnjson[0].pb.rows);
	var pagehtml = '';
		if(returnjson[0].pb.pageNo>1){
			 pagehtml+= '<a class="pg_prev"  href="javascript:page('+returnjson[0].pb.pageNo-1+')"';
		}else{
			 pagehtml+='<a class="pg_prev"  href="javascript:void(0)" style="color:#999;visibility:hidden;" ';
		}
			 pagehtml+=' >&lt;上一页</a>';
			
		if(returnjson[0].pb.startNo>1){
			pagehtml+='<a href="javascript:page('+1+');" >1</a>';
			pagehtml+='...';
		}
			
		for(var j =returnjson[0].pb.startNo ; j<=returnjson[0].pb.endNo;j++){

			pagehtml+=' <a ';
			if(returnjson[0].pb.pageNo==j){ 
				pagehtml+=' class="cur" '; 
			}
			pagehtml+=' href="javascript:page(\''+j+'\');">'+j+'</a> ';
		}

		if(returnjson[0].pb.pageNo+1>returnjson[0].pb.totalPages){
			pagehtml+=' <a class="pg_next" href="javascript:void(0)" style="color:#999;visibility:hidden;"';
		}else{ 
			pagehtml+=' <a class="pg_next" href="javascript:page('+(parseInt(returnjson[0].pb.pageNo)+parseInt(1))+')" ';
		}
		pagehtml+=' >下一页&gt;</a>';
		$("#group_page_form").attr('action',basePath+'/groupimgdetail/'+returnjson[0].img.groupId+'-'+returnjson[0].img.groupImgId+'-'+returnjson[0].img.customerId+'.html');
        $("#pages").html(pagehtml);
  }

 //编辑图片
function editgroupimg(){
	 $.ajax({
		 url: basePath+"/editgrougimg.htm",  
		 type:'post',
		 data:$('#editgroupImgForm').serialize(),
		 success: function(result){  
			 if (result==1){ 
				 window.location.href=basePath+"/groupimgdetail/"+$("#groupId").val()+"-"+$("#editId").val()+"-"+$("#editCusId").val()+".html";
			 } else if (result=-1){  
				 $("#error").show();
			 }else{
				 alert("编辑失败");
			 } 
		 }  
	 });
}



//删除引用
function removere(){
	$("#re").html('');
}

function replyOnkeyup(obj){
	if(obj.value.length>140){
		obj.value = obj.value.substring(0,140);
	}else{ 
		$("#sr").html("你还可以输入"+parseInt(140-obj.value.length)+"个汉字");
	}
}

//查看评论结果
function view(){
	var str = $('#content1').val();
	str = str.replace(/\</g,'&lt;');
	str = str.replace(/\>/g,'&gt;');
	str = str.replace(/\n/g,'<br/>');
	str = str.replace(/\[\/em_([0-9]*)\]/g,'<img src="face/face/$1.gif" border="0" />');
	$('#replyContent').val(str);
}

var emp = null;
function getPatcha(){
	$.ajax({
		url: "../patchcaSession.htm", 
		context: document.body, 
		success: function(data){
			emp = data;
		}});
}

function vilidateCaptcha(){
	var varification = $("#varification").val();
	if(varification == null || varification==""){
		$("#varification_error").html("验证码不能为空");
		return false;
	}else if(emp == varification){
		return true;
	}else{
		$("#varification_error").html("验证码输入错误");
		return false;
	}
}

//发表小组图片评论
function groupimgreply(){ 
	var customerId = $("#cusId").val();
	var customerPower = $("#cusPower").val();
	var imgReplyFlag = $("#imgReplyFlag").val();
	//var len= $("#content1").val().length; 
	var len= editor.html().length; 
	 if(len==0){
	 		$("#message").html("评论内容不能为空");
			dia1(1);
			return;  
	 } else if(vilidateCaptcha()){
		 if(customerId != ''){
				if(imgReplyFlag == '1'){
					if(customerPower==''){
						$("#message").html("您还不是小组成员，请加入小组再回复！");
						dia1(1);
						return;
					}
				}
			}
			if(customerId != ''){
				if(imgReplyFlag == '2'){
					if(customerPower==''){
						$("#message").html("此小组相册被禁止评论，请联系管理员！");
						dia1(1);
						return;
					}
				}
			}
			
		//$("#sr").html("你还可以输入140个汉字");
		var moodContent = editor.html().length; 
		if(moodContent==0){
			return ;
		} 
		//view();
		 editor.sync();
		$('#moodForm').form('submit',{  
		     url: basePath+"/pubgroupimgreply.htm",  
		     success: function(result){  
		         if (result==1){
		        	 //$("#content1").val('');
		        	 editor.html('');
		        	 $("#re").html('');
		        	 var p = $("#page").val();
		        	 var ta = $("#ta").val();
		  	         page(p,ta);
		       	}else if (result=-1){  
		        	alert("您未登录！");
		       	}  else{   
		         	alert("发布失败");
		         }  
		     }  
		 });   
     }
 }

//删除评论
function delreply(replyId){
	var ta=$("#ta").val();
	 $.post(basePath+'/deletereply.htm',{replyId:replyId},function(result){  
	          if (result==1){  
	        	  var p = $("#page").val();
	  	           page(p,ta);
	          } else { 
	        	  alert("删除失败！");
	          }  
	      },'json');  
} 

//引用or回复
function re(customerId,customerName,replyId,flag){
	var con = $("#hf"+replyId).html().replace(/<[^>]+>/g,"").substring(0,80)+"...";
	var htl="";
	htl+="";
	htl+='<input type="hidden" value="'+customerId+'" name="replymId"/>';
	htl+= '<div class="qr_wp mt15">';
	if(flag=='1'){
		htl+='<input type="hidden" value="1" name="flag"/>';
		htl+= ' <span>引用  '+customerName+'</span>';
		htl+= ' <input type="hidden" value="'+customerName+'" name="customerName"/>';
	}else{
		htl+='<input type="hidden" value="0" name="flag"/>';
		htl+= ' <span>回复  '+customerName+'</span>';
		htl+= ' <input type="hidden" value="'+customerName+'" name="customerName"/>';
	}
	htl+= ' <p>'+con+'</p>';
	htl+='<input type="hidden" name="reId" value="'+replyId+'"/>';
	htl+=  '<a class="qr_close" href="javascript:removere();"></a>';
	htl+=' </div>';
	$("#re").html(htl);
}

//只看他
function onlyhe(customerId){
		$("#ta").val(customerId);
		page('1',customerId);
	}

$(function(){
	//验证码绑定onclick事件
	$("#checkCodeA").click(
		function(){
			$("#checkCodeImg").click();
		}
	);
});