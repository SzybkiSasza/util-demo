var chai = require('chai');
var expect = chai.expect;
var Helpers = require('../lib/helpers');

describe('Helpers module tests', function() {
  describe('Slicing array tests', function() {
    it('Should return empty array if nothing is passed to function',
      function() {
        expect(Helpers.sliceToArray()).to.deep.equal([]);
      });

    it('Should return empty array if iterable is falsy', function() {
      expect(Helpers.sliceToArray(null)).to.deep.equal([]);
    });

    it('Should try to slice iterable into array if it is array-like',
      function() {
        expect(Helpers.sliceToArray('asd')).to.deep.equal(['a', 's', 'd']);
        expect(Helpers.sliceToArray('asd', 1)).to.deep.equal(['s', 'd']);
        expect(Helpers.sliceToArray({
          0: 'a',
          1: 'b',
          length: 2
        })).to.deep.equal(['a', 'b']);
        expect(Helpers.sliceToArray({
          0: 'a',
          1: 'b',
          length: 2
        }, 1)).to.deep.equal(['b']);
      });

    it('Should return empty array if non-array-like object is passed',
      function() {
        expect(Helpers.sliceToArray(4)).to.deep.equal([]);
      });
  });

  describe('Binding context tests', function() {
    it('Should return undefined if nothing is passed', function() {
      expect(Helpers.bindContext()).to.equal(undefined);
    });

    it('Should return the same argument if func and context are improper',
      function() {
        var func = function() {
          return false;
        };

        expect(Helpers.bindContext(func)).to.deep.equal(func);
        expect(Helpers.bindContext({}, {})).to.deep.equal({});
      });

    it('Should return bound function if func and context are proper',
      function() {
        var func = function() {return this;};
        var context = {a: 'a'};
        var boundFunc = Helpers.bindContext(func, context);

        expect(boundFunc()).to.deep.equal(context);
      });
  });
});
