
var path = require('path'),
    forever = require('forever-monitor');


module.exports = function (path) {
    var watcher,
        env = { 'target' : path };

    watcher = new (forever.Monitor)('src/repowatcher.js', {
        max: 1,
        silent: false,
        env: {'target':path},
        options: [path]
    });


    watcher.on('exit', function() {
        console.log("Watcher has exited");
    });


    watcher.start();

};
