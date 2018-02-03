var axios = require('axios')
var UtilsAuth = {}

UtilsAuth.logUrl = '/api/token?redirectClientURI=http://localhost:8082/oauth'
UtilsAuth.token = ''
UtilsAuth.authRequest = axios.create()
// UtilsAuth.authRequest.defaults.headers.common['Authorization'] = UtilsAuth.token

UtilsAuth.getToken = function (login, password, router) {
  var client = 'CQ0lyCmDQi7ci86KDksCzAeI9E2Tej9SE0v0lggK'
  var key = 'L6drgefScn6MfQkJdDOceT8TKmdtVGCyyuzZIZZIiwmdc59umHKnDi55rbk02pFUuvkPHgmruwGKUmgS1VpGfATsJDiqM2Y0ig3DXrXDVF0yiDy6NsSk2WUoRvwgM10N'
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
        console.log(UtilsAuth.token)
        location.reload()
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
