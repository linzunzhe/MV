var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var pickables = [];
var mouseDown = false;
var num;
var pickNum = -1;//當前點擊的方塊ID
var backPos = {num: -1, pos: new THREE.Vector3(0, 0, 0)};//移動後返回用
var evenpos = new THREE.Vector3(0, 0, 0);//移動時確保在格子上

function xxyy(point) {
    let x = point.x;
    let y = point.y;
    let z = point.z;
    let w = 5;

    let xx = x > 0 ? 1 : -1;
    x -= w;
    if (x < 0) x *= -1;
    x = (x + w) - (x + w) % (w + w);
    x *= xx;
    x += w;

    let yy = y > 0 ? 1 : -1;
    y -= w;
    if (y < 0) y *= -1;
    y = (y + w) - (y + w) % (w + w);
    y *= yy;
    y += w;

    let zz = z > 0 ? 1 : -1;
    z -= w;
    if (z < 0) z *= -1;
    z = (z + w) - (z + w) % (w + w);
    z *= zz;
    z += w;

    let pos = new THREE.Vector3(x, y, z);
    return pos;
}

function changePos(num) {
    evenpos.x = ((boxes.boxes[num].geometry.parameters.width / 10) % 2 === 0 ? 5 : 0);
    evenpos.y = ((boxes.boxes[num].geometry.parameters.height / 10) % 2 === 0 ? 5 : 0);
    evenpos.z = ((boxes.boxes[num].geometry.parameters.depth / 10) % 2 === 0 ? 5 : 0);
}

function rotateBillboard() {
	let v = camera.position.clone();
    v.subVectors(v, billBoard.position.clone());
    let vx = Math.abs(v.x);
    let vz = Math.abs(v.z);
    let th = Math.atan(v.x/v.z);
    if(v.z<0)th += Math.PI;
    billBoard.rotation.y = th;
}

function onDocumentMouseDown(event) {
	event.preventDefault();
    mouse.x = (event.clientX / WW1) * 2 - 1 - 4/3;
    mouse.y = -(event.clientY / HH1) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(pickables);
	if (intersects.length > 0 && event.button === 0) {
		num = intersects[0].object.name;
		if(state === "building") { //building
			controls.enableRotate = false; //鏡頭旋轉禁止
			mouseDown = true;
			intersects[0].point.y = 5;
			tbox.lPoint.copy(xxyy(intersects[0].point));
            tbox.rPoint.copy(xxyy(intersects[0].point));
            tbox.updata();
            tbox.mesh.visible = true;
		}
		else if(state === "move0" && num != "building") { //move0  XZ平面移動
			controls.enableRotate = false; //鏡頭旋轉禁止
			mouseDown = true;
			pickNum = num;
			backPos.num = num;
			backPos.pos = boxes.boxes[num].position.clone();
			changePos(num);
			grid.visible = true;
            gridXZ.visible = false;
			grid.rotation.set(0, 0, 0);
			grid.position.set(0, boxes.boxes[num].position.y, 0);
			pickplane.rotation.set(0, 0, 0);
			pickplane.position.set(0, boxes.boxes[num].position.y, 0);
		}
		else if(state === "move1" && num != "building") { //move1  XY平面移動
			controls.enableRotate = false; //鏡頭旋轉禁止
			mouseDown = true;
			pickNum = num;
			backPos.num = num;
			backPos.pos = boxes.boxes[num].position.clone();
			changePos(num);
			grid.visible = true;
            gridXZ.visible = false;
			grid.rotation.set(Math.PI / 2, 0, 0);
			grid.position.set(0, 0, boxes.boxes[num].position.z);
			pickplane.rotation.set(Math.PI / 2, 0, 0);
			pickplane.position.set(0, 0, boxes.boxes[num].position.z);
		}
		else if(state === "move2" && num != "building") { //move2  YZ平面移動
			controls.enableRotate = false; //鏡頭旋轉禁止
			mouseDown = true;
			pickNum = num;
			backPos.num = num;
			backPos.pos = boxes.boxes[num].position.clone();
			changePos(num);
			grid.visible = true;
            gridXZ.visible = false;
			grid.rotation.set(0, 0, Math.PI / 2);
			grid.position.set(boxes.boxes[num].position.x, 0, 0);
			pickplane.rotation.set(0, 0, Math.PI / 2);
			pickplane.position.set(boxes.boxes[num].position.x, 0, 0);
		}
		else if(state === "delete" && num != "building") { //delete
			boxes.delete(num);
			backPos.num = -1;
		}
		else if(state === "stretch" && num != "building") { //stretch
			controls.enableRotate = false;
			let pos = xxyy(boxes.boxes[num].position.clone());
			billBoard.position.x = pos.x;
			billBoard.position.z = pos.z;
			rotateBillboard();
			billBoard.visible = true;
			pickNum = num;
			mouseDown = true;
		}
		else if(state === "edge") {
		}
	}
}

function onDocumentMouseUp(event) {
	if(mouseDown === true) {	
		event.preventDefault();
		mouse.x = (event.clientX / WW1) * 2 - 1 - 4/3;
		mouse.y = -(event.clientY / HH1) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);
		let intersects = raycaster.intersectObjects(pickables);
		if (intersects.length > 0 && event.button === 0) {
			num = intersects[0].object.name;
			if(state === "building") { //building
				controls.enableRotate = true; //鏡頭旋轉開啟
				tbox.mesh.visible = false;
                boxes.push(tbox.lPoint, tbox.rPoint);
				mouseDown = false;
			}
			else if((state === "move0" || state === "move1" || state === "move2") && pickNum != -1) { //move
				controls.enableRotate = true;
				mouseDown = false;
				pickNum = -1;
				grid.visible = false;
                gridXZ.visible = true;
                controls.enableRotate = true;
                grid.rotation.set(0, 0, 0);
                pickplane.rotation.set(0, 0, 0);
                pickplane.position.set(0, 0, 0);
			}
			else if(state === "stretch" && pickNum != -1) { //stretch
				controls.enableRotate = true;
				billBoard.visible = false;
				mouseDown = false;
				pickNum = -1;
			}
		}
	}
}

function onDocumentMouseMove(event) {
	if(mouseDown === true) {
		event.preventDefault();
		mouse.x = (event.clientX / WW1) * 2 - 1 - 4/3;
		mouse.y = -(event.clientY / HH1) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);
		let intersects = raycaster.intersectObjects(pickables);
		let pos = xxyy(intersects[0].point);
		if (intersects.length > 0 && event.button === 0) {
			num = intersects[0].object.name;
			if(state === "building") { //building
				if (pos.x > 100 || pos.x < -100 || pos.y > 100 || pos.y < -100 || pos.z > 100 || pos.z < -100) { //超過邊界
                    controls.enableRotate = true; //鏡頭旋轉開啟
					tbox.mesh.visible = false;
					boxes.push(tbox.lPoint, tbox.rPoint);
					mouseDown = false;
                }
				else {
					intersects[0].point.y = 5;
					tbox.rPoint.copy(xxyy(intersects[0].point));
					tbox.updata();
				}
			}
			else if(state === "move0" && pickNum != -1) { //move0  XZ平面移動
				if (pos.x > 100 || pos.x < -100 || pos.y > 100 || pos.y < -100 || pos.z > 100 || pos.z < -100) { //超過邊界
                    controls.enableRotate = true;
					mouseDown = false;
					pickNum = -1;
					grid.visible = false;
					gridXZ.visible = true;
					controls.enableRotate = true;
					grid.rotation.set(0, 0, 0);
					pickplane.rotation.set(0, 0, 0);
					pickplane.position.set(0, 0, 0);
                }
				else {
					boxes.boxes[pickNum].position.x = pos.x + evenpos.x;
					boxes.boxes[pickNum].position.z = pos.z + evenpos.z;
				}
			}
			else if(state === "move1" && pickNum != -1) { //move1  XY平面移動
				if (pos.x > 100 || pos.x < -100 || pos.y > 100 || pos.y < -100 || pos.z > 100 || pos.z < -100) { //超過邊界
                    controls.enableRotate = true;
					mouseDown = false;
					pickNum = -1;
					grid.visible = false;
					gridXZ.visible = true;
					controls.enableRotate = true;
					grid.rotation.set(0, 0, 0);
					pickplane.rotation.set(0, 0, 0);
					pickplane.position.set(0, 0, 0);
                }
				else {
					boxes.boxes[pickNum].position.x = pos.x + evenpos.x;
					boxes.boxes[pickNum].position.y = pos.y + evenpos.y;
				}
			}
			else if(state === "move2" && pickNum != -1) { //move2  YZ平面移動
				if (pos.x > 100 || pos.x < -100 || pos.y > 100 || pos.y < -100 || pos.z > 100 || pos.z < -100) { //超過邊界
                    controls.enableRotate = true;
					mouseDown = false;
					pickNum = -1;
					grid.visible = false;
					gridXZ.visible = true;
					controls.enableRotate = true;
					grid.rotation.set(0, 0, 0);
					pickplane.rotation.set(0, 0, 0);
					pickplane.position.set(0, 0, 0);
                }
				else {
					boxes.boxes[pickNum].position.y = pos.y + evenpos.y;
					boxes.boxes[pickNum].position.z = pos.z + evenpos.z;
				}
			}
			else if(state === "stretch" && pickNum != -1) { //stretch
				boxes.stretch(pickNum, xxyy(intersects[0].point));
			}
		}
	}
}