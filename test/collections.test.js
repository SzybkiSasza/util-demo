
var chai = require('chai');
var expect = chai.expect;

var Collections = require('../lib/collections');

/* Important note about tests:
*  I did not mock helpers module because it is interworking too closely
*  with Collections module and mocking it with different response in almost
*  each test would be pain in the ass. However, I tested it completely to make
*  sure it behaves exactly as I want. */

describe('Collections utility functions tests', function() {
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
      expect(Collections.create(4)).to.deep.equal([0,1,2,3]);
    });

    it('Should generate a proper array', function() {
      var generator = function(index) {
        return index * 2;
      };
      expect(Collections.create(5, generator)).to.deep.equal([0,2,4,6,8]);
    });
  });

  describe('Map function tests', function() {
    it('Should return empty result if nothing is passed as iterable',
    function() {
      expect(Collections.map()).to.deep.equal([]);
    });

    it('Should return empty result if');
  });

  describe('Reduce function tests', function() {

  });

});
