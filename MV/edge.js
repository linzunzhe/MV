var Height = 10;

class buildEdge {
	constructor(){
        this.geometry = new THREE.Geometry();
        this.geometry.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
        this.line = new THREE.Line(this.geometry, new THREE.LineBasicMaterial({color: 0xffffff}));
        scene.add(this.line);
        this.rpoint = new THREE.Mesh( new THREE.SphereBufferGeometry( 2.5, 18, 18 ), new THREE.MeshBasicMaterial( {color: 0xff1212} ));
        this.lpoint = new THREE.Mesh( new THREE.SphereBufferGeometry( 2.5, 18, 18 ), new THREE.MeshBasicMaterial( {color: 0x12ff12} ));
        scene.add(this.rpoint);
        scene.add(this.lpoint);
        this.line.visible = false;
        this.rpoint.visible = false;
        this.lpoint.visible = false;
    }
    updata() {
    	this.rpoint.position.copy(this.geometry.vertices[0].clone());
        this.lpoint.position.copy(this.geometry.vertices[1].clone());
    	this.geometry.verticesNeedUpdate = true;
    	this.line.computeLineDistances();
    }
    visible(boo){
    	this.line.visible = boo;
        this.rpoint.visible = boo;
        this.lpoint.visible = boo;
    }
    push(){
		if(state === "edgeR") {
			let point1 = new THREE.Mesh( new THREE.SphereBufferGeometry( 1.5, 18, 18 ), new THREE.MeshBasicMaterial( {color: 0xff3333} ));
			point1.position.copy(this.rpoint.position.clone());
			edge_lineR.add(point1);
			let point2 = new THREE.Mesh( new THREE.SphereBufferGeometry( 1.5, 18, 18 ), new THREE.MeshBasicMaterial( {color: 0xff3333} ));
			point2.position.copy(this.lpoint.position.clone());
			edge_lineR.add(point2);
			let line = new THREE.Line(this.geometry.clone(), new THREE.LineBasicMaterial({color: 0xff8888}));
			edge_lineR.add(line);
			edgeR.push([point1.position.clone(), point2.position.clone()]);
		}
		else if(state === "edgeG") {
			let point1 = new THREE.Mesh( new THREE.SphereBufferGeometry( 1.0, 18, 18 ), new THREE.MeshBasicMaterial( {color: 0x33ff33} ));
			point1.position.copy(this.rpoint.position.clone());
			edge_lineG.add(point1);
			let point2 = new THREE.Mesh( new THREE.SphereBufferGeometry( 1.0, 18, 18 ), new THREE.MeshBasicMaterial( {color: 0x33ff33} ));
			point2.position.copy(this.lpoint.position.clone());
			edge_lineG.add(point2);
			let line = new THREE.Line(this.geometry.clone(), new THREE.LineBasicMaterial({color: 0x88ff88}));
			edge_lineG.add(line);
			edgeG.push([point1.position.clone(), point2.position.clone()]);
		}
    }
}