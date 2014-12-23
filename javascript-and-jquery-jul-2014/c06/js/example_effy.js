var username, noteName, textEntered, target;
noteName = document.getElementById('noteName');
function writeLabel(e){
	if(!e){
		e = window.event;
	}

	target = event.target || event.srcElement;
	textEntered = e.target.value;
	noteName.textContent = textEntered;
}

if(document.addEventListener){
	document.addEventListener('click', function(e){
		recorderControls(e);
	},false);

	username.addEventListener('input', writeLabel, false);
} else {
	document.attachEvent('onclick',function(e){
		recorderControls(e);
	});

	username.attachEvent('onkeyup', writeLabel, false)
}