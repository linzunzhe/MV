var lamp = [];
var NL = 100, OL = 100;
class Lamp {
	constructor( x, y, z, r) {
		//lamp
		this.lamp = new THREE.Object3D();
		
		let mesh1 = new THREE.Mesh( new THREE.BoxGeometry( 2, 10, 2), new THREE.MeshBasicMaterial({color: 0x888888}));
		mesh1.position.y = -5;
		this.lamp.add(mesh1);
		
		let obj = new THREE.Object3D();
		
		let mesh2 = new THREE.Mesh( new THREE.BoxGeometry( 5, 10, 5), new THREE.MeshBasicMaterial({color: 0x888888}));
		obj.add(mesh2);
		
		this.mesh3 = new THREE.Mesh( new THREE.CylinderBufferGeometry( 3, 2, 2, 15), new THREE.MeshBasicMaterial({color: 0xffaa00}));
		this.mesh3.position.y = 6;
		obj.add(this.mesh3);
		
		obj.rotation.x = Math.PI*3/4;
		obj.position.set( 0, -10, 2.5);
		this.lamp.add(obj);
		
		//spotlight
		let lighttarget = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshPhongMaterial());
		lighttarget.visible = false;
		lighttarget.position.set( 0, -15, 7);
		this.lamp.add(lighttarget);
		
		this.light = new THREE.SpotLight( 0xffaa00, 1, 100,  Math.PI/4, 0.5);
		this.light.position.set( 0, -13, 5);
		this.light.target = lighttarget;
		this.lamp.add(this.light);
		
		this.lamp.position.set( x, y, z);
		this.lamp.rotation.y = Math.PI/4 * r;
		scene.add(this.lamp);
	}
	
	toggle() {
		this.light.visible = !this.light.visible;
		this.mesh3.visible = !this.mesh3.visible;
	}
}

function BuildLight() {
	lamp[0] = new Lamp( 230, 80, -50, 7);
	lamp[1] = new Lamp( 230, 80, 0, 6);
	lamp[2] = new Lamp( 230, 80, 50, 5);
	
	lamp[3] = new Lamp( -230, 80, -50, 1);
	lamp[4] = new Lamp( -230, 80, 0, 2);
	lamp[5] = new Lamp( -230, 80, 50, 3);
	
	lamp[6] = new Lamp( 30, 80, 30, 5);
	lamp[7] = new Lamp( 30, 80, -30, 7);
	lamp[8] = new Lamp( -30, 80, 30, 3);
	lamp[9] = new Lamp( -30, 80, -30, 1);
	
	lamp[10] = new Lamp( 90, 80, 60, 4);
	lamp[11] = new Lamp( 110, 80, 60, 4);
	lamp[12] = new Lamp( 130, 80, 60, 3);
	
	lamp[13] = new Lamp( 90, 80, -60, 0);
	lamp[14] = new Lamp( 110, 80, -60, 0);
	lamp[15] = new Lamp( 130, 80, -60, 1);
	
	lamp[16] = new Lamp( -90, 80, 60, 4);
	lamp[17] = new Lamp( -110, 80, 60, 4);
	lamp[18] = new Lamp( -130, 80, 60, 5);
	
	lamp[19] = new Lamp( -90, 80, -60, 0);
	lamp[20] = new Lamp( -110, 80, -60, 0);
	lamp[21] = new Lamp( -130, 80, -60, 7);
	
	lamp[22] = new Lamp( 90, 80, 65, 0);
	lamp[23] = new Lamp( 110, 80, 65, 0);
	lamp[24] = new Lamp( 130, 80, 65, 0);
	
	lamp[25] = new Lamp( 200, 80, 65, 0);
	lamp[26] = new Lamp( 220, 80, 65, 0);
	lamp[27] = new Lamp( 240, 80, 65, 0);
	
	lamp[28] = new Lamp( 90, 80, -65, 4);
	lamp[29] = new Lamp( 110, 80, -65, 4);
	lamp[30] = new Lamp( 130, 80, -65, 4);
	
	lamp[31] = new Lamp( 200, 80, -65, 4);
	lamp[32] = new Lamp( 220, 80, -65, 4);
	lamp[33] = new Lamp( 240, 80, -65, 4);
	
	lamp[34] = new Lamp( 235, 80, -50, 2);
	lamp[35] = new Lamp( 235, 80, 0, 2);
	lamp[36] = new Lamp( 235, 80, 50, 2);
	
	lamp[37] = new Lamp( -90, 80, 65, 0);
	lamp[38] = new Lamp( -110, 80, 65, 0);
	lamp[39] = new Lamp( -130, 80, 65, 0);
	
	lamp[40] = new Lamp( -200, 80, 65, 0);
	lamp[41] = new Lamp( -220, 80, 65, 0);
	lamp[42] = new Lamp( -240, 80, 65, 0);
	
	lamp[43] = new Lamp( -90, 80, -65, 4);
	lamp[44] = new Lamp( -110, 80, -65, 4);
	lamp[45] = new Lamp( -130, 80, -65, 4);
	
	lamp[46] = new Lamp( -200, 80, -65, 4);
	lamp[47] = new Lamp( -220, 80, -65, 4);
	lamp[48] = new Lamp( -240, 80, -65, 4);
	
	lamp[49] = new Lamp( -235, 80, -60, 7);
	lamp[50] = new Lamp( -235, 80, -20, 6);
	lamp[51] = new Lamp( -235, 80, 20, 6);
	lamp[52] = new Lamp( -235, 80, 60, 5);
}

function checkLamp(){
	if(NL != OL) {
		let k = NL/100;
		for(let i = 0; i < 53; i++) {
			lamp[i].light.color.r = 1 * k;
			lamp[i].light.color.g = 170/256 * k;
		}
		OL = NL;
	}
}