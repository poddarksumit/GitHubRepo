var loaderHTML = '<span class="loader"><img src="/media/images/mdm/ajax-loader.gif" alt="loading..." width="16" height="16" /></span>';
var currProductPage = 1;
var currOrderPage = 1;
var mappoints = [];

jQuery(document).ready(function(){
	
	$('body').addClass('js');
	
	//header
	initHeader();
	
	//expandable boxes
	$('.accordion').accordion({ // jQuery UI Initiate .accordion
		collapsible: true,
		active: false,
		autoHeight: false
	});
	$('.expandable h3').click(function(e) { // jQuery UI Initiate .expandable
		e.preventDefault();
		$(this).next().slideToggle('fast', function(){
			$(this).prev().toggleClass('ui-state-active');
		});
	}).append('<span class="ui-icon"></span>').next().hide();
	$(".accordion .disabled").unbind("click"); //disable disabled accordian panels
	
	//tabs
	initTabs();

	/* Input field revealers */
	$('.input-revealer input[type="checkbox"]').change(function(){
		$(this).parent('.input-revealer').toggleClass('last');
		$(this).parent('.input-revealer').next().slideToggle(300);
	});
	
	/* Tooltip */
	$('.dm-tooltip.icon-question-sign').click(function() {
		$(this).next('.dm-tooltip-container').slideDown(300);
	});
	
	//expandable sections
	$('.expandable-input input:radio, .expandable-input input:checkbox').each(function(){
		if (!$(this).is(':checked') || ($(this).hasClass('noloadshow'))) {
			$(this).parents('.expandable-input').next('.expandable-content').hide();
			$(this).parents('.expandable-input').next(':not(.expandable-input)').next('.expandable-content').hide(); //for PIE enabled elements
		}
		$(this).click(function(){
			$select = $(this);
			if ($('.expandable-input input[name="' + $(this).attr('name') + '"]').size() > 0) {
				$select = $('.expandable-input input[name="' + $(this).attr('name') + '"]');
			}
			$select.each(function(){ //for each input with the same name (if there are multiple)
				$parent = $(this).parents('.expandable-input');
				if ($(this).is(':checked')) {
					$parent.next('.expandable-content').slideDown(300);
					$parent.next(':not(.expandable-input)').next('.expandable-content').slideDown(300); //for PIE enabled elements
				} else {
					$parent.next('.expandable-content').hide();
					$parent.next(':not(.expandable-input)').next('.expandable-content').hide(); //for PIE enabled elements
				}
			});
		});
	});
	
	/* expandable sections */
	$('.expandable-input select').each(function(){
		if ($(this).val() == '') {
		
			$(this).parents('.expandable-input').next('.expandable-content').hide();
		}
		$(this).change(function(){
			if ($(this).val() != '') {
				$(this).parents('.expandable-input').next('.expandable-content').slideDown(300);
			} else {
				$(this).parents('.expandable-input').next('.expandable-content').hide();
			}	
		});
	});
	
	/* Tooltip functionality */
	$('.tooltip.icon-question-sign').click(function() {
		if($(this).hasClass('opened')){
			$(this).parent().next('.tooltip-container').slideUp(300,function(){
				$('.tooltip.icon-question-sign').removeClass('opened');
			});
		}else{
			$(this).addClass('opened').parent().next('.tooltip-container').slideDown(300);
		}
	});
	
	/* page specific */
	//storefinder widget
	$('.store-finder-widget').each(function(){ //Use current suburb or postcode input
		$(this).find('input.postcode-suburb').postcodeSearchEnable();
		$(this).children('form').submit(function(e) {
			if ((jQuery.support.ajax) && (!$(this).hasClass('disable-ajax'))) {
				e.preventDefault();
				
				$object = $(this);
				$results = $object.parent().children('.results-store');
				
				$results.slideUp(300);
				$(':focus').blur();
				
				$.ajax({
					url: $object.attr('action'), //store search script
					dataType: "json",
					data: {
						storeSearch: $object.find('input.postcode-suburb').val(),
						ajax: true
					},
					success: storeSearchComplete($results),
					error: function(jqXHR, textStatus, errorThrown){
						$object.addClass('disable-ajax');
						$('#submitFindNearestStoreButton').removeAttr('disabled');
						$('#submitGeoLocationButton').removeAttr('disabled');
						$('#submitCLCFindNearestStoreButton').removeAttr('disabled');
						$object.submit();
					}
				});
			}
		});
	});
	$('.store-search-container .view-more-stores').click(function(e) { //view-more-stores button functionality
		e.preventDefault();
		$(this).parents('.results-store').find('ul li.hidden').each(function(){
			$(this).slideDown(300).removeClass('hidden');
			if ($(this).is(':last-child')) {
				$(this).css('border','none');
			}
		})
		$(this).hide();
	});	
	
	// Product listing View More button functionality
	$('#btn-viewmore-productlist').click(function(e) {
		if ((jQuery.support.ajax) && (!$(this).hasClass('disable-ajax'))) {
			$(this).hide().siblings('.ico-ajax').css('display', 'block');
			
			e.preventDefault();
			$object = $(this).parents('.form');
			$results = $object.siblings('.product-list');
			
			$.ajax({
				url: $object.attr('action'),
				dataType: "json",
				data: {
					page: currOrderPage,
					rpp: 10, //results per page
					ajax: true
				},
				success: productSearchComplete($results),
				error: function(jqXHR, textStatus, errorThrown){
					$object.addClass('disable-ajax');
					$object.submit();
				}
			});
		}
	});
	
	// Order listing View More button functionality
	/*$('#btn-viewmore-orders').click(function(e) {
		if ((jQuery.support.ajax) && (!$(this).hasClass('disable-ajax'))) {
			$(this).hide().siblings('.ico-ajax').css('display', 'block');
			
			e.preventDefault();
			$object = $(this).parents('.form');
			$results = $object.siblings('.section.summary');
			
			$.ajax({
				url: $object.attr('action'),
				dataType: "json",
				data: {
					page: currProductPage,
					rpp: 10, //results per page
					ajax: true
				},
				success: orderSearchComplete($results),
				error: function(jqXHR, textStatus, errorThrown){
					$object.addClass('disable-ajax');
					$object.submit();
				}
			});
		}
	});*/
	
	/*  Product Lister add to cart btn */
	/*$('.btn-add').click(function(e){
		e.preventDefault();
		$(this).parents('.section').addClass('added');
	});*/
	
	/* Product Detail */
	$('.launch-zoom').click(function(e){
		if (jQuery.support.ajax) {
			e.preventDefault();
			
			$container = $('#zoom-container');
			if ($container.hasClass('ajax-loaded')) {
				$container.slideDown(300, function(){
					$('body').addClass('overlay-only');
				});
			} else {
				$container.html(loaderHTML).show();
				$.get($(this).attr('href'), function(data) {
					$container.addClass('ajax-loaded').hide().html(data).slideDown(300, function(){
						$('body').addClass('overlay-only');
					});
					$container.find('.btn-close').click(function(e){
						e.preventDefault();
						$('body').removeClass('overlay-only');
						$('#zoom-container').slideUp(300);
					});
				}).error(function(){
					//window.location = $('#btn-setyourstore').attr('href');
				});
			}
		}
	});
	/*  Add to cart prompt*/
	/*$('form.add-to-cart').submit(function(e) {
		e.preventDefault();
		$(this).find('.added-to-cart-prompt').css('display','block');
	});*/ 
	/* address book functionality */
	$('.account-detail .add-account-item').click(function(e) {
		$(this).hide();
		$('.accountDetailNew').slideToggle(300);
	});
	$('.accountDetailNew .cancelAdd').click(function(e) {
		e.preventDefault();
		$('.accountDetailNew').slideToggle(300,function(){
			$('.account-detail .add-account-item').show();
			$('.accountDetailNew .status').html("");
			$(".accountDetailNew").validate().resetForm();
			$(".accountDetailNew")[0].reset();
		});
	});
	
	/* my detail functionality */
	$('.editable .edit').click(function(e) {
		e.preventDefault();
		$(this).parents('.account-detail-item').hide();
		$(this).parents('.account-detail-item').next().slideDown(300).addClass('revealed');
		$('.save-cancel').slideDown(300);
	});
	
	$('.account-detail .cancelEdit').click(function(e) {
		e.preventDefault();
		$(this).parents('.save-cancel').hide();
		$('.editable-fields').hide().removeClass('revealed');
		$('.accountDetailEdit .status').html("");
		$(".accountDetailEdit").validate().resetForm();
		$(this).parents('.form')[0].reset();
		$('.editable').slideDown(300);
	});
		
	//init forms JS
	initDMFormsJS();

	//init Bubble Message
	initBubbleMessageOverride();
	initBubbleSystem();
	
	//browser hacks
	var UA = navigator.userAgent.toLowerCase();
	if (UA.indexOf('android 2')) {
		$('div.selector select').css({ //fix select not being able to select on click on android 2.3.3
			opacity: 0.01,
			'background-color': '#ffffff'
		});
	}
	
	//Postcode validation in Cart Page.
	 $(".vship-postcode").each(function (i, item) {
    	 $(this).bind('keypress', function (e) {
    		 if (e.which!= 0 && (e.which < 48 || e.which > 57) && e.which != 8 ) {
                 e.preventDefault();
             }
         })
	 });
});


function initHeader() {
	//change store button
	$('#btn-setyourstore').click(function(e){
		if(jQuery.support.ajax) {
			e.preventDefault();
			
			if ($('#setyourstore-content').hasClass('expanded')) {
				$('#setyourstore-content').removeClass('expanded').slideUp(300);
				$('#btn-setyourstore').removeClass('expanded');
				$('body').removeClass('overlay-on');
			} else {
				if (!$('#setyourstore-content').hasClass('ajax-loaded')) {
					$('#setyourstore-content').html(loaderHTML);
					$.get($(this).attr('href'), function(data) {
						$('#setyourstore-content').addClass('ajax-loaded').hide().html(data).slideDown(300, function(){
							$('body').addClass('overlay-on');
						});
					}).error(function(){
						//window.location = $('#btn-setyourstore').attr('href');
					});
				} else {
					$('body').addClass('overlay-on');
				}
				
				//hide any opened tabs
				$('#nav-tabs-content').slideUp(300);
				$('#header ul.nav-tabs>li a.selected').removeClass('selected');
				
				$('#setyourstore-content').addClass('expanded').slideDown(300);
				$('#btn-setyourstore').addClass('expanded');
			}
		}
	});
	
	//tabs
	$('#header ul.nav-tabs>li>a.ajax').each(function(){
		$(this).click(function(e){
			if(jQuery.support.ajax) {
				e.preventDefault();
				$current = $(this);
				$content = $('#nav-tabs-content');
				
				if ($(this).hasClass('selected')) {
					window.location.hash = '';
					
					$content.slideUp(300);
					$(this).removeClass('selected');
					$('body').removeClass('overlay-on');					
				} else {
					//if there is a hash in the URL move page a little down to fix Android 2.3.3 bug
					if (window.location.href.indexOf('#') > -1) { 
						window.scrollTo(0,50);
					}
					
					window.location.hash = 'nav-item-' + $(this).attr('href');
					
					$('#header ul.nav-tabs>li a.selected').removeClass('selected');
					$current.addClass('selected');
					
					//hide opened set your store
					$('#setyourstore-content').removeClass('expanded').slideUp(300);
					$('#btn-setyourstore').removeClass('expanded');
					
					$content.slideUp(300, function(){
						$(this).html(loaderHTML).slideDown(300);
						
						$.get($current.attr('href'), function(data) {
							$content.addClass('ajax-loaded').html(data).slideDown(300, function(){
								$('body').addClass('overlay-on');
							});
						}).error(function(){
							window.location = $current.attr('nonajaxpage');
						});
					});
				}
			}
		});
	});
	//if page is loaded with hashes
	if (window.location.hash.indexOf('nav-item-') > -1) {
		var hashurl = unescape(window.location.hash.replace('#nav-item-',''));
		$('#header ul.nav-tabs>li>a.ajax[href^="' + hashurl + '"]').click();
	}
	
	//summary .view-more expander
	$('.summary a.view-more, .view-toggle a.view-more').click(function(e) {
		e.preventDefault();
		$(this).parent().next().slideToggle('fast', function(){
			$(this).prev().children('a.view-more').children('span.icon').toggleClass('icon-chevron-down');
			$(this).prev().children('a.view-more').children('span.icon').toggleClass('icon-chevron-up');
			$(this).prev().children('a.view-more').children('span.view-more-label').toggle(0);
		});
	});
	
	window.onhashchange = function(e){
		if (window.location.hash == '') {
			$('#nav-tabs-content').slideUp(300);
			$('#header ul.nav-tabs>li>a.ajax.selected').removeClass('selected');
			$('body').removeClass('overlay-on');
		}
	};
}
function initTabs() {
	//tabs
	$('.tab-container:not(.tabs-enabled)').each(function(){
		$(this).find('.tab-content').not('.tab-show').hide();
		
		if ($(this).find('.tab-content.tab-show').prev('.tab').size() > 0) { //if traditional tab
			$(this).find('.tab-content.tab-show').prev('.tab').addClass('selected');
		} else { //else try to find by data-tab-name
			$('.tab[data-tab-for="' + $(this).find('.tab-content.tab-show').attr('data-tab-name') + '"]').addClass('selected');
		}
		
		$(this).find('.tab:not(.tab-enabled)').not('.for-no-item').each(function(){
			$(this).click(function(e){
				e.preventDefault();
				if (!$(this).hasClass('selected')) {//if not open
					$(this).parents('.tab-container:first').find('.tab-content:visible').hide();
					$(this).parents('.tab-container:first').find('.tab.selected').removeClass('selected');
					$(this).addClass('selected');
					if ($(this).next('.tab-content').size() > 0) { //traditional tab
						$(this).next('.tab-content').show();
					} else { //else try to find by data-tab-name
						$(this).parents('.tab-container:first').find('.tab-content[data-tab-name="' + $(this).attr('data-tab-for') + '"]').slideDown(300);
					}
					
					//$(this).children('.tab-checkbox').attr('checked', true); //select the checkbox if there is one inside
				} else if ($(this).attr('data-tab-for') != '') { //if already open and using data-tab-name
					$current = $(this);
					$(this).parents('.tab-container:first').find('.tab-content[data-tab-name="' + $(this).attr('data-tab-for') +'"]').slideUp(300, function(){
						$current.removeClass('selected');
					});
					
					//$(this).children('.tab-checkbox').attr('checked', false);
				}
				
			}).addClass('tab-enabled');
			
			$(this).children('a').click(function(e){
				e.preventDefault();	
			});
		});
		   $(this).find('.for-no-item').each( function(){
			   $(this).click(function(e){
				   e.preventDefault();
				   if(!$(this).hasClass('selected')){
					   $(this).addClass('selected');
					   $('.delivery-tab').removeClass('selected');
				   }
			   });
		   });
		   $(this).addClass('tabs-enabled');
	});
}

function initMobileStoreSearch() {
	//store lookup funcitonality
	$('#store-search-lookup').each(function(){ //Use current suburb or postcode input
		$(this).find('input.postcode-suburb').postcodeSearchEnable();
		
		$(this).children('form').submit(function(e) {
			if ((jQuery.support.ajax) && (!$(this).hasClass('disable-ajax'))) {
				e.preventDefault();
				//close #store-search-location
				$('#store-search-location .results-store').slideUp(300);
				
				$object = $(this);
				$results = $object.parent().children('.results-store');
				
				$results.slideUp(300);
				$(':focus').blur();
				$('#set-store-loader').show();
				$.ajax({
					url: $object.attr('action'), //store search script
					//dataType: "json",
					data: {
						storeSearch: $object.find('input.postcode-suburb').val(),
						ajax: true
					},
					success: storeSearchComplete($results),
					error: function(jqXHR, textStatus, errorThrown){
						$object.addClass('disable-ajax');
						$('#submitFindNearestStoreButton').removeAttr('disabled');
						$('#submitGeoLocationButton').removeAttr('disabled');
						$('#submitCLCFindNearestStoreButton').removeAttr('disabled');
						$object.submit();
					}
				});
			}
		});
	});
	
	$('#store-search-location').each(function(){ //Use current GPS location
		if (supports_geolocation()) { //if geolocation is available on this browser
			
			$(this).children('form').submit(function(e) {
				if (!$(this).hasClass('disable-ajax')) { //if ajax supported, disable posting
					e.preventDefault();
					
					//close #store-search-location
					$('#store-search-lookup .results-store').slideUp(300);
				}
				$object = $(this);
				$object.find('button').addClass('locating');
				navigator.geolocation.getCurrentPosition(function(position){
					succesCurrentLocationSetPrefStore(position, $object);
				}, function(error){
					switch(error.code) {
					  case error.TIMEOUT:
						alert('Unable to locate your position, please try again.');
						break;
					  default:
						alert('Please make sure your Location Services are enabled.');
						break;
					};
					$object.find('button').removeClass('locating');
				}, {
					timeout: 10000
					//enableHighAccuracy: true
				});
			});
		} else { //else hide the elements
			$(this).hide();
		}
	});
	
	function succesCurrentLocationSetPrefStore(position, $object){ //do geo
		$object.find('input[name="latitude"]').attr('value', position.coords.latitude);
		$object.find('input[name="longitude"]').attr('value', position.coords.longitude);
		// For testing purpose. 
		//$object.find('input[name="latitude"]').attr('value', "33.859972");
		//$object.find('input[name="longitude"]').attr('value', "151.211111");
		
		if ((jQuery.support.ajax) && (!$object.hasClass('disable-ajax'))) { //if geo and ajax is supported
			$object.find('button').removeClass('locating');
			$results = $object.parent().children('.results-store');
			$results.slideUp(300);
			$('#set-store-loader').show();
			$.ajax({
				url: $object.attr('action'), //store search script
				//dataType: "json",
				data: {
					latitude: $object.find('input[name="latitude"]').val(),
					longitude: $object.find('input[name="longitude"]').val()
				},
				success: storeSearchComplete($results),
				error: function(jqXHR, textStatus, errorThrown){
					$object.addClass('disable-ajax');
					$('#submitFindNearestStoreButton').removeAttr('disabled');
					$('#submitGeoLocationButton').removeAttr('disabled');
					$('#submitCLCFindNearestStoreButton').removeAttr('disabled');
					$object.submit();
				}
			});
		} else { //if geo is supported but ajax isn't, submit with long and lat values
			$object.addClass('disable-ajax');
			$object.submit();
		}
	
		
	}
	
	$('.store-search-container .view-more-stores').click(function(e) { //view-more-stores button functionality
		e.preventDefault();
		$(this).parents('.results-store').find('ul li.hidden').each(function(){
			$(this).slideDown(300).removeClass('hidden');
			if ($(this).is(':last-child')) {
				$(this).css('border','none');
			}
		})
		$(this).hide();
	});	
}

function storeSearchComplete(jqObj) {
	var $results = jqObj;
	return function(response, textStatus) {
		var html = '';
		var hidden ='';
		storeResult =eval(response);
		$('#submitFindNearestStoreButton').removeAttr('disabled');
		$('#submitGeoLocationButton').removeAttr('disabled');
		$('#submitCLCFindNearestStoreButton').removeAttr('disabled');
		for (var i=0; i<storeResult.length; i++) {
			
			if (!(storeResult[i].storeformattedname == undefined)){
				
				if(i >= 3){
					hidden = ' class="hidden"';
				}
				//store search list html
				html +=
				'<li' + hidden + '> \
					<h4 class="title-store"> \
						Dan Murphy\'s \
						<br/> \
						<a href="' + storeResult[i].storeurl + '">' + storeResult[i].storeformattedname + ' ' + storeResult[i].storestate + '</a> \
					</h4> \
					<p class="distance"><span class="icon-map-marker"></span>' + storeResult[i].distance + 'km away</p>'; 
					if ($('#btn-setyourstore span.store-name').text() != storeResult[i].storeformattedname) {
						html += '<a href="#" class="btn-grey btn-setstore" data-store-no="' + storeResult[i].storeno + '">Set store</a>';
					} else {
						html += '<span class="btn-grey btn-white">Your store</span>';
					}
					html += '</li>';
				
			}else{
				html +=
				'<li class="error-message"><span class="icon icon-exclamation-sign"></span>' + storeResult[i].error + '</li>'
				sitracker.addTrackParam('siformerror','searchStores');
	  			sitracker.addTrackParam('sielementname','postcode-suburb');
	  			sitracker.addTrackParam('sierrortext',storeResult[i].error);
	    		sitracker.sendTrackParams();
			}
		}
		$results.children('ul').html(html);
		if(storeResult.length > 3){ //Display view-more-stores button if there are more than three results
			$results.find('.view-more-stores').show();
		}else{
			$results.find('.view-more-stores').hide();
			$results.find('li:last-child').css('border','none');
		}
		$('#set-store-loader').hide();
		$results.slideDown(300);
		$results.find('ul .btn-setstore').click(function(e){ // set store button functionality
			e.preventDefault();
			
			$(this).parents('.results-store').slideUp(300);
			
			//close tab
			$('#setyourstore-content').removeClass('expanded').slideUp(300);
			$('#btn-setyourstore').removeClass('expanded');
			$('body').removeClass('overlay-on');
			
			//Bienalto - TCS to add set store functionality here
			$('#headerchangestore #hiddenStoreNum').val($(this).attr('data-store-no'));
			$('#setFavStoreGuest_dm_header').click();
			//TCS end
		});
	};
}

function productSearchComplete(jqObj) {
	var $results = jqObj;
	$('.ico-ajax').hide();
	$('#btn-viewmore-productlist').show();
	return function(response, textStatus) {
		var html="";
		currProductPage = response.nextpage;
		for (var i=0; i<response.products.length; i++) {
			if (response.totalresultsleft > 0){
				
				var iconHouse = "h";
				var stockAvail = "";
				var iconBag = "e";
				var cncAvail = "";
				var iconTruck = "b";
				var deliveryAvail = "";
				var promo = "";
				var btnAdd = "<fieldset><button class=\"btn-red btn-add\"><span class=\"icon icon-shopping-cart\"></span>ADD</button></fieldset>\
					<a href='4.1_Shopping_Cart_Delivery.html' class='added-to-cart-prompt'> \
						<span class='icon-shopping-cart'></span> \
						Item added \
					</a> \
				";
				
				if(!response.products[i].stock){ //if there isnt stock
					iconHouse = "i";
					stockAvail = " unavailable";
					btnAdd ="";
				}
				if(!response.products[i].cnc == true){ //if there isnt cnc
					iconBag = "f";
					cncAvail = " unavailable";
					
				}
				if(!response.products[i].delivery == true){ //if there isnt delivery
					iconTruck = "c";
					deliveryAvail = " unavailable";
				}
				if(response.products[i].promo == true){ //if its an online exclusive
					promo = " has-promo";	
				}
				
				//product search list html
				html += '<li class="section"> \
					<div class="item"> \
						<a href="' + response.products[i].url + '" class="item-image"> \
							' + response.products[i].thumb + ' \
						</a> \
						<div class="item-container"> \
							<div class="item-detail"> \
								<a href="' + response.products[i].url + '" class="col-left"> \
									' + response.products[i].title + ' \
									<div class="sub-wrapper"> \
										<div class="rating-stars rating-' + response.products[i].rating + '"> \
											<div class="mask"></div> \
										</div> \
										<p class="status-icons"> \
											<span class="dandings"> \
												<span class="ico-house' + stockAvail + '">' + iconHouse + '</span> \
												<span class="ico-bag' + cncAvail + '">' + iconBag + '</span> \
												<span class="ico-truck' + deliveryAvail + '">' + iconTruck + '</span> \
											</span> \
										</p> \
									</div> \
									' + response.products[i].badge + ' \
								</a> \
							</div> \
						</div> \
						<div class="col-right' + promo + '"> \
							' + response.products[i].pricepoints + ' \
							' + btnAdd + ' \
						</div> \
					</div> \
				</li>';
				
			}else{
				$('#form-viewmore-productlist').hide();
			}
		}
		$html = $(html);
		$html.find('.btn-add').click(function(e){
			e.preventDefault();
			$(this).parents('.section').addClass('added');
		});
		$html.appendTo($results.children('ul'));
		$('#more-total').text(response.totalresultsleft);
	};
}
/*
function orderSearchComplete(jqObj) {									
	var $results = jqObj;
	$('.ico-ajax').hide();
	$('#btn-viewmore-orders').show();
	return function(response, textStatus) {
		var html="";
		currOrderPage = response.nextpage;
		for (var i=0; i<response.orders.length; i++) {
			if (response.totalresultsleft > 0){
				
				//order list html
				html += '<div class="row"> \
					<div class="col"> \
						'+ response.orders[i].order +' \
					</div> \
					<div class="col"> \
						'+ response.orders[i].date +' \
					</div> \
					<div class="col"> \
						'+ response.orders[i].status +' \
					</div> \
					<div class="col"> \
						<a href="'+ response.orders[i].link +'">View</a> \
					</div> \
				</div>';
				
			}else{
				$('#form-viewmore-orders').hide();
			}
		}
		$html = $(html);
		$html.appendTo($results.children('.table.my-orders'));
	};
}
*/


function initStoreFinder() {
	initTabs();
	
	$('.second-tab a').click(function(){
		if(!$(this).hasClass('clicked')){
			setTimeout(function(){ //map needs to be visible before its updated & fix weird Gmaps init glitch
				if ($('#map_div').hasClass('initialised')) {
					updateMapMarkers();
				} else {
					initMap(mappoints, "map_div");
				}
			}, 200);
			$(this).addClass('clicked');
		}
	});
	
	//store lookup funcitonality
	$('#store-finder-lookup').each(function(){ //Use current suburb or postcode input
		$(this).find('input.postcode-suburb').postcodeSearchEnable();
		
		$(this).submit(function(e) {
			if ((jQuery.support.ajax) && (!$(this).hasClass('disable-ajax'))) {
				e.preventDefault();
				$object = $(this);
				$results = $object.parent().siblings('.results-storefinder');
				
				//hide search box and show loader
				$('#input-storefinder').slideUp(300);
				$('#store-finder-loader').show();
				
				$.ajax({
					url: $object.attr('action'), //store search script
					//dataType: "json",
					data: {
						storeSearch: $object.find('input.postcode-suburb').val(),
						ajax: true
					},
					success: storeFinderComplete($results),
					error: function(jqXHR, textStatus, errorThrown){
						$object.addClass('disable-ajax');
						$('#submitStoreFindNearestStoreButton').removeAttr('disabled');
						$('#submitStoreGeoLocationButton').removeAttr('disabled');
						location.href = "/mdm/storelocator/include/inc_store_list_error.jsp";
					}
				});
			}
		});
	});
	
	$('#store-finder-location').each(function(){ //Use current GPS location
		if (supports_geolocation()) { //if geolocation is available on this browser
			
			$(this).submit(function(e) {
				if (!$(this).hasClass('disable-ajax')) { //if ajax supported, disable posting
					e.preventDefault();
				}
				$object = $(this);
				$object.find('button').addClass('locating');
				navigator.geolocation.getCurrentPosition(function(position){
					searchCurrentLocStoreFinder(position, $object);
					
				}, function(error){
					switch(error.code) {
					  case error.TIMEOUT:
						alert('Unable to locate your position, please try again.');
						break;
					  default:
						alert('Please make sure your Location Services are enabled.');
						break;
					};
					$object.find('button').removeClass('locating');
				}, {
					timeout: 10000
					//enableHighAccuracy: true

				});
			});
		} else { //else hide the elements
			$(this).hide();
		}
	});
	
	function searchCurrentLocStoreFinder(position, $object){ //do geo
		
		$object.find('input[name="latitude"]').attr('value', position.coords.latitude);
		$object.find('input[name="longitude"]').attr('value', position.coords.longitude);
		
		if ((jQuery.support.ajax) && (!$object.hasClass('disable-ajax'))) { //if geo and ajax is supported
			$object.find('button').removeClass('locating');
			$results = $object.parent().siblings('.results-storefinder');
			
			//hide search box and show loader
			$('#input-storefinder').slideUp(300);
			$('#store-finder-loader').show();
			
			$.ajax({
				url: $object.attr('action'), //store search script
				//dataType: "json",
				data: {
					latitude: $object.find('input[name="latitude"]').val(),
					longitude: $object.find('input[name="longitude"]').val(),
					ajax: true
				},
				success: storeFinderComplete($results),
				error: function(jqXHR, textStatus, errorThrown){
					$object.addClass('disable-ajax');
					$('#submitStoreFindNearestStoreButton').removeAttr('disabled');
					$('#submitStoreGeoLocationButton').removeAttr('disabled');
					$object.submit();
				}
			});
			
		} else { //if geo is supported but ajax isn't, submit with long and lat values
			$object.addClass('disable-ajax');
			$object.submit();
		}
	
		
	}
	
	$('.store-search-container .view-more-stores').click(function(e) { //view-more-stores button functionality
		e.preventDefault();
		$(this).parents('.results-store').find('ul li.hidden').each(function(){
			$(this).slideDown(300).removeClass('hidden');
			if ($(this).is(':last-child')) {
				$(this).css('border','none');
			}
		})
		$(this).hide();
	});
	
	$('#btn-search-again').click(function(e){
		e.preventDefault();
		
		//reset the view
		$('.results-storefinder').hide();
		$('.postcode-suburb').val('');
		
		removeMapMarkers();
		$('.second-tab a.clicked').removeClass('clicked'); //remove clicked again class from map tab button. This is to determine whether to update points on click.

		//hide the 2nd tab if opened
		$showntab = $('.results-storefinder>.tab-container>.tab-show').prev('.tab');
		if (!$showntab.hasClass('selected')) {
			$('.results-storefinder>.tab-container>.tab.selected').removeClass('selected');
			$('.results-storefinder>.tab-container>.tab-content').hide();
			
			$showntab.addClass('selected');
			$('.results-storefinder>.tab-container>.tab-show').show();
		}
		
		$('#input-storefinder').slideDown(300);
	});
}


function storeFinderComplete(jqObj) {
	var $results = jqObj;
	return function(response, textStatus) {
		storeResult =eval(response);
		var html = '';
		var hidden ='';
		$('#submitStoreFindNearestStoreButton').removeAttr('disabled');
		$('#submitStoreGeoLocationButton').removeAttr('disabled');
		for (var i=0; i<storeResult.length; i++) {
			
			if (!(storeResult[i].storeformattedname == undefined)){
				if(i >= 3){
					hidden = ' class="hidden"';
				}
				//store search list html
				html +=
				'<li' + hidden + '> \
					<h4 class="title-store"> \
						Dan Murphy\'s \
						<br/> \
						<a href="' + storeResult[i].storeurl + '">' + storeResult[i].storeformattedname + ' ' + storeResult[i].storestate + '</a> \
					</h4> \
					<p class="distance"><span class="icon-map-marker"></span>' + storeResult[i].distance + 'km away</p> \
					<a href="' + storeResult[i].storeurl + '" class="btn-grey btn-setstore"><span class="icon-chevron-right"></span></a> \
				</li>';
				
			} else {
				html +=
				'<li class="error-message"><span class="icon icon-exclamation-sign"></span>' + storeResult[i].error + '</li>'
				sitracker.addTrackParam('siformerror','searchStores');
	  			sitracker.addTrackParam('sielementname','postcode-suburb');
	  			sitracker.addTrackParam('sierrortext',storeResult[i].error);
	    		sitracker.sendTrackParams();
			}
		}
		$results.find('.store-search-container .results-store>ul').html(html); //load list into results list
		
		//update gmaps markers object to results object
		mappoints = storeResult;
		
		if(storeResult.length > 3){ //Display view-more-stores button if there are more than three results
			$results.find('.view-more-stores').show();
		}else{
			$results.find('.view-more-stores').hide();
			$results.find('li:last-child').css('border','none');
		}
		
		$('#store-finder-loader').hide();
		$results.slideDown(300);
		
		//if ($results.find('.second-tab a.clicked').hasClass('clicked')) {
		//	updateMapMarkers();
		//}
		
	};
}

function initDMFormsJS() {
	
	//Uniform JS
	$('select').uniform(); //standard init - add to list
	
	$('input[type=file]').each(function(){ //file input fields need custom button label
		var text = "Choose File";
		if ($(this).attr('data-button-label') != "") {
			text = $(this).attr('data-button-label');
		}
		$(this).uniform({
			fileBtnText: text
		});
	});
	
	
	
	//Post uniform js
	$('.selector[id^="uniform"], .uploader[id^="uniform"]').each(function(){ //adds the current classes of the select element, and adds it to the uniform container with a 'uniform-' prefix
		var klass = $(this).children('select, input').attr('class');
		if (klass) {
			var klasses = klass.split(' ');
			for (var i=0;i<klasses.length; i++) {
				$(this).addClass('uniform-' + klasses[i]);	
			}
		}
	});
	
	
	//datepicker
	var $datePickerStart = $('.datepickerValue').val();
	$( "input.datepicker" ).datepicker({
		dateFormat: "dd/mm/yy",
		showAnim: "fadeIn",
		minDate: $datePickerStart,
		maxDate: "+42d"	
	}).next('.icon-calendar').click(function(){
		$(this).prev().datepicker("show");
	});
	$("input.datepicker-futureonly").datepicker({
		minDate: $datePickerStart,
		maxDate: "+42d"
});
	
	//datepicker
	$( "div.datepicker" ).datepicker({
		dateFormat: "dd/mm/yy",
		showAnim: "fadeIn",
		onSelect: function(dateText, inst) {
			$('input[name="' + $(this).attr('data-datepicker-field') + '"]').val(dateText);
		}
	});
	
	
	//check all checkboxes
	$('input:checkbox[data-checkbox-checkall]').each(function(){
		$(this).click(function(){
			$(':checkbox[name="' + $(this).attr('data-checkbox-checkall') +'"]').attr('checked', $(this).attr('checked'));
		});
	});
	
	//Submit buttons
	$('#submit, .btn-submit').click(function(e){
		if ($(this).hasClass('btn-disabled')) {
			e.preventDefault();
		}
	});
	
	//iOS hack for fixed positioning when keyboard is up
	var needsScrollUpdate = false;
    $(document).scroll(function(){
        if (needsScrollUpdate) {
            $('#header .header-fixed').addClass('not-fixed');
        } else {
			$('#header .not-fixed').removeClass('not-fixed');
		}
    });
    $("input, textarea").live("focus", function(e) {
        needsScrollUpdate = true;
    });

    $("input, textarea").live("blur", function(e) {
        needsScrollUpdate = false;
    });
    $('.quantity-more').numeric(false, false, true);
    
  //prefill intial value as 1
	$('.quantity-more').focus(function(){
		if($(this).val() == 1){
			$(this).val('');
		}
	});
	$('.quantity-more').blur(function(){
		if($(this).val() == 0){
			$(this).val(1);
		}
	});
	
	//fix touch device not removing focus / hover states on dropdowns
	$('select').change(function(e){
		$(this).blur();
		$(this).parent().removeClass('focus').removeClass('hover');
	});
}


function initProductZoom() {
	document.getElementById('zoom-window').addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	//resize zoom box
	$('#zoom-window').each(function(){
		zoomResize(this);
	});
	$(window).resize(function(){
		zoomResize('#zoom-window');
	});
	
	//init zoom
	//setTimeout(function(){ //iPhone 3GS fix?
	//	var zoom = new iScroll('zoom-window', {
	//		momentum: false,
	//		zoom: true
	//	});
	//	zoom.scrollTo(-$('#zoom-window .image-container').width()/2, -$('#zoom-window .image-container').height()/3, 0);
	//}, 0);
	var zoom = new iScroll('zoom-window', {
		momentum: false,
		zoom: true
	});
	
	$('#zoom-window img').bind('load', function(){
		$('#zoom-window').removeClass('loading');
		
		zoom.refresh();
		
		if (!$(this).hasClass('init')) {
			zoom.scrollTo(-$('#zoom-window .image-container').width()/2, -$('#zoom-window .image-container').height()/3, 0);
			$(this).addClass('init');
		}
	});
	
	//init thumb list
	$('.list-thumbnails li a').click(function(e){
		e.preventDefault();
		$(this).parent().addClass('selected').siblings('.selected').removeClass('selected');
		$('#zoom-window').addClass('loading').find('img').attr('src', $(this).attr('href'));
	});
}

function zoomResize(selector) {
	if ($(selector).is('.product-zoom-align-right .zoom-window')) {
		$(selector).css({
			width: $(window).width() - $('.list-thumbnails').width() - 50,
			height: function(){
				if ($('.list-thumbnails').height() > $(window).height()) {
					return $('.list-thumbnails').outerHeight(true);
				} else {
					return $(window).height() - 40
				}
			}
		});
	} else {
		$(selector).css({
			width: $(window).width() - 40,
			height: $(window).height() - $('.list-thumbnails').height() - 40
		});
	}
}


/*** Google Maps ***/
var map;
var markers = [];
var infoBubble;
function initMap(mappoints, mapID) {
	
	// Properties we want to pass to the map  
	var options = {  
		zoom: 15, // Zoom level of the map
		center: new google.maps.LatLng(0, 0),
		mapTypeId: google.maps.MapTypeId.ROADMAP // Map type ROADMAP/SATELLITE/HYBRID/TERRAIN
	};
	
	// Calling the constructor, thereby initializing the map  
	map = new google.maps.Map(document.getElementById(mapID), options);  
	
	infoBubble = new InfoBubble({
		shadowStyle: 1,
		padding: 10,
		disableAnimation: false,
		backgroundColor: '#FFF',
		borderRadius: 5,
		arrowSize: 10,
		borderWidth: 2,
		hideCloseButton: true,
		arrowPosition: "50%",
		arrowStyle: 0,
		backgroundClassName: "info-window",
		minWidth: 220,
		maxWidth: 220
	});
	
	$('#map_div').addClass('initialised');
	
	updateMapMarkers();
}
function updateMapMarkers() {
	//removeMapMarkers(); do this manually when results are closed
	
	var bounds = new google.maps.LatLngBounds();
	
	
	// Define Marker properties
	var image = new google.maps.MarkerImage('/media/images/mdm/DM_Marker-2x.png',
		// Image size
		new google.maps.Size(70, 80), 
		// Image origin
		new google.maps.Point(0,0),
		// Image anchor
		new google.maps.Point(17, 39),
		// Scaled image size
		new google.maps.Size(35, 40)
	);
	
	var imageShadow = new google.maps.MarkerImage('/media/images/mdm/DM_MarkerShadow.png',
		// Image size
		new google.maps.Size(57, 40),
		// Image origin
		new google.maps.Point(0,0),
		// Image anchor
		new google.maps.Point(17, 39)
	);
	
	for (i = 0; i < mappoints.length; i++) {
		
		var latlng = new google.maps.LatLng(mappoints[i].latitude, mappoints[i].longitude);
		marker = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: image,
			shadow: imageShadow
		});
		markers.push(marker);
		
		if(i < 3){
			bounds.extend(latlng);
		}
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				if (mappoints[i].open) {
					infoBubble.close();
					mappoints[i].open = false;
				} else {
					for (var j=0; j < mappoints.length; j++) {
						mappoints[j].open = false;
					}
					infoBubble.setContent('<a href="' + mappoints[i].storeurl + '"><div class="title-label">' + "Dan Murphy's" + '&nbsp;' + mappoints[i].storeformattedname + '</div><p>' + mappoints[i].address + '</p></a>')
					infoBubble.open(map, marker);
					
					mappoints[i].open = true;
				}

			}
		})(marker, i));
	}
	
	if (mappoints.length == 1) {
		map.setZoom(15);
		map.setCenter(new google.maps.LatLng(mappoints[0].latitude, mappoints[0].longitude));
	} else {
		map.fitBounds(bounds);
	}
}

function removeMapMarkers() {
	try {
		infoBubble.close();
	} catch(e) {
	}
	
	for (var i=0; i<markers.length; i++) {
		markers[i].setMap(null);
    }
	markers = [];	
}



/* Common functions */

function supports_geolocation() {
  return 'geolocation' in navigator;
}

function trimTextArea(fieldid,maxlimit)
{
	var remain = fieldid + "_remain";
	var field = document.getElementById(fieldid);
	
	if(field.value.length > maxlimit){
		field.value = field.value.substring(0, maxlimit);
	}	
	
	//Update remaining characters
	document.getElementById(remain).innerHTML = (maxlimit - field.value.length);
}


if (jQuery.validator) {
	jQuery.validator.addMethod("notEqual", function(value, element, param) {
		return this.optional(element) || value != param;
	}, "Please specify a different (non-default) value");
}

if (jQuery.validator) {
	jQuery.validator.addMethod("validState", function(value, element, param) {
		if(value==""){
			return false;
		}
		return true;
	}, "State is required");
}
/* Initialise Bubble messaging system */

function initBubbleSystem() {
	page_popup_bubble = "#index";
		  
		if($.cookie("bubbleMessaging") == 'skip'){
			//alert('messageSkip');
		} else {
			if(typeof(page_popup_bubble)=="undefined"){
			  page_popup_bubble = "#index";
			}
			startBubbleMessage();
		}
	$.cookie("bubbleMessaging", "skip");
}

function startBubbleMessage(){
	  window.setTimeout(function() {
		var bubble = new google.bookmarkbubble.Bubble();
	
		var parameter = page_popup_bubble;
	
		bubble.hasHashParameter = function() {
		  return location.hash == "" && location.href.indexOf(parameter) == location.href.length-1;
		};
	
		bubble.setHashParameter = function() {
		  if (!this.hasHashParameter()) {
			location.href = parameter;
		  }
		};
	
		bubble.showIfAllowed();
	  }, 1000 /** delay to show the bubble */ );
}

/* Browser identification for Chrome browser detection on Android and iOS */

function identifyBrowser(userAgent, elements) { // Start Chrome browser identification
var regexps = {
			'Chrome': [ /Chrome\/(\S+)/ ],
			'Firefox': [ /Firefox\/(\S+)/ ],
			'MSIE': [ /MSIE (\S+);/ ],
			'Opera': [
				/Opera\/.*?Version\/(\S+)/,     /* Opera 10 */
				/Opera\/(\S+)/                  /* Opera 9 and older */
			],
			'Safari': [ /Version\/(\S+).*?Safari\// ],
			'CriOS': [ /CriOS\// ]
		},
		re, m, browser, version;
 
	if (userAgent === undefined)
		userAgent = navigator.userAgent;
 
	if (elements === undefined)
		elements = 2;
	else if (elements === 0)
		elements = 1337;
 
	for (browser in regexps)
		while (re = regexps[browser].shift())
			if (m = userAgent.match(re)) {
				//version = (m[1].match(new RegExp('[^.]+(?:\.[^.]+){0,' + --elements + '}')))[0];
				//return browser + ' ' + version;
				return browser;
			}
 
	return null;
} // Start Chrome browser identification

/* Override default messaging setup for Bubble Message */
function initBubbleMessageOverride() {
	if (identifyBrowser() == 'CriOS' || identifyBrowser() == 'Chrome'){
		google.bookmarkbubble.Bubble.prototype.msg = {
			android: 
				'<strong>Bookmark this page</strong>:<br /> Tap your phone&#39;s <strong>Menu</strong> button and then <span class="icon icon-star-empty"></span>',
			android3: 
				'<strong>Bookmark this page</strong>:<br /> Tap your phone&#39;s <strong>Menu</strong> button and then <span class="icon icon-star-empty"></span>',
			android4: 
				'<strong>Bookmark this page</strong>:<br /> Tap your phone&#39;s <strong>Menu</strong> button and then <span class="icon icon-star-empty"></span>',
			blackberry: 
				'<strong>Bookmark this page</strong>:<br /> Tap your phone&#39;s <strong>Menu</strong> button and then <span class="icon icon-star"></span>',
			playbook: 
				'<strong>Bookmark this page</strong>:<br /> Tap your phone&#39;s <strong>Menu</strong> button and then <span class="icon icon-star"></span>',
			ios42orlater :
				'<strong>Bookmark this page</strong>:<br /> Tap Chrome&#39;s <span class="icon icon-reorder"></span> <strong>Menu</strong> button and then <span class="icon icon-star"></span>',
			ioslegacy:
				'<strong>Bookmark this page</strong>:<br /> Tap Chrome&#39;s <span class="icon icon-reorder"></span> <strong>Menu</strong> button and then <span class="icon icon-star"></span>'
		};
	} else {
		google.bookmarkbubble.Bubble.prototype.msg = {
			android: 
				'<strong>Install this webapp:</strong><br /> 1) Add to Bookmarks,<br /> 2) Tap and Hold the bookmark,<br /> 3) Select "<b>Add Shortcut to Home</b>"',
			android3: 
				'<strong>Install this webapp:</strong><br /> Tap your phone&#39;s <strong>Menu</strong> button,<br /> select "<b>Add to</b>" and then "<b>Home screen</b>"',
			android4: 
				'<strong>Install this webapp:</strong><br /> 1) Tap your phone&#39;s <strong>Menu</strong> button,<br /> 2) Select "<b>Save to bookmarks</b>",<br /> 3) Select "<b>Add to</b>" and then "<b>Home</b>"',
			blackberry: 
				'<strong>Install this webapp:</strong><br /> Tap <img src="'+ google.bookmarkbubble.Bubble.prototype.IMAGE_BLACKBERRY_ICON_DATA_URL_ +'" style="height: 1em;display: inline-block;padding:0;margin:0" />, select "<b>Add to Home Screen</b>"',
			playbook: 
				'<strong>Install this webapp:</strong><br /> Tap <img src="'+ google.bookmarkbubble.Bubble.prototype.IMAGE_PLAYBOOK_BOOKMARK_DATA_URL_ +'" style="height: 1.5em;display: inline-block;padding:0;margin:0;" />, select  <br />"<b>Add to Home Screen</b>"',
			ios42orlater :
				'<strong>Install this webapp</strong>:<br /> Tap <span class="icon icon-share"></span> and then <b>"Add to Home Screen"</b>',
			ioslegacy:
				'<strong>Install this webapp</strong>:<br /> Tap <span class="icon icon-plus"></span> and then <b>"Add to Home Screen"</b>'
		};
	}
}


/* jQuery postcodeSearch 
 * use $(element).postcodeSearchEnable
 * prefills the address details from postcode search
 */
(function( $ ) {
	$.fn.postcodeSearchEnable = function(o) {
		//options
		var d = {
			type: "addressprefill",
			containerCls: ".address-prefill",
			limit: 3
		};
		if (o) {
			if (!o.type) {
				o.type = d.type;
			}
			if (!o.containerCls) {
				o.containerCls = d.containerCls;
			}
			if (!o.limit) {
				o.limit = d.limit;
			}
		} else {
			o = d;
		}
	
		//postcode and suburb lookup
		this.keyup(function(e){
			if ($(this).val().length >= o.limit) {
				if(e.keycode!=8 ){
					var inputval = $(this).val();
					$current = $(this);
					var checkChar=false;
					var chekInt=false; var checkOthers=false;
					var suggestionurl = '';
					for(var i=0;i<inputval.length;i++){
						var charOrIntCheck=inputval.charCodeAt(i);
					
						if(charOrIntCheck>47 && charOrIntCheck<58)
						{
							chekInt=true;
							suggestionurl = '/mdm/postcode_dropdown.jsp';
						}
						else if((charOrIntCheck>64 && charOrIntCheck<91)||(charOrIntCheck>96 && charOrIntCheck<123)||(charOrIntCheck==32)){
							checkChar=true;
							suggestionurl = '/mdm/suburb_dropdown.jsp';
						}
						else{
							checkOthers=true;
						}
					 
					}
					if((chekInt || checkChar) && !checkOthers ){
						$.ajax({
							url: suggestionurl,
							//dataType: 'json',
							data: {
								predictionSearchTerm: inputval,
								ajax: true
								},
							success: function(response, textStatus) {
								var html = '';
								var suggestionVal = eval(response);
								var looplength = suggestionVal.length;
								if(suggestionVal === undefined || suggestionVal.length==0){
									var html = '<div class="auto-suggestion" style="height:55px;"> \
										<div class="scroller"> \
											<ul class="auto-suggestion-list">';
									html += '<li><span>No suburbs found. Please check and try again.</span></li>';
								}else {
									if (looplength > 10) {
										looplength = 10;
									}
									if (looplength >= 3){
										html += '<div class="auto-suggestion">' ;
									}else if (looplength == 2){
										html += '<div class="auto-suggestion" style="height:80px;">' ;
									}else if(looplength == 1){
										html += '<div class="auto-suggestion" style="height:40px;">' ;
									}
									 html += '<div class="scroller"> \
											<ul class="auto-suggestion-list">';
									
									
									for (var i=0;i<looplength;i++) {
										html += '<li><a href="#" data-value="' + suggestionVal[i].pcode+','+suggestionVal[i].burb+','+suggestionVal[i].state+ '">' + suggestionVal[i].pcode+' '+suggestionVal[i].burb+', '+suggestionVal[i].state + '</a></li>';
									}
									html += '</ul> \
										</div> \
									</div>';
								}
							$autotextpopup = $current.next('#autotext-popup');
							
							if (!$autotextpopup.is(':visible')) {
								$('#autotext-popup').remove();
								$current.after('<div id="autotext-popup">' + html + '</div>');
								$('#autotext-popup').slideDown(100, function(){
									if(looplength > 3){
										var iscroll = new iScroll($(this).children('.auto-suggestion')[0], {
											fadeScrollbar: false
										});
									}	
								});
							} else {
								$autotextpopup.html(html);
								if(looplength > 3){
									var iscroll = new iScroll($autotextpopup.children('.auto-suggestion')[0], {
										fadeScrollbar: false
									});
								}
							}
							
							$('#autotext-popup a').click(function(e){
								e.preventDefault();
								$('#autotext-popup').hide();
								$current.val($(this).attr('data-value')).parents('form').submit();
							
							});
							if(e.which == 13) { //if user presses enter
								if ($(this).next('button, input').size() <= 0) { //if the next element isnt a button, else it will just do a form post			
									if(looplength >0){
										e.preventDefault();
										$('#autotext-popup').hide();
										var datain = suggestionVal[0].pcode+','+suggestionVal[0].burb+','+suggestionVal[0].state;
										$current.val(datain).parents('form').submit();
									}
								}
							} 
							
							},
							error: function(jqXHR, textStatus, errorThrown) {
								var html = '<div class="auto-suggestion" style="height:40px;"> \
									<div class="scroller"> \
										<ul class="auto-suggestion-list">';
								
								html += '<li><span>Currently unable to process your request. Please try again.</span></li>';
								html += '</ul> \
									</div> \
								</div>';
								$autotextpopup = $current.next('#autotext-popup');
								
								if (!$autotextpopup.is(':visible')) {
									$('#autotext-popup').remove();
									$current.after('<div id="autotext-popup">' + html + '</div>');
									$('#autotext-popup').slideDown(100, function(){
										if(looplength > 3){
											var iscroll = new iScroll($(this).children('.auto-suggestion')[0], {
												fadeScrollbar: false
											});
										}
									});
								} else {
									$autotextpopup.html(html);
									if(looplength > 3){
										var iscroll = new iScroll($autotextpopup.children('.auto-suggestion')[0], {
											fadeScrollbar: false
										});
									}
								}
							}
						});
					}
					else { 
						 $('#autotext-popup').remove();
						 var html = '<div class="auto-suggestion" style="height:55px;"> \
								<div class="scroller"> \
									<ul class="auto-suggestion-list">';
							html += '<li><span>No suburbs found. Please check and try again.</span></li>';
							html += '</ul></div></div>';
							$autotextpopup = $current.next('#autotext-popup');
							
							if (!$autotextpopup.is(':visible')) {
								$('#autotext-popup').remove();
								$current.after('<div id="autotext-popup">' + html + '</div>');
								$('#autotext-popup').slideDown(100, function(){
									if(looplength > 3){
										var iscroll = new iScroll($(this).children('.auto-suggestion')[0], {
											fadeScrollbar: false
										});
									}	
								});
							} else {
								$autotextpopup.html(html);
								if(looplength > 3){
									var iscroll = new iScroll($autotextpopup.children('.auto-suggestion')[0], {
										fadeScrollbar: false
									});
								}
							}
					 }
					
			}
			} else { //if there are less than 3 characters remove list
				$('#autotext-popup').remove();
			}
			//}
		}).blur(function(){
			/*setTimeout(function(){
				$('#autotext-popup').hide();
			}, 500);*/
		}).nextAll('.btn-grey, button').click(function(e){ //if user clicks find button (same as pressing enter) pick first
			e.preventDefault();
			$current = $(this).prevAll('input');
			$('#autotext-popup').remove();
			var inputval = $current.val();
			var splitVal = inputval.split(",");
			if((!(splitVal === undefined)) && splitVal.length == 3){
				initMobileStoreSearch();
			}else if (inputval.length >= o.limit){
				displaySuggestion();
			}
		});
	};
	
})( jQuery );

function displaySuggestion(){
	$('#store-search-lookup').each(function(){ 
		$(this).find('input.postcode-suburb').postcodeSearchEnable();
	});
}