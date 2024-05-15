const assert = require("assert");
const cache = require("../index.js");

let obj = new cache.Cache("test", 100 * 1024 * 1024);

console.time("Node test: ");

for (let i = 0; i <= 1200; i++) {
  obj["test" + i] = i;
}

for (let i = 0; i <= 1200; i++) {
  assert.strictEqual(obj["test" + i], i);
}

console.timeEnd("Node test: ");

// console.log("==== Dump ====");
// console.log(cache.dump(obj));
