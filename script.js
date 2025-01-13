// golbal functions 
var TimeFromLastStarted = 0;
var lastClockTime = 0;
let numberOfLapes = 0;
let timeFromLastLap = 0;
var lapTime = 0;
let lastLapTime = 0;
let lapStringBox = "";
let cookieObj;

function parseCookies() {
  const cookies = document.cookie ? document.cookie.split(';') : [];
  const cookieObj = {};
  cookies.forEach(cookie => {
    const parts = cookie.split('=');
    cookieObj[parts.shift().trim()] = decodeURIComponent(parts.join('='));
  });
  return cookieObj;
}



function deleteAllCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = "cookiesExist=false; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT path=/";
    });
}


function start(){
	cookieObj = parseCookies();

	if(!cookieObj.cookiesExist){

		lapTime = 0;
		TimeFromLastStarted =  new Date();
		numberOfLapes = 2;
		lastClockTime = 0;
		timeFromLastLap = 0;
		newTimeStr = "0".toString().padStart(6, '0');
		newTimeStr = ""+newTimeStr.slice(0,-4)+":"+newTimeStr.slice(-4,-2)+"'"+newTimeStr.slice(-2)+"''";
		$('.time').text(newTimeStr);
		$("#lapBox").html(`<div class="LapDisplay">(Lap:1)<span id="LapTime">00:00:00'00''</span></div><textarea name="Boxtextarea" id="textarea0"></textarea>`)
	} else {
		lapTime = cookieObj.lapTime;
		TimeFromLastStarted = cookieObj.TimeFromLastStarted; 
		numberOfLapes = cookieObj.numberOfLapes;
		lastClockTime = cookieObj.lastClockTime;
		timeFromLastLap = cookieObj.timeFromLastLap;
		$('.time').text(cookieObj.MainTime);
		$("#lapBox").html(cookieObj.LapBox);
	}

	document.cookie = "cookiesExist=true; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}
	

function restart(){
	deleteAllCookies();
	lapTime = 0;
	TimeFromLastStarted =  new Date();
	numberOfLapes = 2;
	lastClockTime = 0;
	timeFromLastLap = 0;
	newTimeStr = "0".toString().padStart(8, '0');
	newTimeStr =  newTimeStr.slice(0,-6)+":"+newTimeStr.slice(-6,-4)+":"+newTimeStr.slice(-4,-2)+"'"+newTimeStr.slice(-2)+"''";
	$('.time').text(newTimeStr);
	$("#lapBox").html(`<div class="LapDisplay">(Lap:1)<span id="LapTime">00:00:00'00''</span></div><textarea name="Boxtextarea" id="textarea1" rows="4" cols="50"></textarea>`)

	
	document.cookie = `lapTime=${lapTime}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `TimeFromLastStarted=${TimeFromLastStarted}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `numberOfLapes=${numberOfLapes}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `lastClockTime=${lastClockTime}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `timeFromLastLap=${timeFromLastLap}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `MainTime=${newTimeStr}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `LapBox=${encodeURIComponent($('#lapBox').first().html())}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
	cookieObj = parseCookies();

}

setInterval(function() {
  $("textarea").each(function(index, element) {
    const $element = $(element); // Wrap the plain DOM element in a jQuery object
    const text = $element.first().val(); // Get the value of the textarea
    $element.text(text);         // Update the textarea text (if needed)
  });
  document.cookie = `LapBox=${encodeURIComponent($('#lapBox').first().html())}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}, 150);

function updateColock(){

	var timerText 	= $('.time').text();

	timerText 		= timerText.replace(/\D/g,'');

	timerNum 		= parseInt(timerText,10);

	timerNum 		*= 10;

	timePased 		= Date.now()-TimeFromLastStarted;

	var addTime 	= (timePased-timerNum);

	timerNum 		+= addTime;

	lapTime 		= timerNum-timeFromLastLap;

	lastClockTime 	= timerNum;

	lastLapTime 	= lapTime;

	timerNum 		= Math.floor(timerNum/10);

	lapTime 		= Math.floor(lapTime/10);

	timerNum 		= 10000*Math.trunc(timerNum/6000) 		+ timerNum	%6000;
	timerNum		= 1000000*Math.trunc(timerNum/600000)	+ timerNum	%600000;

	lapTime 		= (10000*Math.trunc(lapTime/6000) 		+ lapTime	%6000);
	lapTime			= 1000000*Math.trunc(lapTime/600000)	+ lapTime	%600000;

	newTimeStr	 	= timerNum.toString().padStart(8, '0');
	newTimeStr 		= newTimeStr.slice(0,-6)+":"+newTimeStr.slice(-6,-4)+":"+newTimeStr.slice(-4,-2)+"'"+newTimeStr.slice(-2)+"''";

	$('.time').text(newTimeStr);

	newLapTimestr 	= lapTime.toString().padStart(8, '0');

	newLapTimestr 	= newLapTimestr.slice(0,-6)+":"+newLapTimestr.slice(-6,-4)+":"+newLapTimestr.slice(-4,-2)+"'"+newLapTimestr.slice(-2)+"''";

	$('#LapTime').text(newLapTimestr);

	document.cookie = `lapTime=${lapTime}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `TimeFromLastStarted=${TimeFromLastStarted}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `numberOfLapes=${numberOfLapes}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `lastClockTime=${lastClockTime}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `timeFromLastLap=${timeFromLastLap}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `MainTime=${newTimeStr}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `LapBox=${encodeURIComponent($('#lapBox').html())}; SameSite=None; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
	cookieObj = parseCookies();
}



$( document ).ready(function() {
	start();
	document.cookie = "cookiesExist=true; SameSite=None; Secure";
	cookieObj = parseCookies();
});

$('#StartStopButton').on('click', function (e) {
	e.preventDefault();

	// toggler from stop to start
	$(this).text(function (_, text) {
		return text === 'Stop' ? 'Start' : 'Stop';
	}).toggleClass('stop_button').toggleClass('start_button');

	if($(this).hasClass('stop_button')){

		clearInterval(intervalIdStopWatchTimer);

		// Toggle Lap to clear
		$('#lapButton').text(function (_, text) {
			return text === 'Lap' ? 'Clear' : 'Lap';
		}).toggleClass('clear_button').toggleClass('Lap_button');

		console.log("stop");
	}

	if($(this).hasClass('start_button')){

		TimeFromLastStarted = Date.now() - lastClockTime;

		intervalIdStopWatchTimer = setInterval(updateColock,1);

		// Toggle Lap to clear
		$('#lapButton').text(function (_, text) {
		return text === 'Lap' ? 'Clear' : 'Lap';
		}).toggleClass('clear_button').toggleClass('Lap_button');

		console.log('start');
		
	}

});


$('#lapButton').on('click', function (e) {

	if($(this).hasClass('clear_button')) {
		restart();
		console.log('clear');
	}

	if($(this).hasClass('Lap_button')) {
		timeFromLastLap = lastLapTime;
	
		// Append the new div to the container
		$("#lapBox").prepend(`<div class="LapDisplay" id="Lap">(Lap:${numberOfLapes})<span id="LapTime">00:00:00'00''</span></span></div><textarea name="Boxtextarea" id="textarea${numberOfLapes}" rows="4" cols="50"></textarea>`);
		
		numberOfLapes++;
		
		console.log('lap');

		lapStringBox = $(`#lapBox`).first().html();
	}
});
