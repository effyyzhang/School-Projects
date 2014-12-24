function GetTime(id)
{
	date = new Date;
	day = date.getDay();
	h = date.getHours();
	if(h<10)
		{
		    h = "0"+h;
		}
	m = date.getMinutes();
	if(m<10)
		{
		    m = "0"+m;
		}
	s = date.getSeconds();
	if(s<10)
		{
		    s = "0"+s;
		}
	result = +h+':'+m+':'+s;

	document.getElementById(id).innerHTML = result;
	setTimeout('GetTime("'+id+'");','1000');
	return true;
}

var hjs = HueJS({
                    ipAddress:"192.168.0.108",
                    devicetype:"test2",
                    username: "effyzhang1"
                });

 
 function Flux()
 {
	
    date = new Date;
	
	var preMin = null;
	var Min = date.getMinutes();

	if( Min != preMin){
		preMin = Min;
		hjs.setHueSat([1,2],Min*1000,255);
		console.log(Min*1000);
	}

	else{
	console.log('NOT interesting');
	};	
	setTimeout(Flux, 1000);
}
