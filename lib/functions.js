module.exports = {

  /**
   * Creates curried function that could be invoked with any number of
   * remaining arguments till all are provided. In that case it returns
   * curried function with already bound arguments that were previously provided
   *
   * @param  {function} func  Function to be curried
   * @param  {...args}   args  Arguments to prepend to function
   * @return {function}       Curried function
   */
  curry: function(func) {
    return function() {};
  },

  /**
   *  Creates function that is composition (flow) of provided functions.
   *  Could take any number of functions as input, but at least two should be provided
   *
   * @param  {function} func1 First in chain. Could take any number of arguments
   * @param  {...function} func One that processes result of previous. Must be unary
   * @return {*}              Result of running second function
   */
  compose: function(func1) {
    return false;
  },

  /**
   * Memoizes particular function, adding cache functionality.
   * Could take optional resolver to compute keys based on function input params
   *
   * @param  {function} func     Function to be transformed into memoized One
   * @param  {function} resolver Resolver for cache keys
   * @return {function}          Memoized function
   */
  memoize: function(func, resolver) {
    return function() {};
  }
};
