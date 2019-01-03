var keyDown;

function doKeyDown() {
	keyDown = event.key;console.log(state);
	if(state === "edgeR" || state === "edgeG") {
		if (keyDown === 'q' || keyDown === 'Q') {
			if(Height < 100)Height += 10;
			grid.position.set( 0, Height, 0);
			pickplane.position.y = Height;
		}
		else if(keyDown === 'a' || keyDown === 'A') {
			if(Height > -100)Height -= 10;
			grid.position.set( 0, Height, 0);
			pickplane.position.y = Height;
		}
	}
	else if(state === "setX") {
		if (keyDown === 'q' || keyDown === 'Q') {
			if(old_cameraW.x < 1000)old_cameraW.x += 10;
			cameraW.position.x = old_cameraW.x;
		}
		else if(keyDown === 'a' || keyDown === 'A') {
			if(old_cameraW.x > -1000)old_cameraW.x -= 10;
			cameraW.position.x = old_cameraW.x;
		}
	}
	else if(state === "setY") {
		if (keyDown === 'q' || keyDown === 'Q') {
			if(old_cameraW.y < 1000)old_cameraW.y += 10;
			cameraW.position.y = old_cameraW.y;
		}
		else if(keyDown === 'a' || keyDown === 'A') {
			if(old_cameraW.y > -1000)old_cameraW.y -= 10;
			cameraW.position.y = old_cameraW.y;
		}
	}
	else if(state === "setZ") {
		if (keyDown === 'q' || keyDown === 'Q') {
			if(old_cameraW.z < 1000)old_cameraW.z += 10;
			cameraW.position.z = old_cameraW.z;
		}
		else if(keyDown === 'a' || keyDown === 'A') {
			if(old_cameraW.z > -1000)old_cameraW.z -= 10;
			cameraW.position.z = old_cameraW.z;
		}
	}
}