var state = "building"
var tbox, boxes;
var pickplane;
var gridXZ, grid; //gridXZ: 白色   grid: 黃色
var bEdge, edge_line;
var billBoard;

function Others() {
	tbox = new tBox();
	boxes = new Box();
	
	pickplane = new THREE.Mesh(new THREE.BoxGeometry(220, 0.1, 220), new THREE.MeshNormalMaterial({
		transparent: true,
		opacity: 0.0
	}));
	scene.add(pickplane);
	pickplane.name = "pickplane";
	pickables.push(pickplane);
	
	gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
    scene.add(gridXZ);
	
	grid = new THREE.GridHelper(200, 20, 'red', 'yellow');
    scene.add(grid);
    grid.visible = false;
	
	edge_line = new THREE.Object3D();
	scene.add(edge_line);
	bEdge = new buildEdge();
	
	
    /*let material = new THREE.MeshBasicMaterial({
        //side: THREE.DoubleSide,
        transparent: true, // key to cutout texture
        map: THREE.ImageUtils.loadTexture('https://i.imgur.com/sKCzp86.png')//'img/billBoard.png'
    });
	billBoard = new THREE.Mesh (new THREE.PlaneGeometry (10,200), material);*/
	billBoard = buildBill();
    scene.add(billBoard);
    pickables.push(billBoard);
    billBoard.name = "billBoard";
    billBoard.visible = false;
}

function buildBill() {
	let obj = new THREE.Object3D();
	var geometry = new THREE.BoxGeometry(8, 10, 8);
	var material1 = new THREE.MeshLambertMaterial({
		color: 0XFF2222
	});
	var material2 = new THREE.MeshLambertMaterial({
		color: 0X2222FF
	});
	obj = new THREE.Object3D();
	for(let i=0;i<20;i++) {
		if(i%2==0) {
			let mesh = new THREE.Mesh(geometry, material1);
			mesh.position.y = (i-10)*10+5;
			obj.add(mesh);
		}
		else {
			let mesh = new THREE.Mesh(geometry, material2);
			mesh.position.y = (i-10)*10+5;
			obj.add(mesh);
		}
	}
	return obj;
}