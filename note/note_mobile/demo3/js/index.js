var mySwiper = new Swiper('.swiper-container', {
	direction: 'vertical',
	loop: true,
	// 如果需要分页器
	pagination: '.swiper-pagination',
	paginationType: 'progress',
	// effect : 'flip',
	// flip: {
	//     slideShadows : true,
	//     limitRotation : true,
	// },

	onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
		swiperAnimateCache(swiper); //隐藏动画元素
		swiperAnimate(swiper); //初始化完成开始动画
	},
	onSlideChangeEnd: function(swiper) {
		swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	}
});

var musicAudio = document.getElementById("musicAudio");
var mus = document.getElementById("mus");
mus.addEventListener("click", function() {
	if(musicAudio.paused) {
		musicAudio.play();
		mus.classList.add("seclect");
		// return
	} else {
		musicAudio.pause();
		mus.classList.remove("seclect");
	}
});
var flag;
function commit() {
	//  console.log(1);
	//  console.log($('#form1').serializeArray());
	//  $.ajax({
	//      //几个参数需要注意一下
	//      type: "POST",//方法类型
	//      dataType: "jsonp",//预期服务器返回的数据类型
	//      contentType:"application/json",
	//      url: "http://h5.juzhouyun.com/excel/user" ,//url
	//      data: JSON.stringify($('#form1').serializeArray()),
	//      success: function (result) {
	//          console.log(result);//打印服务端返回的数据(调试用)
	//          if (result.code == 200) {
	//              alert("SUCCESS");
	//          }
	//      },
	//      error : function() {
	//          alert("异常！");
	//      }
	//  });

	var name = $('#username').val();
	var company = $('#company').val();
	var mobile = $('#mobile').val();
	var email = $('#email').val();
	if(name == '') {
		layer.msg('请输入姓名')
	} else if(company == '') {
		layer.msg('请输入公司地址')
	} else if(mobile == '') {
		layer.msg('手机号码不能为空');
	} else if(!$mc.isPhone(mobile)) {
		layer.msg("您输入的手机号码格式不正确");
	} else if(!$mc.isEmail(email)) {
		layer.msg('请输入正确的邮箱');
	} else {
		if(!flag){
			$.ajax({
			type: "post",
			url: "http://h5.juzhouyun.com/excel/user",
			async: true,
			data: {
				username: name,
				company: company,
				mobile: mobile,
				email: email,
			},
			success: function(res) {
				alert('提交成功');
				$("input").val("")
				flag=true;
			},
			error: function(res) {
				alert(res.data)
			}
		});
		}else{
			alert("请不要重复提交!");
		}
		
	}

}
$("#btn").on("click", commit);

$mc = {
	isPhone: function(mobile) {
		var reg = /^1[3|4|5|7|8]\d{9}$/;
		if(reg.test(mobile)) return true; //正确的手机号
		else return false; //错误的手机号
	},
	isEmail: function(email) {
		var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if(reg.test(email)) return true; //正确的邮箱地址
		else return false; //错误的邮箱地址
	},
	sesstion: {
		Set: function(name, value) {
			sessionStorage.setItem(name, value)
		},
		Get: function(name) {
			return sessionStorage.getItem(name)
		},
		Del: function(name) {
			sessionStorage.removeItem(name);
		}
	},
	local: {
		Set: function(name, value) {
			localStorage.setItem(name, value);
		},
		Get: function(name) {
			return localStorage.getItem(name);
		},
		Del: function(name) {
			localStorage.removeItem(name);
		}
	},
	getQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	},
}
