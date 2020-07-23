[{
    id: '/#1234334343',
    name: 'Mirza',
    room: 'The Office Fans'
}]

// addUser(id,name,room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor () {
        this.users = [];
    };

    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    };

    removeUser(id){
        var rmvUser = this.getUser(id);

        if(rmvUser){
            this.users = this.users.filter((rmvUser)=> rmvUser.id !== id);
        };
        return rmvUser;
    };

    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    };

    checkUsername(name){
        var users = this.users.filter((user)=>user.name === name);
        var namesArray = users.map((user)=>user.name);
        return namesArray;
    };

    getUserList(room){
        var users = this.users.filter((user)=>user.room === room);
        var namesArray = users.map((user)=>user.name);

        return namesArray;
    };
};

module.exports = {Users};