 //分页
 function page(page){
		$("#page").val(page);
		document.group_page_form.submit();
}
	

 function sendMsg(){
 	var n = $(".selected_list").find("li").length;
 	if(n == 0){
 	  	$("#message").html("请选择发送对象！");
 		dia1(1);
 		return ;
 	}
 $.ajax({
	 url: 'invitefriend.htm',  
	 data:$('#inviteForm').serialize(),
     onSubmit: function(){  
         return $(this).form('validate');  
     },  
     success: function(result){
         if (result>0){
         	$("#message").html("消息发送成功！");
     		dia1(1);
     		$("#tmsg").val('');
         } else {  
         	$("#message").html("消息发送失败！");
     		dia1(1);
         }   
     }   
 });	
 	
/* $('#inviteForm').form('submit',{  
     url: 'invitefriend.htm',  
     onSubmit: function(){  
         return $(this).form('validate');  
     },  
     success: function(result){
         if (result>0){
         	$("#message").html("消息发送成功！");
     		dia1(1);
     		$("#tmsg").val('');
         } else {  
         	$("#message").html("消息发送失败！");
     		dia1(1);
         }   
     }  
 });*/
}