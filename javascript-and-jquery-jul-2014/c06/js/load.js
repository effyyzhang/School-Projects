Function setup(){
	var textInput;
	textInput = document.getElementById('username');
	textInput.focus();
}

window.addEventlistener('load',setup,false);