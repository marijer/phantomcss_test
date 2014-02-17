/*
  Require and initialise PhantomCSS module
  Paths are relative to CasperJs directory
*/

var phantomcss = require('./../phantomcss.js');

// get all new files
var configure = require('configure.js');


// default arrays
var allLanguages = ['en-gb', 'en-us', 'de', 'nl', 'fr', 'es', 'ca', 'it', 'pt-pt', 'pt-br', 'no', 'fi', 'sv', 'da', 'cs', 'hu', 'ro', 'ja', 'zh-cn', 'zh-tw', 'pl', 'el', 'ru', 'tr', 'bg', 'ar', 'ko', 'he', 'lv', 'uk', 'id', 'ms', 'th', 'et', 'hr', 'lt', 'sk', 'sr', 'sl', 'vi', 'tl', 'is'];
var allCurrencies = ['ARS','AUD','AZN','BHD','BRL','BGN','CAD','XOF','CLP','CNY','COP','CZK','DKK','EGP','EUR','FJD','GEL','HKD','HUF','INR','IDR','ILS','JPY','JOD','KZT','KRW','KWD','LVL','LTL','MYR','MXN','MDL','NAD','TWD','NZD','NOK','OMR','PLN','GBP','QAR','RON','RUB','SAR','SGD','ZAR','SEK','CHF','THB','TRY','AED','USD','UAH','VEF'];
var cities = [{ufi:"-2601889",name:"London"},{ufi:"-1456928",name:"Paris"},{ufi:"-126693",name:"Roma"},{ufi:"-782831",name:"Dubai"},{ufi:"-372490",name:"Barcelona"},{ufi:"20088325",name:"New York"},{ufi:"-390625",name:"Madrid"},{ufi:"-2140479",name:"Amsterdam"},{ufi:"-1746443",name:"Berlin"},{ufi:"-755070",name:"Ä°stanbul"},{ufi:"-121726",name:"Milano"},{ufi:"-553173",name:"Prague"},{ufi:"-1829149",name:"MÃ¼nchen"},{ufi:"-1995499",name:"Wien"},{ufi:"20079110",name:"Las Vegas"},{ufi:"-3414440",name:"Bangkok"},{ufi:"-1502554",name:"Dublin"},{ufi:"-73635",name:"Singapore"},{ufi:"-1955538",name:"Brussels"},{ufi:"-2167973",name:"Lisboa"},{ufi:"-1353149",name:"Hong Kong"},{ufi:"-117543",name:"Florence"},{ufi:"-132007",name:"Venice"},{ufi:"-2960561",name:"Moscow"},{ufi:"-1603135",name:"Sydney"}];

var sizes = [
        [320, 480],
        [320, 568],
        [600, 1024],
        [1024, 768],
        [1280, 800],
        [1440, 900],
    ];


var settings = configure.settings;

var title = settings.title ? settings.title : 'screenshots';
var screenshotSelection = settings.screenshotSelection ? settings.screenshotSelection : 'body';
var baseUrl = settings.baseUrl ? settings.baseUrl : 'http://www.booking.com';
var param = settings.param ? settings.param : '';
//var test = settings.test ? settings.test : 'languages';

var test = settings.test ? settings.test : "errrrrror";
var type = test.type;
var defaultLanguage = test.language ? test.language : 'nl';

var added = test.extensionName ? "_" + test.extensionName : "";

// console.log(testObj.type);

phantomcss.init({
  screenshotRoot: './screenshots/' + title +'/'+ test.type + added ,
  failedComparisonsRoot: './screenshots/' + title +'/failures' + test.type + added
});


/*
  The test scenario
*/

switch (type) {
  case "b_lang":
    forEachArr = test.array ? test.array : allLanguages;
  break;
  case "selected_currency":
    forEachArr = test.array ? test.array : allCurrencies;
  break;
  case "viewport widget":
   var minWidth = test.minWidth ? test.minWidth : undefined;
   var maxWidth = test.maxWidth ? test.maxWidth : undefined;
   var minHeight = test.minHeight ? test.minHeight : undefined;
   var maxHeight = test.maxHeight ? test.maxHeight : undefined;
   var widthInteger = test.widthInteger ? test.widthInterval : 10;
   var heightInteger = test.heightInteger ? test.heightInterval : 10;

   if (minWidth && maxWidth && minHeight && maxHeight){
      sizes = [];
      for (var i = minWidth; i <= maxWidth; i+= widthInteger ){
        for (var j = minHeight; j <= maxHeight; j+= heightInteger ){
          var arr = [i, j];
          sizes.push(arr);            
         }
      }
   }
  forEachArr = sizes;
  break;

  case "cities": 
       forEachArr = test.array ? test.array : cities;
  break;
  case "custom": 
    var customParam = test.parameter;
    forEachArr = test.array;
  break;

}

var startUrl = baseUrl + '.en.html';

casper.start(startUrl);
  casper.viewport(1280, 800);

//phantomcss.turnOffAnimations();

casper.then(function(){
  var fs = require('fs');
   try {
    fs.write("./screenshots/" + title +'/'+ test.type + "/1_readme.txt", settings, 'w');
    } catch(e) {
      console.log(e);
  }
});

console.log( "Total length: " + forEachArr.length );
var totalLength = forEachArr.length;

casper.each(forEachArr, function(self, item, i) {

  var parameter = param || '',
      fileName = item;

   var url =  baseUrl + '.' + defaultLanguage + '.html';

  switch(type){
   case 'b_lang':
      url =  baseUrl + '.' + item + '.html';
      break;
    case 'selected_currency':
      parameter = param + ';selected_currency=' + item;
    break;
    case 'viewport widget':
      parameter = "w=" + item[0] + "&h="+ item[1] +"&"+ param;
      fileName = "h_" + item[1] + 'w_' + item[0];
      break;
   case 'cities':
         parameter = "city=" + item.ufi +"&"+ param;
         fileName = item.name + "_";
      break;
   case 'custom':
      parameter = param + "&" + customParam + "="+ item;
      fileName = customParam + "_" + item;
      break;
   } 

   this.thenOpen(url, {
      method: "post",
      data: parameter,
       headers: {
            'Accept': 'application/json'
          }
    }, function(){
      casper.then(function(){

        if (i === 0){
          casper.test.info( this.getCurrentUrl() );
        }

         // progress
         var percentage = Math.round ( ( 100 /totalLength ) * ( i + 1) );
         console.log( (i + 1) + "/" + totalLength + ": " +  percentage + '%' );

          var hideElements = settings.hideElements ? settings.hideElements : '' ;
          phantomcss.screenshot( screenshotSelection, 500, hideElements, fileName);
      });

    });
});


casper.then( function now_check_the_screenshots(){
  // compare screenshots
  phantomcss.compareAll();
}); 

casper.then( function end_it(){
  casper.test.done();
});

/*
Casper runs tests
*/
casper.run(function(){
  console.log('\nTHE END.');
  phantom.exit(phantomcss.getExitStatus());
});