var boxid = 0;
var color = new THREE.Color(0x4444ff);

class Box {
    constructor() {
        this.boxes = [];
    }
    push(pos0, pos1) {
		let material = new THREE.MeshLambertMaterial({color: color});
        let mesh = new THREE.Mesh(new THREE.BoxGeometry(Math.abs(pos0.x - pos1.x) + 10, 10, Math.abs(pos0.z - pos1.z) + 10), material);
        mesh.position.set((pos0.x + pos1.x) / 2, (pos0.y + pos1.y) / 2, (pos0.z + pos1.z) / 2);
        mesh.name = boxid;
        boxid++;
        scene.add(mesh);
        pickables.push(mesh);
		this.boxes.push(mesh);
    }
    /*getID(num) {
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i].mesh.name === num) return i;
        }
    }*/
    stretch(num, pos) { //拉伸
        this.boxes[num].scale.y = Math.abs((pos.y+5) / 10);
        this.boxes[num].position.y = (pos.y+5) / 2;
    }
    delete(num) {
        let name = this.boxes[num].name;
        let i;
        for (i = 0; i < pickables.length; i++) {
            if (pickables[i].name === name) break;
        }
        for (; i < pickables.length - 1; i++) {
            pickables[i] = pickables[i + 1];
        }
        pickables.pop();
        scene.remove(this.boxes[num]);
        for (i = num; i < this.boxes.length - 1; i++) {
            this.boxes[i] = this.boxes[i + 1];
			this.boxes[i].name = i; 
        }
        this.boxes.pop();
        boxid--;
    }
	moveDown(num) {
		this.boxes[num].material = new THREE.MeshLambertMaterial({color: 0XFF2222});
	}
	moveUp(num) {
		this.boxes[num].material = new THREE.MeshLambertMaterial({color: color});
	}
}

class tBox {
    constructor() {
        this.lPoint = new THREE.Vector3(0, 0, 0);
        this.rPoint = new THREE.Vector3(0, 0, 0);
        this.geometry = new THREE.BoxGeometry(Math.abs(this.lPoint.x - this.rPoint.x) + 10, 1, Math.abs(this.lPoint.z - this.rPoint.z) + 10);
        this.material = new THREE.MeshLambertMaterial({color: color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        scene.add(this.mesh);
        this.mesh.visible = false;
    }
    updata() {
        scene.remove(this.mesh);
        this.geometry = new THREE.BoxGeometry(Math.abs(this.lPoint.x - this.rPoint.x) + 10, 1, Math.abs(this.lPoint.z - this.rPoint.z) + 10);
        this.material = new THREE.MeshLambertMaterial({color: color});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set((this.lPoint.x + this.rPoint.x) / 2, (this.lPoint.y + this.rPoint.y) / 2 - 5, (this.lPoint.z + this.rPoint.z) / 2);
        scene.add(this.mesh);
    }
}