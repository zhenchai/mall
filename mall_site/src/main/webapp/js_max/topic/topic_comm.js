var editor1;  
KindEditor.ready(function(K) { 
		editor1 = K.create('textarea[name="topicContent"]', {
	   items : [ 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',  'removeformat', '|',
	              'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',  'insertunorderedlist', '|', 
	              'emoticons','image','multiimage','link','flash'],
		cssPath : 'js/plugin/kindeditor/plugins/code/prettify.css',
		uploadJson : 'js/plugin/kindeditor/jsp/upload_json.jsp',
		allowFileManager : true,
		minHeight:500,
		minWidth:650,
		afterCreate : function() {
			var self = this;
			K.ctrl(document, 13, function() {
				self.sync();
				document.forms['example'].submit(); 
			});
			K.ctrl(self.edit.doc, 13, function() {
				self.sync();
				document.forms['example'].submit();
			});
		}
	});
	prettyPrint();
});


//发布话题
function pub(){
	var len=$("#topicTitle").val().length;
	var groupId=$("#groupId").val();
	 if(len==0){
	 	   $("#ab").html('<span style="color:red;">不能为空</span>');
		return ;
	 }
		editor1.sync();
		$.ajax({
			 url: "pubtopic.htm",   
			 data:$('#topic_form').serialize(),
			 type:'post',
	         success: function(result){
	    	  if(result=='-1'){
	       		$("#message").html("你已经发表过一个相同的标题，请更换标题再发！");
		      	dia1(1);
		  	  }else if(result=='-2'){
		  		$("#message").html("您在该小组发布话题，已经到达上限。");
		      	dia1(1);
		      }else if(result=='-5'){
		      		$("#message").html("话题内容请勿超过10000字。");
			      	dia1(1);
			  }else if(result!=''){
	      		window.location ="topicdetail/"+groupId+"-"+result+".html";
	       	  }else{
	      		$("#message").html("发布失败！");
	      		dia1(1);
	      	}
	     }   
	});
}

//修改话题
function savetopic(){  
	var groupId = $("#groupId").val();
	var topicId = $("#topicId").val();
	var len=$("#topicTitle").val().length;
	 if(len==0){
	 	   $("#ab").html('<span style="color:red;">不能为空</span>');
		return ;
	 }
	editor1.sync();
	$.ajax({
		url:'edittopic.htm', 
		type:'post',
		data:$('#topicForm').serialize(),
	    success: function(result){  
            if (result==1){  
            	 window.location.href = "topicdetail/"+groupId+"-"+topicId+".html";
            } else {  
		      		$("#message").html("话题内容请勿超过10000字。");
			      	dia1(1);
			  
            }  
        }
	});
}  
function length30(){
	var len=$("#topicTitle").val().length;
       if(len>30){
		   $("#ab").html("还可以输入0/30字"); 
       }else if(len==0){
    	   $("#ab").html('<span style="color:red;">不能为空</span>');
       }else{
    	  
    	   $("#ab").html("还可以输入"+parseInt(30-len)+"/30字");
       }
	
 }


function returns(){
	var groupId = $("#groupId").val();
	window.location = 'groupdetail/'+groupId+'.html';
}

