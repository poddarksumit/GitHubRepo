$(document).ready(function(){
	$('#confirmation-key-request').validate({
		rules: {
			"tempUser.fullName": { 
					required: true
				},
			"tempUser.phoneNumber": {
					required: true,
					minlength: 10
				}
			},
		messages: {
			"tempUser.fullName": { required: "Please provide your name." },
			"tempUser.phoneNumber": {
					required: "Please provide your mobile number.",
					minlength: "Your mobile number must be at least 10 characters"
			}
		},
		errorClass: "error-true",
		errorPlacement: function (error, element) {
			if (element.is(":radio")) {
				error.addClass('error-message ').appendTo(element.parent().parent().find('.status'));
			} else if (element.is(":checkbox")) {
				error.addClass('error-message ').appendTo(element.parent().parent().find('.status'));
			} else if(element.parent().is('.selector')) { //if using Uniform
				error.addClass('error-message ').appendTo(element.parent().parent().find(".status"));
			} else {
				error.addClass('error-message ').appendTo(element.parent().find(".status"));
			}
		},
		submitHandler: function () {
			this.submit();
		},
		success: function(label) {
			label.addClass("valid");
		}
		
	});
	
	$('#view_request_details').validate({
		rules: {
			"tempUser.phoneNumber":{
				required: true,
				minlength: 10
			},
		messages: {
			"tempUser.phoneNumber" : {required: "Please provide your mobile number.",
				minlength: "Your mobile number must be at least 10 characters" }
		},
		errorClass: "error-true",
		errorPlacement: function (error, element) {
			if (element.is(":radio")) {
				error.addClass('error-message ').appendTo(element.parent().parent().find('.status'));
			} else if (element.is(":checkbox")) {
				error.addClass('error-message ').appendTo(element.parent().parent().find('.status'));
			} else if(element.parent().is('.selector')) { //if using Uniform
				error.addClass('error-message ').appendTo(element.parent().parent().find(".status"));
			} else {
				error.addClass('error-message ').appendTo(element.parent().find(".status"));
			}
		},
		submitHandler: function () {
			this.submit();
		},
		success: function(label) {
			label.addClass("valid");
		}
	}});
	
	$('#confirmation-key-valiation').validate({
		rules: {
			"tempUser.phoneNumber":{
				required: true,
				minlength: 10
			},
			"tempUser.confirmationKey": { 
					required: true
				}
			},
		messages: {
			"tempUser.phoneNumber" : {required: "Please provide your mobile number.",
				minlength: "Your mobile number must be at least 10 characters" },
			"tempUser.confirmationKey": { required: "Please provide the confirmation key." }
		},
		errorClass: "error-true",
		errorPlacement: function (error, element) {
			if (element.is(":radio")) {
				error.addClass('error-message ').appendTo(element.parent().parent().find('.status'));
			} else if (element.is(":checkbox")) {
				error.addClass('error-message ').appendTo(element.parent().parent().find('.status'));
			} else if(element.parent().is('.selector')) { //if using Uniform
				error.addClass('error-message ').appendTo(element.parent().parent().find(".status"));
			} else {
				error.addClass('error-message ').appendTo(element.parent().find(".status"));
			}
		},
		submitHandler: function () {
			this.submit();
		},
		success: function(label) {
			label.addClass("valid");
		}
	});
	
	
	$('#requestForm').validate({
		rules: {
			"myName": { 
					required: true
				},
			"searchYourCurrentLocation": { 
				required: (function(){
						if ($('#final-current-location').css('display') == 'none') {
							return true;
						} else {
							return false;
						}
					}) 
				},
			"bookCab": { 
				required: true
				},
			"searchdestLocation": { 
					required:  (function(){
						if ($('#final-dest-location').css('display') == 'none') {
							return true;
						} else {
							return false;
						}
					})
				},
			"myMobileNumber": {
					required: true,
					minlength: 10
				},
			"realPrice": {
					required: true,
					minlength: 2
				},
			"imaginaryPrice": {
					required: true,
					minlength: 2
				}
			},
		messages: {
			"myName": { required: "Please provide your name." },
			"bookCab" : {required: "Please select the vehicle type."},
			"searchYourCurrentLocation": { required: "Please provide the source location." },
			"searchdestLocation": { required: "Please provide the destination location." },
			"myMobileNumber": {
					required: "Please provide your mobile number.",
					minlength: "Your mobile number must be at least 10 characters"
			},
			"realPrice": { required: "Price is a mandatory field",
				minlength: "Price must be at least 2 digit" },
			"imaginaryPrice": { required: "Decimal price is a mandatory field",
				minlength: "Decimal price must be at least 2 digit"  },
		},
		errorClass: "error-true",
		errorPlacement: function (error, element) {
			if (element.is(":radio")) {
				error.addClass('error-message ').appendTo(element.parent().parent().find('.status'));
			} else if (element.is(":checkbox")) {
				error.addClass('error-message ').appendTo(element.parent().parent().find('.status'));
			} else if(element.parent().is('.selector')) { //if using Uniform
				error.addClass('error-message ').appendTo(element.parent().parent().find(".status"));
			} else {
				error.addClass('error-message ').appendTo(element.parent().find(".status"));
			}
		},
		submitHandler: function () {
			if($('#requestForCab').is(':checked')){
				$('#bookVehicle').val('C');
			}else if($('#requestForAutoRickshaw').is(':checked')){
				$('#bookVehicle').val('A');
			}
			$('#fullPrice').val($('#realPrice').val().trim()+"."+$('#imaginaryPrice').val().trim());
			this.submit();
		},
		success: function(label) {
			label.addClass("valid");
		}
	});
		
	$('input[name="tempUser.phoneNumber"],input[name="tempUser.confirmationKey"],input[name="realPrice"],input[name="imaginaryPrice"]').numeric(false,false,true);
	
	
});