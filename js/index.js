$(".nav")
    .click(function () {
        if ($(".list").css("visibility") == "hidden") {
            $(".list").css({"z-index": "2", "visibility": "visible"});
        } else {
            $(".list").css({"z-index": "-1", "visibility": "hidden"});
        }
    });

$('.list').on('click','div',function(){  
    $(this).addClass("bg").siblings().removeClass("bg");  
});   

var isAnimated = false;
$(document).ready(function(){
    //on() 添加监听  "所要监听的事件" function(){}当监听到事件后执行的方法
    $(window).on("scroll",function(){
        //this代表window scrollTop()向上滑动的距离
        if($(this).scrollTop() >= 80){
            $(".box").addClass("fixedhd");
            //如果动画执行过
            if(!isAnimated){
                $(".box").css("top","-5rem"); //每次要执行动画之前都需要设置top值
                $(".box").stop().animate({"top":"0"},1000); //需要stop()停止动画
                isAnimated = true;
            }
            console.log(2)
        }else{
            isAnimated = false;
            $(".box").removeClass("fixedhd");
            console.log(1)
        }
    })
});