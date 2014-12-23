$(document).ready(function() {
   var $listItemHTML = $('li').html();
   $('li').append('<li>'+ $listItemHTML +'</li>');
});