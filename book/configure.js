// run in terminal: casperjs test book/bookings2.js

/*

The following types of tests can be set
test: selected_currency, b_lang, cities, viewport widget , custom

*/

var settings = {
	title: "booking index popular",  // this will create a folder in screenshots with that name
	screenshotSelection: '#popularDestinations',  // html element you want a screenshot off, eg 'body', '#searchbox' or '.b-popular_list'
	hideElement: '', // you can hide an element for example '.bigbluebutton'
	baseUrl: 'http://booking.com/index',
	param: 'checkin_monthday=1',
	test: {
		type: 'b_lang',
		extensionName: 'superman'
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
