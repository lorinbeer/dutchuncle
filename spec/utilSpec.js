
var Q = require('Q');


describe("DU Util Test Suite", function () {
    var util = require('../src/util.js'),
        aBigFatLie = {},
        processMock = {},
        exec = jasmine.createSpy('exec');
            


    beforeEach(function () {
        aBigFatLie = {
        'promise' : "I PROMISE",
        'resolve' : function() {},
        'reject' : function() {}
        };


        spyOn(process,'chdir');


        spyOn(Q, 'defer');

        

 //       spyOn(Q, 'promise');
/*        spyOn(aBigFatLie, "resolve"); 
        spyOn(aBigFatLie, "reject"); 
        spyOn(aBigFatLie, "promise");  
*/
        spyOn(process, 'chdir');
    });

    it("should have an 'addCordovaPlatform' function which returns a promise", function () {
        var promise;
        expect(util.addCordovaPlatform).toBeDefined();
        promise = util.addCordovaPlatform("","");
//        expect(
//        expect(promise).toEqual();
    });

    it("should have an 'addCordovaPlatform' function which returns a promise", function () {

        //expect(process.chdir).toHaveBeenCalled();

        

 //       expect(process.defer).toHaveBeenCalled();

//        expect(util.addCordovaPlatform("../dutchuncle",""));   

    // expect(util.addCordovaPlatform("","")).toEqual("I PROMISE");
       // expect(exec).toHaveBeenCalled();
//      expect(exec).toHaveBeenCalled();
    });
});
