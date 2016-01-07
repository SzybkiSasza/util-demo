var chai = require('chai');
var expect = chai.expect;
var Collections = require('../lib/collections');

/* Important note about tests:
 *  I did not mock helpers module because it is interworking too closely
 *  with Collections module and mocking it with different response in almost
 *  each test would be pain in the ass. However, I tested it completely to make
 *  sure it behaves exactly as I want. */

describe('Collections utility module tests', function() {
  it('Is defined object', function() {
    expect(Collections).to.be.an('object');
  });

  describe('Create function tests', function() {
    it('Should generate empty array', function() {
      var generator = function(index) {
        return index;
      };
      expect(Collections.create(0, generator)).to.deep.equal([]);
      expect(Collections.create()).to.deep.equal([]);
    });

    it('Should generate simple array if generator is omitted', function() {
      expect(Collections.create(4)).to.deep.equal([0, 1, 2, 3]);
    });

    it('Should generate a proper array', function() {
      var generator = function(index) {
        return index * 2;
      };
      expect(Collections.create(5, generator)).to.deep.equal([0, 2, 4, 6, 8]);
    });
  });

  describe('Map function tests', function() {
    it('Should return empty result if first argument is not array-like',
      function() {
        expect(Collections.map()).to.deep.equal([]);
        expect(Collections.map(4)).to.deep.equal([]);
      });

    it('Should return iterable directly as array if iteratee is improper',
      function() {
        expect(Collections.map('asd')).to.deep.equal(['a', 's', 'd']);
        expect(Collections.map('asd', {
          a: 'a'
        })).to.deep.equal(['a', 's', 'd']);
      });

    it('Should return mapped array if iterable and iteratee are proper',
      function() {
        var iteratee = function(value, index) {
          return value * index;
        };
        expect(Collections.map([1, 2, 3], iteratee)).to.deep.equal([0, 2, 6]);
      });
  });

  describe('Reduce function tests', function() {
    it('Should return undefined result if first argument is not array-like',
      function() {
        expect(Collections.reduce()).to.be.an('undefined');
      });

    it('Should return first array elt if accumulator and iteratee are missing',
      function() {
        expect(Collections.reduce([2, 3, 4])).to.equal(2);
      });

    it('Should return accumulator if no iteratee is provided', function() {
      expect(Collections.reduce([3, 2, 4], undefined, 66)).to.equal(66);
    });

    it('Should return reduced result if every argument is OK', function() {
      var iteratee = function(accumulator, value) {
        return accumulator + value;
      };
      expect(Collections.reduce([1, 2, 3], iteratee)).to.equal(6);
      expect(Collections.reduce([1, 2, 3], iteratee, 6)).to.equal(12);
    });
  });

  describe('"Every" function tests', function() {
    it('Should return true if first argument is not array-like',
      function() {
        expect(Collections.every()).to.equal(true);
        expect(Collections.every(4)).to.equal(true);
      });

    it('Should return true if array of truthy values is given', function() {
      expect(Collections.every([1, 2, 3])).to.equal(true);
    });

    it('Should return false if array with some falsy value is given',
      function() {
        expect(Collections.every([1, undefined, 2])).to.equal(false);
      });

    it('Should return true if mapped array contains only truthy values',
      function() {
        var iteratee = function(value) {
          return !value;
        };
        expect(Collections.every([undefined, null, false], iteratee))
          .to.equal(true);
      });

    it('Should return false if some of mapped values are falsy', function() {
      var iteratee = function(value) {
        return !value;
      };
      expect(Collections.every([undefined, null, false, 3], iteratee))
        .to.equal(false);
    });
  });

  describe('"None" function tests', function() {
    it('Should return true if first argument is not array-like',
      function() {
        expect(Collections.none()).to.equal(true);
        expect(Collections.none(4)).to.equal(true);
      });

    it('Should return false if array with any truthy value is given',
      function() {
        expect(Collections.none([1, false, undefined])).to.equal(false);
      });

    it('Should return true if array with all falsy values is given',
      function() {
        expect(Collections.none([false, undefined, null])).to.equal(true);
      });

    it('Should return true if mapped array contains only falsy values',
      function() {
        var iteratee = function(value) {
          return !value;
        };
        expect(Collections.none([5, 6, 7], iteratee))
          .to.equal(true);
      });

    it('Should return false if some of mapped values are falsy', function() {
      var iteratee = function(value) {
        return !value;
      };
      expect(Collections.none([6, null, 7, 3], iteratee))
        .to.equal(false);
    });
  });

  describe('"Unique" function tests', function() {
    it('Should return empty array if first argument is not array-like',
    function() {
      expect(Collections.unique()).to.deep.equal([]);
      expect(Collections.unique(4)).to.deep.equal([]);
    });

    it('Should return unique array if iteratee was not provided', function() {
      expect(Collections.unique([1, 1, 2, 3, 4.5, 4.5, 7]))
        .to.deep.equal([1, 2, 3, 4.5, 7]);
    });

    it('Should return unique array of mapped values if iteratee is provided',
    function() {
      var iteratee = function(value) {
        return Math.floor(value);
      };
      expect(Collections.unique([1,1.5,1.7,1.8,2], iteratee))
        .to.deep.equal([1,2]);
    });
  });

  describe('"Add" function tests', function() {
    it('Should return empty array if nothing is provided to function',
    function() {
      expect(Collections.add()).to.deep.equal([]);
    });

    it('Should return iterable as array if nothing was provided for adding',
    function() {
      expect(Collections.add([1, 2, 3])).to.deep.equal([1, 2, 3]);
    });

    it('Should return resulting array if provided with arguments',
    function() {
      expect(Collections.add([1, 2, 3], 4, 6, 5))
        .to.deep.equal([1, 2, 3, 4, 6, 5]);
    });
  });

});
