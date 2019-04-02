function Building() {
	let obj = new THREE.Object3D();
	let mat = new THREE.MeshPhongMaterial({color: 0xffffff});
	
	let mesh1 = new THREE.Mesh( new THREE.BoxGeometry( 10, 50, 60), mat);
	mesh1.position.set( 265, 25, -70);
	obj.add(mesh1);
	
	let mesh2 = new THREE.Mesh( new THREE.BoxGeometry( 10, 50, 60), mat);
	mesh2.position.set( 265, 25, 70);
	obj.add(mesh2);
	
	let mesh3 = new THREE.Mesh( new THREE.BoxGeometry( 220, 50, 10), mat);
	mesh3.position.set( 160, 25, -105);
	obj.add(mesh3);
	 
	let mesh4 = new THREE.Mesh( new THREE.BoxGeometry( 220, 50, 10), mat);
	mesh4.position.set( 160, 25, 105);
	obj.add(mesh4);
	
	let mesh5 = new THREE.Mesh( new THREE.BoxGeometry( 10, 50, 60), mat);
	mesh5.position.set( 55, 25, -70);
	obj.add(mesh5);
	
	let mesh6 = new THREE.Mesh( new THREE.BoxGeometry( 10 , 50, 60), mat);
	mesh6.position.set( 55, 25, 70);
	obj.add(mesh6);
	
	let mesh7 = new THREE.Mesh( new THREE.BoxGeometry( 10, 50, 100), mat);
	mesh7.position.set( 175, 25, 0);
	obj.add(mesh7);
	
	let mesh8 = new THREE.Mesh( new THREE.BoxGeometry( 110, 50, 10), mat);
	mesh8.position.set( 115, 25, 0);
	obj.add(mesh8);
	
	let mesh9 = new THREE.Mesh( new THREE.BoxGeometry( 100, 50, 10), mat);
	mesh9.position.set( 0, 25, -55);
	obj.add(mesh9);
	
	let mesh10 = new THREE.Mesh( new THREE.BoxGeometry( 100, 50, 10), mat);
	mesh10.position.set( 0, 25, 55);
	obj.add(mesh10);
	
	let mesh11 = new THREE.Mesh( new THREE.BoxGeometry( 10, 50, 200), mat);
	mesh11.position.set( -265, 25, 0);
	obj.add(mesh11);
	
	let mesh12 = new THREE.Mesh( new THREE.BoxGeometry( 220, 50, 10), mat);
	mesh12.position.set( -160, 25, -105);
	obj.add(mesh12);
	
	let mesh13 = new THREE.Mesh( new THREE.BoxGeometry( 220, 50, 10), mat);
	mesh13.position.set( -160, 25, 105);
	obj.add(mesh13);
	
	let mesh14 = new THREE.Mesh( new THREE.BoxGeometry( 10, 50, 60), mat);
	mesh14.position.set( -55, 25, -70);
	obj.add(mesh14);
	
	let mesh15 = new THREE.Mesh( new THREE.BoxGeometry( 10, 50, 60), mat);
	mesh15.position.set( -55, 25, 70);
	obj.add(mesh15);
	
	let mesh16 = new THREE.Mesh( new THREE.BoxGeometry( 10, 50, 100), mat);
	mesh16.position.set( -175, 25, 0);
	obj.add(mesh16);
	
	let mesh17 = new THREE.Mesh( new THREE.BoxGeometry( 110, 50, 10), mat);
	mesh17.position.set( -115, 25, 0);
	obj.add(mesh17);
	
	let mesh18 = new THREE.Mesh( new THREE.BoxGeometry( 30, 40, 10), mat);
	mesh18.position.set( 265, 20, -35);
	obj.add(mesh18);
	
	let mesh19 = new THREE.Mesh( new THREE.BoxGeometry( 30, 40, 10), mat);
	mesh19.position.set( 265, 20, 35);
	obj.add(mesh19);
	
	let mesh20 = new THREE.Mesh( new THREE.BoxGeometry( 10, 10, 80), mat);
	mesh20.position.set( 265, 45, 0);
	obj.add(mesh20);
	
	let mesh21 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100), new THREE.MeshPhongMaterial({
		//side: THREE.DoubleSide,
		transparent: true,
		map: THREE.ImageUtils.loadTexture('https://i.imgur.com/eALXDlV.jpg')
	}));
	mesh21.rotation.x = -Math.PI/2;
	mesh21.material.map.repeat.set(5, 5);
	mesh21.material.map.wrapS = THREE.RepeatWrapping;
	mesh21.material.map.wrapT = THREE.RepeatWrapping;
	obj.add(mesh21);
	
	let mesh22 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 220, 220), new THREE.MeshPhongMaterial({
		//side: THREE.DoubleSide,
		transparent: true,
		map: THREE.ImageUtils.loadTexture('https://i.imgur.com/kXercwn.jpg')
	}));
	mesh22.rotation.x = -Math.PI/2;
	mesh22.position.x = 160;
	mesh22.material.map.repeat.set(22, 22);
	mesh22.material.map.wrapS = THREE.RepeatWrapping;
	mesh22.material.map.wrapT = THREE.RepeatWrapping;
	obj.add(mesh22);
	
	let mesh23 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 220, 220), new THREE.MeshPhongMaterial({
		//side: THREE.DoubleSide,
		transparent: true,
		map: THREE.ImageUtils.loadTexture('https://i.imgur.com/kXercwn.jpg')
	}));
	mesh23.rotation.x = -Math.PI/2;
	mesh23.position.x = -160;
	mesh23.material.map.repeat.set(22, 22);
	mesh23.material.map.wrapS = THREE.RepeatWrapping;
	mesh23.material.map.wrapT = THREE.RepeatWrapping;
	obj.add(mesh23);
	
	scene.add(obj);
}