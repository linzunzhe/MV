var pictures = [];
var loader = new THREE.TextureLoader();
loader.crossOrigin = "";

class Picture {
	constructor( url, x, y, z, r, name, cameraN) {
		this.tex = loader.load ( url);
		this.pic = new THREE.Mesh (new THREE.PlaneGeometry(40,25), new THREE.MeshBasicMaterial({map: this.tex}));
		this.pic.position.set( x, y, z);
		this.pic.rotation.y = r;
		this.pic.name = name;
		scene.add (this.pic);
		if(r === 0)camera[cameraN].position.set( x, y, z + 40);
		else if(r === Math.PI/2)camera[cameraN].position.set( x + 40, y, z);
		else if(r === Math.PI)camera[cameraN].position.set( x, y, z - 40);
		else if(r === -Math.PI/2)camera[cameraN].position.set( x - 40, y, z);
		camera[cameraN].lookAt(new THREE.Vector3( x, y, z));
		pickables.push(this.pic);
	}
}


function BuildPicture() {
	pictures[0] = new Picture( "https://i.imgur.com/WDUjfIx.png",  110, 30, -99, 0, "octahedronG", 7);
	pictures[1] = new Picture( "https://i.imgur.com/pheLGA9.png",  110, 30, 99, Math.PI, "tetrahedronG", 8);
	pictures[2] = new Picture( "https://i.imgur.com/QQBs7i9.png",  110, 30, -6, Math.PI, "planeG", 9);
	pictures[3] = new Picture( "https://i.imgur.com/WVrFpRH.png",  110, 30, 6, 0, "icosahedronG", 10);
	pictures[4] = new Picture( "https://i.imgur.com/hdvu4pJ.png",  220, 30, -99, 0, "ringG", 11);
	pictures[5] = new Picture( "https://i.imgur.com/wvnalrR.png",  220, 30, 99, Math.PI, "cylinderG", 12);
	pictures[6] = new Picture( "https://i.imgur.com/mf9zBFn.png",  181, 30, 0, Math.PI/2, "dodecahedronG", 13);
	
	pictures[7] = new Picture( "https://i.imgur.com/sHF8Of6.png",  -110, 30, -99, 0, "circleG", 14);
	pictures[8] = new Picture( "https://i.imgur.com/Q3jrtRp.png",  -110, 30, 99, Math.PI, "tubeG", 15);
	pictures[9] = new Picture( "https://i.imgur.com/X3n86yx.png",  -110, 30, -6, Math.PI, "coneG", 16);
	pictures[10] = new Picture( "https://i.imgur.com/fTxCp2b.png",  -110, 30, 6, 0, "boxG", 17);
	pictures[11] = new Picture( "https://i.imgur.com/1bNMfvK.png",  -220, 30, -99, 0, "sphereG", 18);
	pictures[12] = new Picture( "https://i.imgur.com/sn8OowJ.png",  -220, 30, 99, Math.PI, "shapeG", 19);
	pictures[13] = new Picture( "https://i.imgur.com/BDbp4aw.png",  -181, 30, 0, -Math.PI/2, "torusknotG", 20);
	
	pictures[14] = new Picture( "https://i.imgur.com/ZOj4UCL.png",  -259, 30, -30, Math.PI/2, "torusG", 21);
	pictures[15] = new Picture( "https://i.imgur.com/C3NvcWu.png",  -259, 30, 30, Math.PI/2, "latheG", 22);
	
	/*for(let i = 7; i < 23; i++) {
		camera[i].position.copy(pictures[i-7].pic.position.clone());
		camera[i].lookAt(pictures[i-7].pic.position.clone());
	}*/
}