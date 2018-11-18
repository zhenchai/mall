var basePath = $("#basePath").val();
 function sendmessage(){
	 var customerId = $("#customerId").val();
	 if(customerId==null||customerId==''){
		 $("#message").html('您未登录,请<a href="'+basePath+'/login.html" style="color:blue;">登录</a>后操作！');
		 dia1(2);
		 return ;
	 }
	 dia1(1);
   }
 
 function dosendmessage(){
	 if($("#messageContent").val()==""){
		 return ;
	 }
	$.ajax({
		 type:'post',
		 url: basePath+"/sendmessage.htm",  
		 data:$('#sendForm').serialize(),
         success: function(result){  
             if (result==1){  
            	 $("#messageContent").val("");
            	 closeDialog();
            	 $("#message").html('发送成功');
	       			dia1(2);
           	 }else{      
	           	 $("#message").html('发送失败');
	       			dia1(2);
	        		return;
	             }  
           }  
	 });
 }
 
 function length300(){
	 var len=$("#messageContent").val().length;
       if(len>300){
		   $("#ab").html("还可以输0/300字"); 
       }else{
    	   $("#ab").html("还可以输"+parseInt(300-len)+"/300字");
       }
}

 function guanzhu(obj,flag){
	 if(flag ==''){
		addguanz(obj); 
	 }else{
		 changeguanz(obj);
	 }
 }
 
 function addguanz(obj){
	 $.ajax({
		 type:'post',
		 url: basePath+'/guanzhu.htm',
		 data: 'fansCustomerId='+obj,
		 success: function(msg){
      		if(msg==1){
      			window.location.reload();
      		}else{
      			window.location.href=basePath+"/login.html";
      			/*$("#message").html('您未登录,请<a href="login.html" style="color:blue;">登录</a>后操作！'); 
       			dia1(2);*/
      		}
      	 }   //操作成功后的操作！msg是后台传过来的值
	 });
 }
 
 function changeguanz(obj){
 $.ajax({
		 type:'post',
		 url:basePath+'/guanzhu.htm',
		 data: 'fansFlag=0&fansCustomerId='+obj,
		 success: function(msg){
      		if(msg==1){
      			window.location.reload();
      		}else{
      			window.location.href=basePath+"/login.html";
      			/*$("#message").html('您未登录,请<a href="login.html" style="color:blue;">登录</a>后操作！'); 
       			dia1(2);*/
      		}
      	 }   //操作成功后的操作！msg是后台传过来的值
	 });
 }
 
 function cancelguanzhu(obj){
	 $.ajax({
		 type:'post',
		 url:basePath+'/cancelguanzhu.htm',
		 data: 'fansFlag=1&fansCustomerId='+obj,
		 success: function(msg){
      		if(msg==1){
      			window.location.reload();
      		}else{
      			$("#message").html("取消失败"); 
       			dia1(2);
      		}
      	 }   //操作成功后的操作！msg是后台传过来的值
	 });
 }
 
 function cancelguanz(obj){
	 $.ajax({
		 type:'post',
		 url:'../cancelguanzhu.htm',
		 data: 'fansFlag=2&fansCustomerId='+obj,
		 success: function(msg){
			 if(msg==1){
				 window.location.reload();
			 }else{
				 $("#message").html("取消失败"); 
				 dia1(2);
			 }
		 }   //操作成功后的操作！msg是后台传过来的值
	 });
 }
 
   function fantofan(){
		var customerId=$("#customerId").val();   
		 window.location.href="../mymutual/"+customerId+"-2.html";
		}
	function fanto(){
		var customerId=$("#customerId").val();   
	    window.location.href="../mymutual/"+customerId+"-0.html";
	}
	function tofan(){
		var customerId=$("#customerId").val();     
		 window.location.href="../mymutual/"+customerId+"-1.html";
	}
 
 //批量取消关注
 function outallfans(){
	 var cid = $("#customerId").val();
	 var fansFlag = $("#fansFlag").val();
	 if(cid==null||cid==''){
		 window.location.href="../login.html";
	 }
	 var dlflag=false;
	 var checkboxs = document.getElementsByName("customerIds");
	 for ( var i = 0; i < checkboxs.length; i++) {
	 	var e = checkboxs[i];
	 	if(e.checked==true){
	 		dlflag=true;
	 	}
	 }
	 if(dlflag){
	  $('#fansForm').form('submit',{  
	       url: "../outallfans.htm",  
	       success: function(result){  
	           if (result==1){  
	         	 	$("#message").html('取消成功');
	   			dia1(2);
	        		window.location.href="../mymutual/"+cid+"-"+fansFlag+".html";
	         	} else if (result=-1){  
	          	$("#error").show();
	         	} else{   
	 	           	 $("#message").html('取消失败');
	   			dia1(2);
	           }  
	       }  
	   });  
	 }else{
	 	 $("#message").html('请选择');
	 			dia1(2);
	 }
  }
 
 //分页
 function page(page){
		$("#page").val(page);
		$("#group_page_form").submit();
}
 
 function closeDialog(){
		$(".dialog").fadeOut();
		$(".mask").fadeOut();
	};