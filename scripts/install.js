var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

var preBuildPath = '../prebuilds/' + process.version + '/' + process.platform + '-' + process.arch + "/build/Release/binding.node";

try {
    if (fs.existsSync(path.join(__dirname, preBuildPath))) {
        console.log(require(preBuildPath));
    } else {
        console.log('[ PREBUILD ] PreBuild Version: ' + preBuildPath + ' is found');
        runRebuild();
    }
} catch (e) {
    console.log('[ PREBUILD ] Missing PreBuild Version: ' + preBuildPath + ', Try Rebuild.');
    runRebuild();
}

function runRebuild() {
    execSync('node-gyp rebuild', {
        stdio: 'inherit'
    });
}