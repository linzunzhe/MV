function BuildSofa() {
	var sofa = new THREE.Object3D();
	
	let mesh1 = new THREE.Mesh( new THREE.BoxGeometry( 30, 2, 10), new THREE.MeshBasicMaterial({
		//side: THREE.DoubleSide,
		transparent: true,
		map: THREE.ImageUtils.loadTexture('https://i.imgur.com/kXercwn.jpg')
	}));
	mesh1.position.y = 11;
	sofa.add(mesh1);
	
	let mesh2 = new THREE.Mesh( new THREE.BoxGeometry( 2, 10, 8), new THREE.MeshBasicMaterial({
		//side: THREE.DoubleSide,
		transparent: true,
		map: THREE.ImageUtils.loadTexture('https://i.imgur.com/kXercwn.jpg')
	}));
	mesh2.position.set( 14, 5, 0);
	sofa.add(mesh2);
	
	let mesh3 = new THREE.Mesh( new THREE.BoxGeometry( 2, 10, 8), new THREE.MeshBasicMaterial({
		//side: THREE.DoubleSide,
		transparent: true,
		map: THREE.ImageUtils.loadTexture('https://i.imgur.com/kXercwn.jpg')
	}));
	mesh3.position.set( -14, 5, 0);
	sofa.add(mesh3);
	
	let sofa1 = sofa.clone();
	let sofa2 = sofa.clone();
	let sofa3 = sofa.clone();
	let sofa4 = sofa.clone();
	sofa4.rotation.y = Math.PI/2;
	let sofa5 = sofa4.clone();
	let sofa6 = sofa4.clone();
	let sofa7 = sofa4.clone();
	sofa.position.set( 25, 0, 40);
	sofa1.position.set( -25, 0, 40);
	sofa2.position.set( -25, 0, -40);
	sofa3.position.set( 25, 0, -40);
	sofa4.position.set( 220, 0, 30);
	sofa5.position.set( 220, 0, -30);
	sofa6.position.set( -220, 0, 30);
	sofa7.position.set( -220, 0, -30);
	scene.add(sofa);
	scene.add(sofa1);
	scene.add(sofa2);
	scene.add(sofa3);
	scene.add(sofa4);
	scene.add(sofa5);
	scene.add(sofa6);
	scene.add(sofa7);
}