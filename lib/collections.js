module.exports = {
  /**
   * Creates a new array using generator function
   *
   * @param  {Number} length    Length of array to be generated
   * @param  {function} generator Generator function
   * @return {array}           Generated array
   */
  create: function(length, generator) {
    var array = [];
    for (var i = 0; i < length; i++) {
      array.push(generator(index));
    }

    return array;
  },

  /**
   * Maps an array of values onto a new array using given iteratee function and optional context
   *
   * @param  {array} array    Input array. Is treated as immutable.
   * @param  {function} iteratee function transforming each value into new one.
   * @param  {context} context optional context to bind iteratee to
   * @return {array}          resulting array
   */
  map: function(array, iteratee, context) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      array[i];
    }

    return result;
  },
  reduce: function(array, iteratee) {},
  every: function() {},
  none: function() {},
  unique: function() {},
  add: function() {}
};
