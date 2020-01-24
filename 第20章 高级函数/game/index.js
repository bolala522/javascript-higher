
var start=document.querySelector('#start');
start.addEventListener('click',function () {
    document.dispatchEvent(new Event('gameStart'));
    //文档触发自定义事件
},false);