
var Q = require('Q'),
    path = require('path');


describe("DU Util Test Suite", function () {
    var util = require('../src/util.js'),
        aBigFatLie = {},
        processMock = {},
        exec = function(cmd,cb) {
        }; 
            


    beforeEach(function () {
        aBigFatLie = {
        'promise' : "I PROMISE",
        'resolve' : function() {},
        'reject' : function() {}
        };

        // mock function used by utils to change the working directory
        process.chdir = function() {};

        spyOn(process,'chdir');
        spyOn(Q, 'defer');
    });


    it("should have an 'addCordovaPlatform' function which returns a promise", function () {
        var promise;
        expect(util.addCordovaPlatform).toBeDefined();
        promise = util.addCordovaPlatform("","");
        expect(promise).toBeDefined();
    });

    it("should attempt to change the working directory when 'addCordovaPlatform' is called", function () {
        var testPath = path.join(process.cwd(),"path/to/cordova/project");
        
        promise = util.addCordovaPlatform(testPath, "android");
        expect(process.chdir).toHaveBeenCalled();
    });

    it("should reject the promise when exec fails", function () {
        
    });

    it("should resolve the promise when exec succeeds", function () {

    });


});
