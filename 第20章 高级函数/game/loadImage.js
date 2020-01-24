
document.addEventListener('gameStart',function () {
    console.log('加载图片...');
    setTimeout(function () {
        console.log('成功加载图片');
        document.dispatchEvent(new Event('loadimgSucess'));
        //文档触发图片加载完的自定义事件
    },1000);
});