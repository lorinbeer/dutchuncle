"use strict";

/*
run:
  node local-android-wd-contacts.js
*/

var wd = require("wd");
require('colors');

var desired = {
  device: 'Android',
  "app-package": "com.cordova.specrunner", // built-in contact app
  "app-activity": "CordovaSpecRunner"
};

// Default is for very slow ARM emulator
var TIME_BASE_UNIT = parseInt(process.env.TIME_BASE_UNIT || 5000);

// Instantiate a new browser session
var browser = wd.promiseChainRemote("localhost" , 4723);

// See whats going on
browser.on('status', function(info) {
  console.log(info.cyan);
});
browser.on('command', function(meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});

var bc = function(t) { return "//button[contains(@text, '" + t + "')]"; };
var ec = function(t) { return "//editText[contains(@text, '" + t + "')]"; };
var tc = function(t) { return "//text[contains(@text, '" + t + "')]"; };

// Run the test
browser
  .init(desired).then(function() {
    return browser
      // waiting for app initialization
     //.waitForElementByXPath(tc('CordovaSpecRunner'), 10*TIME_BASE_UNIT)
        .elementByName('main')
      //try to delete contact if it is there
      .then(function(err, el) {
        console.log('found element blah', err, el); 
        //.catch(function() {/* ignore */});
      })
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  })
  .done();
