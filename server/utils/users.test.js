const expect = require('expect');
const {Users} = require('./users.js');

describe('Users',()=>{
    var users;

    beforeEach(()=>{
        users = new Users();
        users.users=[{
            id: 1,
            name: 'Mirza',
            room: 'Node Course'
        },{
            id: 2,
            name: 'Golam',
            room: 'React Course'
        },{
            id: 3,
            name: 'Abbas',
            room: 'Node Course'
        }];
    });

    it('Should add new user',()=>{
        var users = new Users();
        var user = {
            id: 123,
            name: 'Mirza',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user.id,user.name,user.room);
        expect(users.users).toMatchObject([user]);
    });

    it('Should remove a user',()=>{
        var userId = 1
        var rmvUser = users.removeUser(userId);
        expect(rmvUser.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('Should not remove user',()=>{
        var userId = 99;
        var rmvUser = users.removeUser(userId);
        expect(rmvUser).toBeUndefined();
        expect(users.users.length).toBe(3);
    });

    it('Should find user',()=>{
        var userId=2;
        var findUser = users.getUser(userId);
        expect(findUser.id).toBe(userId);
    });

    it('Should not find user',()=>{
        var userId=99;
        var findUser = users.getUser(userId);
        expect(findUser).toBeUndefined();
    });

    it('Should check if username exists',()=>{
        var userName='Mirza';
        var checkName = users.checkUsername(userName);
        expect(checkName[0]).toBe(userName);
    });

    it('Should check if username doesn\'t exists',()=>{
        var userName='Shahneel';
        var checkName = users.checkUsername(userName);
        expect(checkName[0]).not.toBe(userName);
    });

    it('Should return names for Node Course',()=>{
        var usersList = users.getUserList('Node Course');

        expect(usersList).toMatchObject(['Mirza','Abbas']);
    });
    it('Should return names for React Course',()=>{
        var usersList = users.getUserList('React Course');

        expect(usersList).toMatchObject(['Golam']);
    });

    it('Should return unique room\'s list',()=>{
        expect(users.getRoomList().length).toBe(2);
    });

});