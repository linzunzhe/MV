$("#building").click(function() {
	changeButtonImage(0);
	state = "building";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#delete").click(function() {
	changeButtonImage(1);
	state = "delete";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#stretch").click(function() {
	changeButtonImage(2);
	state = "stretch";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#Sview").click(function() {
	changeButtonImage(3);
    camera.position.copy(ScameraPos.clone());
});

/*設定專用視角，暫定，之後要改掉*/
$("#S").click(function() {
	ScameraPos.copy(cameraW.position.clone());
});

$("#move0").click(function() {
	changeButtonImage(4);
	state = "move0";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#move1").click(function() {
	changeButtonImage(5);
	state = "move1";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#move2").click(function() {
	changeButtonImage(6);
	state = "move2";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#back").click(function() {
	buttonFlash(7);
	if(backPos.num != -1){
		boxes.boxes[backPos.num].position.set(backPos.pos.x, backPos.pos.y, backPos.pos.z);
		grid.visible = false;
		pickplane.position.y = 0;
	}
});

$("#bigScene").click(function() {
	$("#container").css({"left": "33.2%", "width": "50vw", "height": "60vh"});
	buttonFlash(8);
});

$("#smallScene").click(function() {
	$("#container").css({"left": "41.6%", "width": "41.6vw", "height": "50vh"});
	buttonFlash(9);
});

$("#edgeR").click(function() {
	changeButtonImage(10);
	state = "edgeR";
	grid.position.set( 0, Height, 0);
	grid.visible = true;
	pickplane.position.y = Height;
});

$("#edgeG").click(function() {
	changeButtonImage(11);
	state = "edgeG";
	grid.position.set( 0, Height, 0);
	grid.visible = true;
	pickplane.position.y = Height;
});

$("#eSH").click(function() {
	edge_lineR.visible = !edge_lineR.visible;
	edge_lineG.visible = !edge_lineG.visible;
	if(edge_lineR.visible)$(this).text("HIDE");
	else $(this).text("SHOW");
});

$("#clear").click(function() {
	scene.remove(edge_lineR);
	edge_lineR = new THREE.Object3D();
	scene.add(edge_lineR);
	scene.remove(edge_lineG);
	edge_lineG = new THREE.Object3D();
	scene.add(edge_lineG);
	edgeR = [];
	edgeG = [];
});

$("#save").click(function() {
	save();
});

$("#play").click(function() {
	state = "play";
	testPlay();
});

$("#imgUrl").click(function() {
	imgUpdata();
});

$("#imgSize").click(function() {
	imgUpdata();
});

$("#colorH").click(function() {
	colorUpdata();
});

$("#colorS").click(function() {
	colorUpdata();
});

$("#colorL").click(function() {
	colorUpdata();
});

function colorUpdata() {
	color.setHSL($("#colorH").val()/360, $("#colorS").val(), $("#colorL").val());
	let str = "hsl(" + $("#colorH").val() + "," + $("#colorS").val()*100 + "%," + $("#colorL").val()*100 + "%)";
	$("#colorBlock").css({"background": str});
}

function imgUpdata() {
	sceneHUD3.remove(imgPlane);
	imgPlaneSize = $("#imgSize").val();
	let texture = new THREE.TextureLoader().load( $("#imgUrl").val(), function ( tex ) {
		setImgPlane( tex.image.width, tex.image.height);
	} );
}

function changeButtonImage(num) {
	$("#building").css({"background-image": "url(" + button_img[0][0] + ")"});
	$("#delete").css({"background-image": "url(" + button_img[1][0] + ")"});
	$("#stretch").css({"background-image": "url(" + button_img[2][0] + ")"});
	$("#Sview").css({"background-image": "url(" + button_img[3][0] + ")"});
	$("#move0").css({"background-image": "url(" + button_img[4][0] + ")"});
	$("#move1").css({"background-image": "url(" + button_img[5][0] + ")"});
	$("#move2").css({"background-image": "url(" + button_img[6][0] + ")"});
	$("#edgeR").css({"background-image": "url(" + button_img[10][0] + ")"});
	$("#edgeG").css({"background-image": "url(" + button_img[11][0] + ")"});
	switch(num){
		case 0:
			$("#building").css({"background-image": "url(" + button_img[0][1] + ")"});
			break;
		case 1:
			$("#delete").css({"background-image": "url(" + button_img[1][1] + ")"});
			break;
		case 2:
			$("#stretch").css({"background-image": "url(" + button_img[2][1] + ")"});
			break;
		case 3:
			$("#Sview").css({"background-image": "url(" + button_img[3][1] + ")"});
			break;
		case 4:
			$("#move0").css({"background-image": "url(" + button_img[4][1] + ")"});
			break;
		case 5:
			$("#move1").css({"background-image": "url(" + button_img[5][1] + ")"});
			break;
		case 6:
			$("#move2").css({"background-image": "url(" + button_img[6][1] + ")"});
			break;
		case 10:
			$("#edgeR").css({"background-image": "url(" + button_img[10][1] + ")"});
			break;
		case 11:
			$("#edgeG").css({"background-image": "url(" + button_img[11][1] + ")"});
			break;
	}
}

function buttonFlash(num) {
	if(num === 7) {
		$("#back").css({"background-image": "url(" + button_img[7][1] + ")"});
		setTimeout(function(){buttonFlash2(num)}, 200);
	}
	else if(num === 8) {
		$("#bigScene").css({"background-image": "url(" + button_img[8][1] + ")"});
		setTimeout(function(){buttonFlash2(num)}, 200);
	}
	else if(num === 9) {
		$("#smallScene").css({"background-image": "url(" + button_img[9][1] + ")"});
		setTimeout(function(){buttonFlash2(num)}, 200);
	}
}

function buttonFlash2(num) {
	if(num === 7) {
		$("#back").css({"background-image": "url(" + button_img[7][0] + ")"});
	}
	else if(num === 8) {
		$("#bigScene").css({"background-image": "url(" + button_img[8][0] + ")"});
	}
	else if(num === 9) {
		$("#smallScene").css({"background-image": "url(" + button_img[9][0] + ")"});
	}
}