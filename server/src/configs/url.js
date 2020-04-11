const url = {
    lobby: 'https://lobby.ikariam.gameforge.com/api/',
    pixelzirkus: 'https://pixelzirkus.gameforge.com/do/'
}

url.login = `${url.lobby}users`
url.promotions = `${url.lobby}promotions/us`
url.usersMe = `${url.login}/me`
url.usersMeAccounts = `${url.usersMe}/accounts`

url.simple = `${url.pixelzirkus}simple`

url.viewCity = (server_id, language) => {return `https://s${server_id}-${language}.ikariam.gameforge.com/?view=city`}
url.loginLink = `https://lobby.ikariam.gameforge.com/api/users/me/loginLink`


url.base = (server_id, language) => {return `https://s${server_id}-${language}.ikariam.gameforge.com/index.php`}

module.exports = url;