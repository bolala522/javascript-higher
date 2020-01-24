
document.addEventListener('gameStart',function () {
    console.log('加载音乐...');
    setTimeout(function () {
        console.log('加载完音乐');
        document.dispatchEvent(new Event('loadmusicSuccess'));
        //文档触发音乐加载完成后的自定义事件
    },1000)
});