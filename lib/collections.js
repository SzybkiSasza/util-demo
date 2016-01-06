var Helpers = require('./helpers');

module.exports = {

  /**
   * Creates a new array using generator function
   *
   * @param  {number} length        Length of array to be generated
   * @param  {function} generator   Generator function
   * @return {array}                Generated array
   */
  create: function(length, generator) {
    var array = [];
    length = length || 0;

    for (var i = 0; i < length; i++) {
      var value = typeof generator === 'function' ? generator(i) : i;
      array.push(value);
    }

    return array;
  },

  /**
   * Maps an array of values onto a new array using given iteratee function and optional context
   * This function treats input array as immutable and returns a new - mapped - array.
   *
   * @param  {array|object} iterable        Input object. Is treated as immutable.
   * @param  {function} iteratee  Function transforming each value into new one.
   * @param  {object} context     Optional context to bind iteratee to
   * @return {array}              Resulting array
   */
  map: function(iterable, iteratee, context) {
    var array = Helpers.sliceToArray(iterable);
    var result = [];
    var boundIteratee = Helpers.bindContext(iteratee, context);

    if (typeof boundIteratee === 'function') {
      for (var i = 0; i < array.length; i++) {
        result.push(boundIteratee(array[i], i, array));
      }
    } else {
      result = array;
    }

    return result;
  },

  /**
   * Reduces given array to single value based on given iteratee function
   * TODO: possibly rewrite it to be recursive. For now I leave it as it is
   *
   * @param  {array|object} iterable   Input iterable. Is treated as immutable
   * @param  {function} iteratee       Function accumulating values. Returend value should be result of accumulation
   * @param  {any} accumulator         Initial value for accumulation
   * @param  {object} context          Optional context to bind iteratee to
   * @return {any}                     Resulting value
   */
  reduce: function(iterable, iteratee, accumulator, context) {
    var array = Helpers.sliceToArray(iterable);
    var boundIteratee = Helpers.bindContext(iteratee, context);
    var result = !!accumulator ? accumulator :
      (array.length ? array[0] : undefined);

    if (typeof boundIteratee === 'function') {
      for (var i = !!accumulator ? 0 : 1; i < array.length; i++) {
        result = boundIteratee(result, array[i], i, array);
      }
    }

    return result;
  },

  /**
   * Checks if every iterable element meets predicate
   *
   * @param  {array|object} iterable  Input iterable. Is treated as immutable
   * @param  {function} iteratee      Predicate function
   * @param  {object} context         Optional context to bind iteratee to
   * @return {boolean}                Resulting checks value
   */
  every: function(iterable, iteratee, context) {
    var array = Helpers.sliceToArray(iterable);
    var boolArray = this.map(array, iteratee, context);
    var boolReducer = function(result, value) {
      return result === true ? !!value : false;
    };

    return !!this.reduce(boolArray, boolReducer, true);
  },

  /**
   * Checks if none of iterable elements meet predicate
   * Differs only in boolChecker from 'every' so could be rewritten in future to use common code
   *
   * @param  {array|object} iterable  Input iterable. Is treated as immutable
   * @param  {function} iteratee      Predicate function
   * @param  {object} context         Optional context to bind iteratee to
   * @return {boolean}                Resulting checks value
   */
  none: function(iterable, iteratee, context) {
    var array = Helpers.sliceToArray(iterable);
    var boolArray = this.map(array, iteratee, context);
    var boolReducer = function(result, value) {
      return result === false ? !!value : true;
    };

    return !this.reduce(boolArray, boolReducer, false);
  },

  /**
   * Returns list of unique values from iterable. Could accept iteratee to compute unique criterion
   *
   * @param  {array|object} iterable  Input iterable. Is treated as immutable
   * @param  {function} iteratee      Optional iteratee to process values through uniqueness criterion
   * @param  {object} context         Optional context to bind iteratee to
   * @return {array}                Resulting array
   */
  unique: function(iterable, iteratee, context) {
    var array = this.map(iterable, iteratee, context);

    var uniques = {};
    var result = [];
    for (var i = 0; i < array.length; i++) {
      if (!uniques.hasOwnProperty(array[i])) {
        uniques[array[i]] = true;
        result.push(array[i]);
      }
    }

    return result;
  },

  /**
   * Adds arbitrary number of arguments to given iterable as array elements
   *
   * @param  {array|object} iterable  Input iterable. Is treated as immutable
   * @return {array}                  Resulting array
   */
  add: function(iterable) {
    var array = Helpers.sliceToArray(iterable);
    var concatArray = Helpers.sliceToArray(arguments, 1);

    if (concatArray.length) {
      return array.concat(concatArray);
    } else {
      return array;
    }
  }
};
