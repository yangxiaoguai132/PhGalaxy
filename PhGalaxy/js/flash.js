function get(str){
	if(str.indexOf(".")>-1){//返回所有的类
		return document.querySelectorAll(str);
	}else if(str.indexOf("#")>-1){//返回id
		return document.querySelector(str);
	}else{
		return document.getElementsByTagName(str);//返回标签名
	}
}
function highlight(){
	var list_nav=document.getElementsByTagName("nav"),
	    list_a=list_nav[0].getElementsByTagName("a"),
	    len_a=list_a.length;
	//for(var i=0;i<len_a;i++){
		var linkurl;
		for(var i=0;i<len_a;i++){
			linkurl=list_a[i].getAttribute("href");
			if (window.location.href.indexOf(linkurl) != -1) {
		        list_a[i].className = "here";
            }
		}
	//}
}
$(function(){
	var tip=$("#tip"),
	    flashAndCtrl=$("#flashAndCtrl"),
	    videocontainer=$("#videocontainer"),
	    video=get("#video"),
	    rngVoice=$("#rngVoice"),
	    ctrlbuttons=$("#ctrlbuttons"),
	    intInterval,
	    widthinit,
        playrate = video.playbackRate,//播放速率
        speed=1;

	$("#ctrlbuttons input[type='button']").each(function(i){
		$(this).bind("click",function(){
			switch(i){
				/*慢放键*/
				case 0:
			    if(!video.paused){
			    	playrate-=0.1;
			    	if(playrate<0){
			    		playrate=0;
			    	}
			    speed=Math.round(playrate*100)/100;
			    tip.html("慢放速率：" + speed * 100 + "%");
			    }
			    break;
			    /*播放键*/
			    case 1:
			    if(video.paused){
			    	video.play();
			    	tip.html("正在播放");
			    	video.playrate=speed;
			    	$(this).attr("class","btn-pause");
			    }else{
			    	video.pause();
			    	tip.html("暂停播放");
			    	$(this).attr("class","btn-play");
			    }
			    break;
			    /*快进键*/
			    case 2:
			    if(!video.paused){
			    	playrate+=0.1;
			        speed=Math.round(playrate*100)/100;
			    }
			    tip.html("快放速率：" + speed * 100 + "%");
			    break;
                /*取消静音*/
                case 3:
                tip.html("取消静音");
                video.muted=false;
                $("#btnMin").removeClass("focus");
                rngVoice.removeAttr("disabled");
                $(this).addClass("focus");
                break;
                /*恢复静音*/
                case 4:
                tip.html("静音");
                video.muted=true;
                 $("#btnMax").removeClass("focus");
                rngVoice.attr("disabled","true");
                $(this).addClass("focus");
                break;
			}
		});
	});
    
    $("#rngVoice").bind("change",function(){
    	video.volume=$(this).val();
    	tip.html("音量：" + $(this).val() * 100 + "%");
    });
    $(".tips:first").bind("click", function(){
    	$(this).parent().attr("class","active");
    	$(this).parent().next().removeAttr("class");
    	video.setAttribute("width","720");
    	widthinit=(-1)*(video.getAttribute("width")/2);
    	videocontainer.css("marginLeft",widthinit);
    	flashAndCtrl.css("height","640");
    	ctrlbuttons.css("marginLeft",widthinit);
    	video.setAttribute("src","video/cat.mp4");
    });
    $(".tips:last").bind("click", function(){
    	$(this).parent().attr("class","active");
    	$(this).parent().prev().removeAttr("class");
		video.setAttribute("width","800");
    	widthinit=(-1)*(video.getAttribute("width")/2);
    	videocontainer.css("marginLeft",widthinit);
    	flashAndCtrl.css("height","460");
    	ctrlbuttons.css("marginLeft",widthinit);
    	video.setAttribute("src","video/xuanxuan.mp4");
	});

	$("#video").bind("timeupdate", function() {
        video.playbackRate = speed;
    }).bind("ended", function() {
        tip.html("播放结束");
        $("#btnPlay").attr("class", "btn-play");
        speed = 1;
        playrate = speed;
        video.currentTime = 0;
    });
    TipInterval = setInterval(function() {
        tip.html("");
    }, 5000);
  
    $(".tips:first").click();
    highlight();

});