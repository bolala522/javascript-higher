//调色板
var Colors={
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xf5986e,
    brownDark:0x23190f,
    blue:0x68c3c0
};
var mousePos={X:0,y:0};
//load事件
window.addEventListener('load',init,false);
//初始函数
function init() {
    createScene(); //创建场景 相机 渲染器
    createLights(); //添加光源
    createPlane(); //飞机
    createSea(); //海面
    createSky(); //天空
    loop(); //循环渲染
    window.addEventListener
    ('mousemove',handleMouseMove,false);//鼠标监听
}
//创建场景
function createScene() {
    Height=window.innerHeight;
    Width=window.innerWidth;
    scene=new THREE.Scene();
    scene.fog=new THREE.Fog(0xf7d9aa,100,950);//开启雾

    camera=new THREE.PerspectiveCamera(45,Width/Height,1,1000);
    camera.position.x=0;
    camera.position.y=200;
    camera.position.z=100;
    camera.lookAt(0,0,0);

    renderer=new THREE.WebGLRenderer({
        alpha:true,//开启半透明
        antialias:true//开启抗锯齿
    });
    renderer.setSize(Width,Height);//渲染尺寸
    renderer.shadowMap.enabled=true;//打开阴影

    //将渲染器的DOM插入到#world中
    container=document.querySelector("#world");
    container.appendChild(renderer.domElement);

    //尺寸变化更新设置
    window.addEventListener('resize',handleWindowResize,false);

    function handleWindowResize() {
        Height=window.innerHeight;
        Width=window.innerWidth;
        renderer.setSize(Width,Height);
        camera.aspect=Width/Height;//窗口纵横比
        camera.updateProjectionMatrix();//更新投射矩阵
    }
}
//创建光源
function createLights() {
    //添加半球光
    hemisphereLight=new THREE.HemisphereLight(0xaaaaaa,0x000000,1);
    //添加平行光
    shadowLight=new THREE.DirectionalLight(0xffffff,0.9);
    shadowLight.position.set(150,350,350);//设置方向
    shadowLight.castShadow=true;//开启阴影
    //计算方向性阴影
    shadowLight.shadow.camera.left=-400;
    shadowLight.shadow.camera.right=400;
    shadowLight.shadow.camera.top=400;
    shadowLight.shadow.camera.bottom=-400;
    shadowLight.shadow.camera.near=1;
    shadowLight.shadow.camera.far=1000;
    //定义阴影分辨率
    shadowLight.shadow.mapSize.width=5048;
    shadowLight.shadow.mapSize.height=5048;
    //光源添加到场景
    scene.add(hemisphereLight);
    scene.add(shadowLight);
}
//创建飞机
function AirPlane() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "airPlane";
    // 创建驾驶舱
    var geomCockpit = new THREE.BoxGeometry(60,50,50,1,1,1);
    var matCockpit = new THREE.MeshPhongMaterial({
        color:Colors.red, shading:THREE.FlatShading});
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);
    // 创建引擎
    var geomEngine=new THREE.BoxGeometry(20,50,50,1,1,1);
    var matEngine = new THREE.MeshPhongMaterial({
        color:Colors.white, shading:THREE.FlatShading});
    var engine=new THREE.Mesh(geomEngine,matEngine);
    engine.castShadow=true;
    engine.receiveShadow=true;
    engine.position.x=40;
    this.mesh.add(engine);
    // 创建机尾
    var geomTailPlane=new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    var matTailPlane = new THREE.MeshPhongMaterial({
        color:Colors.red, shading:THREE.FlatShading});
    var tailPlane=new THREE.Mesh(geomTailPlane,matTailPlane);
    tailPlane.castShadow=true;
    tailPlane.receiveShadow=true;
    tailPlane.position.set(-35,25,0);
    this.mesh.add(tailPlane);
    // 创建机翼
    var geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
    var matSideWing = new THREE.MeshPhongMaterial({
        color: Colors.red,
        shading: THREE.FlatShading
    });
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);
    // 创建螺旋桨
    var geomPropeller=new THREE.BoxGeometry(20,10,10,1,1,1);
    var matPropeller=new THREE.MeshPhongMaterial({
        color:Colors.brown,
        shading:THREE.FlatShading
    });
    this.propeller=new THREE.Mesh(geomPropeller,matPropeller);
    this.propeller.castShadow=true;
    this.propeller.receiveShadow=true;
    this.propeller.position.set(50,0,0);
    this.mesh.add(this.propeller);
    // 添加桨叶
    var geomBlade=new THREE.BoxGeometry(1,100,20,1,1,1);
    var matBlade=new THREE.MeshPhongMaterial({
        color:Colors.brownDark,
        shading:THREE.FlatShading
    });
    var blade=new THREE.Mesh(geomBlade,matBlade);
    blade.position.set(8,0,0);
    blade.castShadow=true;
    blade.receiveShadow=true;
    this.propeller.add(blade);
}
function createPlane() {
    airplane = new AirPlane();
    airplane.mesh.scale.set(.25,.25,.25);
    airplane.mesh.position.y = 200;
    airplane.mesh.position.x = 0;
    airplane.mesh.position.z = -50;
    airplane.mesh.rotation.x=0.01;
    scene.add(airplane.mesh);
}
//创建大海
function Sea() {
    //创建圆柱模拟大海
    var geom=new THREE.CylinderGeometry(600,600,800,40,10);
    //应用矩阵变换，绕x旋转90度
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    geom.mergeVertices();

    //材质
    var mat=new THREE.MeshPhongMaterial({
        color:Colors.blue,
        transparent:true,
        opacity:0.8,
        shading:THREE.FlatShading//平面着色
    });

    this.mesh=new THREE.Mesh(geom,mat);//创建网格
    this.mesh.receiveShadow=true;//接受阴影
}
function createSea() {
    sea=new Sea();//实例化大海
    sea.mesh.position.y = -500;
    scene.add(sea.mesh);
}
//创建云团
function Cloud() {
    this.mesh=new THREE.Object3D();//空容器
    var geom=new THREE.BoxGeometry(20,20,20);
    var mat=new THREE.MeshPhongMaterial({
        color: Colors.white
    });
    var newBloc=2+Math.floor(Math.random()*2);
    for (var i=0;i<newBloc;i++){
        var m=new THREE.Mesh(geom,mat);
        m.position.x=i*15;
        m.position.y=Math.random()*10;
        m.position.z=Math.random()*10;
        m.rotation.y=Math.PI*2*Math.random();
        m.rotation.z=Math.PI*2*Math.random();
        var s=Math.random()*0.9+0.1;
        m.scale.set(s,s,s);
        this.mesh.add(m);
        m.castShadow=true;
        m.receiveShadow=true;
    }
}
//创建天空
function Sky() {
    this.mesh=new THREE.Object3D();
    this.newClouds=20;
    var stepAngle=Math.PI*2/this.newClouds;//间隔的度数
    for (var i=0;i<this.newClouds;i++){  //创建云对象
        var cloud=new Cloud();
        var a=stepAngle*i;//角度
        var h=Math.random()*200+750;//高度
        //笛卡尔坐标转换，形成一个圈
        cloud.mesh.position.y=Math.sin(a)*h;
        cloud.mesh.position.x=Math.cos(a)*h;
        cloud.mesh.position.z=Math.random()*400-300;
        cloud.mesh.rotation.z=a+Math.PI/2;
        var s=Math.random()*2;
        cloud.mesh.scale.set(s,s,s);
        this.mesh.add(cloud.mesh);//添加到天空网格
    }
}
//实例化天空
function createSky() {
    sky=new Sky();//实例化天空
    sky.mesh.position.y=-600;
    sky.mesh.position.z=-300;
    scene.add(sky.mesh);
}
//动画渲染
function loop() {
    airplane.propeller.rotation.x+=0.5;
    sea.mesh.rotation.z+=0.01;
    sky.mesh.rotation.z +=0.005;
    renderer.render(scene,camera);
    updatePlane();
    requestAnimationFrame(loop);
}
//监听鼠标移动
function handleMouseMove(event) {
    var tx=event.clientX/Width*2-1;
    var ty=-(event.clientY/Height*2-1);
    mousePos={x:tx,y:ty};
}
//飞机跟随鼠标移动
function updatePlane() {
    function normalize(v,tmin) {
        return ((v+1)/2)*300-tmin;//偏移的坐标
    }
    var targetX=normalize(mousePos.x,100);
    var targetY=normalize(mousePos.y,25);
    airplane.mesh.position.y=targetY+80;
    airplane.mesh.position.x=targetX-50;
}
