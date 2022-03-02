var assert = require('assert');
var f = require('../fuzzerFile.js');

describe('File Fuzzer for Coordination', function() {
  describe('read/write', function() {
    it('should return what has been wrote in the file', function() {
        
        t1 = f.readFile();
        f.requestNewQR();
        t2 = f.readFile();
        t1.status = 1;

        assert.equal(t1.status, t2.status);
    });
  });
});