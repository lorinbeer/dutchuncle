
var exec = require('child_process').exec,
    cordova = require('cordova');

module.exports = {
    /**
     *
     */
    createTestBench : function(sha) {
        var child,
            projName = 'TestBench-' + sha,
            projId = 'org.testbench.cordova';

        console.log("utils createTestBench for commit ", sha);

        child = exec('cordova create ' + projName  + ' ' + projId + ' ' + projName, function(err,stdout,stderr) {
            console.log("cordova project created successfully", err);
        
           process.chdir(projName);              
           exec('pwd', function(e,out,err) {console.log(out);});
    
           exec('cordova platform add android', function(e,out,err){
                console.log(e,out,err);
            
//                exec('cordova platform add android', function(err,stdout,stderr) {
 //                 console.log("WHAT THE FUCK, CALL ME called promise");
//                });
                console.log("exec has been called");
            });     

       });

/*function(e) {
                console.log('test adding, did it work?', e);
                if (e) {
                    self.phonegap.emit('error', e);
                    callback(e);
                    return;
                }
//            }*///.then(function (a,b,c) {console.log("add called promise",a,b,c);});
   //            var child1 = exec('cordova plugin add ' + path-to-allplugins);
    },
    /**
     * 
     */
    checkoutCommit : function(sha,cb) {
        child = exec('git checkout ' + sha, function(err,stdout,stderr) {
            console.log(err,stdout,stderr);
            cb(true);
        });
    }
}

function testBench() {
    // directory to project
    // use cordova to create project
    // use cordova to run/compile project
}

function initTestBench(plugins) {
     
}

function clonegithubrepo() {
    
}

function pullgithubrepo() {

}

function createcordovaproject() {
/*
    CREATE DIRECTLY FROM REPO
    RUN PROJECT COMPILE
    IF FAIL ERROR OU T */
}
