try {
    var buildPath = './build/Release/binding.node';
    var preBuildPath = './prebuilds/' + process.version + '/' + process.platform + '-' + process.arch + "/build/Release/binding.node";

    var fs = require('fs');
	var path = require('path');
    if (fs.existsSync(path.join(__dirname, preBuildPath))) {
        process.dlopen(module, require.resolve(preBuildPath));
    } else {
        process.dlopen(module, require.resolve(buildPath));
    }
} catch(e) {
    console.error('load cache moudle error:', e);
}

exports.SIZE_DEFAULT = 6;
exports.SIZE_64 = 6;
exports.SIZE_128 = 7;
exports.SIZE_256 = 8;
exports.SIZE_512 = 9;
exports.SIZE_1K = 10;
exports.SIZE_2K = 11;
exports.SIZE_4K = 12;
exports.SIZE_8K = 13;
exports.SIZE_16K = 14;

if (process.mainModule === module && process.argv[2] === 'release') {
    process.argv.slice(3).forEach(exports.release);
}