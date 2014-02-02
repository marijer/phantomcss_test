// run in terminal: casperjs test book/bookings2.js

/*

The following types of tests can be set
test: selected_currency, b_lang, cities, viewport widget , custom

*/

var settings = {
	title: "cs city",
	screenshotSelection: '#container',
	baseUrl: 'http://www.booking.com/searchresults',
	param: 'ssne=London&amp;ssne_untouched=London&aid=348252&amp;w=180&amp;h=300&amp;dcid=0&amp;si=ai%2Cco%2Cci%2Cre&amp;ss=London&amp;checkin_monthday=31&amp;checkin_year_month=2014-1&amp;checkout_monthday=1&amp;checkout_year_month=2014-2&amp;do_availability_check=on&amp;tmpl=flexi_product&amp;size=l&amp;orientation=portrait&amp;variation=3&amp;theme=white&amp;product=cs&amp;show_usps=show_usps&amp;selected_currency=CLP',
	test: {
		type: 'cities',
		language: 'de'
		//array: ['de', 'fr']
	}
}

exports.settings = settings;


/* 
 EXPLANATION

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
