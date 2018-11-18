//删除消息
function delsystemmsg(id){  
    if (confirm('你确定要删除此消息?')){  
        $.post('deletemsg.htm',{messageCustomerId:id},function(result){  
                if (result==1){
                	//window.location.reload();
                	 window.location.href=window.location.href;
                } else { 
                 	alert("删除失败！");
                }  
        },'json');  
    }  
}


//查看消息
function read(id){
    $.post( 
    		'readmsg.htm',
    		{messageCustomerId:id},
    		function(result){  
             },'json');  
    $("#"+id).removeClass('smsg_word');
}


//批量删除消息
function delbatchsystemmsg(){
	if(checkChecked('messageCustomerId')){
		if(confirm('你确定要删除所选消息?')){
			var checkItems = $("input[name='messageCustomerId']:checked");
			var checkList = new Array();
			for(var i=0;i<checkItems.length;i++){
				checkList.push($(checkItems[i]).val());
			}
			$.ajax({
				url:"deletebatchmsg.htm",
				data:{messageCustomerId:checkList},
				success:function(data){
					if (data>0){
						 window.location.href=window.location.href;
                   } else { 
                       alert("删除失败！");
                   }  
				}
			});
		}
	}else{
		alert("请选择消息！");
	}
}

//批量查看
function readbatchsystemmsg(){
	if(checkChecked('messageCustomerId')){
			var checkItems = $("input[name='messageCustomerId']:checked");
			var checkList = new Array();
			for(var i=0;i<checkItems.length;i++){
				checkList.push($(checkItems[i]).val());
			}
			$.ajax({
				url:"readbatchmsg.htm",
				data:{messageCustomerId:checkList},
				success:function(data){
					if (data>0){
						 window.location.href=window.location.href;
                   } else { 
                       alert("删除失败！");
                   }  
				}
			});
	}else{
		alert("请选择消息！");
	}
}

//选中的复选框
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

//主动发送加入小组请求，希望管理员能批准
function applyjoin(gid,cid,recid,examine,obj){
	 //拒绝
	 if(examine==2){
		// var mId = $(obj).next().next().next(".none").text();
		$.post("applyjoin.htm",{groupId:gid,groupCustomerExamine:examine,customerId:cid,managerId:recid},         
				function (data){ 
				$("#message").html("操作成功");
				dia1(1);
		});
		
	}else{
		/* var msgId ='${member.memberId}';
		 var mId = $(obj).next().next(".none").text();*/
		$.post("applyjoin.htm",{groupId:gid,groupCustomerExamine:examine,customerId:cid,managerId:recid},function (data){
			if(data=='-2'){
				$("#message").html("您的小组已经满员~");
				dia1(1);
				return ;
			}else if(data=='-1'){
				$("#message").html("您的好友已经达到加入小组上限~");
				dia1(1);
				return ;
			}else{
				$.post("addgroupcustomer.htm",{groupId:gid,customerId:cid},         
						function (data){ 
							if(data == -1){
								$("#message").html("成员已经是小组成员！");
								dia1(1);
							}else if(data==1){
								$("#message").html("操作成功");
								dia1(1);
							}else{
								$("#message").html("加入小组失败");
								dia1(1);
							}
					    }); 
			     }
		  }); 
     }
 }


//管理小组
function managergroup(gid,aid,rid,examine,obj){
	if(examine==2){
	/*	var msgId =$(obj).next().next(".none").text(); 
		 var mId = $(obj).next().next().next(".none").text();*/
		$.post("managergroup.htm",{groupId:gid,messageRecCustomerId:aid,messageAuthorId:rid,groupCustomerExamine:examine },         
				function (data){ 
					$("#message").html("操作成功");
					dia1(1);
		});
	}else{
		/* var msgId =$(obj).next(".none").text(); 
		 var mId = $(obj).next().next(".none").text();*/
		$.post("managergroup.htm",{groupId:gid,messageRecCustomerId:aid,messageAuthorId:rid,groupCustomerExamine:examine},  function (data){  
			if(data==-1){
				$("#message").html("您管理的小组到达上限了！");
				dia1(1);
			}else{
				$.post("addgroupmanager.htm",{groupId:gid,customerId:rid},         
					function (data){
						if(data>0){
							$("#message").html("操作成功");
							dia1(1); 
						}else if(data = -1){
							$("#message").html("您已经是小组管理员！");
							dia1(1);
						}
						else{
							$("#message").html("操作失败");
							dia1(1);
						}
				});
			}
	   });	    
	}
}

//转让小组
function transfergroup(gid,aid,rid,examine,obj){
	if(examine==2){
		$.post("zhuangrgroup.htm",{groupId:gid,messageRecCustomerId:aid,messageAuthorId:rid,groupCustomerExamine:examine},         
				function (data){ 
					$("#message").html("操作成功");
					dia1(1);
		});
	}else{
		$.post("zhuangrgroup.htm",{groupId:gid,messageRecCustomerId:aid,messageAuthorId:rid,groupCustomerExamine:examine},  function (data){ 
			if(data==-1){
				$("#message").html("您管理的小组到达上限了！");
				dia1(1);
			}else{
				$.post("transfergroup.htm",{groupId:gid,customerId:rid,createAuthorId:aid},         
						function (data){
							if(data>0){
								$("#message").html("操作成功");
								dia1(1);
							}else{
								$("#message").html("操作失败");
								dia1(1);
							}
						});
			     }
		    });
       }
 }

//好友邀请你加入小组 好友邀请
function invitefriends(gid,aid,rid,examine,obj){
	 //拒绝
	 if(examine==2){
		$.post("invitegroupfriend.htm",{groupId:gid,messageRecCustomerId:aid,messageAuthorId:rid,groupCustomerExamine:examine},         
				function (data){ 
				$("#message").html("操作成功");
				dia1(1);
		});
	}else{
		$.post("invitegroupfriend.htm",{groupId:gid,messageRecCustomerId:aid,messageAuthorId:rid,groupCustomerExamine:examine},  function (data){
			if(data=='-2'){
				$("#message").html("该小组已经满员~");
				dia1(1);
				return ;
			}else if(data=='-1'){
				$("#message").html("你已经达到加入小组上限~");
				dia1(1);
				return ;
			}else{
				$.post("addgroupmember.htm",{groupId:gid,customerId:rid},         
						function (data){ 
							if(data == -1){
								$("#message").html("成员已经已经是小组成员！");
								dia1(1);
							}else if(data==1){
								$("#message").html("操作成功");
								dia1(1);
							}else{
								$("#message").html("加入小组失败");
								dia1(1);
							}
						}); 
			}
		});
		
	
    }
}

//分页
function page(page,customerId){
		$("#page").val(page);
	//	$("#page_groupId").val($("#groupId").val());
		$("#group_page_form").submit();
}


//发送私信
function sendmessage(){
	 var customerId = $("#messageAuthorId").val();
	 if(customerId==null||customerId==''){
		 $("#message").html('您未登录,请<a href="login.html" style="color:blue;">登录</a>后操作！');
			dia1(2);
		 return ;
	 }
	 dia1(1);
}

function length300(){
		var len=$("#messageContent").val().length;
	       if(len>300){
			   $("#ab").html("还可以输0/300字"); 
	       }else{
	    	   $("#ab").html("还可以输"+parseInt(300-len)+"/300字");
	       }
 }


function dosendmessage(){
	 if($("#messageContent").val()==""){
		 return ;
	 }
	 $.ajax({  
        url: "sendmessageother.htm",  
        data:$("#sendForm").serialize(), 
        type:'post',
        success: function(result){  
            if (result==1){  
           	 $("#messageContent").val("");
           	 cls1();
           	 $("#message").html('发送成功');
	       		 dia1(2);
          	} else if(result==-1){   
          	 	cls1();
          		 $("#message").html('不能发送给自己');
      			dia1(2);
       		 return ;
           } else if(result==-2){   
           		cls1();
          		 $("#message").html('您未登录,请<a href="login.html" style="color:blue;">登录</a>后操作！');
	       			dia1(2);
	        		 return ;
	       } else if(result==-3){  
	    	   cls1();
          		 $("#message").html('你输入的昵称不存在！');
	       			dia1(2);
	        		 return ;
	       }
        }  
    });   
}

//删除已发私信
function delsendmmsg(id){  
    if (confirm('你确定要删除此消息?')){  
        $.post('deletesendmsg.htm',{messageId:id},function(result){  
                if (result==1){
                	 window.location.href=window.location.href;
                } else { 
                 	alert("删除失败！");
                }  
        },'json');  
    }  
}

//批量删除消息
function delbatchsendmmsg(){
	if(checkChecked('messageId')){
		if(confirm('你确定要删除所选消息?')){
			 $('#msgForm').form('submit',{  
			        url: "deletebatchsendmsg.htm",  
			        onSubmit: function(){  
			            return $(this).form('validate');  
			        },  
			        success: function(result){  
			        	if (result>0){
			        		 window.location.href=window.location.href;
	                    } else { 
	                        alert("删除失败！");
	                    }  
			        }  
			    }); 
		}
	}else{
		alert("请选择消息！");
	}
}
	
function doreplymessage(messageId){
	 if($("#content"+messageId).val()==""){
		 $("#message").html('内容不能为空');
  		 dia1(2);
		 return ;
	 }
	 var str = $('#content'+messageId).val();
		str = str.replace(/\</g,'&lt;');  
		str = str.replace(/\>/g,'&gt;');
		str = str.replace(/\n/g,'<br/>');
		str = str.replace(/\[\/em_([0-9]*)\]/g,'<img src="face/face/$1.gif" border="0" />');
		$('#content'+messageId).val(str);
	 $.ajax({  
        url: "sendmessageother.html", 
        type:'post',
        data:$("#form"+messageId).serialize(),
   
        success: function(result){  
       	 if (result==1){  
       		 $("#content"+messageId).val("");
           	 cls1();
           	 $("#message").html('发送成功');
	       		 dia1(2);
          	}else if(result==-1){   
          	 	cls1();
          		$("#message").html('不能发送给自己');
      			dia1(2);
       		   return ;
           }else if(result==-2){   
           		cls1();
          		 $("#message").html('您未登录,请<a href="login.html" style="color:blue;">登录</a>后操作！');
	       		dia1(2);
	        	 return ;
	       }else if(result==-3){  
	    	   cls1();
      		 $("#message").html('你输入的昵称不存在！');
       			dia1(2);
        	   return ;
	       }
        }  
    });   
}

function totopicdetailt(messageCustomerId){
	   $.post('readmsg.htm',{messageCustomerId:messageCustomerId},function(result){  
        	 //	window.open("topicdetail-"+topicId+".html");
        	 	 $("#"+messageCustomerId).removeClass('smsg_word');
       },'json');  
}

/*function clopage(){
	  var page=$("#page").val();
	   page(page);
}*/

function apply(){
	$.ajax({
		url:"applytopic.htm",
		dataType:"text",	
		type:'post',
		data:$("#applytopic").serialize(),
		async: false,
        error: function(request) {
            alert("Connection error");
        },
        success: function(result) {
        	if(result > 0){
        		cls1();
        		$("#message").html("申诉成功！");
				dia1(1);
        	}else{
        		cls1();
        		$("#message").html("申诉失败！");
				dia1(1);
        	}
	     }
	});
}
