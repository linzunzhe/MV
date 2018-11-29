var boxid = 0;
var color = new THREE.Color(0x4444ff);
var boxStyle = "https://i.imgur.com/DII1KaT.png";

class Box {
    constructor() {
        this.boxes = [];
    }
    push(pos0, pos1) {
		let textureX = THREE.ImageUtils.loadTexture(boxStyle);
		let textureZ = THREE.ImageUtils.loadTexture(boxStyle);
		textureX.repeat.set((Math.abs(pos0.z - pos1.z) + 10) / 10, 1);
		textureX.wrapS = THREE.RepeatWrapping;
		textureX.wrapT = THREE.RepeatWrapping;
		//textureX.minFilter = THREE.LinearFilter;
		textureZ.repeat.set((Math.abs(pos0.x - pos1.x) + 10) / 10, 1);
		textureZ.wrapS = THREE.RepeatWrapping;
		textureZ.wrapT = THREE.RepeatWrapping;
		//textureY.minFilter = THREE.LinearFilter;
		let material = new THREE.MultiMaterial([new THREE.MeshLambertMaterial({ // +x
				color: color,
				transparent: true,
				map: textureX
			}),
			new THREE.MeshLambertMaterial({ // -x
				color: color,
				transparent: true,
				map: textureX
			}),
			new THREE.MeshLambertMaterial({ // +y
				color: color
			}),
			new THREE.MeshLambertMaterial({ // -Y
				color: color
			}),
			new THREE.MeshLambertMaterial({ // +z
				color: color,
				transparent: true,
				map: textureZ
			}),
			new THREE.MeshLambertMaterial({ // -Z
				color: color,
				transparent: true,
				map: textureZ
			})
		]);
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