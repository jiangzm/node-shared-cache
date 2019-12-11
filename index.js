const crypto = require('crypto');

function md5() {
  let md5sum = crypto.createHash('md5');
  md5sum.update(str);
  return md5sum.digest('hex');
}

process.dlopen(module, require.resolve('./build/Release/binding.node'));

const NativeCache = exports.Cache;

let cacheMap = {};

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

function Cache(name, size, blockSize) {
  blockSize = blockSize || exports.SIZE_DEFAULT;
  let md5Name = md5(process.version + '_' + os.platform() + '_' + os.arch() + '_' + name + '_' + size + '_' + blockSize).slice(8, 24);
  if (!Object.prototype.hasOwnProperty.call(cacheMap, md5Name)) {
    cacheMap[md5Name] = new NativeCache(md5Name, size, blockSize);
  }
  return cacheMap[md5Name];
}

exports.Cache = Cache;

if (process.mainModule === module && process.argv[2] === 'release') {
  process.argv.slice(3).forEach(exports.release);
}