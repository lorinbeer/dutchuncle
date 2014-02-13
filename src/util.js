
var exec = require('child_process').exec,
    cordova = require('cordova');

module.exports = {
    createTestBench : function(sha) {
        console.log("utils createTestBench for commit ", sha);
        var child = exec('cordova create TestBench-'+sha+' com.cordova.testbench '+'TEST-BENCH-'+sha, function(err,stdout,stderr) {
            console.log(err,stdout,stderr);








cordova.platform('add', 'android', function(e) {
        if (e) {
            self.phonegap.emit('error', e);
            callback(e);
            return;
        }
});

   //            var child1 = exec('cordova plugin add ' + path-to-allplugins);
        });
    },
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
