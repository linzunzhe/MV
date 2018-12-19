var vertex = [], edge = [];

class Vertex{//用於計算路徑
	constructor(name,pos,adjvs){  // adjacent相鄰的 vertices點,複數
		this.mesh = new THREE.Mesh( new THREE.SphereBufferGeometry( 1.5, 18, 18 ), new THREE.MeshBasicMaterial( {color: 0xff0000} ));
		this.mesh.position.set(pos[0],pos[1],pos[2]);
		this.mesh.name = name;
		//scene.add(this.mesh);
		//pickables.push(this.mesh);
		this.adjVs = adjvs;
	}
	newAdjVs(adjvs){
		this.adjVs = adjvs;
	}
	pushAdjVs(adjvs){
		this.adjVs.push(adjvs);
	}
}

class Edge{//純粹只是pickplane，用來點擊
	constructor(name, pos, size, plane, adjvs){
		this.mesh = new THREE.Mesh(new THREE.BoxGeometry( size[0], size[1], size[2]), new THREE.MeshNormalMaterial({transparent: true, opacity: 0.0}));
		this.mesh.position.set( pos[0], pos[1], pos[2]);
		this.mesh.name = name;
		scene.add(this.mesh);
		pickables2.push(this.mesh);
		this.plane = plane;
		this.adjVs = adjvs;
	}
}

function save() {
	vertex = [];
	edge = [];
	pickables2 = [];
	let v = [];
	let numV = function(pos) {
		let i;
		for(i = 0; i < v.length; i++) {
			if(v[i].x === pos.x && v[i].y === pos.y && v[i].z === pos.z){return i;}
		}
		v.push(pos);
		let ver = new Vertex( i, [ pos.x, pos.y, pos.z], []);
		vertex.push(ver);
		return i;
	}
	
	//buildVertex
	for(let i = 0; i < edgeR.length; i++) {
		let A = numV(edgeR[i][0]);
		let B = numV(edgeR[i][1]);
		vertex[A].pushAdjVs(B);
		vertex[B].pushAdjVs(A);
	}
	
	//buildEdge
	for(let i = 0; i < edgeR.length; i++) {
		let pos = [(edgeR[i][0].x + edgeR[i][1].x)/2, (edgeR[i][0].y + edgeR[i][1].y)/2, (edgeR[i][0].z + edgeR[i][1].z)/2];
		let size = [Math.abs(edgeR[i][0].x - edgeR[i][1].x) + 10, 0.1, Math.abs(edgeR[i][0].z - edgeR[i][1].z) + 10];
		let plane = [0, 1, 0];
		let A = numV(edgeR[i][0]);
		let B = numV(edgeR[i][1]);
		let edg = new Edge( i, pos, size, plane, [A,B]);
		edge.push(edg);
	}
}