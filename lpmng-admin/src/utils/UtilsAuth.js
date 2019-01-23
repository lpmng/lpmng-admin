var axios = require('axios')
var UtilsAuth = {}

UtilsAuth.logUrl = '/api/token?redirectClientURI=http://localhost:8082/oauth'
UtilsAuth.token = ''
UtilsAuth.authRequest = axios.create()
// UtilsAuth.authRequest.defaults.headers.common['Authorization'] = UtilsAuth.token

UtilsAuth.getToken = function (login, password, router, done) {
  var client = 'elbrdb9KDdTvJf0mlqjSu81LPrKQeq8aPBQftagI'
  var key = 'oxzTgTiXp7MQEztmAIuNdqXVbP2sGYhYO12gY1y3Qd01YYlNQQpUTTYGqn2YUzjRDswArzIBPl6qeZjPKcI36kPur4Pw36fT187dRaewvEwrgpG4BDRQWv0OviaZ62WV'
  var key64 = btoa(client + ':' + key)
  var oReq = new XMLHttpRequest()
  oReq.open('POST', window.core_url + 'o/token/', true)
  oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  oReq.setRequestHeader('authorization', 'Basic ' + key64)
  oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  oReq.onreadystatechange = function () {
    var DONE = 4 // readyState 4 means the request is done.
    var OK = 200 // status 200 is a successful return.
    if (oReq.readyState === DONE) {
      if (oReq.status === OK) {
        var rep = JSON.parse(oReq.responseText)
        UtilsAuth.token = rep.access_token //
        sessionStorage.setItem('token', UtilsAuth.token) // sauvegarde du token en session
        done()
      } else {
        console.log('Error: ' + oReq.status) // An error occurred during the request.
      }
    }
  }

  oReq.send('grant_type=password&username=' + login + '&password=' + password + '&scope=read write&client_id=' + client)
}

UtilsAuth.auth = function (router) {
  UtilsAuth.token = sessionStorage.getItem('token')
  UtilsAuth.authRequest.defaults.headers.common['Authorization'] = 'bearer ' + UtilsAuth.token
  console.log(UtilsAuth.token)
  if (!UtilsAuth.token) {
    router.push('/')
    return false
  }
  return true
}

module.exports = UtilsAuth
