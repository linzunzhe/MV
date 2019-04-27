var scene, controls;
var renderer = [];//m,1,2,3,4,5,x
var WW1 = $("#container_m").innerWidth(), HH1 = $("#container_m").innerHeight();
var WW2 = $("#container_1").innerWidth(), HH2 = $("#container_1").innerHeight();//1,2,3,4,5的size相同
var WW3 = $("#container_x").innerWidth(), HH3 = $("#container_x").innerHeight();
var renderSize = [ [ WW1, HH1], [ WW2, HH2], [ WW2, HH2], [ WW2, HH2], [ WW2, HH2], [ WW2, HH2], [ WW3, HH3]];
var renderCon = [ "#container_m", "#container_1", "#container_2", "#container_3", "#container_4", "#container_5", "#container_x"];
var camera = [], cameraS = 1;
function Scene() {
	for(let i = 0; i < 7; i++) {
		renderer[i] = new THREE.WebGLRenderer({antialias: true});
		renderer[i].setSize( renderSize[i][0], renderSize[i][1]);
		renderer[i].setClearColor(0x886688);
		//renderer[i].autoClear = false;
		$(renderCon[i]).append(renderer[i].domElement);
	}
	
	scene = new THREE.Scene();
	
	for(let  i = 0; i < 6; i++) {
		camera[i] = new THREE.PerspectiveCamera(50, renderSize[i][0] / renderSize[i][1], 1, 6000);
		scene.add(camera[i]);
	}
	camera[0].position.set( 300, 300, 300);
	camera[0].lookAt(scene.position);
	camera[6] = camera[1];
	for(let  i = 7; i < 23; i++) {
		camera[i] = new THREE.PerspectiveCamera(50, WW3 / HH3, 1, 6000);
		scene.add(camera[i]);
	}
	
	controls = new THREE.OrbitControls(camera[0], renderer[0].domElement);
	/**********************/
	//var gridXZ = new THREE.GridHelper(800, 80, 'red', 'white');
    //scene.add(gridXZ);
	
	var lightmesh = new THREE.AmbientLight(0x444444);
    scene.add(lightmesh);
}

function render() {
	for(let i = 0; i < 7; i++) {
		renderer[i].render(scene, camera[i]);
	}
}

function onWindowResize() {
	WW1 = $("#container_m").innerWidth(), HH1 = $("#container_m").innerHeight();
	WW2 = $("#container_1").innerWidth(), HH2 = $("#container_1").innerHeight();
	WW3 = $("#container_x").innerWidth(), HH3 = $("#container_x").innerHeight();
	
	for(let i = 0; i < 6; i++) {
		renderer[i].setSize( renderSize[i][0], renderSize[i][1]);
		camera[i].aspect = renderSize[i][0] / renderSize[i][1];
		camera[i].updateProjectionMatrix();
	}
	renderer[6].setSize( renderSize[6][0], renderSize[6][1]);
	camera[6] = camera[cameraS];
}