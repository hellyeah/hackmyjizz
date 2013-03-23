$(document).ready(function(){

$('.deals-container').isotope({
  // options
  	itemSelector : '.deal-box',
  	layoutMode : 'masonry',
  	masonry : { 
   		columnWidth : 320 
  	}
});

Parse.initialize("78XHwuLO8Zzh69s6LJjLPMrysLrJrlMIXhZFrWA1", "yI38JPljByHBEVZcE4B5n51gpQ5Fh9JrSoQMUu78");
var deal_template_source = $('#deal-template').html(),
	//dropdown_template_source = $('#dropdown-item-template').html(),
	deal_template = Handlebars.compile(deal_template_source),
	//dropdown_item_template = Handlebars.compile(dropdown_template_source),
	imgUrl = "http://www.photo-dictionary.com/photofiles/list/8/667airplane.jpg";

var TRIP = TRIP || {};

$.extend(TRIP, {
	
	item_count: 0,
	/*
	appendDeal: function(flight, styleName) {
		//var aptCode = flight.get("destCode"),
		//CityImages = Parse.Object.extend("CityImages"),
		//cityImage = new CityImages(),
		//cityQuery = new Parse.Query(CityImages);
      	//cityQuery.equalTo("airportCode", aptCode);
      	cityQuery.first({
		  success: function(result) {
		  	imgUrl = result.get("imgUrl");
			//var startDate =  moment(flight.get("departDate"), "MM/DD/YY"),
			//returnDate = moment(flight.get("returnDate"), "MM/DD/YY"),
			//numNights = returnDate.diff(startDate,'days'),
			//dafact = ((Math.random() * 1.2) + 1.4),
			flightPrice = parseInt(flight.get("price")),
			hotelPrice = flight.get("hotel_price");
			if (hotelPrice == null) hotelPrice = 75; 

			var totalPrice = (hotelPrice * numNights) + flightPrice;
		  	var html = deal_template({
				destination: TRIP.locationString(flight.get("destLocation")), 
				bg: imgUrl,
				trip_length: "for " + numNights + ((numNights != 1) ? " Nights" : " Night"),
				leaving: startDate.calendar(),
				price: Math.round(flightPrice),
				old_price: parseInt(dafact * flightPrice),
				hotel_price: Math.round(hotelPrice),
				total_price: Math.round(totalPrice),
				buynowhref: flight.get("link"),
				booknowhref: flight.get("hotel_link")
			})
			$('.deal-box').first().addClass('large');
			$('.deals-container').isotope('insert', $(html));
			TRIP.item_count++;
			if (TRIP.item_count == TRIP.numCities) {
				$('.deal-box').click(function(){
					mixpanel.track('Enlarged Deal', $(this).find('.destination-name').text());
				 	$('.deal-box.large').removeClass('large');
				 	$(this).addClass('large');
				 	$('.deals-container').isotope('reLayout');
			 	});			
			}
			
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});

	},
	*/
	getDeals: function() {
		var Deals = Parse.Object.extend("Donor"),
		deal = new Deals(),
		query = new Parse.Query(Deals);
		query.count({
			success:function(count) {
				TRIP.numCities = count;
			},
				error: function(result) {
				//do nothing
			}
		});
		query.find({
		  success: function(results) {
		  	$.each(results, function() {
		  		console.log(this);
		  		console.log(this.get("Accomplishments"));					

				console.log(this.get("price")+this.get("imgUrl")+this.get("Accomplishments"));


		  		//Compiling html with handlebars.js
		  		console.log("handlebars");
		  	var html = deal_template({
					destination: this.get("Accomplishments"), 
					bg: this.get("imgUrl"),
					trip_length: this.get("Accomplishments"),
					//leaving: startDate.calendar(),
					price: this.get("price"),
					//old_price: this.get("price"),
					//hotel_price: Math.round(hotelPrice),
					total_price: this.get("price"),
					buynowhref: this.get("imgUrl"),
					//booknowhref: flight.get("hotel_link")
			})
			$('.deal-box').first().addClass('large');
			$('.deals-container').isotope('insert', $(html));
			TRIP.item_count++;
			if (TRIP.item_count == TRIP.numCities) {
				$('.deal-box').click(function(){
				 	$('.deal-box.large').removeClass('large');
				 	$(this).addClass('large');
				 	$('.deals-container').isotope('reLayout');
			 	});			
			}
		  	});
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	},	
});
 TRIP.getDeals();

//mixpanel.track('Loaded Page');
/*
	function appendListing(html){
	    var bound = $(html).click(function(){
	      analytics.track("Enlarged Brick");
	      //analytics.track("Enlarged Brick " + $(this).find('.title').text());
	      $('.brick.large').removeClass('large');
	      $(this).addClass('large');
	      $('.brick-container').isotope('reLayout');
	    })
	    setTimeout(function(){
	      $('.brick-container').isotope('insert', bound);
	      $('.brick-container').isotope('reLayout')
	      render();
	    },0)
	};

	var ListingsQuery = new Parse.Query(Donor);
	ListingsQuery._order = "-updatedAt";

	var skip = 0;
	var count = 40;
	ListingsQuery.limit(count);

	function loadListings(){
	    ListingsQuery.find({ 
	      success: function(results){
	        $.each(results, function(i, item){
	            var compiled = _.template($('.listing-template').html());
	            html = compiled({
	              l: item,
	            })
	            appendListing(html);
	        })
	        skip += count;
	        ListingsQuery.skip(skip);
	      }
	    })    
	  };
*/

  	//loadListings();


});	
