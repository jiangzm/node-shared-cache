const crypto = require("crypto");
const os = require("os");
const nativeModule = require("./build/Release/binding.node");

let cacheMap = {};

function md5(str) {
  let md5sum = crypto.createHash("md5");
  md5sum.update(str);
  return md5sum.digest("hex");
}

module.exports = Object.assign(
  {
    SIZE_DEFAULT: 6,
    SIZE_64: 6,
    SIZE_128: 7,
    SIZE_256: 8,
    SIZE_512: 9,
    SIZE_1K: 10,
    SIZE_2K: 11,
    SIZE_4K: 12,
    SIZE_8K: 13,
    SIZE_16K: 14,
  },
  nativeModule
);

const VERSION = process.version;
const PLATFORM = os.platform();
const ARCH = os.arch();
const USERNAME = os.userInfo().username;

class Cache {
  constructor(name, size, blockSize) {
    blockSize = blockSize || exports.SIZE_DEFAULT;
    let md5Name = md5(
      `${VERSION}_${PLATFORM}_${ARCH}_${USERNAME}_${name}_${size}_${blockSize}`
    ).slice(8, 24);
    if (!Object.prototype.hasOwnProperty.call(cacheMap, md5Name)) {
      cacheMap[md5Name] = new nativeModule.Cache(md5Name, size, blockSize);
    }
    return cacheMap[md5Name];
  }
}

exports.Cache = Cache;

if (require.main === module && process.argv[2] === "release") {
  process.argv.slice(3).forEach(exports.release);
}
