var xhr = new XMLHttpRequest();
xhr.onload = function(){
	if(xhr.status === 200){
		var response = xhr.responseXML;
		var events = response.getElementsByTagName('event');

		for(var i = 0, i < events.length; i++){
			var container, image, locaiton, city, newline;
			container = document.createElement('div');
			container.className = 'event';
			image = document.createElement('img');
			image.setAttribute('src', getNodeTextValue(events[i],'map'));
			image.appendChild(document.createTextNode(getNodeValue(events[i],'map')) );
			container.appendChild(image);

			locaiton = document.createElement('p');
			city = document.createElement('b');
			newline = document.createElement('br');
			city.appendChild(document.createTextNode(getNodeValue(events[i],'locaiton')));
			locaiton.appendChild(newline);
			locaiton.insertBefore(city,newline);
			locaiton.appendChild(document.createTextNode(getNodeValue(events[i],'date')));
			container.appendChild(locaiton);

			document.getElementById('content').appendChild(container);
		}

		function getNodeValue(obj, tag){
			return obj.getElementsByTagName[0].firstChild.nodeValue;
		}
	}
};

xhr.open('Get','data/data.xml',true);
xhr.send(null);