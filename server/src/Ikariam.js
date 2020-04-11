const random = require('./helpers/random')
const request = require('request')
const Ikariam = {
    email: null,
    unportableName: null,
    password: null,
    id: null,
    userId: null,
    accounts: [],
    servers: [],

    request: {
        headers: {},
        cookies: [],
        lastCookies: [],
        lastHeaders: {},
        lastBody: '',
        urlbase: '',

        setCookies: async cookie => {
            Ikariam.request.cookies[cookie.name] = cookie.value;
            if (Ikariam.request.cookies.includes(e => e.name == cookie.name)) {
                Ikariam.request.cookies = Ikariam.request.cookies.map(e => { if (e.name == cookie.name) { return cookie } else { return e } })
            } else {
                Ikariam.request.cookies.push(cookie)
            }
            let _cookieStr = Ikariam.request.cookies.reduce((accumulator, currentValue) => currentValue.value + ';' + accumulator, '')
            Ikariam.request.setHeadrs({ cookie: _cookieStr })
        },

        deleteCookie: cookie => {
            Ikariam.request.cookies = Ikariam.request.cookies.filter(e => e.name !== cookie);
            const _cookieStr = Ikariam.request.cookies.reduce((accumulator, currentValue) => currentValue.value + ';' + accumulator, '');
            Ikariam.request.setHeadrs({ cookie: _cookieStr })
        },

        clarHeaders: () => Ikariam.request.headers = {},
        /**
         * @param {JSON} newHeaders
         */
        setHeadrs: newHeaders => {
            Object.keys(newHeaders).forEach(header => {
                Ikariam.request.headers[header] = newHeaders[header]
            })
        },

        post: ({ url = '', rq = {}, form = {}, body = {} }, success = (response, body) => { }) => {
            request.post(url, { headers: Ikariam.request.headers, rq, form, body, json: true },
                function (error, request, body) {
                    Ikariam.request.lastHeaders = request.headers
                    Ikariam.request.lastBody = body
                    if (request.headers['set-cookie'])
                        Ikariam.request.lastCookies = request.headers['set-cookie'][0]
                    success(request, body)
                });
        },

        get: ({ url = '', rq = {} }, success = (response, body) => { }) => {
            request.get(url, { headers: Ikariam.request.headers, rq },
                function (error, request, body) {
                    Ikariam.request.lastHeaders = request.headers
                    Ikariam.request.lastBody = body
                    if (request.headers['set-cookie'])
                        Ikariam.request.lastCookies = request.headers['set-cookie'][0]
                    success(request, body);
                })
        }
    },

    session: {
        email: null,
        password: null,
        logged: false,
        login: ({ email, password }) => {
            Ikariam.session.email = email
            Ikariam.session.password = password

            Ikariam.request.setHeadrs({ 'Host': 'pixelzirkus.gameforge.com', 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'Accept-Language': 'en-US,en;q=0.5', 'Content-Type': 'application/x-www-form-urlencoded', 'DNT': '1', 'Connection': 'close', 'Referer': 'https://lobby.ikariam.gameforge.com/es_ES/', 'Upgrade-Insecure-Requests': '1' })
            const fp_eval_id = random.fp_eval_id()
            form = { 'product': 'ikariam', 'server_id': '1', 'language': 'es', 'location': 'fp_eval', 'replacement_kid': '', 'fp_eval_id': fp_eval_id, 'fingerprint': '884455816', 'fp2_config_id': '1', 'page': 'https://lobby.ikariam.gameforge.com/es_ES', 'referrer': '', 'fp2_value': 'ea5548a69717014c01001f5c1955f6e0', 'fp2_exec_time': '72.73' }
            Ikariam.request.post({ url: 'https://pixelzirkus.gameforge.com/do/simple', form }, (response, body) => {

                Ikariam.request.clarHeaders()
                Ikariam.request.setHeadrs({ 'Host': 'lobby.ikariam.gameforge.com', 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept-Language': 'en-US,en;q=0.5', 'Accept': 'application/json', 'Content-Type': 'application/json', 'Referer': 'https://lobby.ikariam.gameforge.com/es_ES', 'Origin': 'https://lobby.ikariam.gameforge.com', 'DNT': '1', 'Connection': 'close' })
                Ikariam.request.setCookies({ name: 'pc_idt', value: response.headers['set-cookie'][0].match(/pc_idt=(\w+|\-|\_)*/)[0] })

                form = { credentials: { email, password, language: "es", kid: "", autoLogin: "false" } };
                Ikariam.request.post({ url: 'https://lobby.ikariam.gameforge.com/api/users', form }, (response, body) => {
                    if (response.statusCode == 400) {
                        console.log('Usuario o contraseña incorrecta')
                    } else {
                        if (Ikariam.session.logged === false) {
                            Ikariam.request.setCookies({ name: 'PHPSESSID', value: Ikariam.request.lastCookies })

                            Ikariam.request.get({ url: 'https://lobby.ikariam.gameforge.com/api/users/me/accounts' }, (response, body) => {
                                Ikariam.accounts = JSON.parse(body);

                                Ikariam.request.get({ url: 'https://lobby.ikariam.gameforge.com/api/servers' }, (response, body) => {
                                    Ikariam.servers = JSON.parse(body)
                                    Ikariam.server = Ikariam.accounts[0].server
                                    Ikariam.id = Ikariam.accounts[0].id
                                    Ikariam.username = Ikariam.accounts[0].name
                                    Ikariam.request.get({ url: `https://lobby.ikariam.gameforge.com/api/users/me/loginLink?id=${Ikariam.id}&server[language]=${Ikariam.server.language}&server[number]=${Ikariam.server.number}` }, (response, body) => {
                                        let _url = JSON.parse(body).url
                                        Ikariam.request.urlbase = _url.match(/https:\/\/s\d+-\w{2}\.ikariam\.gameforge\.com\/index\.php\?/)[0]
                                        Ikariam.request.host = _url.split('//')[1].split('/index')[0]
                                        Ikariam.request.clarHeaders();
                                        Ikariam.request.setHeadrs({ 'Host': Ikariam.request.host, 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'DNT': '1', 'Connection': 'close', 'Referer': 'https://lobby.ikariam.gameforge.com/es_ES/accounts', 'Upgrade-Insecure-Requests': '1' })
                                        Ikariam.request.deleteCookie('PHPSESSID');
                                        Ikariam.request.post({ url: _url }, (response, body) => {
                                            Ikariam.request.setCookies({ name: 'PHPSESSID', value: response.headers['set-cookie'][0] })
                                            Ikariam.request.setCookies({ name: 'ikariam_loginMode',value: response.headers['set-cookie'][1] })
                                            Ikariam.request.setCookies({ name: 'ikariam', value: response.headers['set-cookie'][2] })
                                            console.log(response.headers);

                                            Ikariam.request.get({url: Ikariam.request.urlbase+'view=city'}, (response, body)=>{
                                                console.log(body);
                                                console.log(response.headers)
                                            })
                                        })
                                    })
                                });
                            });
                        }
                    }
                });
            });
        }
    }
}
module.exports = Ikariam;