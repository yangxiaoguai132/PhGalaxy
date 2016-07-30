var main=get("#template_main"),
    ctrl=get("#template_ctrl"),
    tpl_main=main.innerHTML.replace("/^\s*/","").replace("/\s*$/",""),
    tpl_ctrl=ctrl.innerHTML.replace("/^\s*/","").replace("/\s*$/","");
/*添加事件*/
function addHandler(ele,type,handler){
	if(ele.addEventListener){
		addHandler=function(ele,type,handler){
			ele.addEventListener(type,handler,false);
		};
	}else if(ele.attachEvent){
		addHandler=function(ele,type,handler){
			ele.attachEvent("on"+type,handler);
		};
	}else{
		addHandler=function(ele,type,handler){
			ele["on"+type]=handler;
		};
	}
	addHandler(ele,type,handler);
}
/*获取DOM元素*/
function get(str){
	if(str.indexOf(".")>-1){//返回所有的类
		return document.querySelectorAll(str);
	}else if(str.indexOf("#")>-1){//返回id
		return document.querySelector(str);
	}else{
		return document.getElementsByTagName(str);//返回标签名
	}
}
/*初始化*/
function init(){
	var as=get(".title"),
	    as1=get(".tips"),
	    as1_len=as1.length,
	    a_len=as.length;

	for(var i=0;i<as1_len;i++){
		(function(i){
			addHandler(as1[i],"click",function(event){
			    var e=event||window.event,
			        target=e.target||e.srcElement,
			        list_active=get(".active");
			    //小tips的切换
			    if(list_active.length==0){
			    	target.parentNode.className="active";
			    }else{
			    	list_active[0].className=list_active[0].className.replace("active","");
			        target.parentNode.className="active";
			    }
		    	if(images.hasOwnProperty(i.toString())){
		    		var n=images[i][0].img;
		    		addPic(images[i]);
		    		switchPic(n);
		    	}
		    });
		})(i);
	}
}
/*添加图片*/
function addPic(datam){
	var out_main=[],
	    out_ctrl=[];
	for(j in datam){
		var _html_main=tpl_main.replace(/{{index}}/g,datam[j].img);
		var _html_ctrl=tpl_ctrl.replace(/{{index}}/g,datam[j].img);
		out_main.push(_html_main);
		out_ctrl.push(_html_ctrl);
	}
	main.innerHTML=out_main.join("");
	ctrl.innerHTML=out_ctrl.join("");
	main.style.height=datam[0].height+"px";
}
/*切换pic*/
function switchPic(n){
	var main=get("#main_"+n),
	    ctrl=get("#ctrl_"+n);
	    clear_main=get(".main-i"),
	    clear_ctrl=get(".ctrl-i"),
	    len=clear_ctrl.length;
	 for(var i=0;i<len;i++){
	 	clear_main[i].className=clear_main[i].className.replace(" main-i_active","");
	 	clear_ctrl[i].className=clear_ctrl[i].className.replace(" ctrl-i_active","");
	 }
	 main.className+=" main-i_active";
	 ctrl.className+=" ctrl-i_active";
	 setTimeout(function(){
		movePictures();
	 },100);
}
function movePictures(){
	var pictures=get(".picture");
	for(i=0;i<pictures.length;i++){
		pictures[i].style.marginLeft=(-1 * pictures[i].width/2)+"px";
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
window.onload=function(){
	init();
	highlight();
	addPic(data0);
	switchPic(1);
}