var camera, cameraW, cameraX, cameraY, cameraZ, cameraHUD, cameraHUD2, cameraHUD3;
var old_cameraW = new THREE.Vector3( 500, 500, 500);
var renderer, rendererW, rendererX, rendererY, rendererZ;
var scene, sceneHUD, sceneHUD2, sceneHUD3;
var controls, halfSize = 100, controls2;//controls2: 右下角小視窗調整專用視角用
var WW1 = $("#container").innerWidth(), HH1 = $("#container").innerHeight();
var WW2 = $("#container_w").innerWidth(), HH2 = $("#container_w").innerHeight();
var WW3 = $("#container_y").innerWidth(), HH3 = $("#container_y").innerHeight();//x,y,z的size相同
var imgPlane, imgPlaneSize = 1;

function Scene() {
	scene = new THREE.Scene();
	
	/*render*/
	renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(WW1, HH1);
    renderer.setClearColor(0x888888);
    renderer.autoClear = false;
    $("#container").append(renderer.domElement);
    
    rendererW = new THREE.WebGLRenderer({antialias: true});
    rendererW.setSize(WW2, HH2);
    rendererW.setClearColor(0x888888);
    rendererW.autoClear = false;
    $("#container_w").append(rendererW.domElement);
    
    rendererX = new THREE.WebGLRenderer({antialias: true});
    rendererX.setSize(WW3, HH3);
    rendererX.setClearColor(0x888888);
    rendererX.autoClear = false;
    $("#container_x").append(rendererX.domElement);
    
    rendererY = new THREE.WebGLRenderer({antialias: true});
    rendererY.setSize(WW3, HH3);
    rendererY.setClearColor(0x888888);
    rendererY.autoClear = false;
    $("#container_y").append(rendererY.domElement);
    
    rendererZ = new THREE.WebGLRenderer({antialias: true});
    rendererZ.setSize(WW3, HH3);
    rendererZ.setClearColor(0x888888);
    rendererZ.autoClear = false;
    $("#container_z").append(rendererZ.domElement);
	
	/*canera*/
	camera = new THREE.OrthographicCamera(-halfSize, halfSize, halfSize, -halfSize, -100, 10000);
    camera.position.set(500, 500, 500);
    //camera.lookAt(scene.position);
    /**************camera********************/
    cameraW = new THREE.OrthographicCamera(-halfSize, halfSize, halfSize, -halfSize, -100, 10000);
  	cameraW.position.set(500, 500, 500);
    cameraW.lookAt(scene.position);
    
    cameraX = new THREE.OrthographicCamera(-halfSize, halfSize, halfSize, -halfSize, -100, 1000);
  	cameraX.position.set(500, 0, 0);
    cameraX.lookAt(scene.position);
    
    cameraY = new THREE.OrthographicCamera(-halfSize, halfSize, halfSize, -halfSize, -100, 1000);
  	cameraY.position.set(0, 500, 0);
    cameraY.lookAt(scene.position);
    
    cameraZ = new THREE.OrthographicCamera(-halfSize, halfSize, halfSize, -halfSize, -100, 1000);
  	cameraZ.position.set(0, 0, 500);
    cameraZ.lookAt(scene.position);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false; //鏡頭平移禁止
	
	controls2 = new THREE.OrbitControls(cameraW, rendererW.domElement);
    controls2.enablePan = false; //鏡頭平移禁止
	
	/*HUD   邊框*/
	sceneHUD = new THREE.Scene();
    cameraHUD = new THREE.OrthographicCamera(-10.5, 10.5, 10.5, -10.5, -10, 10);
    cameraHUD.position.z = 0;
    sceneHUD.add(cameraHUD);

    let lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(-10, -10, 0), new THREE.Vector3(10, -10, 0), new THREE.Vector3(10, 10, 0), new THREE.Vector3(-10, 10, 0), new THREE.Vector3(-10, -10, 0));
    let line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0x000000}));
    sceneHUD.add(line);
	
	/*HUD2 格線*/
	sceneHUD2 = new THREE.Scene();
    cameraHUD2 = new THREE.OrthographicCamera(-100, 100, 100, -100, -10, 10);
    cameraHUD2.updateProjectionMatrix();
    sceneHUD2.add(cameraHUD2);
	
	let material = new THREE.LineBasicMaterial({color: 0xffffff});
    let size = 10;
	let bor = new THREE.Object3D();
	
	for(let i=0;i<=WW3/2;i+=size){
        let geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(i, HH3, 0),
            new THREE.Vector3(i, -HH3, 0));
        let border = new THREE.Line(geometry, material);
        bor.add(border);
    }
    for(let i=0;i>=-WW3/2;i-=size){
        let geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(i, HH3, 0),
            new THREE.Vector3(i, -HH3, 0));
        let border = new THREE.Line(geometry, material);
        bor.add(border);
    }
    for(let i=0;i<=HH3/2;i+=size){
        let geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(WW3, i, 0),
            new THREE.Vector3(-WW3, i, 0));
        let border = new THREE.Line(geometry, material);
        bor.add(border);
    }
    for(let i=0;i>=-HH3/2;i-=size){
        let geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(WW3, i, 0),
            new THREE.Vector3(-WW3, i, 0));
        let border = new THREE.Line(geometry, material);
        bor.add(border);
    }
	bor.position.z = -10;
    sceneHUD2.add(bor);
	
	/*HUD3 背景圖*/
	sceneHUD3 = new THREE.Scene();
	cameraHUD3 = new THREE.OrthographicCamera(-100, 100, 100, -100, -10, 10);
	cameraHUD3.position.z = 10;
	sceneHUD3.add(cameraHUD3);
	
	let texture = new THREE.TextureLoader().load( "https://i.imgur.com/tRsJ3ok.jpg", function ( tex ) {
		// tex and texture are the same in this example, but that might not always be the case
		//console.log( tex.image.width, tex.image.height );
		//console.log( texture.image.width, texture.image.height );
		setImgPlane( tex.image.width, tex.image.height);
	} );
}

function setImgPlane( x, y) {
	imgPlane = new THREE.Mesh(new THREE.PlaneGeometry( x / 10 * imgPlaneSize, y / 10 * imgPlaneSize), new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture($("#imgUrl").val())}));
	imgPlane.z = -10;
	sceneHUD3.add(imgPlane);
}

function render() {
	reSize();
	
	$("#container").append(renderer.domElement);
    renderer.setViewport( 0, 0, WW1, HH1);
    camera.updateProjectionMatrix();
    renderer.setScissor( 0, 0, WW1,  HH1);
    renderer.clear();
    renderer.render(scene, camera);
    renderer.render(sceneHUD, cameraHUD);

	//W
    rendererW.setViewport( 0, 0, WW2, HH2);
    rendererW.setScissor( 0, 0, WW2, HH2);
    cameraW.updateProjectionMatrix();
    rendererW.clear();
	rendererW.render(sceneHUD3, cameraHUD3);
    rendererW.render(scene, cameraW);
    rendererW.render(sceneHUD, cameraHUD);
    
    //X
    rendererX.setViewport( 0, 0, WW3, HH3);
    rendererX.setScissor( 0, 0, WW3, HH3);
    cameraX.updateProjectionMatrix();
    rendererX.clear();
    rendererX.render(scene, cameraX);
	rendererX.render(sceneHUD2, cameraHUD2);
    rendererX.render(sceneHUD, cameraHUD);
    
    //Y
    rendererY.setViewport( 0, 0, WW3, HH3);
    rendererY.setScissor( 0, 0, WW3, HH3);
    cameraY.updateProjectionMatrix();
    rendererY.clear();
    rendererY.render(scene, cameraY);
	rendererY.render(sceneHUD2, cameraHUD2);
    rendererY.render(sceneHUD, cameraHUD);
    
    //Z
    rendererZ.setViewport( 0, 0, WW3, HH3);
    rendererZ.setScissor( 0, 0, WW3, HH3);
    cameraZ.updateProjectionMatrix();
    rendererZ.clear();
    rendererZ.render(scene, cameraZ);
	rendererZ.render(sceneHUD2, cameraHUD2);
    rendererZ.render(sceneHUD, cameraHUD);
}

function reSize() {
	WW1 = $("#container").innerWidth(), HH1 = $("#container").innerHeight();
	WW2 = $("#container_w").innerWidth(), HH2 = $("#container_w").innerHeight();
	WW3 = $("#container_y").innerWidth(), HH3 = $("#container_y").innerHeight();
    
    let whratio = WW1/HH1;
    camera.left = -100*whratio;
  	camera.right = 100*whratio;
  	camera.updateProjectionMatrix();
	renderer.setSize( WW1, HH1);
    
    whratio = WW2/HH2;
    cameraW.left = -150*whratio;
  	cameraW.right = 150*whratio;
  	cameraW.updateProjectionMatrix();
	rendererW.setSize( WW2, HH2);
	
	cameraHUD3.left = -100*whratio;
  	cameraHUD3.right = 100*whratio;
  	cameraHUD3.updateProjectionMatrix();
    
    whratio = WW3/HH3;
    cameraX.left = -100*whratio;
  	cameraX.right = 100*whratio;
  	cameraX.updateProjectionMatrix();
	rendererX.setSize( WW3, HH3);
    
    cameraY.left = -100*whratio;
  	cameraY.right = 100*whratio;
  	cameraY.updateProjectionMatrix();
	rendererY.setSize( WW3, HH3);
    
    cameraHUD2.left = -100*whratio;
  	cameraHUD2.right = 100*whratio;
  	cameraHUD2.updateProjectionMatrix();
    
    cameraZ.left = -100*whratio;
  	cameraZ.right = 100*whratio;
  	cameraZ.updateProjectionMatrix();
	rendererZ.setSize( WW3, HH3);
}