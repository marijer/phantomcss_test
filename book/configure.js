// run in terminal: casperjs test book/bookings2.js

/*

The following types of tests can be set
test: selected_currency, b_lang, cities, viewport widget , custom

*/

var settings = {
	title: "hotelpage",
	screenshotSelection: '.sr_item',  
	hideElements: '', // you can hide an element for example '.bigbluebutton'
	baseUrl: 'http://www.booking.com/searchresults',
	param: 'city=-2601889&ssne=London&ssne_untouched=London&error_url=http%3A%2F%2Fwww.booking.com%2Fhotel%2Fgb%2Fcrownplazalondonstjames.en-gb.html%3Faid%3D379709%3Bsid%3D2077cf6930795b123effce25d6ad4b48%3Bdcid%3D1%3Bcheckin_monthday%3D2%3Bcheckin_year_month%3D2014-3%3Bcheckout_monthday%3D3%3Bcheckout_year_month%3D2014-3%3Bdist%3D0%3Bdo_availability_check%3D1%3Bhp_group_set%3D0%3Btype%3Dtotal%3B&highlighted_hotels=124268&src=hotel&aid=379709&dcid=1&sid=2077cf6930795b123effce25d6ad4b48&si=ai%2Cco%2Cci%2Cre%2Cdi&ss=London&checkin_monthday=2&checkin_year_month=2014-3&checkout_monthday=3&checkout_year_month=2014-3&interval_of_time=any&flex_checkin_year_month=any&sb_predefined_group_options_value=2&no_rooms=1&group_adults=2&group_children=0&dest_type=city&dest_id=-2601889&b_site_experiment_sr_less_rooms=1',
	test: {
		type: 'cities',
		//parameter: 'cities'
		//: ['-32424', 'ar', 'nl'] 
	}
}

exports.settings = settings;


/* 
 EXPLANATION

 	Only use this one as smoke testing - 
 	select boxes are set with 

	SELECTED_CURRENCY

		test: {
			type: 'selected_currency',
			array: ['EUR', 'CAD', 'OMR'] // if this one is not set - it will go through all languages
		}

	B_LANG

	test: {
		type: 'b_lang',
		array: ['ar', 'de', 'ru'] // if this one is not set - it will go through all languages
	}

	VIEWPORT WIDGET  -- AFFILIATES
		test: {
			type: 'viewport widget',
			language: 'de',
			minWidth: 150,
		 	maxWidth: 350,
		 	minHeight: 150,
		 	maxHeight: 350,
		 	heightInterval: 10,
		 	widthInterval: 10,
		}

	CUSTOM

	test: {
			type: 'custom',
			extensionName: 'superman',
			language: 'de',
			parameter: "city",
			array: ["-1456928", "-2595386", "-126693"]
		}

*/
