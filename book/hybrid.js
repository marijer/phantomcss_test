/*
  Require and initialise PhantomCSS module
  Paths are relative to CasperJs directory
*/

var phantomcss = require('./../phantomcss.js');

var utils = require('utils');

// get all new files
var configure = require('configure-cs.js');

var allLanguages = ['en-gb', 'en-us', 'de', 'nl', 'fr', 'es', 'ca', 'it', 'pt-pt', 'pt-br', 'no', 'fi', 'sv', 'da', 'cs', 'hu', 'ro', 'ja', 'zh-cn', 'zh-tw', 'pl', 'el', 'ru', 'tr', 'bg', 'ar', 'ko', 'he', 'lv', 'uk', 'id', 'ms', 'th', 'et', 'hr', 'lt', 'sk', 'sr', 'sl', 'vi', 'tl', 'is'];
var hybridaids = ['357096', '364565','347810','342370','350432','367687','355250','359228','333862','337919','369111','360207','349572','363511','301132','357639','366380','352434','352126','359949','364197','365145'];


// minimal width 600 max 1000
// height 270 max 400 


var settings = configure.settings;

var title = settings.title ? settings.title : 'screenshots';
var screenshotSelection = settings.screenshotSelection ? settings.screenshotSelection : 'body';
var baseUrl = settings.baseUrl ? settings.baseUrl : 'http://www.booking.com';
var test = settings.test ? settings.test : 'languages';
var aids = settings.aids ? settings.aids : hybridaids;

phantomcss.init({
  screenshotRoot: './screenshots/' + title +'/'+ test,
  failedComparisonsRoot: './failures'
});

/*
  The test scenario
*/

var baseUrl = "https://secure.booking.com/book.html?"
var param = "label=test&sid=90f7b012875c45afdee6ef0c913c74d7&firstname=TEST&test=1&hostname=secure.booking.com&email=marije.rooze@booking.com&cc_cvc=111&interval=1&cc_year=2017&cc_month=01&stage=3&dc_issue_number=0&lastname=TEST&pincode=2836&checkin=2014-07-16&hotel_id=98251&cc_name=TEST&email_confirm=marije.rooze@booking.com&cc_type=MasterCard&total_cost=900&checkout=2014-07-16&cc_number=5413541354135413&nr_guests_9825103_80573616_1=1&guest_name_9825102_80109809_0=TESTT&guest_name_9825103_80573616_1=TESTTT&nr_guests_9825102_80109809_0=2&nr_guests_9825102_80573616_0=2&guest_name_9825103_80573616_0=TESTTTT&guest_name_9825102_80573616_0=TEST&address1=TEST&city=amsterdam&zip=1000&cc1=nl&phone=0612345678&remarks=TEST&lang=en;"

baseUrl += param;

casper.start(baseUrl);

casper.viewport(1024, 768);


casper.then(function(){
  var fs = require('fs');
   try {
    fs.write("./screenshots/" + title +'/'+ test + "/readme.txt", this.getCurrentUrl(), 'w');
    } catch(e) {
        console.log(e);
  }
});

casper.each(aids, function(self, aid, i) {

  var url = baseUrl + ";aid=" + aid;

  casper.thenOpen(url, {
    method: "post",
     headers: {
          'Accept': 'application/json'
        }
  }, function(){


  // from room table to step 2
  casper.then(function(){

      var hideElements = 'select';
       phantomcss.screenshot( screenshotSelection, aid + '_bp1' , hideElements);

  });

  // from room table to step 2
  casper.then(function(){
      this.evaluate(function() {
              document.querySelector('select.ClickTaleSensitive').selectedIndex = 2; //it is obvious
              return true;
      });

      this.evaluate(function() {
        document.querySelector('form[name="bookForm"]').submit();
        return true;    
      })


      var hideElements = 'select';
       phantomcss.screenshot( screenshotSelection, aid + '_bp2', hideElements);
  });

  // fill information
  casper.then(function(){
      this.evaluate(function() {

        function checkInput(id, value){
            var el = document.getElementById(id);
            el.value = value;
        }

        checkInput('firstname', 'working');
        checkInput('lastname', 'working');
        checkInput('email', 'marije.rooze@booking.com');
        checkInput('email_confirm', 'marije.rooze@booking.com');

        checkInput('email', 'marije.rooze@booking.com');
        checkInput('email_confirm', 'marije.rooze@booking.com');
        return true;

      });

  });
});


  // from room table to step 3
  casper.then(function(){
    this.click('[name="book"]');
  });



  // from room table to step 3
  casper.then(function(){

    console.log('clicked ok, new location is ' + this.getCurrentUrl());

        var hideElements = 'select';
        phantomcss.screenshot( screenshotSelection, aid + '_bp3', hideElements);
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