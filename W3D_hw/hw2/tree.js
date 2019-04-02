function build_leaves( h, color) {
	let obj = new THREE.Object3D();
    
    let mesh1 = new THREE.Mesh(new THREE.CylinderBufferGeometry( 1, h/3, h, 3), new THREE.MeshLambertMaterial({
        color: color
    }));
    mesh1.rotation.x = -Math.PI/1.8;
    mesh1.position.z = -h/2;
    
    let mesh2 = new THREE.Object3D();
    mesh2.add(mesh1.clone());
    
    for(let i = 0; i < 12; i++) {
    	let leaf = mesh2.clone();
    	leaf.rotation.y = Math.PI * i / 6;
    	obj.add(leaf);
    }
    return obj;
}

function build_XmasTree() {
    let obj = new THREE.Object3D();

    let mesh1 = new THREE.Mesh(new THREE.CylinderBufferGeometry( 32, 40, 4, 6), new THREE.MeshLambertMaterial({
        color: 0x705436
    }));
    mesh1.position.y = 2;
    mesh1.rotation.y = Math.PI/6;
    obj.add(mesh1);
    
    let mesh2 = new THREE.Mesh(new THREE.CylinderBufferGeometry( 12, 20, 40, 6), new THREE.MeshLambertMaterial({
        color: 0x9e764a
    }));
    mesh2.position.y = 24;
    mesh2.rotation.y = Math.PI/6;
    obj.add(mesh2);
    
    let mesh3 = build_leaves( 100, 0x286022);
    mesh3.position.y = 40;
    obj.add(mesh3);
    
    let mesh35 = build_leaves( 92, 0x2D6E26);
    mesh35.position.y = 55;
    mesh35.rotation.y = Math.PI/12;
    obj.add(mesh35);
    
    let mesh4 = build_leaves( 85, 0x337c2b);
    mesh4.position.y = 70;
    obj.add(mesh4);
    
    let mesh45 = build_leaves( 77, 0x398A30);
    mesh45.position.y = 85;
    mesh45.rotation.y = Math.PI/12;
    obj.add(mesh45);
    
    let mesh5 = build_leaves( 70, 0x3f9935);
    mesh5.position.y = 100;
    obj.add(mesh5);
    
    let mesh55 = build_leaves( 62, 0x419938);
    mesh55.position.y = 115;
	mesh55.rotation.y = Math.PI/12;
    obj.add(mesh55);
    
    let mesh6 = build_leaves( 55, 0x43993b);
    mesh6.position.y = 130;
    obj.add(mesh6);
    
    let star = new THREE.Object3D();
    
    let starmesh =  new THREE.Mesh(new THREE.CylinderBufferGeometry( 1, 4, 15, 4), new THREE.MeshLambertMaterial({
        color: 0xf4f11a
    }));
    starmesh.position.y = 7.5;
    let starobj = new THREE.Object3D();
    starobj.add(starmesh);
    
    let mesh7 =  new THREE.Mesh(new THREE.CylinderBufferGeometry( 1, 4, 10, 8), new THREE.MeshLambertMaterial({
        color: 0xf4f11a
    }));
    star.add(mesh7);
    
    let mesh8 =  starobj.clone();
    mesh8.position.y = 8;
    star.add(mesh8);
    
    let mesh9 =  starobj.clone();
    mesh9.rotation.z = Math.PI/2.5;
    mesh9.position.y = 8;
    star.add(mesh9);
    
    let mesh10 =  starobj.clone();
    mesh10.rotation.z = Math.PI*2/2.5;
    mesh10.position.y = 8;
    star.add(mesh10);
    
    let mesh11 =  starobj.clone();
    mesh11.rotation.z = Math.PI*3/2.5;
    mesh11.position.y = 8;
    star.add(mesh11);
    
    let mesh12 =  starobj.clone();
    mesh12.rotation.z = Math.PI*4/2.5;
    mesh12.position.y = 8;
    star.add(mesh12);
    
    star.position.y = 157;
    obj.add(star);
	obj.scale.set( 0.25, 0.25, 0.25);
    scene.add(obj);
}