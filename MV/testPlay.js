var road, road1, road2, road3, troad = [];
var fp = 0, tp = 0, ft=1, ftx=0, speed=0.50;
var start, end;
var isPlay = false;

class Ida{
	constructor(){
  		this.state = 0; // 0:idle, 1:walk
		this.walkst = 0;//do walking's value
      
  		this.ida = new THREE.Object3D();
		this.head = this.build_Head();
		this.body = this.build_Body();
		this.Rleg = this.build_Leg();
		this.Lleg = this.build_Leg();
      
		this.head.position.y = 12.3;
		this.body.position.y = 7.3;
		this.Rleg.position.y = 5;
		this.Lleg.position.y = 5;
		this.Rleg.position.z = 1;
		this.Lleg.position.z = -1;
      
		this.ida.add(this.head);
		this.ida.add(this.body);
		this.ida.add(this.Rleg);
		this.ida.add(this.Lleg);
		scene.add(this.ida);
	}
	build_Head(){
  		let obj = new THREE.Object3D();
		let obj1 = new THREE.Object3D();
  		let mesh1 = new THREE.Mesh(new THREE.CylinderGeometry( 0.1, 2, 5, 18 ), new THREE.MeshBasicMaterial( {color: 0x222222} ));
		mesh1.position.y = 3;
		obj1.add(mesh1);
		obj1.rotation.z = Math.PI * 0.25;
		let mesh2 = new THREE.Mesh(new THREE.SphereBufferGeometry( 2, 18, 18 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ));
		obj.add(obj1);
		obj.add(mesh2);
		return obj;
	}
	build_Body(){
  		let obj = new THREE.Object3D();
		let mesh1 = new THREE.Mesh(new THREE.CylinderGeometry( 0.5, 2.25, 5, 18 ), new THREE.MeshBasicMaterial( {color: 0x222222} ));
		obj.add(mesh1);
		return obj;
	}
	build_Leg(){
  		let obj = new THREE.Object3D();
		let mesh1 = new THREE.Mesh(new THREE.CylinderGeometry( 0.25, 0.25, 5, 18 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ));
		mesh1.position.y = -2.5;
		obj.add(mesh1);
		let mesh2 = new THREE.Mesh(new THREE.CylinderGeometry( 0.25, 0.25, 1, 18 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ));
		mesh2.position.x = 0.5;
		mesh2.position.y = -5;
		mesh2.rotation.z = Math.PI * 0.5;
		obj.add(mesh2);
		return obj;
	}
	dosomething(){
 		if(this.state === 0){
      		this.walkst = 0;
			this.idleing();
		}
		else if(this.state === 1){
      		this.walkst = (this.walkst + speed)%10;
      		this.walking();
		}
	}
	idleing(){
  		this.head.rotation.y = 0;
  		this.Rleg.rotation.z = 0;
		this.Lleg.rotation.z = 0;
	}
	walking(){
  		if(this.walkst<2.5){
      		this.head.rotation.y = (Math.PI / 18) * (this.walkst / 2.5);
      		this.Rleg.rotation.z = (Math.PI / 6) * (this.walkst / 2.5);
			this.Lleg.rotation.z = -(Math.PI / 6) * (this.walkst / 2.5);
		}
		else if(this.walkst<5.0){
      		this.head.rotation.y = (Math.PI / 18) * ((5.0 - this.walkst) / 2.5);
      		this.Rleg.rotation.z = (Math.PI / 6) * ((5.0 - this.walkst) / 2.5);
			this.Lleg.rotation.z = -(Math.PI / 6) * ((5.0 - this.walkst) / 2.5);
		}
		else if(this.walkst<7.5){
      		this.head.rotation.y = -(Math.PI / 18) * ((this.walkst - 5.0) / 2.5);
      		this.Rleg.rotation.z = -(Math.PI / 6) * ((this.walkst - 5.0) / 2.5);
			this.Lleg.rotation.z = (Math.PI / 6) * ((this.walkst - 5.0) / 2.5);
		}
		else {
      		this.head.rotation.y = -(Math.PI / 18) * ((10.0 - this.walkst) / 2.5);
      		this.Rleg.rotation.z = -(Math.PI / 6) * ((10.0 - this.walkst) / 2.5);
			this.Lleg.rotation.z = (Math.PI / 6) * ((10.0 - this.walkst) / 2.5);
		}
	}
}

class roadLine{
	constructor(){
		this.pos = [];
		this.name = [];
		this.eachlength = [];
		this.totallength = 0;
		this.ratio = [];
		this.plane = [];
	}
	push(pos, name){  //新增一個點
		this.name.push(name);
		this.pos.push(pos);
		if(this.pos.length>1){
			this.addLength();
			this.countRatio();
		}
		else {this.eachlength.push(0);}
	}
	pushPlane(plane){
  		this.plane.push(plane);
	}
	addLength(){  //取得新加入的點與原本最後一點的距離
  		let i = this.pos.length-1;
    	let x = this.pos[i].x - this.pos[i-1].x;
		let y = this.pos[i].y - this.pos[i-1].y;
		let z = this.pos[i].z - this.pos[i-1].z;
		let length = Math.sqrt(x*x + y*y + z*z);
		this.eachlength.push(length);
		this.totallength += length;
	}
	countRatio(){  //重新計算每一點表示的比例值
		for(let i = 0, l = this.pos.length, sum = 0; i<l; i++){
			sum += this.eachlength[i];
			this.ratio[i] = sum/this.totallength;
		}
	};
	clear(){  //清空
		this.pos.length = 0;
		this.eachlength.length = 0;
		this.ratio.length = 0;
		this.totallength = 0;
		this.plane.length = 0;
		this.name.length = 0;
	}
	getPointAt(x){
		let i = 0;
		if(x === 0)return this.pos[0];
		if(x>1)x = 1;
		for(let l = this.pos.length; i<l; i++){
			if(this.ratio[i] >= x)break;
		}
		x = (x-this.ratio[i-1])/(this.ratio[i]-this.ratio[i-1]);
		let pos = new THREE.Vector3();
		pos.x = this.pos[i-1].x + (this.pos[i].x - this.pos[i-1].x)*x;
		pos.y = this.pos[i-1].y + (this.pos[i].y - this.pos[i-1].y)*x;
		pos.z = this.pos[i-1].z + (this.pos[i].z - this.pos[i-1].z)*x;
		return pos;
	}
	getTangentAt(x){
		let i = 1;
		if(x>1)x=1;
		for(let l = this.pos.length; i<l; i++){
			if(this.ratio[i] >= x)break;
		}
		let pos = new THREE.Vector3();
		pos.x = this.pos[i].x - this.pos[i-1].x;
		pos.y = this.pos[i].y - this.pos[i-1].y;
		pos.z = this.pos[i].z - this.pos[i-1].z;
		return pos;
	}
	getPlaneAt(x){
		let i = 1;
		if(x>1)x=1;
		for(let l = this.pos.length; i<l; i++){
			if(this.ratio[i] >= x)break;
		}
		return this.plane[i-1];
	}
	/*show(){
  	for(let i = 0, l = this.points.length; i<l; i++){
    	console.log("pos: " + this.points[i].x + " length: " + this.eachlength[i] + " ratio: " + this.ratio[i]);
		}
	}*/
}

function testPlay() {
	isPlay = !isPlay;
	if(isPlay === true){
		start = new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 18, 18 ), new THREE.MeshBasicMaterial( {color: 0xff4400} ) );
		start.position.copy(vertex[0].mesh.position);
   
		end = new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 18, 18 ), new THREE.MeshBasicMaterial( {color: 0x000000} ) );
		end.position.copy(vertex[0].mesh.position);
	
		ida.ida.visible = true;
		flag.position.copy(vertex[0].mesh.position);
	
		road = new roadLine();
		road1 = new roadLine();
		road2 = new roadLine();
		road3 = new roadLine();
	}
	else {
		ida.ida.visible = false;
	}
	
}

function animatePLAY() {
	if(ft < 1){
   		ft += ftx;
		ida.state = 1;
		Matrix4Update(road.getPointAt(ft), road.getTangentAt(ft), road.getPlaneAt(ft));
		if(ft>=1){
       		fp=tp;
        	start.position.copy(end.position);
		}
	}
	else ida.state = 0;
	ida.dosomething();
}

function find_Road(from, to, visit){
	if(from === to){
		troad.push(from);
		return true;
	}
	if(visit.indexOf(from) != -1){
		return false;
	}
	visit.push(from);
	let l = vertex[from].adjVs.length;
	for(let i=0; i<l; i++){
		if(find_Road(vertex[from].adjVs[i], to, visit) === true){
			troad.push(from);
			return true;
		}
	}
	return false;
}

function Matrix4Update(newPos, newDir, newPlane) {
	var localX = newDir.clone().normalize();
	var localY = newPlane.clone();
	localY.sub(localY.clone().projectOnVector(localX)).normalize();
	var localZ = new THREE.Vector3();
	localZ.crossVectors (localX, localY);
	flag.matrix.makeBasis (localX, localY, localZ);
	flag.matrix.setPosition (newPos);
	flag.matrixAutoUpdate = false;
}

function xxyyPlay(point, adjVs){
	let x = point.x;
	let y = point.y;
	let z = point.z;
	let w = 5;
  
	if(vertex[adjVs[0]].mesh.position.x != vertex[adjVs[1]].mesh.position.x){
		let xx = x > 0 ? 1 : -1;
		x -= w;
		if(x<0)x*=-1;
		x = (x+w)-(x+w)%(w+w);
		x *= xx;
		x += w;
	}
	else x = vertex[adjVs[0]].mesh.position.x;
  
	if(vertex[adjVs[0]].mesh.position.y != vertex[adjVs[1]].mesh.position.y){
		let yy = y > 0 ? 1 : -1;
		y -= w;
		if(y<0)y*=-1;
		y = (y+w)-(y+w)%(w+w);
		y *= yy;
		y += w;
	}
	else y = vertex[adjVs[0]].mesh.position.y;
  
	if(vertex[adjVs[0]].mesh.position.z != vertex[adjVs[1]].mesh.position.z){
		let zz = z > 0 ? 1 : -1;
		z -= w;
		if(z<0)z*=-1;
		z = (z+w)-(z+w)%(w+w);
		z *= zz;
		z += w;
	}
	else z = vertex[adjVs[0]].mesh.position.z;
  
	let pos = new THREE.Vector3(x,y,z);
	return pos;
}

function onDocumentMouseDownPLAY(event) {
	event.preventDefault();
	mouse.x = (event.clientX / WW1) * 2 - 1 - 4/3;
	mouse.y = -(event.clientY / HH1) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	let intersects = raycaster.intersectObjects(pickables2);
	if (intersects.length > 0) {
		tp = intersects[0].object.name;
		let pos = xxyyPlay(intersects[0].point, edge[tp].adjVs);
		end.position.copy(pos);
		road = new roadLine();
		road.clear();road1.clear();road2.clear();road3.clear();
		if(fp === tp){
      		road.push(start.position, edge[fp].adjVs[0]);
			road.push(end.position, edge[fp].adjVs[1]);
		}
		else {
      		troad = [];
      		find_Road(edge[fp].adjVs[0], edge[tp].adjVs[0], []);
			if(troad.length>0){
				road.push(start.position, edge[fp].adjVs[1]);
				for(let i = troad.length-1; i>=0; i--){
					road.push(vertex[troad[i]].mesh.position, troad[i]);
				}
				road.push(end.position, edge[tp].adjVs[1]);
			}
			troad = [];
			find_Road(edge[fp].adjVs[0], edge[tp].adjVs[1], []);
			if(troad.length>0){
				road1.push(start.position, edge[fp].adjVs[1]);
				for(let i = troad.length-1; i>=0; i--){
					road1.push(vertex[troad[i]].mesh.position, troad[i]);
				}
				road1.push(end.position, edge[tp].adjVs[0]);
			}
      		troad = [];
			find_Road(edge[fp].adjVs[1], edge[tp].adjVs[0], []);
			if(troad.length>0){
				road2.push(start.position, edge[fp].adjVs[0]);
				for(let i = troad.length-1; i>=0; i--){
					road2.push(vertex[troad[i]].mesh.position, troad[i]);
				}
				road2.push(end.position, edge[tp].adjVs[1]);
			}
			troad = [];
			find_Road(edge[fp].adjVs[1], edge[tp].adjVs[1], []);
			if(troad.length>0){
				road3.push(start.position, edge[fp].adjVs[0]);
				for(let i = troad.length-1; i>=0; i--){
					road3.push(vertex[troad[i]].mesh.position, troad[i]);
				}
				road3.push(end.position, edge[tp].adjVs[0]);
			}
			if(road.totallength > road1.totallength && road1.totallength > 0)road = road1;
			if(road.totallength > road2.totallength && road2.totallength > 0)road = road2;
			if(road.totallength > road3.totallength && road3.totallength > 0)road = road3;
		}
		if(road.totallength > 0){
			for(let i=0, j=0;i<road.pos.length-1;i++){
        		for(j=0; j<edge.length; j++){
					if(edge[j].adjVs.indexOf(road.name[i])!=-1 && edge[j].adjVs.indexOf(road.name[i+1])!=-1)break;
				}
				road.pushPlane(new THREE.Vector3(edge[j].plane[0], edge[j].plane[1], edge[j].plane[2]));
			}
			ftx = speed/road.totallength;
			ft = 0;
		}
	}
}