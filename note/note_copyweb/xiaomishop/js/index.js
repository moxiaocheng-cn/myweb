/*购物车动画*/
/* 分析：
 *   开始一直控制的时a标前的hover,结果是不能控制.cart-menu的，因此直接控制.topbar-cart的hover即可
 *   掌握slideDown()/slideUp()两个效果的应用
 * 	   单纯使用这两个属性会出现Bug,当鼠标快速多次划入滑出时，动画停不下来
 *   解决：stop()
 * 思路2：
 * 	  $B.hide();
 *	  $A.hover(() => {
 *	    $B.fadeIn();
 *	  }, (e) => {
 *	    if (e.toElement == $B[0]) return;
 *	    $B.fadeOut();
 *	  });	  
 *	  $B.mouseout(function (e) {
 *	    if (e.toElement == $A[0]) return;
 *	    $(this).fadeOut();
 *	  })
 * 延伸： js 判断当前鼠标在哪个元素上
 * 	 var el = window.document.body;//声明一个变量，默认值为body
 *   window.document.body.onmouseover = function(event){
 *       el = event.target;//鼠标每经过一个元素，就把该元素赋值给变量el
 *       console.log('当前鼠标在', el, '元素上');//在控制台中打印该变量
 *   }
 */
/*写法二：*/
/*$(".topbar-cart > a").hover(function () {
	$(".cart-menu").stop().slideDown("normal");
	$(".topbar-cart > a").addClass("a-hover");
}, function () {
	$(".cart-menu").stop().slideUp(300);
	$(".topbar-cart > a").removeClass("a-hover");
});
$(".cart-menu").hover(function () {
	$(".cart-menu").stop().slideDown("normal");
	$(".topbar-cart > a").addClass("a-hover");
}, function () {
	$(".cart-menu").stop().slideUp(300);
	$(".topbar-cart > a").removeClass("a-hover");
});
*/
$(".cart-menu").hide();
$(".topbar-cart").hover(function () {
	$(".cart-menu").stop().slideDown("normal");
	$(".topbar-cart > a").addClass("a-hover");
}, function () {
	$(".cart-menu").stop().slideUp(300);
	$(".topbar-cart > a").removeClass("a-hover");
});


/*input搜索框动画*/
/* 分析：
 * 当鼠标移到任意一个input标签时，两个input标签的边框颜色都会发生改变；
 * 当鼠标移到input下面的div时，边框颜色仍处于改变后的状态；
 * 鼠标离开，颜色恢复；
 * --可以给css添加一个class:add样式，通过addClass()/removeClass()控制
 * --也可以直接通过css()，添加样式
 */
$(":input,div.search-hot-words").hover(function () {
	$(":input").addClass("add");
},function () {
	$(":input").removeClass("add");
});
$("input").focus(function () {
	$(":input").addClass("add-click");
	$(".search-hot-words").hide();
});
$("input").focusout(function () {
	$(":input").removeClass("add-click");
	$(".search-hot-words").show();
});


/*鼠标移上菜单动画效果*/
/* 分析： 
 * 当鼠标第一次移到(除了第一个和最后两个)任意一个a标签上时，执行：$(".nav-menu").slideDown("fast")，显示绑定数据;
 *  1.当鼠标从第一个a标签移到其他a标签(除了第一个和最后两个)上时，没有动画效果，只需更换数据；
 *  2.当鼠标从第一个鼠标移出时，执行：$(".nav-menu").slideUp("fast");
 * --each循环除了第一个和最后两个a标签的其余标签，
 * --当鼠标移到循环的a标签上时，判断如果display:none,执行slideDown()，绑定数据；否则，更换数据
 * --当鼠标移出循环的a标签时，首先赋值display:none,执行slideUp();
 * */
$(".down-menu").hide();
let $a = $("nav > .continer > ul > li > a:not(.nodown)"); //:not(selector) 去除所有与给定选择器匹配的元素
$a.each(function () {
	$(this).hover(function () {
		$(".down-menu").stop().slideDown("fast");
	}, function () {
		$(".down-menu").stop().slideUp("fast");
	});
	$(".down-menu").hover(function () {
		$(".down-menu").stop().slideDown("fast");
	}, function () {
		$(".down-menu").stop().slideUp("fast");
	});
})


/*侧边菜单鼠标效果*/
var $listLi = $(".continer > .banner > .list > li");// 获取li (如果获取a的话，不能使用.index()方法)
var $children = $(".continer > .banner > .children-col");// 获取弹出框
$children.hide();
$listLi.hover(function () {
	$(this).addClass("change");
	$children.show();
}, function () {
	$(this).removeClass("change");
	let i = $(this).index(); //搜索匹配的元素，并返回相应元素的索引值，从0开始计数。如果不给 .index() 方法传递参数，那么返回值就是这个jQuery对象集合中第一个元素相对于其同辈元素的位置。
	$children.hide().hover(function () {
		$children.show();
		$listLi.eq(i).addClass("change").siblings().removeClass("change");
	}, function () {
		$listLi.eq(i).removeClass("change");
		$children.hide();
	});
});

