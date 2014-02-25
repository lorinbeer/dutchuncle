
var Q = require('Q'),
    path = require('path')
    child = require('child_process');
    
describe("DU Util Test Suite", function () {
    var util = require('../src/util.js'),
        aBigFatLie = {},
        config = { 'temproot' : "~/.cordovatestsuite" },
        mockExecPass,
        mockExecFail; 

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
/*
        mockExecPass = jasmine.createSpy('exec').andCallFake(function(cmd,cb) {
            cb(null,"",null);
        });
*/
    });


    describe("checkoutGitCommit unit tests", function() {
        var sha,
            cb,
            mockExecPass; 

        beforeEach(function () {
            sha = "whatarethechances"
            cb = function (err,stdout,stderr) {};
 
         // mock config object
            config = { 'temproot' : '/Users/defaultuser/.cordovatestsuite' },
            spyOn(config,'temproot'); 
         
            spyOn(util,'checkoutGitCommit').andCallThrough();

            mockExecPass = spyOn(child, 'exec');

            util.checkoutGitCommit(sha,cb);
        });
    
        it("should have an 'checkoutGitCommit'", function () {
            expect(util.checkoutGitCommit).toBeDefined();
        });

        it("should attempt to checkout a git commit through executing a shell command", function () {
            expect(util.checkoutGitCommit).toHaveBeenCalledWith(sha,cb);
            expect(mockExecPass).toHaveBeenCalledWith("git checkout " + sha); 
        });

    });

   describe("addCordovaPlatform unit tests", function() {
        var testPath = "path/to/cordova/project",
            testPlatform = "nintendo-play-360-box", 
            config,
            promise;
 

        beforeEach(function () {
         // mock config object
            config = { 'temproot' : '/Users/defaultuser/.cordovatestsuite' },
            spyOn(config,'temproot'); 
         // mock the temp dir generation function in utils  
            spyOn(util,'getTempDirPath').andReturn("/Users/guy/.cordovatestsuite");
            spyOn(util,'addCordovaPlatform').andCallThrough();
 
            promise = util.addCordovaPlatform(testPath, testPlatform);

        });
    
        it("should have an 'addCordovaPlatform' function which returns a promise", function () {
            expect(util.addCordovaPlatform).toHaveBeenCalledWith(testPath,testPlatform);
            expect(promise).toBeDefined();
        });

        it("should change working directories to the test suite temp directory offset by a valid cordova project path", function () {
            expect(process.chdir).toHaveBeenCalledWith(path.join(util.getTempDirPath(),testPath));
        });

    });



});
