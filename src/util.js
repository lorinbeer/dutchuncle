
var exec = require('child_process').exec,
    child = require('child_process'),
    path = require('path'),
    root = path.resolve(__dirname),
    Q = require('q');
    cordova = require('cordova'),
    config = require('../config'),
    UtilModule = 0;

function execOutputHandler(execCmd, err, stdout, stderr) {
    if (err) {
        console.log('whoopsie doodle: there was a problem when executing ' + execCmd);
        console.log('resulted in: ', err, stdout, stderr);
        return false; 
    }
    return true;
};

function installAllCDVPlugins() {
    var child,
        installplugin;
};


UtilModule = {

    /**
     * shortcut function for creating a Cordova TestBench
     */
    createTestBench : function(platform, sha) {
        var child,
            projName = 'TestBench-' + sha,
            projId = 'org.testbench.cordova',
            cwd = process.cwd(),
            addPlatformCmd = "";

        UtilModule.createCordovaProject(projName,projId)

        .then(function (err) {
            process.chdir(cwd);
            return UtilModule.addCordovaPlatform(projName, platform);
        })

        .then(function (err) {
            process.chdir(cwd);
            return UtilModule.addAllCDVPlugins(projName);
        })

        .then(function (err) {
            process.chdir(cwd);
            return UtilModule.cloneUnitTestApp(projName);
        })

        .then(function (err) {
            process.chdir(cwd);
            return UtilModule.buildCordovaProject(projName,platform);
        })

        .catch(function(err){
            console.log(err);
        });

    },


    /**
     *
     */    
    createCordovaProject : function(projectName,projectId) {
        var q,
            createCmd = "cordova create " + projectName + ' ' + projectId + ' ' + projectName;

        q = Q.defer();

        process.chdir(path.normalize(UtilModule.getTempDirPath()));

        child.exec(createCmd, function(err,stdout,stderr) {
            q.resolve([err,stdout,stderr]);
       }); 
       return q.promise;
    },

    addCordovaPlugin : function(projectPath,plugin) {
        var q = Q.defer(),
            addCmd = 'cordova plugin add ' + plugin;
        
        process.chdir(path.join(UtilModule.getTempDirPath(),projectPath));

        child.exec(addCmd, function(err,stdout,stderr) {
            if (err) {
                q.reject([err,stdout,stderr]);
            } else { 
               q.resolve([err,stdout,stderr]);
            }
        });
 
        return q.promise;
    },

    addAllCDVPlugins : function(projectPath) {
        var q = Q.defer(),
            cwd = root,
            plugins = config.plugins,
            tempdir = config.temproot;
        
        var recurseAdd = function (projectPath,plugins,i) {
            // restore to the original working directory
            process.chdir(cwd);
            if (i >= plugins.length) {
                q.resolve();
                return;
            }
            UtilModule.addCordovaPlugin(projectPath,plugins[i]).then(function(err){
                if (err) {
                    q.reject(err);
                }
                recurseAdd(projectPath,plugins,i+1);
            });
        }

        // bootstrap
        recurseAdd(projectPath,plugins,0);

        return q.promise;
    },

    /**
     *
     */
    addCordovaPlatform : function(projectPath,platform) {
        var q = Q.defer(),
            addPlatformCmd ='cordova platform add ' + platform;

        process.chdir(path.join(UtilModule.getTempDirPath() ,projectPath));

        child.exec(addPlatformCmd, function(err,stdout,stderr) {
            if (err) {
                q.reject([err,stdout,stderr]);
            } else {
                q.resolve([err,stdout,stderr]);
            }
        });
        
        return q.promise;
    },

    /*
     * 
     */
    copyUnitTestSuite : function(projectPath) {
/*
        var q = Q.defer(),
            child,
            cloneCmd = 'git clone https://git-wip-us.apache.org/repos/asf/cordova-mobile-spec.git www/';

            process.chdir(path.normalize(projectPath));
 
            child = exec(cloneCmd, function(err,stdout,stderr) {
                if (err) {
                    q.reject([err,stdout,stderr]);
                } else {
                    q.resolve([err,stdout,stderr]);
                }
            }
        return q.promise;
*/
    },


    /*
     *
     */
    buildCordovaProject : function(projectPath,platform) {
        var q = Q.defer(),
            buildCmd = 'cordova build ' + platform;

        process.chdir(path.join(UtilModule.getTempDirPath() ,projectPath));

        child.exec(buildCmd, function(err,stdout,stderr) {
            if (err) {
                q.reject([err,stdout,stderr]);
            } else {
                q.resolve([err,stdout,stderr]);
            }
        });

        return q.promise;
    },

    /**
     * 
     */
    checkoutGitCommit : function(sha,cb) {
        child.exec('git checkout ' + sha, function(err,stdout,stderr) {
            cb(err,stdout,stderr);
        });
    },
    
    /**
     * OSOT for temporary working directory
     */
    getTempDirPath : function() {
        return config.temproot;
    }
}


module.exports = UtilModule;
