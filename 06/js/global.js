
// if("geolocation" in navigator){
// 	navigator.geolocation.getCurrentPosition(function(position){
// 		console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
// 	});
// }else{
// 	console.log("Geolocation is not supported in this browser");
// }

// if("geolocation" in navigator){
// 	navigator.geolocation.watchPosition(function(position){
// 		console.log(position);
// 	});
// }else{
// 	console.log("Geolocation error");
// }

function findMe(){
	var map = document.querySelectorAll(".map")[0];

	if("geolocation" in navigator){
		navigator.geolocation.getCurrentPosition(success, error);
	}else{
		map.innerHTML = "Problem with Geolocation!";
	}

	function success(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;

		map.innerHTML = "<strong>Latitude is: </strong>" + lat + "<strong> & Longitude is: </strong> " + lng + "<br/>";

		var key = "AIzaSyC7rNe2v5zIwTyF51vsc3-BRyautpRjWPc";
		var img = new Image();
		img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=13&size=600x600&sensor=false&markers=size:mid|color:red|label:E|" + lat + "," + lng + "&key=" + key;
		map.appendChild(img);
	}

	function error(){
		map.innerHTML = "We couldn't find you. Refresh to try again";
	}

	map.innerHTML = "Locating...";

}

document.querySelectorAll("button")[0].addEventListener("click", findMe);