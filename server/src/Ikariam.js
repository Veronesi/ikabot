const random = require('./helpers/random')
const request = require('request')
const regex = require('./helpers/regex')
const fs = require('fs')
const Ikariam = {
    steep: 'login',
    email: null,
    unportableName: null,
    password: null,
    id: null,
    userId: null,
    cities: [],
    accounts: [],
    servers: [],
    server: {},
    info: {},
    actionRequest: '',
    request: {
        headers: {},
        cookies: [],
        lastCookies: [],
        lastHeaders: {},
        lastBody: '',
        urlbase: '',
        cookie: '',

        setCookies: async cookie => {
            Ikariam.request.cookies[cookie.name] = cookie.value;
            if (Ikariam.request.cookies.includes(e => e.name == cookie.name)) {
                Ikariam.request.cookies = Ikariam.request.cookies.map(e => { if (e.name == cookie.name) { return cookie } else { return e } })
            } else {
                Ikariam.request.cookies.push(cookie)
            }
            let _cookieStr = Ikariam.request.cookies.reduce((accumulator, currentValue) => currentValue.value + ';' + accumulator, '')
            Ikariam.request.setHeadrs({ cookie: _cookieStr })
            Ikariam.request.cookie = _cookieStr
        },

        deleteCookie: cookie => {
            Ikariam.request.cookies = Ikariam.request.cookies.filter(e => e.name !== cookie);
            const _cookieStr = Ikariam.request.cookies.reduce((accumulator, currentValue) => currentValue.value + ';' + accumulator, '');
            Ikariam.request.setHeadrs({ cookie: _cookieStr })
            Ikariam.request.cookie = _cookieStr
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
                    console.log(url);
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
                    console.log(url);
                    Ikariam.request.lastHeaders = request.headers
                    Ikariam.request.lastBody = body
                    if (request.headers['set-cookie'])
                        Ikariam.request.lastCookies = request.headers['set-cookie'][0]
                    success(request, body);
                })
        }
    },

    screenshot: {
        changeCurrentCity: (cityId, success = () => { }) => {
            console.log(cityId)
            Ikariam.request.post({
                url: `${Ikariam.request.urlbase}action=header&function=changeCurrentCity&actionRequest=${Ikariam.actionRequest}&cityId=${cityId}&ajax=1`,
            }, (response, body) => {
                Ikariam.actionRequest = body[0][1].actionRequest
                Ikariam.request.get({ url: `${Ikariam.request.urlbase}view=city` }, async (response, body) => {
                    let _ = body.match(regex.IkariamGetClass).groups
                    console.log(`new id is: ${_.id}`)
                    _.position = JSON.parse(_.position)
                    _.position = _.position.filter(e => !e.building.includes("buildingGround"))
                    Ikariam.info.currentCity = _.id;
                    // Buscamos si ya existe.
                    let indexCity = Ikariam.cities.findIndex(e => e.id === _.id)
                    if (indexCity === -1) {
                        indexCity = Ikariam.cities.length;
                        Ikariam.cities.push(_)
                    } else {
                        Ikariam.cities[indexCity] = _
                    }
                    _ = body.match(regex.dataSetForView).groups
                    _.currentResources = JSON.parse(_.currentResources.replace(/\\/g, ''))
                    _.maxResources = JSON.parse(_.maxResources.replace(/\\/g, ''))
                    _.branchOfficeResources = JSON.parse(_.branchOfficeResources.replace(/\\/g, ''))
                    _.relatedCityData = JSON.parse(_.relatedCityData.replace(/\\/g, ''))
                    Ikariam.cities[indexCity] = {
                        ...Ikariam.cities[indexCity],
                        producedTradegood: _.producedTradegood,
                        maxResources: _.maxResources,
                        branchOfficeResources: _.branchOfficeResources,
                        resourceProduction: _.resourceProduction,
                        tradegoodProduction: _.tradegoodProduction,
                        wineSpendings: _.wineSpendings,
                    }
    
                    Ikariam.info = {
                        ...Ikariam.info,
                        upkeep: _.upkeep,
                        income: _.income,
                        scientistsUpkeep: _.scientistsUpkeep,
                        relatedCityData: _.relatedCityData,
                    }
    
                    Ikariam.actionRequest = _.actionRequest
                    fs.writeFileSync(`./src/cache/screenshots/viewCity.html`, body)
                    success(body)
                })     
            })
        },
        viewCity: (success = () => { }) => {
            Ikariam.request.get({ url: `${Ikariam.request.urlbase}view=city` }, async (response, body) => {
                let _ = body.match(regex.IkariamGetClass).groups
                _.position = JSON.parse(_.position)
                _.position = _.position.filter(e => !e.building.includes("buildingGround"))
                Ikariam.info.currentCity = _.id;
                // Buscamos si ya existe.
                let indexCity = Ikariam.cities.findIndex(e => e.id === _.id)
                console.log(`new id is: ${_.id}`)
                if (indexCity === -1) {
                    indexCity = Ikariam.cities.length;
                    Ikariam.cities.push(_)
                } else {
                    Ikariam.cities[indexCity] = _
                }
                _ = body.match(regex.dataSetForView).groups
                _.currentResources = JSON.parse(_.currentResources.replace(/\\/g, ''))
                _.maxResources = JSON.parse(_.maxResources.replace(/\\/g, ''))
                _.branchOfficeResources = JSON.parse(_.branchOfficeResources.replace(/\\/g, ''))
                _.relatedCityData = JSON.parse(_.relatedCityData.replace(/\\/g, ''))
                Ikariam.cities[indexCity] = {
                    ...Ikariam.cities[indexCity],
                    producedTradegood: _.producedTradegood,
                    maxResources: _.maxResources,
                    branchOfficeResources: _.branchOfficeResources,
                    resourceProduction: _.resourceProduction,
                    tradegoodProduction: _.tradegoodProduction,
                    wineSpendings: _.wineSpendings,
                }

                Ikariam.info = {
                    ...Ikariam.info,
                    upkeep: _.upkeep,
                    income: _.income,
                    scientistsUpkeep: _.scientistsUpkeep,
                    relatedCityData: _.relatedCityData,
                }

                Ikariam.actionRequest = _.actionRequest
                fs.writeFileSync(`./src/cache/screenshots/viewCity.html`, body)
                success(body)
            })
        }
    },

    session: {
        email: null,
        password: null,
        logged: false,

        _initCities: (cities, success = () => {}) =>{
            if(cities.length){
                let city = cities.pop();
                Ikariam.screenshot.changeCurrentCity(city.id, () =>{
                    console.log(`_initCities(${city.id})`)
                    Ikariam.session._initCities(cities, success)
                })
            }else{
                success()
            }
        },

        initCities: async () => {
            // Inicializamos Ikariam.info.relatedCityData
            await Ikariam.screenshot.viewCity(async (res) => {
                const _keys = Object.keys(Ikariam.info.relatedCityData).slice(0, -2)
                let cities = _keys.map(city => Ikariam.info.relatedCityData[city])
                cities = cities.filter(city => city.id !== Ikariam.info.currentCity)
                console.log(`actual city: ${Ikariam.info.currentCity}`)
                Ikariam.session._initCities(cities, () =>{
                    
                })
                /*



                let promises = [new Promise((resolve, reject)=>{setTimeout(resolve, 500, "one"); })];
                let city = cities.pop()
                promises.push(new Promise((resolve, reject)=> {
                    console.log(`Nueva promesa, ityid: ${city.id}`)
                    Ikariam.screenshot.changeCurrentCity(city.id, () => {
                        console.log(city.id + '<->' + cities[cities.length - 1].id)
                        if(cities.length){

                        }
                        resolve()
                        if (city.id == cities[cities.length - 1].id) {
                            console.log('el ultimo')
                        }
                    })
                }))
                for (let city of cities) {
                    console.log('init foreach')
                    console.log(`cityid: ${city.id}`)
                    promises.push(new Promise((resolve, reject) => {
                        console.log('nueva promesa')
                        Ikariam.screenshot.changeCurrentCity(city.id, () => {
                            console.log(city.id + '<->' + cities[cities.length - 1].id)
                            resolve()
                            if (city.id == cities[cities.length - 1].id) {
                                console.log('el ultimo')
                            }
                        })
                    }))
                }

                Promise.all(promises).then(e => {
                    console.log('listo pormesas')
                    //console.log(Ikariam.cities)
                })
                */
            })
        },

        initIkariamWithCredentials: ({ id, username, server, email, password, headers, cookies, urlbase, cookie }) => {
            Ikariam.id = id
            Ikariam.username = username
            Ikariam.server = server

            Ikariam.session.email = email
            Ikariam.session.password = password

            Ikariam.request.headers = headers
            Ikariam.request.cookies = cookies
            Ikariam.request.urlbase = urlbase
            Ikariam.request.cookie = cookie
            Ikariam.steep = 'logged'
            Ikariam.session.initCities()
        },

        login: ({ email, password }, success = () => { }, onError = () => { }) => {
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
                    console.log(email, password)
                    if (response.statusCode == 400) {
                        onError()
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
                                    Ikariam.steep = 'select-account'
                                    success(Ikariam.accounts.map(e => { return { language: e.server.language, number: e.server.number, id: e.id, name: e.name } }));
                                });
                            });
                        }
                    }
                });
            });
        },
        selectAccount: (id, success) => {
            let _pos = Ikariam.accounts.findIndex(e => e.id == id);
            Ikariam.server = Ikariam.accounts[_pos].server
            Ikariam.id = Ikariam.accounts[_pos].id
            Ikariam.username = Ikariam.accounts[_pos].name
            Ikariam.request.get({ url: `https://lobby.ikariam.gameforge.com/api/users/me/loginLink?id=${Ikariam.id}&server[language]=${Ikariam.server.language}&server[number]=${Ikariam.server.number}` }, (response, body) => {
                let _url = JSON.parse(body).url
                Ikariam.request.urlbase = _url.match(/https:\/\/s\d+-\w{2}\.ikariam\.gameforge\.com\/index\.php\?/)[0]
                Ikariam.request.host = _url.split('//')[1].split('/index')[0]
                Ikariam.request.clarHeaders();
                Ikariam.request.setHeadrs({ 'Host': Ikariam.request.host, 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'DNT': '1', 'Connection': 'close', 'Referer': 'https://lobby.ikariam.gameforge.com/es_ES/accounts', 'Upgrade-Insecure-Requests': '1' })
                Ikariam.request.deleteCookie('PHPSESSID');
                Ikariam.request.post({ url: _url }, (response, body) => {
                    Ikariam.request.setCookies({ name: 'PHPSESSID', value: response.headers['set-cookie'][0] })
                    Ikariam.request.setCookies({ name: 'ikariam_loginMode', value: response.headers['set-cookie'][1] })
                    Ikariam.request.setCookies({ name: 'ikariam', value: response.headers['set-cookie'][2] })

                    let _cacheUser = {
                        id: Ikariam.id,
                        username: Ikariam.username,
                        server: Ikariam.server,
                        email: Ikariam.session.email,
                        password: Ikariam.session.password,
                        headers: Ikariam.request.headers,
                        cookies: Ikariam.request.cookies,
                        urlbase: Ikariam.request.urlbase,
                        cookie: Ikariam.request.cookie
                    }
                    Ikariam.steep = 'logged'
                    fs.writeFileSync(`./src/cache/${Ikariam.id}-${Ikariam.server.language}-${Ikariam.server.number}`, JSON.stringify(_cacheUser));
                    success({ msg: 'ok!' })
                })
            })
        }
    }
}
module.exports = Ikariam;