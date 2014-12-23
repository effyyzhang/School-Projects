// Adding items to start and end of list 
var list = document.getElementsByTagName('ul')[0];

//Add new item to end of the list 
var newItemLast = document.createElement('li');
var newTextLast = document.createTextNode('cream');
newItemLast.appendChild(newTextLast);
list.appendChild(newItemLast);

//Add new Item start of list
var newItemFirst = document.createElement('li');
var newTextFirst = document.createTextNode('sucks');
newItemFirst.appendChild(newTextFirst);
list.insertBefore(newItemFirst, list.firstChild);

var listItems = document.querySelectorAll('li');
var i;
for(i=0; i<listItems.length; i++){
	listItems[i].className = 'cool';
}

var heading = document.querySelector('h2');
var headingText = heading.firstChild.nodeValue;
var totalItems = listItems.length;
var newHeading = headingText + '<span>' + totalItems + '</span>';
heading.innerHTML= newHeading;