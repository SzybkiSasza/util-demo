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
    for (var i = 0; i < length; i++) {
      array.push(generator(index));
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
    var array = this.sliceToArray(iterable);
    var result = [];
    var boundIteratee = this.bindContext(iteratee, context);

    for (var i = 0; i < array.length; i++) {
      result.push(boundIteratee(array[i], i, array));
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
    var array = this.sliceToArray(iterable);
    var result = accumulator;
    var boundIteratee = this.bindContext(iteratee, context);

    for (var i = 0; i < array.length; i++) {
      result = boundIteratee(result, array[i], i, array);
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
    var array = this.sliceToArray(iterable);
    var boolArray = this.map(array, iteratee, context);
    var boolReducer = function(result, value) {
      return result === true ? !!value : false;
    };

    return !!this.reduce(iterable, boolReducer, true);
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
    var array = this.sliceToArray(iterable);
    var boolArray = this.map(array, iteratee, context);
    var boolReducer = function(result, value) {
      return result === false ? !!value : true;
    };

    return !this.reduce(iterable, boolReducer, false);
  },

  unique: function(iterable, iteratee, context) {

  },

  add: function() {},

  /**
   * Small helper function for converting possible iterables to array
   *
   * @param {iterable}  iterable Iterable object to slice into array
   * @return {array}    Resulting array
   */
  sliceToArray: function(iterable) {
    return Array.prototype.slice.call(iterable);
  },

  /**
   * Checks if context is defined object and tries to bind it to given function
   *
   * @param  {function} func    Function to bind context to
   * @param  {object} context   Context for binding
   * @return {function}         Bound function
   */
  bindContext: function(func, context) {
    if (!!context && typeof context === 'object') {
      return func.bind(context);
    } else {
      return func;
    }
  }
};
