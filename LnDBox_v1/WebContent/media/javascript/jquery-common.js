
function assignPrice(){
	if(($('#final-current-location').hasClass('location-set'))&&($('#final-dest-location').hasClass('location-set'))){
		if($('#realPrice').hasClass('error-true')){
			$('#realPrice').removeClass('error-true');
			$('#realPrice').addClass('error-false');
			$('#realPrice').parent().find('.status').empty();
 		}
		if($('#imaginaryPrice').hasClass('error-true')){
			$('#imaginaryPrice').removeClass('error-true');
			$('#imaginaryPrice').addClass('error-false');
			$('#imaginaryPrice').parent().find('.status').empty();
		}

		if($('#requestForCab').is(':checked')){
		var fareSplit =$('#hidden-cab-fare').val().split(".");
		$('#realPrice').val(fareSplit[0]);
		$('#imaginaryPrice').val(fareSplit[1]);
		$('#request-for').html("for cab");
	} else if($('#requestForAutoRickshaw').is(':checked')){
		var fareSplit =$('#hidden-auto-fare').val().split(".");
		$('#realPrice').val(fareSplit[0]);
		$('#imaginaryPrice').val(fareSplit[1]);
		$('#request-for').html("for auto");
		}
	 }
 }
$(document).ready(function(){
	 if($('#final-current-location').css("display") == 'none'){
		 if(!$('input[name="searchdestLocation"]').attr('disabled')){
			 $('input[name="searchdestLocation"]').attr('disabled','disabled');
		 }
		 if($('#current-location').attr('disabled')){
			 $('#current-location').removeAttr('disabled');
		 }
	 }
	 $('input[name="bookCab"]').click(function (){assignPrice();});

	 $('#your-request-btn').click(function (e){
		 e.preventDefault();
		 if($('#sign-in').css('display')!='none'){
			 $('#sign-in').hide();
		 }
		 $('#your-request').toggle();
	 });
	 $('#sign-in-btn').click(function (e){
		 e.preventDefault();
		 if($('#your-request').css('display')!='none'){
			 $('#your-request').hide();
		 }
		 $('#sign-in').toggle();
	 });
	 $('#select-city').change(function(e){
		 var val = $(this).val();
		 if(val != 'SEL'){
			 $('#hiddenCity').val($(this).val());
			 $('#vehicle-selection').show();
		 }
	 });
	 
	 $('button[name="backToHome"]').click(function(e){
		 e.preventDefault();
		 var href = $(this).attr('data-href');
		 
		 window.location.replace(href);
	 });
});

