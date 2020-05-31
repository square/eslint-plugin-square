// JavaScript `Array.prototype.flat()` requires Node 11+.
function flat(array) {
  return array.reduce((accumulator, value) => accumulator.concat(value));
}

module.exports = flat;
