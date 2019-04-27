var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var pickables = [];

function onDocumentMouseDown(event) {
	/*
	  mouse.x = ((event.clientX - event.target.offsetLeft) / $('#container').innerWidth()) * 2 - 1;
	  mouse.y = -((event.clientY - event.target.offsetTop) / $('#container').innerHeight()) * 2 + 1;
	*/
	var viewportPos =$('#container_m').get(0).getBoundingClientRect(); 
	mouse.x = ((event.clientX - viewportPos.left) / $('#container_m').innerWidth()) * 2 - 1;
	mouse.y = -((event.clientY - viewportPos.top) / $('#container_m').innerHeight()) * 2 + 1;
	raycaster.setFromCamera(mouse, camera[0]);
	var intersects = raycaster.intersectObjects (pickables);
	if (intersects.length > 0) {
		switch(intersects[0].object.name){
			case "boxG":
				cameraS = 17;
				camera[6] = camera[cameraS];
				$("#convas").text("BoxGeometry");
				$("#convas2").text("BoxGeometry is a geometry class for a rectangular cuboid with a given 'width', 'height', and 'depth'. On creation, the cuboid is centred on the origin, with each edge parallel to one of the axes.");
				break;
			case "circleG":
				cameraS = 14;
				camera[6] = camera[cameraS];
				$("#convas").text("CircleGeometry");
				$("#convas2").text("CircleGeometry is a simple shape of Euclidean geometry. It is contructed from a number of triangular segments that are oriented around a central point and extend as far out as a given radius. It is built counter-clockwise from a start angle and a given central angle.");
				break;
			case "coneG":
				cameraS = 16;
				camera[6] = camera[cameraS];
				$("#convas").text("ConeGeometry");
				$("#convas2").text("A class for generating cone geometries.");
				break;
			case "cylinderG":
				cameraS = 12;
				camera[6] = camera[cameraS];
				$("#convas").text("CylinderGeometry");
				$("#convas2").text("A class for generating cylinder geometries.");
				break;
			case "dodecahedronG":
				cameraS = 13;
				camera[6] = camera[cameraS];
				$("#convas").text("DodecahedronGeometry");
				$("#convas2").text("A class for generating a dodecahedron geometries.");
				break;
			case "icosahedronG":
				cameraS = 10;
				camera[6] = camera[cameraS];
				$("#convas").text("IcosahedronGeometry");
				$("#convas2").text("A class for generating an icosahedron geometry.");
				break;
			case "latheG":
				cameraS = 22;
				camera[6] = camera[cameraS];
				$("#convas").text("LatheGeometry");
				$("#convas2").text("Creates meshes with axial symmetry like vases. The lathe rotates around the Y axis.");
				break;
			case "octahedronG":
				cameraS = 7;
				camera[6] = camera[cameraS];
				$("#convas").text("OctahedronGeometry");
				$("#convas2").text("A class for generating an octahedron geometry.");
				break;
			case "planeG":
				cameraS = 9;
				camera[6] = camera[cameraS];
				$("#convas").text("PlaneGeometry");
				$("#convas2").text("A class for generating plane geometries.");
				break;
			case "ringG":
				cameraS = 11;
				camera[6] = camera[cameraS];
				$("#convas").text("RingGeometry");
				$("#convas2").text("A class for generating a two-dimensional ring geometry.");
				break;
			case "shapeG":
				cameraS = 19;
				camera[6] = camera[cameraS];
				$("#convas").text("ShapeGeometry");
				$("#convas2").text("Creates an one-sided polygonal geometry from one or more path shapes.");
				break;
			case "sphereG":
				cameraS = 18;
				camera[6] = camera[cameraS];
				$("#convas").text("SphereGeometry");
				$("#convas2").text("A class for generating sphere geometries.");
				break;
			case "tetrahedronG":
				cameraS = 8;
				camera[6] = camera[cameraS];
				$("#convas").text("TetrahedronGeometry");
				$("#convas2").text("A class for generating a tetrahedron geometries.");
				break;
			case "torusG":
				cameraS = 21;
				camera[6] = camera[cameraS];
				$("#convas").text("TorusGeometry");
				$("#convas2").text("A class for generating torus geometries.");
				break;
			case "torusknotG":
				cameraS = 20;
				camera[6] = camera[cameraS];
				$("#convas").text("TorusKnotGeometry");
				$("#convas2").text("Creates a torus knot, the particular shape of which is defined by a pair of coprime integers, p and q. If p and q are not coprime, the result will be a torus link.");
				break;
			case "tubeG":
				cameraS = 15;
				camera[6] = camera[cameraS];
				$("#convas").text("TubeGeometry");
				$("#convas2").text("Creates a tube that extrudes along a 3d curve.");
				break;
		}
	}
}

function onDocumentMouseMove(event) {
	var viewportPos =$('#container_m').get(0).getBoundingClientRect(); 
	mouse.x = ((event.clientX - viewportPos.left) / $('#container_m').innerWidth()) * 2 - 1;
	mouse.y = -((event.clientY - viewportPos.top) / $('#container_m').innerHeight()) * 2 + 1;
	raycaster.setFromCamera(mouse, camera[0]);
	var intersects = raycaster.intersectObjects (pickables);
	if (intersects.length > 0) document.body.style.cursor = 'pointer';
	else document.body.style.cursor = 'auto';
}

function Convas() {
	switch(cameraS){
		case "17":
			$("#convas").text("BoxGeometry");
			$("#convas2").text("BoxGeometry is a geometry class for a rectangular cuboid with a given 'width', 'height', and 'depth'. On creation, the cuboid is centred on the origin, with each edge parallel to one of the axes.");
			break;
		case "14":
			$("#convas").text("CircleGeometry");
			$("#convas2").text("CircleGeometry is a simple shape of Euclidean geometry. It is contructed from a number of triangular segments that are oriented around a central point and extend as far out as a given radius. It is built counter-clockwise from a start angle and a given central angle.");
			break;
		case "16":
			$("#convas").text("ConeGeometry");
			$("#convas2").text("A class for generating cone geometries.");
			break;
		case "12":
			$("#convas").text("CylinderGeometry");
			$("#convas2").text("A class for generating cylinder geometries.");
			break;
		case "13":
			$("#convas").text("DodecahedronGeometry");
			$("#convas2").text("A class for generating a dodecahedron geometries.");
			break;
		case "10":
			$("#convas").text("IcosahedronGeometry");
			$("#convas2").text("A class for generating an icosahedron geometry.");
			break;
		case "22":
			$("#convas").text("LatheGeometry");
			$("#convas2").text("Creates meshes with axial symmetry like vases. The lathe rotates around the Y axis.");
			break;
		case "7":
			$("#convas").text("OctahedronGeometry");
			$("#convas2").text("A class for generating an octahedron geometry.");
			break;
		case "9":
			$("#convas").text("PlaneGeometry");
			$("#convas2").text("A class for generating plane geometries.");
			break;
		case "11":
			$("#convas").text("RingGeometry");
			$("#convas2").text("A class for generating a two-dimensional ring geometry.");
			break;
		case "19":
			$("#convas").text("ShapeGeometry");
			$("#convas2").text("Creates an one-sided polygonal geometry from one or more path shapes.");
			break;
		case "18":
			$("#convas").text("SphereGeometry");
			$("#convas2").text("A class for generating sphere geometries.");
			break;
		case "8":
			$("#convas").text("TetrahedronGeometry");
			$("#convas2").text("A class for generating a tetrahedron geometries.");
			break;
		case "21":
			$("#convas").text("TorusGeometry");
			$("#convas2").text("A class for generating torus geometries.");
			break;
		case "20":
			$("#convas").text("TorusKnotGeometry");
			$("#convas2").text("Creates a torus knot, the particular shape of which is defined by a pair of coprime integers, p and q. If p and q are not coprime, the result will be a torus link.");
			break;
		case "15":
			$("#convas").text("TubeGeometry");
			$("#convas2").text("Creates a tube that extrudes along a 3d curve.");
			break;
	}
}