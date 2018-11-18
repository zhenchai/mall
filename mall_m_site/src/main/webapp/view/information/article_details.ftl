<!DOCTYPE html>
<#assign basePath=request.contextPath>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <#if (info.keyword)?? && (info.keyword?length>0)>
		<meta name="Keywords" content="${info.keyword}-${(seo.meteKey)!''}">
	<#else>
		<meta name="Keywords" content="${(seo.meteKey)!''}">
	</#if>
	<#if (info.description)?? && (info.description?length>0)>
	<meta name="description" content="${info.description}-${(seo.meteDes)!''}">
	<#else>
	<meta name="description" content="${(seo.meteDes)!''}">
	</#if>
    <#if (sys.bsetName)??>
    	<title>${sys.bsetName}-${(info.title)!''}</title>
    	<input type="hidden" id="bsetName" value="${(sys.bsetName)!''}">
    	<input type="hidden" id="bsetDesc" value="${(sys.bsetDesc)!''}">
    <#else>
	    <title>${(seo.mete)!''}-${(info.title)!''}</title>
	    <input type="hidden" id="bsetName" value="${(seo.mete)!''}">
    	<input type="hidden" id="bsetDesc" value="${(sys.bsetDesc)!''}">
    </#if>

    <!-- Bootstrap -->
    <link href="${basePath}/css/bootstrap.min.css" rel="stylesheet">
    <link href="${basePath}/css/idangerous.swiper.css" rel="stylesheet">
    <link href="${basePath}/css/style.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]> 
      <script src="js/html5shiv.min.js"></script>
      <script src="js/respond.min.js"></script>
    <![endif]-->
   <script>if(myObj&&myObj.setHomeFlag){myObj.setHomeFlag('false');}</script></head>
  <body>
    
    <div class="article_title">
      <h4>${(info.title)!''}</h4>
    </div><!-- /article_title -->
    
    <div class="article_details">
      <div class="article_info">
        <span class="text-muted"><span class="glyphicon glyphicon-time"></span>
        	${((info.createDate)!'')?string("yyyy-MM-dd HH:mm:ss")}</span>&nbsp;&nbsp;
        <span class="text-muted">查看:${(info.hits)!''}</span>
      </div>
      <div class="article_cont">
      	${(info.content)!''}
      </div>
    </div>

    <div class="foot">
      <p>由${(mobSiteBasic.technicalSupport)!''}提供技术支持</p>
    </div><!-- /foot -->
    
    <#include "../common/smart_menu.ftl"/>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="${basePath}/js/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="${basePath}/js/bootstrap.min.js"></script>
    <script src="${basePath}/js/idangerous.swiper-2.1.min.js"></script>
    <script src="${basePath}/js/fastclick.min.js"></script>
    <script src="${basePath}/js/jquery.keleyi.js"></script>
    <script src="${basePath}/js/customer/wxforward.js"></script>
    <script src="${basePath}/js/publicModel.js"></script>
  </body>
</html>
