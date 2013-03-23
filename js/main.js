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
		  	var html = deal_template({
					name: this.get("Name"),
					bg: this.get("imgUrl"),
					description: this.get("Accomplishments"),
					iq: this.get("IQ"),
					price: this.get("price"),
					total_price: this.get("price"),
			})
			$('.deal-box').first().addClass('large');
			$('.deals-container').isotope('insert', $(html));
			TRIP.item_count++;
			if (true) {
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



});
