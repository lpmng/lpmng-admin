<template>
  <main class="">
    <sub-menu-vertical></sub-menu-vertical>
    <section id="content" class="searchUser">
      <h1>Rechercher un utilisateur</h1>
      <div id="notifs">
          <notification v-for="notif in notifs" v-bind:type="notif.type" v-bind:msg="notif.msg" @click="removeNotif(notif)"></notification>
      </div>
      <input type="search" v-model="search">

    <!-- results search (use radio input to permit the utilisation of v-bind properties)-->
      <div v-for="user in pseudos" class="searchResult">
        <input type="radio" name="search" class="search-result" v-bind:value="user.uid" v-bind:id="'id-'+user.uid" v-model="pseudoSelected">
        <label v-bind:for="'id-'+user.uid">

            <div class="username">{{user.uid}}</div>
            <div class="name">{{user.commonname}} {{user.surname}}</div>
            <div class="actions">
              <img src="../../../src/assets/IcoMoon/SVG/273-checkmark.svg" class="button"/>
              <img src="../../../src/assets/IcoMoon/SVG/006-pencil.svg" class="button" @click="displayChangeUser(user)"/>
              <img src="../../../src/assets/IcoMoon/SVG/173-bin.svg" class="button" @click="displaySupprUser" v-bind:pseudo="user.uid"/>
            </div>
        </label>
        <div v-if="pseudoSelected == user.uid" class="description">
          <div class="info"><h3>Nom:</h3>{{user.surname}}</div>
          <div class="info"><h3>Prenom:</h3>{{user.commonname}}</div>
          <div class="info"><h3>Cotisant:</h3>?</div>
          <div class="info"><h3>Nombre session:</h3>?</div>
          <div class="info"><h3>Mail:</h3>{{user.mail}}</div>
          <div class="info"><h3>Téléphone:</h3>{{user.tel}}</div>
        </div>
      </div>
      
    </section>

    <div class="modal-back" v-if="supprUserVisible">
      <div class="modal">
        <h2>Supprimer {{pseudoSelected}} ?</h2>
        <a class="button">Oui</a>
        <a class="button" @click="displaySupprUser">Non</a>
      </div>
    </div>


    <!-- modif modal -->
    <div class="modal-back" v-if="changeUserVisible">
      <div class="modal">
        <h2>Modification de <span class="username">{{pseudoSelected}}</span> </h2>
        <form v-on:submit="changeUser">
          <!-- nom -->
          <div class="input">
            <label for="nom">Nom:</label>
            <input type="text" name="nom" id="nom" v-model="userSelected.surname"/>
          </div>
          <!-- prenom -->
          <div class="input">
            <label for="prenom">Prénom :</label>
            <input type="text" name="prenom" id="prenom" v-model="userSelected.commonname"/>
          </div>
          <!-- mail -->
          <div class="input">
            <label for="mail">Mail :</label>
            <input type="mail" name="pseudo" id="mail" v-model="userSelected.mail"/>
          </div>
          <!-- tel -->
          <div class="input">
            <label for="telephone">Téléphone :</label>
            <input type="tel" name="telephone" id="telephone" v-model="userSelected.tel"/>
          </div>

          <div class="input">
            <label for="password">Mot de passe :</label>
            <input type="password" name="password" id="password" v-model="userSelected.password"/>
          </div>

          <input type="button" value="Retour" @click="hideChangeUser">
          <input type="submit" value="Modifier">
        </form>
      </div>
    </div>
  </main>

</template>

<script>
import UserMenu from '@/components/user/UserMenu'
import UserDetailUniq from '@/components/user/UserDetailUniq'
import axios from 'axios'
export default {
  name: 'UserDetail',
  data () {
    return {
      search: '',
      pseudoSelected: '',
      userSelected: {},
      listUsers: {},
      msgError: '',
      pseudos: {},
      supprUserVisible: false,
      changeUserVisible: false,
      menuVisible: true
    }
  },
  watch:
  {
    search: function (val) {
      var pseudosTmp = []
      for (var key in this.listUsers) {
        if (this.listUsers[key].uid.indexOf(val) > -1 || this.listUsers[key].commonname.indexOf(val) > -1 || this.listUsers[key].surname.indexOf(val) > -1) {
          pseudosTmp.push(this.listUsers[key])
        }
      }
      this.pseudos = pseudosTmp
    }
  },
  methods: {
    displaySupprUser () {
      this.supprUserVisible = !this.supprUserVisible
    },
    displayChangeUser (user) {
      this.changeUserVisible = true
      this.userSelected = Object.assign({}, user)
    },
    hideChangeUser () {
      this.changeUserVisible = false
    },
    displayMenu () {
      this.menuVisible = !this.menuVisible
    },
    changeUser (e) {
      e.preventDefault()

      let finalObj = {}
      for (let key in this.userSelected) {
        if (this.userSelected[key] !== this.listUsers[this.userSelected.uid][key]) {
          finalObj[key] = this.userSelected[key]
        }
      }

      if (Object.keys(finalObj).length === 0) {
        this.hideChangeUser()
        return
      }

      axios.patch(`${window.core_url}users/${this.userSelected.uid}/`, finalObj)
        .then((response) => {
          this.hideChangeUser()
          delete finalObj['password']
          Object.assign(this.listUsers[this.userSelected.uid], finalObj)
        })
        .catch((error) => {
          console.log(error)
          this.msgError = 'Erreur de la requète.'
        })
    },
    // notification
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
    }
  },
  mounted: function () {
    axios.get(window.core_url + 'users/', {})
    .then((response) => {
      response.data.forEach(function (element) {
        this.listUsers[element.uid] = element
        this.listUsers[element.uid].cotisant = 'non'
        this.listUsers[element.uid].nombreSessions = '0'
      }, this)
      this.pseudos = this.listUsers
    })
    .catch((error) => {
      console.log(error)
      this.msgError = 'Erreur de la requète'
    })
  },
  components:
  {
    'sub-menu-vertical': UserMenu,
    'infos-user': UserDetailUniq
  }
}

</script>

<style>
  .description
  {
    width: 500px;
    margin: auto;
    border-color: white;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(150,150,150,0.2);
  }

  .description h3
  {
    display: inline-block;
    min-width: 240px;
  }
</style>
