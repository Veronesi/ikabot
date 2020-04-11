const api = require('../../helpers/api')

function login(params) {
    const { user = '', password = '' } = params || {};
    console.log('login..')
}

module.exports = login;