module.exports = {
  /**
   * Converts possible iterables to array
   *
   * @param {iterable}  iterable  Iterable object to slice into array
   * @param {number}    start     Start point for slicing. Optional.
   * @return {array}    Resulting array
   */
  sliceToArray: function(iterable, start) {
    if (!!iterable) {
      return Array.prototype.slice.call(iterable, start);
    } else {
      return [];
    }
  },

  /**
   * Checks if context is defined object and tries to bind it to given function
   *
   * @param  {function} func    Function to bind context to
   * @param  {object} context   Context for binding
   * @return {function}         Bound function
   */
  bindContext: function(func, context) {
    if (typeof func === 'function' && typeof context === 'object') {
      return func.bind(context);
    } else {
      return func;
    }
  }
};
