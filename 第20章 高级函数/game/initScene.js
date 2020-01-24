
document.addEventListener('loadimgSucess',function () {
    console.log('使用图片创建场景...');
    setTimeout(function () {
        console.log('场景创建完成');
    },2000)
});

document.addEventListener('loadmusicSuccess',function () {
    console.log('创建音效...');
    setTimeout(function () {
        console.log('音效创建完成');
    },1000)
});