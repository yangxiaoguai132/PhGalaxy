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
	highlight();
}