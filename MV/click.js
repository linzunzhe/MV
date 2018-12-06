$("#building").click(function() {
	state = "building";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#delete").click(function() {
	state = "delete";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#stretch").click(function() {
	state = "stretch";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#Sview").click(function() {
    camera.position.set(500, 500, 500);
});

$("#move0").click(function() {
	state = "move0";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#move1").click(function() {
	state = "move1";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#move2").click(function() {
	state = "move2";
	grid.visible = false;
	pickplane.position.y = 0;
});

$("#edge").click(function() {
	state = "edge";
	grid.position.set( 0, Height, 0);
	grid.visible = true;
	pickplane.position.y = Height;
});

$("#eSH").click(function() {
	edge_line.visible = !edge_line.visible;
	if(edge_line.visible)$(this).text("HIDE");
	else $(this).text("SHOW");
});

$("#imgUrl").click(function() {
	imgUpdata();
});

$("#imgW").click(function() {
	imgUpdata();
});

$("#imgH").click(function() {
	imgUpdata();
});


$("#img").click(function() {
	imgUpdata();
});

$("#back").click(function() {
	if(backPos.num != -1){
		boxes.boxes[backPos.num].position.set(backPos.pos.x, backPos.pos.y, backPos.pos.z);
		grid.visible = false;
		pickplane.position.y = 0;
	}
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

$("#style").click(function() {
	let str = "url('" + $(this).val() + "')";
	$("#styleBlock").css({"background-image": str});
	boxStyle = $(this).val();
});

function colorUpdata() {
	color.setHSL($("#colorH").val()/360, $("#colorS").val(), $("#colorL").val());
	let str = "hsl(" + $("#colorH").val() + "," + $("#colorS").val()*100 + "%," + $("#colorL").val()*100 + "%)";
	$("#colorBlock").css({"background": str});
}

function imgUpdata() {
	sceneHUD3.remove(imgPlane);
	imgPlane = new THREE.Mesh(new THREE.PlaneGeometry( $("#imgW").val(), $("#imgH").val()), new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture($("#imgUrl").val())}));
	sceneHUD3.add(imgPlane);
}
