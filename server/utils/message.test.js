var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
    it('Should generate correct message object',()=>{
        var from = 'Mirza';
        var text = 'Some message';
        var message = generateMessage(from,text);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('generateLocationMessage',()=>{
    it('Should generate correct location object',()=>{
        var from = 'Admin';
        var latitude = 1;
        var longitude = 1;
        var url = 'https://google.com/maps?q=1,1';

        var message = generateLocationMessage(from,latitude,longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});
    });
})