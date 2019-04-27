var vp = [], rs = 0;

class ViewPoints{
	constructor( x, y, z, r) {
		//mesh
		this.mesh = new THREE.Object3D();
		
		let mesh1 = new THREE.Mesh( new THREE.BoxGeometry( 2, 10, 2), new THREE.MeshBasicMaterial({color: 0x111111}));
		mesh1.position.y = -5;
		this.mesh.add(mesh1);
		
		let obj = new THREE.Object3D();
		
		let mesh2 = new THREE.Mesh( new THREE.BoxGeometry( 5, 10, 5), new THREE.MeshBasicMaterial({color: 0x111111}));
		obj.add(mesh2);
		
		let mesh3 = new THREE.Mesh( new THREE.CylinderBufferGeometry( 4, 2, 3, 15), new THREE.MeshBasicMaterial({color: 0x111111}));
		mesh3.position.y = 6.5;
		obj.add(mesh3);

		obj.rotation.x = Math.PI*3/4;
		obj.position.set( 0, -10, 2.5);
		this.mesh.add(obj);
		
		this.mesh.position.set( x, y, z);
		this.mesh.rotation.y = r;
		scene.add(this.mesh);
		
		this.r = r;
	}
	
	rot(r) {
		this.mesh.rotation.y = this.r + r;
	}
}

function BuildViewPoints() {
	vp[0] = new ViewPoints( 190, 70, 90, Math.PI*3/4);
	vp[1] = new ViewPoints( 190, 70, -90, Math.PI*7/4);
	vp[2] = new ViewPoints( 45, 70, -45, Math.PI*3/2);
	vp[3] = new ViewPoints( -190, 70, 90, Math.PI*3/4);
	vp[4] = new ViewPoints( -190, 70, -90, Math.PI*7/4);
	
	camera[1].position.copy(vp[0].mesh.position.clone());
	camera[2].position.copy(vp[1].mesh.position.clone());
	camera[3].position.copy(vp[2].mesh.position.clone());
	camera[4].position.copy(vp[3].mesh.position.clone());
	camera[5].position.copy(vp[4].mesh.position.clone());
}

function turnVP() {
	rs += 0.005;
	if(rs>1)rs = 0;
	if(rs<0.35){
		let r = (Math.PI/2) * rs / 0.35;
		for(let i = 0; i < 5; i++) {
			vp[i].rot(r);
		}
	}
	else if(rs<0.5){
		let r = (Math.PI/2);
		for(let i = 0; i < 5; i++) {
			vp[i].rot(r);
		}
	}
	else if(rs<0.85){
		let r = (Math.PI/2) * (0.85 - rs) / 0.35;
		for(let i = 0; i < 5; i++) {
			vp[i].rot(r);
		}
	}
	else {
		let r = 0;
		for(let i = 0; i < 5; i++) {
			vp[i].rot(r);
		}
	}
	camera[1].lookAt(vp[0].mesh.localToWorld(new THREE.Vector3(0, -10, 10)));
	camera[2].lookAt(vp[1].mesh.localToWorld(new THREE.Vector3(0, -10, 10)));
	camera[3].lookAt(vp[2].mesh.localToWorld(new THREE.Vector3(0, -10, 10)));
	camera[4].lookAt(vp[3].mesh.localToWorld(new THREE.Vector3(0, -10, 10)));
	camera[5].lookAt(vp[4].mesh.localToWorld(new THREE.Vector3(0, -10, 10)));
}