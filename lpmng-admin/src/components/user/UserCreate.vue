<template>
  <main class="">
    <sub-menu-vertical></sub-menu-vertical>
    <section id="content">
      <h1>Ajouter un utilisateur</h1>
      <div id="notifs">
        <notification v-for="notif in notifs" v-bind:type="notif.type" v-bind:msg="notif.msg"></notification>
      </div>
      <form v-on:submit="createUser">
        <div class="partie">
          <div class="input">
            <label for="nom">Nom:</label>
            <input type="text" name="nom" id="nom" v-model="form.last_name"/>
          </div>
          <div class="input">
            <label for="prenom">Prénom:</label>
            <input type="text" name="prenom" id="prenom" v-model="form.first_name"/>
          </div>
        </div>
        <div class="partie">
          <div class="input">
            <label for="pseudo">Pseudo:</label>
            <input type="text" name="pseudo" id="pseudo" v-model="form.username"/>
          </div>
          <div class="input">
            <label for="password">Mot de passe:</label>
            <input type="password" name="password" id="password" v-model="form.password"/>
          </div>
        </div>
        <div class="partie">
          <div class="input">
            <label for="mail">Mail:</label>
            <input type="mail" name="pseudo" id="mail" v-model="form.email"/>
          </div>
          <div class="input">
            <label for="telephone">Téléphone:</label>
            <input type="tel" name="telephone" id="telephone" v-model="form.tel"/>
          </div>
        </div>
        <div class="partie">
          <label style="position: relative;top: 12px;">Cotisant: </label>
          <input type="checkbox" name="cotisant" value="false" id="cotisant" class="round-radio" v-model="form.cotisant">
          <label for="cotisant">
            <div class="slider button-big">
              <div class="puce"></div>
            </div>
            <span class="textActiv text">
              Oui
            </span>
            <span class="textUnactiv text">
              Non
            </span>
          </label>
        </div>
        <div class="partie no-line">
          <div class="center">
            <input class="button" type="submit" value="Créer"/>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import UserMenu from '@/components/user/UserMenu'
import Notif from '@/components/Notif'
// import axios from 'axios'
import UtilsAuth from '@/utils/UtilsAuth'

export default {
  name: 'UserCreate',
  data () {
    return {
      form: {
        password: '',
        last_name: '',
        first_name: '',
        username: '',
        email: '',
        tel: '',
        cotisant: false
      },
      notifs: []
    }
  },
  mounted () {
    UtilsAuth.auth(this.$router)
  },
  methods: {
    addNotif (msg, type) {
      var myNotif = {
        'msg': msg,
        'type': type
      }
      this.notifs.push(myNotif)
      setTimeout(() => {
        this.removeNotif(myNotif)
      }, 5000)
    },
    removeNotif (notif) {
      console.log('wololo')
      var i = this.notifs.indexOf(notif)
      this.notifs.splice(i, 1)
    },
    createUser (e) {
      e.preventDefault()
      scroll(0, 0)
      // verify informations
      if (
      this.form.password.length > 2 &&
      this.form.last_name.length > 2 &&
      this.form.first_name.length > 2 &&
      this.form.username.length > 2 &&
      this.form.email.length > 2) {
        // do request
        UtilsAuth.authRequest.post(window.core_url + 'users/', this.prepareRequest(this.form))
        .then((response) => {
          this.addNotif('User ' + this.form.username + ' have been created', 'success')
          this.form.first_name = ''
          this.form.last_name = ''
          this.form.password = ''
        })
        .catch((error) => {
          console.log(error)
          this.addNotif('Une erreur est survenu', 'error')
        })
      } else {
        this.addNotif('Les champs sont incomplets', 'error')
      }
    },
    generatePseudo () {
      let pseudoTmp = this.form.last_name + this.form.first_name
      this.form.username = pseudoTmp
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z]/gi, '') // Remove non alphabet character
        .substring(0, 10)
        .toLowerCase()

      if (this.form.username.length > 0) {
        this.form.email = this.form.username + '@eisti.eu'
      } else {
        this.form.email = ''
      }
    },
    prepareRequest (obj) {
      let finalObj = {}
      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          finalObj[key] = this.prepareRequest(obj[key])
        } else if (typeof obj[key] !== 'string' || obj[key].length > 0) {
          finalObj[key] = obj[key]
        }
      }
      return finalObj
    }
  },
  components:
  {
    'sub-menu-vertical': UserMenu,
    'notification': Notif
  },
  watch:
  {
    'form.first_name': function () {
      this.generatePseudo()
    },
    'form.last_name': function () {
      this.generatePseudo()
    }
  }
}
</script>
