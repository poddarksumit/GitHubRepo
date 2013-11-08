var map;
var marker ;
var infowindow;
var autocomplete;
var directionsDisplay;
var input;
var goldStar = {
		 // path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
		path : 'M30,50 C40,20 25,20 35,30',
		  fillColor: "green",
		  
		  fillOpacity: 0.8,
		  scale: 1,
		  strokeColor: "black",
		  strokeWeight: 1
		};

function updateMapWithDirection(){
	infowindow.close();
	directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	var start = $('#hiddenCurrentPlaceLat').val()+','+$('#hiddenCurrentPlaceLng').val();
    var end = $('#hiddenDestPlaceLat').val()+','+$('#hiddenDestPlaceLng').val();
    var request = {
      origin:start, 
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsDisplay.setMap(map);
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          var distance = parseFloat(response.routes[0].legs[0].distance.value*0.001).toFixed(2);
          $('#distance-cal').html(distance+" Kms");
          if(jQuery.support.ajax){
	          $.ajax({
				url: '/WebContent/templates/include/inc_cal_price.jsp', //store search script
				//dataType: "json",
				data: {
					distance:distance,
					ajax: true
				},
				success: function(response, textStatus){
					$('#hidden-cab-fare').val(response.JSON.cabFare);
					$('#hidden-auto-fare').val(response.JSON.autoFare);
					assignPrice();
				},
				error: function(jqXHR, textStatus, errorThrown){
					alert(errorThrown);
				}
			});
        }else {
        	alert("This Browser does not supports ajax. Calculation of fares will not take place.");
        }
        }
      });
}
function updateLocationMarker(lat,lng,type){
	infowindow.close();
    marker.setVisible(false);
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        icon: new google.maps.MarkerImage(
                "/WebContent/media/images/map-a.png", // reference from your base
                new google.maps.Size(40, 40), // size of image to capture
                new google.maps.Point(0, 0), // start reference point on image (upper left)
                new google.maps.Point(10, 10), // point on image to center on latlng (scaled)
                new google.maps.Size(20, 20) // actual size on map
            ),
        map: map
      });
}
function updateMapMarker(input,autocomplete){
    infowindow.close();
    marker.setVisible(false);
    input.className = '';
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // Inform the user that the place was not found and return.
      input.className = 'notfound';
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); 
    }
    
    marker.setPosition(place.geometry.location);
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(', ');
    }
    var addressFormattedArray = address.split(", ");
    var addressFormatted = '';
    var indexTemp=0;
    addressFormattedArray = eval(addressFormattedArray);
    for(var index =0;index<addressFormattedArray.length;index++){
 	   if(indexTemp==0){
 		   addressFormatted = addressFormatted+ addressFormattedArray[index];
 		   indexTemp = indexTemp+1;
 	   }else {
 		   addressFormatted = addressFormatted+"_" + addressFormattedArray[index];
 	   }
    }
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address+'<hr/>'
 		   +'<button id="setLocationMap" onclick="setLocationDetails(this);" data-place-name="'+place.name+'" data-place-address="'+addressFormatted+'" data-place-lat="'+place.geometry.location.lat()+'" data-place-lng="'+place.geometry.location.lng()+'"  >Set Location</button></div>');
    infowindow.open(map, marker);
  }
function setSourceLocation(htmlVal,placeName,address){
	$('#hiddenCurrentPlaceName').val(placeName);
	$('#hiddenCurrentPlaceAddress').val(address);
	$('#hiddenCurrentPlaceLat').val($('#setLocationMap').attr('data-place-lat'));
	$('#hiddenCurrentPlaceLng').val($('#setLocationMap').attr('data-place-lng'));
	$('input[name="searchYourCurrentLocation"]').val('');
	$('input[name="searchYourCurrentLocation"]').attr('disabled','disabled');
	if($('#final-dest-location').css("display") == 'none'){
		$('input[name="searchdestLocation"]').removeAttr('disabled');
	}
	$('#current-location').attr('disabled','disabled');
	$('#final-current-location').show();
	$('#final-current-location').addClass('location-set');
	$('#current-location-field').html(htmlVal);
	if(($('#final-current-location').hasClass('location-set')) && ($('#final-dest-location').hasClass('location-set'))){
		updateMapWithDirection();
	}else {
		updateAutoCompleteInputTag('searchDestLocationField');
	}
	//updateLocationMarker($('#setLocationMap').attr('data-place-lat'),$('#setLocationMap').attr('data-place-lng'),'S');
}
function setDestinationLocation(htmlVal,placeName,address){
	
	$('#hiddenDestPlaceName').val(placeName);
	$('#hiddenDestPlaceAddress').val(address);
	$('#hiddenDestPlaceLat').val($('#setLocationMap').attr('data-place-lat'));
	$('#hiddenDestPlaceLng').val($('#setLocationMap').attr('data-place-lng'));
	$('input[name="searchdestLocation"]').val('');
	$('input[name="searchdestLocation"]').attr('disabled','disabled');
	$('input[name="searchdestLocation"]').attr('id','searchTextField');
	$('#final-dest-location').show();
	$('#final-dest-location').addClass('location-set');
	$('#dest-location-field').html(htmlVal);
	if(($('#final-current-location').hasClass('location-set')) && ($('#final-dest-location').hasClass('location-set'))){
		updateMapWithDirection();
	}
}
function setLocationDetails(){
	var placeName = $('#setLocationMap').attr('data-place-name');
	var placeAddress = $('#setLocationMap').attr('data-place-address');
	var placeAddressArray = placeAddress.split("_");
	var address='';
	var htmlVal = '';
	htmlVal = '<b>'+placeName+'</b>' +'<br/> <div class="current-location-field">';
	placeAddressArray = eval(placeAddressArray);
	var index = 0;
	for(var i = 0;i<placeAddressArray.length;i++){
		if(index == 0){
			htmlVal = htmlVal+placeAddressArray[i];
			address = address+placeAddressArray[i];
			index = index+1;
		}else {
			htmlVal = htmlVal+", "+placeAddressArray[i];
			address = address+", "+placeAddressArray[i];
		}
		
	}
	htmlVal = htmlVal+'</div><br/>';
	if((!$('input[name="searchYourCurrentLocation"]').attr('disabled')) && 
			($('input[name="searchdestLocation"]').attr('disabled'))){
		setSourceLocation(htmlVal,placeName,address);
	}else if(($('input[name="searchYourCurrentLocation"]').attr('disabled')) && 
			(!$('input[name="searchdestLocation"]').attr('disabled'))) {
		setDestinationLocation(htmlVal,placeName,address);
	}
	
}
function updateAutoCompleteInputTag(inputTag){
	 input = document.getElementById(inputTag);
	 autocomplete = new google.maps.places.Autocomplete(input);
	 autocomplete.bindTo('bounds', map);
	 google.maps.event.addListener(autocomplete, 'place_changed', function() {
	    	updateMapMarker(input,autocomplete);
	    });
}

function initialize() {
	"use strict";
	var address = '';
	 var mapOptions = {
      //center: new google.maps.LatLng(13.09, 80.27),22.0, 81.0
      //zoom: 13,
      center: new google.maps.LatLng(13.09, 80.27),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      types: ['(cities)'],
      componentRestrictions: {country: 'in'}
    };
    map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);
    infowindow = new google.maps.InfoWindow();
    input = document.getElementById('searchSrcLocationField');
    autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo('bounds', map);
    marker = new google.maps.Marker({
      map: map
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
    	updateMapMarker(input,autocomplete);
    });

    
  }
	google.maps.event.addListener(window, 'load', initialize);
	
$(document).ready(function (){
	$('#final-current-location-remove').click(function(e){
		e.preventDefault();
		$('input[name="searchYourCurrentLocation"]').removeAttr('disabled');
		$('input[name="searchdestLocation"]').attr('disabled','disabled');
		$('#current-location').removeAttr('disabled');
		$('#current-location-field').html('');
		$('#final-current-location').hide();
		$('#final-current-location').removeClass('location-set');
		initialize();
	});
	$('#final-dest-location-remove').click(function(e){
		e.preventDefault();
		$('input[name="searchdestLocation"]').removeAttr('disabled');
		$('#dest-location-field').html('');
		$('#final-dest-location').hide();
		$('#final-dest-location').removeClass('location-set');
		initialize();
	});
function searchCurrentLocStoreFinder(position, $object){ //do geo
	$object.find('input[name="latitude"]').attr('value', position.coords.latitude);
	$object.find('input[name="longitude"]').attr('value', position.coords.longitude);
}

	$('#current-location').each(function(){
		if (supports_geolocation()) { 
			$(this).click(function(e) {
				e.preventDefault();
				$object = $(this);
				navigator.geolocation.getCurrentPosition(function(position){
					updateMap(position);
					
				}, function(error){
					switch(error.code) {
					  case error.TIMEOUT:
						alert('Unable to locate your position, please try again.');
						break;
					  default:
						alert('Please make sure your Location Services are enabled.');
						break;
					};
				}, {
					timeout: 10000
				});
			});
		} else { 
			alert('Your browser does not supports google location. Please try again in the browser which supprts the same.');
		}
	});
function updateMap(position){
	var bounds = new google.maps.LatLngBounds();
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	marker = new google.maps.Marker({
		position:latlng,
		zoom: 13,
		map: map
    });
	bounds.extend(latlng);
	map.fitBounds(bounds);
}

});
