/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

var fs = require('fs'),
    exec = require('child_process').exec,
    util = require('./util'),
    child,
    target_path = process.argv[2],
    repoUpdateKey = "'origin/master' by ";


function checkStatus(exists) {
    console.log('checking status:', exists, target_path);
    if (exists) {
        fs.open(target_path + '/' + '.watcher','a', function(err, fd) {
            process.chdir(target_path);
            child = exec('git status', function(error,stdout,stderr) {
                var index = stdout.search('behind');
                console.log(index);
                if (index > -1) {
                    var commits = stdout.search(repoUpdateKey);
                    commits = stdout.substring(commits + repoUpdateKey.length, commits + repoUpdateKey.length + 1);
                    child1 = exec('git log -n ' + commits + ' --no-merges' + ' --pretty=oneline', function(error,stdout,strerr) { 
                        commitsha = stdout.split(" ")[0];
                        util.checkoutGitCommit(commitsha, function(success) { 
                            console.log('checked out to commit ', commitsha);});
                        console.log("HEY HEY UTIL CREATE TEST BENCH");
                        util.createTestBench('android',commitsha);                        
                    });
                }
/*
                grep = exec('echo ' + stdout + ' | grep "behind"', function(error,stdout,stderr){
                    console.log(error,stdout,stderr);
                });
*/
                // grep for "Your branch is behind 'origin/master' by 1 commit" number of commits behind
                //if behind, update

//                once updated 
                // checkout next commit
                //generate project
                // execute test on 
            }); 
        });
    } 
}


fs.exists(target_path + '/' + '.git', checkStatus);


/*
*/
/*
checkStatus()
.then(createTestBench)
.then(compileTestBench)
.then(findPackage)
.then(runSuite);
*/
/*setInterval( function() {
    if (!target_path) throw "Error: missing argument: target";
    
    console.log("Repo Watcher Wakeup: watching " + target_path);


   // check path variable
   // check path for git repo
   // check path for "watcher.log" 


    try {    
    } catch(e) {
        console.log(e);
    }
}, 1000); 
*/
