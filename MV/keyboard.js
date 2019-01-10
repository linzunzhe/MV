var keyDown;

function doKeyDown() {
	keyDown = event.key;
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
	else if(state === "Axes") {
		if (keyDown === 'w' || keyDown === 'W') {
			if(axes.position.z > -100)axes.position.z -= 5;
		}
		else if(keyDown === 's' || keyDown === 'S') {
			if(axes.position.z < 100)axes.position.z += 5;
		}
		else if(keyDown === 'a' || keyDown === 'A') {
			if(axes.position.x > -100)axes.position.x -= 5;
		}
		else if(keyDown === 'd' || keyDown === 'D') {
			if(axes.position.x < 100)axes.position.x += 5;
		}
	}
}