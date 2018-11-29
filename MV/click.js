$("#building").click(function() {
	state = "building";
});

$("#delete").click(function() {
	state = "delete";
});

$("#stretch").click(function() {
	state = "stretch";
});

$("#Sview").click(function() {
    camera.position.set(500, 500, 500);
});

$("#move0").click(function() {
	state = "move0";
});

$("#move1").click(function() {
	state = "move1";
});

$("#move2").click(function() {
	state = "move2";
});

$("#edge").click(function() {
	state = "edge";
	grid.position.set( 0, Height, 0);
	grid.visible = true;
	pickplane.position.y = Height;
});

$("#back").click(function() {
	if(backPos.num != -1){
		boxes.boxes[backPos.num].position.set(backPos.pos.x, backPos.pos.y, backPos.pos.z);
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
