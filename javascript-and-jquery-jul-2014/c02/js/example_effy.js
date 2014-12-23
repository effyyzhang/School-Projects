// Create varriables for the welcome message
var greeting = 'Hello';
var name = ' Effy';
var message = ',Check out your order:';

// Concatenate the three variables above to create the welcome message
var welcome = greeting + name + message;

//Get tge element that has an id of greeting
var el = document.getElementById('greeting');

//Replace the content of the element with the personalized welcome message 
el.textContent = welcome; 

//Creat variables to hold details about the sign
var sign = 'Montague House';
var tiles = sign.length;
var subTotal = tiles*5;
var shipping = 7;
var grandTotal  = subTotal+shipping;

//Get the element that has an id of user Sign then update its contents 
var elSign = document.getElementById('userSign');
elSign.textContent = sign;

 var elTiles = document.getElementById('tiles');
 elTiles.textContent = tiles;

// Get the element that has an id of subTotal then update its contents
var elSubTotal = document.getElementById('subTotal');
elSubTotal.textContent = '$' + subTotal;

// Get the element that has an id of shipping then update its contents
var elShipping = document.getElementById('shipping');
elShipping.textContent = '$' + shipping;

// Get the element that has an id of grandTotal then update its contents
var elGrandTotal = document.getElementById('grandTotal');
elGrandTotal.textContent = '$' + grandTotal;