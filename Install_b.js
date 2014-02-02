Install

1. install phantomjs
phantomjs.org/download

Set the bin file in your PATH ( for mac this is usr/local/bin )

$ phantomjs --version

2. install casperjs

in the terminal:
$ git clone git://github.com/n1k0/casperjs.git
$ cd casperjs
$ ln -sf `pwd`/bin/casperjs /usr/local/bin/casperjs

$ casperjs --version

3. install phantomcss + custom code

setup a folder somewhere in your directory and insert the next: 
$git clone https://github.com/marijer/phantomcss_test
$cd PhantomCSS

4. run it

$ casperjs test book/bookings2.js


