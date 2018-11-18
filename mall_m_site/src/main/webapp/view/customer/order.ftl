<!DOCTYPE html>
<html lang="zh-cn">
<head>
<#assign basePath=request.contextPath>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="keywords" content="${seo.meteKey}">
    <meta name="description" content="${seo.meteDes}">
<#if (sys.bsetName)??>
    <title>我的订单-${(sys.bsetName)!''}</title>
    <input type="hidden" id="bsetName" value="${(sys.bsetName)!''}">
    <input type="hidden" id="bsetDesc" value="${(sys.bsetDesc)!''}">
<#else>
    <title>我的订单-${(seo.mete)!''}</title>
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
    <script src="${basePath}/js/html5shiv.min.js"></script>
    <script src="${basePath}/js/respond.min.js"></script>
    <![endif]-->

    <style>
        <!--.mn_sel {display:inline-block;zoom:1;*display:inline;border:1px solid #ddd;width:205px;height:25px;line-height:25px;padding:0 5px;vertical-align:middle;background:url(${basePath}/images/area_arrow.gif) no-repeat 195px center;}
        .selCont {width:300px;min-height:50px;border:1px solid #ddd;padding:5px 10px;margin-top:-4px;display:none;}
        .selCont label {display:inline-block;zoom:1;*display:inline;width:145px;margin:0 10px 10px 0;font-size: 10px;font-weight:normal;}
        .mr5{margin-right:5px;}
        .mr10{margin-right:10px;}
        .vm{vertical-align:middle;}-->
        .sel_txa {width:340px;height:100px;padding:5px;border:1px solid #ddd;margin-top:5px;}
    </style>
 <script>if(myObj&&myObj.setHomeFlag){myObj.setHomeFlag('false');}</script> <script>if(myObj&&myObj.setHomeFlag){myObj.setHomeFlag('false');}</script></head>
<body style="background:#efefef;">
<input type="hidden" value="${basePath}" id="basePath">
<#include "../publicHeader2_ftl.ftl" />
<div class="order_filter" style="width:100%;position: fixed;margin-top:0;z-index: 10;background-color: #fff;">
    <ul>
        <li <#if (!type?? || type == '5') >class="current"</#if> data-val="5"><a href="javascript:">全部</a></li>
        <li <#if (type?? && type == '0')>class="current"</#if> data-val="0"><a href="javascript:">未付款</a></li>
        <li <#if (type?? && type == '2')>class="current"</#if> data-val="2"><a href="javascript:">待发货</a></li>
        <li <#if (type?? && type == '3')>class="current"</#if> data-val="3"><a href="javascript:">待收货</a></li>
        <li <#if (type?? && type == '4')>class="current"</#if> data-val="4"><a href="javascript:">待评价</a></li>
    </ul>
</div>
<div class="order_list" style="margin-top: 40px;">
<#if (pb.list?size!=0)>
    <#list pb.list as order>
        <#assign cFlag=0 />
        <div class="order_item">
            <div class="order_title">
                <#list order.goods as good>
                    <#if good.evaluateFlag== '0'>
                        <#assign cFlag=cFlag+1 />
                    </#if>
                </#list>
                <span class="status pull-right">
							<#--<#if order.orderStatus??>
								<#if order.orderStatus=="0">
									未付款
								<#elseif (order.orderStatus=="1" | order.orderStatus=="5" | order.orderStatus=="6") >
									待发货
								<#elseif order.orderStatus=="2">
									待收货
								<#elseif (order.orderStatus=="3" & cFlag>0) >
	                            	待评价
								<#elseif order.orderStatus=="3">
									已完成
								<#elseif (order.orderStatus=="4") >
									已取消
                                <#elseif order.orderStatus=="7">
                                    退货审核中
                                <#elseif order.orderStatus=="8">
                                    同意退货
                                <#elseif order.orderStatus=="9">
                                    拒绝退货
                                <#elseif order.orderStatus=="10">
                                    待商家收货
                                <#elseif order.orderStatus=="11">
                                    退货结束
                                <#elseif order.orderStatus=="12">
                                    退款审核中
                                <#elseif order.orderStatus=="13">
                                    拒绝退款
                                <#elseif order.orderStatus=="14">
                                    已提交退货审核
                                <#elseif order.orderStatus=="16">
                                    商家收货失败
                                <#elseif order.orderStatus=="17">
                                    已退款
								</#if>
							</#if>-->
                                <#if order.orderStatus??>
                                    <#if order.orderStatus=="0">
                                        <#if order.orderLinePay=="0">
                                            待发货
                                        <#else>
                                            待付款
                                        </#if>
                                    <#elseif (order.orderStatus=="1" || order.orderStatus=="5" || order.orderStatus=="6") >
                                        已付款未发货
                                    <#elseif order.orderStatus=="2">
                                        <#if order.orderExpressType??&&order.orderExpressType=='1'>
                                            待自提
                                        <#else>
                                            已发货
                                        </#if>
                                    <#elseif order.orderStatus=="3">
                                        已完成
                                    <#elseif order.orderStatus=="4">
                                        已取消
                                    <#elseif order.orderStatus=="7">
                                        退货审核中
                                    <#elseif order.orderStatus=="8">
                                        同意退货
                                    <#elseif order.orderStatus=="9">
                                        拒绝退货
                                    <#elseif order.orderStatus=="10">
                                        待商家收货
                                    <#elseif order.orderStatus=="11">
                                        退货结束
                                    <#elseif order.orderStatus=="15">
                                        退款审核中
                                    <#elseif order.orderStatus=="13">
                                        拒绝退款
                                    <#elseif order.orderStatus=="14">
                                        已提交退货审核
                                    <#elseif order.orderStatus=="16">
                                        商家收货失败
                                    <#elseif order.orderStatus=="17">
                                        已退款
                                    <#elseif order.orderStatus=="18">
                                        退款成功
                                    </#if>
                                </#if>
			          </span>
                <h4>订单号：${order.orderNo}</h4>
            </div>
            <#assign cFlag=0 />
            <#list order.goods as good>

                <#if good.evaluateFlag== '0'>
                    <#assign cFlag=cFlag+1 />
                </#if>
                <#if (good_index + 1<=2)>
                    <div class="order_good">
                        <a href="${basePath}/customer/detail-${order.orderId}.html">
                            <img width="50" height="50" title="${(good.goodsName)!''}" alt="${(good.goodsName)!''}" src="${(good.goodsImg)!''}" />
                            <h5 class="name"><span style="display:block;height:37px;overflow:hidden;">${good.goodsName!''}</span>
                            <#--<small>
                                <#if (good.specVo??)>
                                  <#list good.specVo as spec>
                                      <#if spec_index=0>
                                          <#if spec.spec.specName??&&spec.spec.specName == '.'><#else>${spec.spec.specName!''}:${spec.specValueRemark!''}</#if>
                                      </#if>
                                  </#list>
                              </#if>
                            </small>--></h5>
                            <p class="pull-right text-right">
                                <strong style="color:#f6ab00;font-size:18px;">￥<#if good.goodsPrice??>
                                ${good.goodsPrice?string('0.00')}
                                </#if> </strong><br>
                                <span class="light">数量：${good.goodsNum}</span>
                            </p>
                        </a>
                    </div>
                </#if>
                <#if (good_index + 1>2)>
                    <div class="order_good none">
                        <a  href="${basePath}/customer/detail-${order.orderId}.html">
                            <img width="50" height="50" title="${(good.goodsName)!''}" alt="${(good.goodsName)!''}" src="${(good.goodsImg)!''}" />
                            <h5 class="name"><span style="display:block;height:37px;overflow:hidden;">${good.goodsName!''}</span>
                                <small>
                                    <#if (good.specVo??)>
                                        <#list good.specVo as spec>
                                            <#if spec_index=0>
                                                <#if spec.spec.specName??&&spec.spec.specName == '.'><#else>${spec.spec.specName!''}:${spec.specValueRemark!''}</#if>
                                            </#if>
                                        </#list>
                                    </#if>
                                <#--规格：12个装-->
                                </small></h5>
                            <p class="pull-right text-right">
                                <strong style="color:#f6ab00;font-size:18px;">￥
                                    <#if good.goodsPrice??>
                                    ${good.goodsPrice?string('0.00')}
                                    </#if>
                                </strong><br>
                                <span class="light">数量：${good.goodsNum}</span>
                            </p>
                        </a>
                    </div>
                </#if>
            </#list>
            <div class="mesBoxCol">
                <#if (order.goods?size>2)>
                    <a class="more_order_goods" href="javascript:">显示其余的${order.goods?size-2}件商品</a>
                </#if>
                <div class="order_goods_total">
                    <p class="rt">实付:<strong>￥
                        <#if order.moneyPaid??>
                        ${order.moneyPaid?string('0.00')}
                        </#if>
                    </strong></p>
                    <p>运费:<strong>￥<#if order.shippingFee??> ${(order.shippingFee)?string('0.00')} <#else>0.00</#if></strong></p>
                    <p class="lt">共<strong>${order.goods?size}</strong>件商品</p>
                </div>
            </div>

            <div class="order_operate text-right orderBox">
                <#if order.orderStatus??>
                    <#if order.orderStatus=="0"&&order.payId==1>
                        <#--<a href="javascript:" class="btn btn-default" onClick="cancelOrder('${basePath}/customer/cancelorder-myorder-${order.orderId}.html')">取消订单</a>-->
                        <a href="javascript:" class="btn btn-default cancel" orderid="${order.orderId}">取消订单</a>
                        <a href="${basePath}/GetPayType2.htm?orderId=${order.orderId}" class="btn btn-warning">立即支付</a>
                    <#elseif (order.orderStatus=="1" || order.orderStatus=="5" || order.orderStatus=="6") >
                        <a href="${basePath}/customer/detail-${order.orderId}.html" class="btn btn-default">查看订单</a>
                    <#elseif (order.orderStatus=="2")>
                    <#--<a href="member_orders_express.ftl" class="btn btn-default">查看物流</a>-->
                        <a href="javascript:" class="btn btn-warning" onClick="comfirmgoods('${basePath}/customer/comfirmofgoods-myorder-${order.orderId}.html')">确认收货</a>
                    <#elseif (order.orderStatus=="3" && cFlag>0)>
                    <#--<a href="member_orders_express.ftl" class="btn btn-default">查看物流</a>-->
                        <#--<a class="btn btn-default">售后|退货</a>-->
                        <a  href="${basePath}/comment-${order.orderId}.html" class="btn btn-default" style="background:#F6AB00;border:1px solid #F6AB00;color:#fff;">去评价</a>
                    <#elseif (order.orderStatus=="3") >
                        <a href="${basePath}/customer/detail-${order.orderId}.html" class="btn btn-default">查看订单</a>
                    <#elseif (order.orderStatus=="4") >
                        <a href="${basePath}/customer/detail-${order.orderId}.html" class="btn btn-default">查看订单</a>
                    <#elseif (order.orderStatus=="15") >
                        <a href="${basePath}/customer/detail-${order.orderId}.html" class="btn btn-default">退货信息</a>
                    </#if>
                </#if>
            </div>
            <div class="bottomBg"></div>
        </div>
    </#list>
<#else>
    <div style="width:100%;text-align:center;margin-top:20px;font-size:16px;">
        <img src="${basePath}/images/no-pros.png" style="width:50%;"/>
        <br>
        暂无！
    </div>
<#--<h5 style="color:grey;text-align:center;margin:0;line-height:5em;">暂无订单！</h5>-->
</#if>
</div><!-- /order_list -->

<div class="foot">
    <p>由${(mobSiteBasic.technicalSupport)!''}提供技术支持</p>
</div><!-- /foot -->

<div class="cancelOrder dis">
    <div class="indent">
        <p class="indent-img"><img src="${basePath}/images/qp_cxcg0.png"></p>
        <input type="hidden" id="canorder">
        <p class="indent-p1">
            <span>确定取消订单吗？</span><br/>
            取消后，订单将不能被找回
        </p>
        <p class="indent-p2">
            <button class="indent-btn1" onClick="changeUrl(123);">确定</button>
            <button class="indent-btn2 cancelBtn">取消</button>
        </p>
    </div>
</div>

<div class="modal fade" role="dialog" id="confirm_order">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">商城消息</h4>
            </div>
            <div class="modal-body">
                <p>确定确认收货吗？小心钱货两空哦！</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="comfirmGoodsSucc()">确定</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="${basePath}/js/jquery.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="${basePath}/js/bootstrap.min.js"></script>
<script src="${basePath}/js/fastclick.min.js"></script>
<script src="${basePath}/js/idangerous.swiper-2.1.min.js"></script>
<script src="${basePath}/js/jquery.keleyi.js"></script>
<script src="${basePath}/js/customer/memberorder.js?v=201606091300"></script>
<script src="${basePath}/js/customer/wxforward.js"></script>
<script src="${basePath}/js/publicModel.js"></script>
<script>
	   $(document).ready(function(){
		    jQuery.fn.isChildAndSelfOf = function(b){ return (this.closest(b).length > 0); };
		    $(".mn_sel").click(function(){
		    	$(this).next(".selCont").show();
		    	$(".sel_txa").hide();
		    	$(".err_tip").hide();
		    	$(".input_tip").hide();
		    	$(document).click(function(event){
					if(!$(event.target).isChildAndSelfOf(".mn_sel, .selCont")) {
						$(".selCont").hide();
						if( $("#other_yy").prop("checked")){
							$(".sel_txa").show();
						}
					};
				});
		    });
		    $(".selCont input").click(function(){
		    	$(".mn_sel").html($(this).val());
		    	$("#rea_hid").val($(this).val());
		    	$(".selCont").hide();
		    	$(".sel_txa").hide();
		    });
		    $("#other_yy").click(function(){
		    	$(".sel_txa").show();
		    });
		});
	</script>
<script>
    $(function(){
        $(".cancel").bind("click",function(){
            $(".cancelOrder").show();
            $("#canorder").val($(this).attr("orderid"));
        });
        $(".cancelBtn").click(function(){
            $(".cancelOrder").hide();
            $("#canorder").val("");
        });
    })
</script>
</body>
</html>
