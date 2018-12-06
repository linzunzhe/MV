var keyDown;

function doKeyDown() {
	keyDown = event.key;
	if(state === "edge") {
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
}