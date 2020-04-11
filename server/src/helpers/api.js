const request = require('request')
const url = require('../configs/url')
const random = require('./random')
const api = {

    loginAvatar: (cookie, params, success) =>{
        const { server_id, language, avatarId, token } = params;
        console.log(url.base(server_id, language))
        console.log({
            "action": "loginAvatar",
            "function": "lobbyLogin",
            "avatarId": avatarId, 
            "token": token
        })
        request.get(url.base(server_id, language),{
            headers: {
                'Host': `s${server_id}-${language}.ikariam.gameforge.com`,
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'DNT': '1', 
                'Connection': 'close', 
                'Referer': 'https://lobby.ikariam.gameforge.com/en_US/accounts', 
                'Connection': 'close', 
                'Upgrade-Insecure-Requests': '1',
                "cookie": cookie
            },
            qs: {
                "action": "loginAvatar",
                "function": "lobbyLogin",
                "avatarId": avatarId, 
                "token": token
            }
        }, function (error, response, body) {
            console.log(response.headers)
            //success(response.headers, body)
        });
    },

    viewCity: ({cookie, server_id, language}) =>{
        request.get(url.viewCity(server_id, language),{
            headers: {
                "Host": `s${server_id}-${language}.ikariam.gameforge.com`,
                "Connection": "keep-alive",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "Referer": `https://s${server_id}-${language}.ikariam.gameforge.com`,
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cookie": cookie
            },
            qs: {
                view: "city"
            }
        }, function (error, response, body) {

            //success(response.headers)
        });
    },

    loginLink: ({cookie, server_id, language, user_id}, success) =>{
        request.get(url.loginLink,{
            headers: {
                "authority": "lobby.ikariam.gameforge.com",
                "scheme": "https",
                "path": `/api/users/me/loginLink?id=${user_id}&server[language]=${language}&server[number]=${server_id}&clickedButton=account_list`,
                "accept": "application/json",
                "sec-fetch-dest": "empty",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
                "content-type": "application/json",
                "sec-fetch-site": "same-origin",
                "origin": "https://lobby.ikariam.gameforge.com",
                "sec-fetch-mode": "cors",
                "referer": "https://lobby.ikariam.gameforge.com/en_US/",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cookie": cookie
            },
            qs: {
                "id": user_id,
                "server[language]": language,
                "server[number]": server_id,
                "clickedButton": "account_list"
            }
        }, function (error, response, body) {
            success(response.headers, body)
        });
    },

    login: (email = '', password = '', success) => {
        request.post(url.login, {
            headers: {
                "authority": "lobby.ikariam.gameforge.com",
                "scheme": "https",
                "path": "/api/users",
                "accept": "application/json",
                "sec-fetch-dest": "empty",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
                "content-type": "application/json",
                "sec-fetch-site": "same-origin",
                "origin": "https://lobby.ikariam.gameforge.com",
                "sec-fetch-mode": "cors",
                "referer": "https://lobby.ikariam.gameforge.com/en_US/",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8"
            },
            body: {
                credentials: {
                    email,
                    password,
                    language: "us",
                    kid: "",
                    autoLogin: "true"
                }
            },
            json: true
        }, function (error, response, body) {
            success(response.headers)
        });
    },



    usersMe: (cookie, success) => {
        request.get(url.usersMe, {
            headers: {
                "authority": "lobby.ikariam.gameforge.com",
                "scheme": "https",
                "path": "/api/users/me",
                "accept": "application/json",
                "sec-fetch-dest": "empty",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
                "content-type": "application/json",
                "sec-fetch-site": "same-origin",
                "origin": "https://lobby.ikariam.gameforge.com",
                "sec-fetch-mode": "cors",
                "referer": "https://lobby.ikariam.gameforge.com/en_US/",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cookie": cookie
            },
            json: true
        }, function (error, response, body) {
            success(body)
        });
    },

    usersMeAccounts: (cookie, success) => {
        request.get(url.usersMeAccounts, {
            headers: {
                "authority": "lobby.ikariam.gameforge.com",
                "scheme": "https",
                "path": "/api/users/me/accounts",
                "accept": "application/json",
                "sec-fetch-dest": "empty",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
                "content-type": "application/json",
                "sec-fetch-site": "same-origin",
                "origin": "https://lobby.ikariam.gameforge.com",
                "sec-fetch-mode": "cors",
                "referer": "https://lobby.ikariam.gameforge.com/en_US/",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cookie": cookie
            },
            json: true
        }, function (error, response, body) {
            success(response.headers,body)
        });
    },

    pixelzirkUs: ({server_id, language, user_id, lobby_id, user_email, user_name, last_login, last_played},success) => {
        request.post(url.simple, {
            headers: {
                'Host': 'pixelzirkus.gameforge.com', 
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:66.0) Gecko/20100101 Firefox/66.0', 
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'DNT': '1', 
                'Connection': 'close', 
                'Upgrade-Insecure-Requests': '1'
            },
            form: {
                product: 'ikariam',
                server_id,
                language,
                user_id,
                lobby_id,
                user_email,
                user_name,
                location: "fp_eval",
                last_login,
                last_played,
                inactivity_days: "0",
                page: "https://lobby.ikariam.gameforge.com/en_US/accounts",
                referrer: `https://s${server_id}-${language}.ikariam.gameforge.com/?view=city`,
                fp_eval_id: random.fp_eval_id(),
                fingerprint: random.fingerprint(),
                fp2_config_id: '1',
                fp2_value: '6b28817d7585d24cdd53bda231eb310f', 
                fp2_exec_time: '264.00',
                fp_exec_time: '3.04',
                replacement_kid: ''
              }
        }, function (error, response, body) {
            success(response.headers)
        });
    },

    promotions: (success) => {
        request.get(url.promotions, {
            headers: {
                "authority": "lobby.ikariam.gameforge.com",
                "scheme": "https",
                "path": "/api/promotions/us",
                "accept": "application/json",
                "sec-fetch-dest": "empty",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
                "sec-fetch-site": "same-origin",
                "sec-fetch-mode": "cors",
                "referer": "https://lobby.ikariam.gameforge.com/en_US/",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8"
            }
        }, function (error, response, body) {
            success(response.headers, body);
        });
    }
}

module.exports = api;