
var b=document.querySelector('#b');
//document绑定自定义事件 具体的行为
document.addEventListener('clickA',function (event) {
    b.innerHTML='B上触发了自定义事件';
});