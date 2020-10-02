'use strict'

const R = require('ramda')
const createError = require('http-errors')
const isPrivateIp = require('private-ip')
const app = require('../../server/server')
const {mqtt, mqttRpc, seafile} = require('../connectors')
const {convert, requiredParam, options, executeFindOneCb, executeFindOne, executeFindAllCb} = require('../util')
const Config = require('../config')
const mqttTopicPrefix = process.env.NODE_ENV === 'production' ? '' : 'teszt/'

mqttRpc.on("error",     (err)            => { console.log("mqttRpc ERROR", err) })
mqttRpc.on("offline",   ()               => { console.log("mqttRpc OFFLINE") })
mqttRpc.on("close",     ()               => { console.log("mqttRpc CLOSE") })
mqttRpc.on("reconnect", ()               => { console.log("mqttRpc RECONNECT") })

let frontend_token

module.exports = function(Tir) {

//##########################################################################################################################  POST /call  ###
  Tir.call = function({sql=requiredParam('sql')}, cb) {
    // console.log(app.models)
    executeFindAllCb(Tir.app.dataSources.tirDS.connector, sql, cb)
  }

  Tir.remoteMethod (
    'call', options({verb: 'post', path: '/call', param: 'params'})
  )

//##########################################################################################################################  POST /kodol  ###
  Tir.kodol = function({ funkcio='99994', telephelykod=requiredParam('telephelykod'), kodolokod=requiredParam('kodolokod'), dolgozokod=requiredParam('dolgozokod'),
                         munkalapazonosito=requiredParam('munkalapazonosito'), gepkod=requiredParam('gepkod'), muveletkod=requiredParam('muveletkod'),
                         mennyiseg=requiredParam('mennyiseg'), suly=requiredParam('suly'), koteshelye=requiredParam('koteshelye') }, cb) {
    // const params = {"funkcio":99994,"telephelykod":0,"kodolokod":-1,"dolgozokod":20007,"munkalap":21723456,"gepkod":0,"muveletkod":"456","mennyiseg":789}
    // const params = {"funkcio":99994,"telephelykod":0,"kodolokod":50020,"dolgozokod":20007,"munkalap":21723456,"gepkod":5,"muveletkod":"955","mennyiseg":10,"suly":0,"koteshelye":"S"}
    const params = {funkcio: funkcio, telephelykod: telephelykod, kodolokod: kodolokod, dolgozokod: dolgozokod, munkalap: munkalapazonosito, gepkod: gepkod,
                    muveletkod: muveletkod, mennyiseg: mennyiseg, suly: suly, koteshelye: koteshelye}
    mqttRpc.call(mqttTopicPrefix + 'tir/dama/kodol', params).then((result) => {
      cb(null, result)
    }).catch(err => {
      cb(err)
    })
  }

  Tir.remoteMethod (
    'kodol', options({verb: 'post', path: '/kodol', param: 'data'})
  )

//##########################################################################################################################  POST /atad  ###
  Tir.atad = function({ funkcio=requiredParam('funkcio'), telephelykod=requiredParam('telephelykod'), kodolokod=requiredParam('kodolokod'),
                        munkalapazonosito=requiredParam('munkalapazonosito'), hely=requiredParam('hely'), uzemkod=requiredParam('uzemkod'), polckod=0, teszt=true }, cb) {
    // const params = {"funkcio":90023,"telephelykod":0,"kodolokod":50133,"munkalap":21809872,"hely":90023,"uzemkod":0,"polckod":0}
    const params = {funkcio: funkcio, telephelykod: telephelykod, kodolokod: kodolokod, munkalap: munkalapazonosito, hely: hely, uzemkod: uzemkod, polckod: polckod}
    mqttRpc.call(mqttTopicPrefix + 'tir/dama/kodol', params).then((result) => {
      cb(null, result)
    }).catch(err => {
      cb(err)
    })
  }

  Tir.remoteMethod (
    'atad', options({verb: 'post', path: '/atad', param: 'data'})
  )

//##########################################################################################################################  GET /tables/:viewid?filter=  ###
  Tir.tables = function(viewid, filter, cb) {
    filter = filter || {}
    const view = Config.views.find(o => o.id === viewid)
    if (!view) return cb(createError(404, 'A view nem található', {code: 'MODEL_NOT_FOUND'}))

    const fields = R.pluck('name', view.fields)
    let sqlparts = ['select top']
    sqlparts.push(view.limit || 100)
    sqlparts.push('[' + fields.join('],[') + ']')
    sqlparts.push('from')
    sqlparts.push(view.name)

    let where = []
    if (view.where) {
      where.push('(' + view.where + ')')
    }
    if (!R.isEmpty(filter)) {
      R.forEachObjIndexed(function(val,key){
        if (val) {
          const field = view.fields.find(o => o.name === key)
          if (field.filter == 'tartalmazza') {
            where.push('[' + key + '] like ' + "'%"+val+"%'")
          } else {
            where.push('[' + key + '] = ' + "'"+val+"'")
          }
        }
      }, filter)
    }
    if (where.length) {
      sqlparts.push('where')
      sqlparts.push(where.join(' and '))
    }

    if (view.order) {
      sqlparts.push('order by')
      sqlparts.push(view.order)
    }

    const connector = Tir.app.dataSources.tirDS.connector
    connector.execute(sqlparts.join(' '), null, (err, resultObjects) => {
      if (err) return cb(err)
      const records = R.map(R.map(convert), resultObjects)
      let stat = []
      if (view.sum) {
        let sums = R.zipObj(fields, R.range(0, fields.length).map(() => '' ))
        for (let col of view.sum) {
          sums[col] = 0
        }
        for (let row of records) {
          for (let col of view.sum) {
            sums[col] += row[col]
          }
        }
        sums[fields[0]] = 'Összesen'
        stat.push(sums)
      }

      cb(null, {'records': records, 'stat': stat})
    })
  }

  Tir.remoteMethod (
    'tables', options({path: '/tables', arg: 'id', param: 'filter'})
  )

//##########################################################################################################################  GET /dolgozok/:dolgozokod  ###
  Tir.dolgozoFindByKod = function(dolgozokod, cb) {
    const sql = `
      select top 1 dolgozokod, dolgozonev, dolgtr.uzemkod, uzemek.vonalkod, uzemnev, uzemek.telephelykod, telephely
      from dolgtr join uzemek on dolgtr.uzemkod = uzemek.uzemkod join telephelyek on uzemek.telephelykod = telephelyek.telephelykod
      where aktiv = 'A' and kilepett = 0 and dolgozokod = ${dolgozokod}
    `
    executeFindOneCb(Tir.app.dataSources.tirDS.connector, sql, cb)
  }

  Tir.remoteMethod (
    'dolgozoFindByKod', options({path: '/dolgozok', arg: 'dolgozokod', argtype: 'number'})
  )


//##########################################################################################################################  GET /normaperc/:dolgozokod  ###
  Tir.normapercFindByKod = function(dolgozokod, cb) {
    const sql = `
      SELECT sum([Összes Normaperc]) AS sum FROM monitor_napikodolas where [Dolgozó kód] = ${dolgozokod}
    `
    executeFindOneCb(Tir.app.dataSources.tirDS.connector, sql, cb)
  }

  Tir.remoteMethod (
    'normapercFindByKod', options({path: '/normaperc', arg: 'dolgozokod', argtype: 'number'})
  )


//##########################################################################################################################  GET /users/:userid  ###
  Tir.userFindById = function(userid, cb) {
    const sql = `
      select top 1 [userid], [fullname] from [users] where [userid] = ${userid}
    `
    executeFindOneCb(Tir.app.dataSources.tirDS.connector, sql, cb)
  }

  Tir.remoteMethod (
    'userFindById', options({path: '/users', arg: 'userid', argtype: 'number'})
  )

//##########################################################################################################################  GET /munkalapok/:munkalapazonosito  ###
  Tir.munkalapFindByAzonosito = function(munkalapazonosito, cb) {
    const kellek = Math.floor(munkalapazonosito / 10000000) === 3
    if (kellek) { munkalapazonosito -= 10000000 }
    const sql = `
      select top 1 t1.munkalapazonosito, t1.cikkszam, t1.rendelesszam, t1.kartonszam, t1.db, t1.partnerrendelesszam, t1.itszam, t1.szinkod, t1.meret, t1.megjegyzes,
          t2.mennyiseg, t2.partnercikk, t2.cikkmegnevezes, t2.csoport4, t2.mosott, t3.alapanyag, t3.ugyfelnev
        from rendelesmunkalap t1 join rendelesfej t2 on t1.rendelesszam = t2.rendelesszam join cikktorzs t3 on t1.cikkszam = t3.tcikkszam and t3.aktiv = 'A'
        where munkalapazonosito = ${munkalapazonosito}
    `
    executeFindOne(Tir.app.dataSources.tirDS.connector, sql).then((result) => {
      result.kellek = kellek
      if (kellek) {
        result.kartoninfo = result.cikkszam.trim() + '/' + parseInt(result.rendelesszam.trim().slice(-4).toString()) + ' ' + result.mennyiseg.toString() + ' db'
      }
      else {
        result.kartoninfo = result.cikkszam.trim() + '/' + parseInt(result.rendelesszam.trim().slice(-4).toString()) + ' ' + result.kartonszam.trim() + ' ' + result.db.toString() + ' db'
      }
      cb(null, result)
    }).catch(err => {
      cb(err)
    })
  }

  Tir.remoteMethod (
    'munkalapFindByAzonosito', options({path: '/munkalapok', arg: 'munkalapazonosito', argtype: 'number'})
  )

//##########################################################################################################################  GET /vonalkodok/:kod  ###
  Tir.vonalkodokFindByKod = function(kod, cb) {
    const sql = `
      select top 1 [kod], [kodnev] from [vonalkodok] where [kod] = ${kod}
    `
    executeFindOneCb(Tir.app.dataSources.tirDS.connector, sql, cb)
  }

  Tir.remoteMethod (
    'vonalkodokFindByKod', options({path: '/vonalkodok', arg: 'kod', argtype: 'number'})
  )

//##########################################################################################################################  GET /uzemek/:uzemkod  ###
  Tir.uzemekFindByKod = function(uzemkod, cb) {
    const sql = `
      select top 1 [uzemkod], [uzemnev] from [uzemek] where [uzemkod] = ${uzemkod}
    `
    executeFindOneCb(Tir.app.dataSources.tirDS.connector, sql, cb)
  }

  Tir.remoteMethod (
    'uzemekFindByKod', options({path: '/uzemek', arg: 'uzemkod', argtype: 'number'})
  )

//##########################################################################################################################  GET /uzemekvkod/:vonalkod  ###
  Tir.uzemekFindByVonalkod = function(vonalkod, cb) {
    const sql = `
      select top 1 [vonalkod], [uzemnev] from [uzemek] where [vonalkod] = ${vonalkod}
    `
    executeFindOneCb(Tir.app.dataSources.tirDS.connector, sql, cb)
  }

  Tir.remoteMethod (
    'uzemekFindByVonalkod', options({path: '/uzemekvkod', arg: 'vonalkod', argtype: 'number'})
  )

//##########################################################################################################################  GET /seafile/:search  ###
  Tir.seafileSearch = function(search, cb) {
    seafile.get('api2/search/?per_page=200&q=' + encodeURIComponent(search)).then((response) => {
      const results = response.data.results.filter(x => !x.is_dir)
      cb(null, results)
    }).catch(err => {
      cb(err)
    })
  }

  Tir.remoteMethod (
    'seafileSearch', options({path: '/seafile', arg: 'search'})
  )

//##########################################################################################################################  GET /seafile/:cikkszam/:role  ###
  Tir.seafileSearchCikkszam = function(cikkszam, role, cb) {
    Tir.seafileSearch( cikkszam, function (err, result) {
      if (err) return cb(err)
      const filter = {
        'kötő': RegExp('^Lefordított|^Fotó|^Teljes fotó|^Műszaki|^Kötés'),
        'szabó': RegExp('^Lefordított|^KONF|^Konfekci|^Fotó|^Teljes fotó|^Videó|^Egyéb|^Műszaki|^Szabási|^Kötés'),
        'logisztikus': RegExp('^Lefordított|^KONF|^Konfekci|^Fotó|^Teljes fotó|^Videó|^Egyéb|^Műszaki|^Szabási|^Kötés'),
        'varró': RegExp('^Lefordított|^KONF|^Konfekci|^Fotó|^Teljes fotó|^Videó|^Egyéb'),
        'varró2': RegExp('^Lefordított|^KONF|^Konfekci|^Fotó|^Teljes fotó|^Videó|^Egyéb'),
        'technológus': RegExp('^Lefordított|^KONF|^Konfekci|^Fotó|^Teljes fotó|^Videó|^Egyéb'),
        'meo': RegExp('^Lefordított|^KONF|^Konfekci|^Fotó|^Teljes fotó|^Videó|^Egyéb'),
        'kódoló': RegExp('^Fotó|^Egyéb')
      }
      const regexp1 = filter[role]
      if (!regexp1) return cb(createError(404, 'A role nem található', {code: 'MODEL_NOT_FOUND'}))
      const regexp2 = RegExp(cikkszam + '\\.')
      const res1 = result.filter(x => !x.is_dir && regexp1.test(x.name) && regexp2.test(x.name))
      const res2 = res1.sort(function (a, b) { if (a.name < b.name) { return -1 } if (a.name > b.name) { return 1 } return 0 })
      cb(null, res2)
    })
  }

  Tir.remoteMethod (
    'seafileSearchCikkszam', options({path: '/seafile', arg: 'cikkszam', arg2: 'role'})
  )

//##########################################################################################################################  POST /belep/:qr  ###
  Tir.belep = function(qr, cb) {
    let store = {}
    if (qr < 50000) {
      const dolgozokod = qr - 20000
      Tir.dolgozoFindByKod( dolgozokod, function (err, result) {
        if (err) return cb(err)
        const vonalkodRole = { 1: 'varró', 2: 'varró', 3: 'varró', 7: 'félkész vasaló', 8: 'szabó', 9: 'készáru vasaló', 11: 'logisztikus', 13: 'kötő', 32: 'kötő', 33: 'technológus', 45: 'varró2' }
        store.user = {
          name: result.dolgozonev.trim(),
          role: vonalkodRole[result.vonalkod],
          uzemnev: result.uzemnev.trim(),
          dolgozokod: result.dolgozokod.toString(),
          belepokod: (result.dolgozokod + 20000).toString()
        }
        store.kodol = {
          role: store.user.role,
          telephelykod: result.telephelykod,
          telephely: result.telephely,
          kodolokod: '-1',
          kodolo: 'dolgozó',
          dolgozokod: store.user.belepokod,
          dolgozonev: store.user.name,
          belepokod: store.user.belepokod,
          username: store.user.name,
          munkalapazonosito: '',
          kartoninfo: '',
          gepkod: '0',
          muveletkodok: [],
          mennyiseg: '',
          suly: '0',
          koteshelye: '',
          uzemnev: store.user.uzemnev
        }
        cb(null, store)
      })
    }
    else if (qr < 51000) {
      const userid = qr - 50000
      Tir.userFindById( userid, function (err, result) {
        if (err) return cb(err)
        store.user = { name: result.fullname, role: 'kódoló', belepokod: (result.userid + 50000).toString() }
        store.kodol = {
          role: store.user.role,
          telephelykod: '0',
          telephely: 'Szeged, Tavasz u. 2.',
          kodolokod: store.user.belepokod,
          kodolo: store.user.name,
          dolgozokod: '',
          dolgozonev: '',
          belepokod: store.user.belepokod,
          username: store.user.name,
          munkalapazonosito: '',
          kartoninfo: '',
          gepkod: '0',
          muveletkodok: [],
          mennyiseg: '',
          suly: '0',
          koteshelye: '',
          uzemnev: '',
          uzemkod: '',
          hely: '',
          helynev: '',
          polckod: '0'
        }
        cb(null, store)
      })
    }
    else if (qr < 54000) {
      cb(createError(404, 'A user nem található', {code: 'MODEL_NOT_FOUND'}))
    }
    else if (qr < 55000) {
      store.user = {name: 'MEO', role: 'meo', belepokod: qr}
      store.kodol = {
        munkalapazonosito: '',
        kartoninfo: ''
      }
      cb(null, store)
    }
    else {
      cb(createError(404, 'A user nem található', {code: 'MODEL_NOT_FOUND'}))
    }
  }

  Tir.remoteMethod (
    'belep', options({verb: 'post', path: '/belep', arg: 'qr', argtype: 'number'})
  )

//##########################################################################################################################  POST /log  ###
  Tir.log = function({topic=requiredParam('topic'), payload=requiredParam('payload')}, cb) {
    mqtt.publish(mqttTopicPrefix + topic, payload)
    cb(null, null)
  }

  Tir.remoteMethod (
    'log', options({verb: 'post', path: '/log', param: 'params'})
  )

//##########################################################################################################################  POST /login  ###
  Tir.login = function(req, {username, password}, cb) {
    if (username && password) {
      Tir.app.models.User.login({username: username, password: password}, function (err, token) {
        if (err) return cb(err)
        cb(null, token)
      })
    }
    else if (isPrivateIp(req.headers['x-real-ip'] || req.ip)) {
      if (frontend_token) {
        cb(null, frontend_token)
      }
      else {
        Tir.app.models.User.login({ username: 'frontend', password: 'Szefo1953', ttl: 365 * 24 * 60 * 60 }, function (err, token) {
          if (err) return cb(err)
          setTimeout(function(){ frontend_token = null }, Math.pow(2,31)-1)
          frontend_token = token
          cb(null, frontend_token)
        })
      }
    }
    else  {
      cb(createError(401, 'login failed', {code: 'LOGIN_FAILED'}))
    }
  }

  Tir.remoteMethod (
    'login', options({verb: 'post', path: '/login', req:true, param: 'params'})
  )

//##########################################################################################################################  POST /logout  ###
  Tir.logout = function(req, cb) {
    console.log(req.accessToken)
    Tir.app.models.User.logout(req.accessToken.id, function (err) {
      if (err) return cb(err)
      cb(null, 'Logged out')
    })
  }

  Tir.remoteMethod (
    'logout', options({verb: 'post', path: '/logout', req:true})
  )

}
