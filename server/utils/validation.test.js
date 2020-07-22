const expect = require('expect');
var {isRealString} = require('./validation.js');

describe('isRealString',()=>{
    it('Should reject non-string values',()=>{
        expect(isRealString(123443)).toBeFalsy();
    });
    it('Should reject string with only spaces',()=>{
        expect(isRealString('        ')).toBeFalsy();
    });
    it('Should allow string with non-space characters',()=>{
        expect(isRealString(' a  ')).toBeTruthy();
    });
});