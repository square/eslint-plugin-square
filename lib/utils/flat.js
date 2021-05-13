// JavaScript `Array.prototype.flat()` requires Node 11+.
function flat(array) {
  return array.reduce((accumulator, value) => accumulator.concat(value)); // eslint-disable-line unicorn/prefer-spread
}

module.exports = flat;
