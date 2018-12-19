var state = "building"
var tbox, boxes;
var pickplane;
var gridXZ, grid; //gridXZ: 白色   grid: 黃色
var bEdge, edge_lineR, edge_lineG, edgeR = [], edgeG = [];
var billBoard;
var button_img = [];
var posSetX, posSetZ;
var flag, ida;
var ScameraPos = new THREE.Vector3( 500, 500, 500);

function Others() {
	tbox = new tBox();
	boxes = new Box();
	
	pickplane = new THREE.Mesh(new THREE.BoxGeometry(200, 0.1, 200), new THREE.MeshNormalMaterial({
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
	
	edge_lineR = new THREE.Object3D();
	scene.add(edge_lineR);
	edge_lineG = new THREE.Object3D();
	scene.add(edge_lineG);
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
	
	button_img[0]  = ["https://i.imgur.com/5RVuK5h.png", "https://i.imgur.com/IqKTZib.png"];//build
	button_img[1]  = ["https://i.imgur.com/ZQ9nBDh.png", "https://i.imgur.com/BXe0IHk.png"];//delete
	button_img[2]  = ["https://i.imgur.com/2Tnas0O.png", "https://i.imgur.com/c3fsjj2.png"];//stretch
	button_img[3]  = ["https://i.imgur.com/G5qEiRR.png", "https://i.imgur.com/f2iRyvV.png"];//Sview
	button_img[4]  = ["https://i.imgur.com/hT0B5cq.png", "https://i.imgur.com/NLwC9yY.png"];//move0
	button_img[5]  = ["https://i.imgur.com/x4CICtS.png", "https://i.imgur.com/taEUN5h.png"];//move1
	button_img[6]  = ["https://i.imgur.com/XCs7VbW.png", "https://i.imgur.com/aYlYg8o.png"];//move2
	button_img[7]  = ["https://i.imgur.com/MEwT42E.png", "https://i.imgur.com/8RdFtB7.png"];//back
	button_img[8]  = ["https://i.imgur.com/StlDNC3.png", "https://i.imgur.com/arZVj6I.png"];//big
	button_img[9]  = ["https://i.imgur.com/ziQWpEH.png", "https://i.imgur.com/YDH57p4.png"];//small
	button_img[10] = ["https://i.imgur.com/0z35aVG.png", "https://i.imgur.com/03phJyq.png"];//edgeR
	button_img[11] = ["https://i.imgur.com/RunvInt.png", "https://i.imgur.com/sP45BPG.png"];//edgeG
	
	let SpriteText2D = THREE_Text.SpriteText2D;
	let textAlign = THREE_Text.textAlign;
	
	posSetX = new SpriteText2D("X", {
		align: textAlign.center,
		font: '20px Courier',
		fillStyle: '#FF2222',
		antialias: true
	});
	posSetX.position.set(130, 0, 0);
	posSetX.scale.set(.5, .5, .5);
	scene.add(posSetX);
	
	posSetZ = new SpriteText2D("Z", {
		align: textAlign.center,
		font: '20px Courier',
		fillStyle: '#2222FF',
		antialias: true
	});
	posSetZ.position.set(0, 0, 130);
	posSetZ.scale.set(.5, .5, .5);
	scene.add(posSetZ);
	
	ida = new Ida();
	flag = ida.ida;
	ida.ida.visible = false;
	scene.add(flag);
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