//话题操作
function editTopic(type,val){
	var groupId = $("#groupId").val();
	var topicId = $("#topicId").val();
	if(type== "reply"){
		$.post("../edittopic.htm",{topicId:topicId,topicReplyFlag :val},         
				function (data){
					if(data==1){
						if(val == '0'){
							$("#replyDiv").html('<a class="l_op" href="javascript:void(0);" id="replyBut" onclick="editTopic(\'reply\',\'1\')">禁止回应</a>');
						}else{
							$("#replyDiv").html('<a class="l_op" href="javascript:void(0);" id="replyBut" onclick="editTopic(\'reply\',\'0\')">允许回应</a>');
						}
						window.location.href="../topicdetail/"+groupId+"-"+topicId+".html";
						/*$("#message").html("操作成功");
						dia1(1);*/
					}else{
						$("#message").html("操作失败");
						dia1(1);
					}
		});
		return ;
	}
	if(type== "recommend"){
		$.post("../edittopic.htm",{topicId:topicId,topicIndexView :val,flag:'0'},         
				function (data){ 
					if(data==1){
						   document.getElementById("recommendBut").style.display = "none";
						$("#message").html("操作成功");
						dia1(1);
					}else{
						$("#message").html("操作失败");
						dia1(1);
					}
		});
		return ;
	}
	if(type== "del"){
		$.post("../deltopic.htm",{topicId:topicId,topicDelFlag :val},         
				function (data){ 
					if(data==1){
						window.location.href="../groupdetail/"+groupId+".html";
					}else{
						$("#message").html("操作失败");
						dia1(1);
					}
		});
		return ;
	}
	
	if(type== "top"){
		$.post("../edittopic.htm",{topicId:topicId,groupId:groupId,topicTopView :val},         
				function (data){ 
					if(data>0){
						$("#message").html("操作成功");
						dia1(1);
					}else{
						$("#message").html("操作失败");
						dia1(1);
					}
		});
		return ;
	}
	if(type== "fever"){
		$.post("../edittopic.htm",{topicId:topicId,topicFever :val,changeFlag:type,changeVal:val},         
				function (data){ 
					if(data==1){
						if(val=="0"){
							$("#hotDiv").html('<a class="l_op" href="javascript:void(0);"onclick="editTopic(\'fever\',\'1\')">设热帖</a>');
						}else{
							$("#hotDiv").html('<a class="l_op" href="javascript:void(0);"onclick="editTopic(\'fever\',\'0\')">去除热帖</a>');
						}
						window.location.href="../topicdetail/"+groupId+"-"+topicId+".html";
					}else{
						$("#message").html("操作失败");
						dia1(1);
					}
		});
		return ;
	}
	if(type== "essence"){
	
		$.post("../edittopic.htm",{topicId:topicId,topicEssence:val,changeFlag:type,changeVal:val},         
				function (data){ 
					if(data==1){
						if(val=="0"){
							$("#essenceDiv").html('<a class="l_op" href="javascript:void(0);"onclick="editTopic(\'essence\',\'1\')">设精华</a>');
						}else{
							$("#essenceDiv").html('<a class="l_op" href="javascript:void(0);"onclick="editTopic(\'essence\',\'0\')">去除精华</a>');
						}
						
						window.location.href="../topicdetail/"+groupId+"-"+topicId+".html";
					}else{
						$("#message").html("操作失败");
						dia1(1);
					}
		});
		return ;
	}
	if(type== "recount"){
		var count=  parseInt($("#topicRecommend").val()) +  parseInt(val);
		$.post("../recounttopic.htm",{topicId:topicId,topicRecommend:count},         
				function (data){ 
					if(data==1){
						//window.location ="topicdetail/"+groupId+"-"+topicId+".html";
						$("#goodCount").html(count);
					}else if(data==-1){
						$("#message").html("您已经推荐过");
						dia1(1);
					}else if(data==2){
						window.location ="../login.html";
					}
		});
		return ;
	}
	
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

//话题评论
function topicreply(){ 
	var customerId = $("#custId").val();
	if(customerId == null){
		$("#message").html("请先登录");
		dia1(1);
		return;  
	}
	//var start = '${gmember.groupMemberState}';
	var customerPower = $("#customerPower").val();
	var topicReplyFlag = $("#topicReplyFlag").val();
	var replyFlag = $("#replyFalg").val();
	var len= editor.html().length; 
	 if(len==0){
	 		$("#message").html("评论内容不能为空");
			dia1(1);
			return;  
	 }
	 else if(vilidateCaptcha()){
		if(topicReplyFlag=='1' || replyFlag=="2"){
			$("#message").html("此话题被禁止评论，请联系管理员！");
			dia1(1);
			return;
		}
		/*if(start=='1'){
			$("#message").html("您被禁止评论，请联系管理员！");
			dia1(1);
			return;
		}*/
		if(customerId != ''){
		  if(replyFlag =='1'){
			  if(customerPower==''){
				  $("#message").html("您还不是小组成员，请加入小组再回复！");
				  dia1(1);
				  return;
			  }
		  }
		}
		
		var topicContent = editor.html().length;
		if(topicContent==0){
			return ;
		} 
		 editor.sync();
	    $('#topicForm').form('submit',{  
	        url: "../pubgrouptopicreply.htm",  
	        type:'post',
	        success: function(result){  
	            if (result==1){
	            	editor.html('');
	          
	           	 $("#re").html('');
	             $("#hf").html(parseInt( $("#hf").html())+1);
	             var p = $("#page").val();
	        	 var ta = $("#ta").val();
	  	         page(p,ta);
	          	}else if (result==1){  
	           		alert("您未登录！");
	          	}  else{   
	            	alert("发布失败");
	            }  
	        }  
	    });
	 }
}

//分页
function page(page,customerId){
	    $("#ta").val(customerId);
		$("#page").val(page);
	//	$("#page_groupId").val($("#groupId").val());
		$("#group_page_form").submit();
}
//删除评论
function delreply(replyId){
	 var ta=$("#ta").val();
//var page=$("#page").val();
	 $.post('../deletereply.htm',{replyId:replyId},function(result){  
	          if (result==1){  
	        	  var p = $("#page").val();
	  	           page(p,ta);
	          } else { 
	        	  alert("删除失败！");
	          }  
	      },'json');  
} 

//删除并拉黑
function delBlack(groupId,replyId,customerId){
	var ta=$("#ta").val();
	 $.post('../delandblack.htm',{groupId:groupId,replyId:replyId,customerId:customerId},function(result){  
         if (result==1){  
       	  var p = $("#page").val();
 	           page(p,ta);
         } else { 
       	  alert("删除失败！");
         }  
     },'json');  
}


//引用
function re(memberId,memberNickname,id,flag){
	var customerId = $("#customerId").val();
	if(customerId !=''){
		var con = $("#hf"+id).html().replace(/<[^>]+>/g,"").substring(0,80)+"...";
		var htl="";
		htl+="";
		htl+='<input type="hidden" value="'+memberId+'" name="replymId"/>';
		htl+= '<div class="qr_wp mt15">';
		if(flag=='1'){
			htl+='<input type="hidden" value="1" name="flag"/>';
			htl+= ' <span>引用  '+memberNickname+'</span>';
			htl+= ' <input type="hidden" value="'+memberNickname+'" name="nickname"/>';
		}else{
			htl+='<input type="hidden" value="0" name="flag"/>';
			htl+= ' <span>回复  '+memberNickname+'</span>';
			htl+= ' <input type="hidden" value="'+memberNickname+'" name="nickname"/>';
		}
		if(con.length>100){
			htl+= ' <p>'+con.substring(0,100)+'...</p>';
		}else{
			htl+= ' <p>'+con+'</p>';
			}
	
		htl+='<input type="hidden" name="reId" value="'+id+'"/>';
		htl+=  '<a class="qr_close" href="javascript:removere();"></a>';
		htl+=' </div>';
		$("#re").html(htl);
	}else{
		 $("#message").html('您未登录,请<a href="../login.html" style="color:blue;">登录</a>后操作！');
  		 dia1(1);
	};
}

//删除引用
function removere(){
	$("#re").html('');
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

function lookreply(obj,type){
	var topicCusId = $("#topicCusId").val();
	if(type=1){
		if(obj!=''){
			$("#zmem").html('<a class="cmt_only " href="javascript:void(0);" onclick="lookreply(\'\',\'1\')" >查看全部</a>');
		}else{
			$("#zmem").html('<a class="cmt_only " href="javascript:void(0);" onclick="lookreply(\''+topicCusId+'\',\'1\')" >只看此用户</a>');
		}
	}
		$("#ta").val(obj);
		page('1',obj);
	}