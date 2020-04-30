const Ikariam = require('./ikariam');

var app = require('http').createServer(handler)
var io = require('socket.io')(app);

app.listen(80);

function handler(req, res) {
    res.send({ msg: 'hola' })
}

console.log('server is running')

const fs = require('fs');
let data = fs.readFileSync(`./src/cache/1572-ar-24`, 'utf8');
Ikariam.session.initIkariamWithCredentials(JSON.parse(data));


io.on('connection', function (socket) {
 
    switch (Ikariam.steep) {
        case 'login':
            socket.emit('SERVER_STATUS', { steep: 'LOGIN' });
            break;
        case 'select-account':
            socket.emit('SERVER_STATUS', { steep: 'SELECT_ACCOUNT', accounts: Ikariam.accounts.map(e => { return { language: e.server.language, number: e.server.number, id: e.id, name: e.name } }) });
            break;
        case 'logged': 
        socket.emit('SERVER_STATUS', { steep: 'LOGGED'});
        Ikariam.screenshot.viewCity()
        break;
        default:
            socket.emit('SERVER_STATUS', { steep: 'upps' });
            break;
    }

    socket.on('get-status-server', () => {
        socket.emit('get-status-server', { steep: Ikariam.steep });
    })


    socket.on('LOGIN_WEMAIL', function (data) {
        console.log('login...')
        Ikariam.session.login(data, response => {
            socket.emit('LOGIN_WEMAIL', {login: true, accounts: response});
        }, ()=>{
            socket.emit('LOGIN_WEMAIL', {login: false, accounts: []});
        })
    });
    
    socket.on('SELECT_ACCOUNT', function ({ id }) {
        Ikariam.session.selectAccount(id, response => {
            socket.emit('LOGIN_SUCCESS', response);
        })
    });
});


/*
Ikariam.session.login({
    email: 'juse@test.com',
    password: '123456789'
});
*/



//joining path of directory 
//passsing directoryPath and callback function




/*
const fs = require('fs');
let data = fs.readFileSync(`./src/cache/3288-us-37`, 'utf8');
    Ikariam.session.initIkariamWithCredentials(JSON.parse(data));
*/


/*
if (fs.existsSync('./src/cache/users.txt')) {
    // Verificamos si ya hay cuentas registradas:
    fs.readFile('./src/cache/users.txt', (err, data) => {
        const _users = JSON.parse(data);
        if (fs.existsSync(`./src/cache/${_users.users[0].id}-${_users.users[0].language}-${_users.users[0].number}.cookie`)) {
            console.log(`Login with ${_users.users[0].name} in ${_users.users[0].language}-${_users.users[0].number}...`);
            Ikariam.session.forceLogin(cookie, _users.user[0]);
            // Init Ikariam

        }else{
            console.log("session faild");
        }
    });
} else {
    console.log("not user register");
}

*/
//fs.writeFileSync(`./src/cache/users.txt`, JSON.stringify({usrs: [{name: 'fanaes', id: 3288, language: 'us', number: '37'}]}));