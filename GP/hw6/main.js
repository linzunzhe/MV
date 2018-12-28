/////////////////////////////////////////////////////////
// global variables
var camera, renderer;
var agent;
var timer = false;

// program starts here ...
init();
animate();

function init() {

  initThree();
  
  //scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.z = 500;
  camera.position.y = 400;


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);

  /////////////////////////////////////////////////////////////////////

  
  // scene grid [-400,400]x[-400,400]
  var gridXZ = new THREE.GridHelper(800, 80, 'red', 'white');
  scene.add(gridXZ);

  // in scene.js
  sceneFromJSON ( );  // using LevelDesigner
  
  //////////////////////////////////////////////////////////////////////////	
  	let size = 10; // halfsize of agent
//    agent = new Agent(new THREE.Vector3(-400 + 400 * Math.random(), 0, -400 + 400 * Math.random()), mesh);
    agent = new Agent(new THREE.Vector3(50,0,-50), size);
	
	timer = true;
	startTimer(0);

}


function animate() {

  agent.update(0.01)
  
  // check agent crossing obstacles ...
  scene.obstacles.forEach ( function (obs) { obs.checkCollision (agent)} );

  if (scene.targets.length > 0)
  	requestAnimationFrame(animate);
  else{
	timer = false;
  	alert ('game over')
  }

  render();
}

function render() {
  renderer.render(scene, camera);
}

function startTimer(time) {
	let str;
	let min = parseInt(time / 60, 10);
	let sec = parseInt(time % 60, 10);
	if(min < 10)str = "0" + min + ":";
	else str = "" + min + ":";
	if(sec < 10)str = str + "0" + sec;
	else str = str + sec;
	$("#time").text("" + str);
	if(timer)setTimeout( function(){startTimer(time + 1)}, 1000);
}
