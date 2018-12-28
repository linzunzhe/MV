/*
測試中的功能，要先按照順序從中間-上面-左邊-右邊來點
*/
var pointNum = 0, screenPts = [ new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2()];

function Point() {
	event.preventDefault();
	mouse.x = (event.clientX / WW2) * 2 - 11;
	mouse.y = -(event.clientY / HH2) * 2 + 4;
	
	if(mouse.x > -1 && mouse.x < 1 && mouse.y > -1 && mouse.y < 1) {
		console.log(mouse);
		screenPts[pointNum].x = mouse.x;
		screenPts[pointNum].y = mouse.y * 2;
		if(pointNum === 1)screenPts[pointNum].x = screenPts[0].x;
		pointNum++;
		if(pointNum === 4)pointNum = 0;
	}
}

function setSview() {
	let f1 = screenPts[0].distanceTo (screenPts[1]);
	let f2 = screenPts[0].distanceTo (screenPts[2]);
	let f3 = screenPts[0].distanceTo (screenPts[3]);

	// estimate camera
	let fs = f1*f1 + f2*f2 + f3*f3;
	let n1 = Math.sqrt ((fs - 2*f1*f1)*0.5);
	let n2 = Math.sqrt ((fs - 2*f2*f2)*0.5);
	let n3 = Math.sqrt ((fs - 2*f3*f3)*0.5);
	
	let n = 500 * Math.sqrt(3);
	cameraW.position.set(n1 * n, n2 * n, n3 * n);
	ScameraPos.copy(cameraW.position.clone());
	console.log(f1 + " " + f2 + " " + f3);
	console.log(cameraW.position);
}