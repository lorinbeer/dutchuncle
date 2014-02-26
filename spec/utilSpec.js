
var Q = require('Q'),
    path = require('path'),
    child = require('child_process');
    
describe("DU Util Test Suite", function () {
    var util = require('../src/util.js'),
        aBigFatLie = {},
        mockExec;

    beforeEach(function () {
     // mock function used by utils to change the working directory
        process.chdir = function() {};

        spyOn(process,'chdir');
        spyOn(Q, 'defer');
        mockExec = spyOn(child, 'exec');   
    });

    it("should have a getTempDirPath function which returns a path", function () {
        var ret = util.getTempDirPath();    
        expect(util.getTempDirPath).toBeDefined();
        expect(ret).toBeDefined();
    });

    describe("checkoutGitCommit unit tests", function() {
        var sha,
            cb;

        beforeEach(function () {
            sha = "whatarethechances"
            cb = function (err,stdout,stderr) {};

         // spy on our target function and call it       
            spyOn(util,'checkoutGitCommit').andCallThrough();
            util.checkoutGitCommit(sha,cb);
        });
    
        it("should have an 'checkoutGitCommit'", function () {
            expect(util.checkoutGitCommit).toBeDefined();
        });

        it("should attempt to checkout a git commit through executing a shell command", function () {
            expect(util.checkoutGitCommit).toHaveBeenCalledWith(sha,cb);
            expect(mockExec).toHaveBeenCalled();
            expect(mockExec.mostRecentCall.args[0]).toEqual('git checkout ' + sha);
        });

    });

    //
    describe("Cordova Utility Function", function() {
        var testPath = "path/to/cordova/project",
            testPlatform = "nintendo-play-360-box", 
            config,
            promise;

        beforeEach(function () {
         // mock the temp dir generation function in utils  
            spyOn(util,'getTempDirPath').andReturn("/Users/defaultuser/.cordovatestsuite");
        });
   
        describe("'createCordovaProject'", function () {
            var testName = "ProjectTestName",
                testId = "com.test.id";

            beforeEach(function () {
            // create spy and run function
               spyOn(util,'createCordovaProject').andCallThrough();
               promise = util.createCordovaProject(testName, testId);
            });
     
            it("should be defined and return a promise", function () {
                expect(util.createCordovaProject).toHaveBeenCalledWith(testName,testId);
                expect(promise).toBeDefined();
            });

            it("should change working directories to the test suite temp directory offset by a valid cordova project path", function () {
                expect(process.chdir).toHaveBeenCalledWith(util.getTempDirPath());
            });

            it("should shell out with a properly composed cordova build command", function () {
                expect(mockExec).toHaveBeenCalled();
                expect(mockExec.mostRecentCall.args[0]).toEqual('cordova create ' + testName + ' ' + testId + ' ' + testName);
            });

        });

        describe("'addCordovaPlatform'", function () {
            var promise;
            
            beforeEach(function () {
            // spy and call function
               spyOn(util,'addCordovaPlatform').andCallThrough();
               promise = util.addCordovaPlatform(testPath, testPlatform);

            });
     
            it("should exist and return a promise", function () {
                expect(util.addCordovaPlatform).toHaveBeenCalledWith(testPath,testPlatform);
                expect(promise).toBeDefined();
            });

            it("should change working directories to the test suite temp directory offset by a valid cordova project path", function () {
                expect(process.chdir).toHaveBeenCalledWith(path.join(util.getTempDirPath(),testPath));
                expect(mockExec).toHaveBeenCalled();
                expect(mockExec.mostRecentCall.args[0]).toEqual('cordova platform add ' + testPlatform);
            });

        });
       
        describe("'addCordovaPlugin'", function () {
            var promise,
                testPlugin = "org.cordova.test.plugin";
            
            beforeEach(function () {
            // spy and call function
               spyOn(util,'addCordovaPlugin').andCallThrough();
               promise = util.addCordovaPlugin(testPath, testPlugin);
            });
     
            it("should exist and return a promise", function () {
                expect(util.addCordovaPlugin).toHaveBeenCalledWith(testPath,testPlugin);
                expect(promise).toBeDefined();
            });

            it("should change working directories to the test suite temp directory offset by a valid cordova project path", function () {
                expect(process.chdir).toHaveBeenCalledWith(path.join(util.getTempDirPath(),testPath));
                expect(mockExec).toHaveBeenCalled();
                expect(mockExec.mostRecentCall.args[0]).toEqual('cordova plugin add ' + testPlugin);
            });

            it("should shell out with a properly composed cordova build command", function () {
                expect(mockExec).toHaveBeenCalled();
                expect(mockExec.mostRecentCall.args[0]).toEqual('cordova plugin add ' + testPlugin);
            });

        });

        describe("'buldCordovaProject Unit Tests", function () {
            var promise;
            
            beforeEach(function () {
            // create spy and run function
               spyOn(util,'buildCordovaProject').andCallThrough();
               promise = util.buildCordovaProject(testPath, testPlatform);

            });
     
            it("should have an 'buildCordovaProject' function which returns a promise", function () {
                expect(util.buildCordovaProject).toHaveBeenCalledWith(testPath,testPlatform);
                expect(promise).toBeDefined();
            });

            it("should change working directories to the test suite temp directory offset by a valid cordova project path", function () {
                expect(process.chdir).toHaveBeenCalledWith(path.join(util.getTempDirPath(),testPath));
                expect(mockExec).toHaveBeenCalled();
                expect(mockExec.mostRecentCall.args[0]).toEqual('cordova build ' + testPlatform);
            });

        });

    });
});
