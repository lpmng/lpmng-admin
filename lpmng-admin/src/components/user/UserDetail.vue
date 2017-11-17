<template>
  <main class="">
    <sub-menu-vertical></sub-menu-vertical>
    <section id="content" class="searchUser">
      <h1>Rechercher un utilisateur</h1>
      <input type="search" v-model="search">
      <div class="lds-ripple" v-if="loaderVisible">
        <div></div>
        <div></div>
      </div>
      <div id="notifs">
          <notification v-for="notif in notifs" v-bind:type="notif.type" v-bind:msg="notif.msg" ></notification>
      </div>
    <!-- results search (use radio input to permit the utilisation of v-bind properties)-->
      <div v-for="user in pseudos" class="searchResult">
        <input type="radio" name="search" class="search-result" v-bind:value="user.uid" v-bind:id="'id-'+user.uid" v-model="pseudoSelected">
        <label v-bind:for="'id-'+user.uid" v-bind:id="'id-Description-'+user.uid" v-bind:class="{ isValid: user.isValid }">

            <div class="username">
              {{user.uid}} 
              <img src="../../../src/assets/IcoMoon/SVG/114-user.svg" class="button" @click="displayChangeUid(user)" />
            </div>
            <div class="name">{{user.commonname}} {{user.surname}}</div>
            <div class="actions">
              <img src="../../../src/assets/IcoMoon/SVG/273-checkmark.svg" class="button" @click="validUser(user)"/>
              <img src="../../../src/assets/IcoMoon/SVG/006-pencil.svg" class="button" @click="displayChangeUser(user)"/>
              <img src="../../../src/assets/IcoMoon/SVG/173-bin.svg" class="button" @click="displaySupprUser(user)" v-bind:pseudo="user.uid"/>
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

    <!-- .'.'.'.'. Modals .'.'.'.'. -->

    <div class="modal-back" v-if="changeUidVisible">
      <div class="modal">
        <h2>Modifier {{pseudoSelected}} ?</h2>
        <div class="input">
            <label for="uid">Nouveau pseudo:</label>
            <input type="text" name="uid" id="uid" v-model="userSelected.uid"/>
        </div>
        <a class="button" @click="displayConfirmChangeUid">Oui</a>
        <a class="button" @click="hideChangeUid">Non</a>
      </div>
    </div>

    <div class="modal-back" v-if="confirmChangeUidVisible">
      <div class="modal">
        <h2>Êtes vous sur?</h2>
        <p>Cela peut mener à des incohérence dans la bdd... </p>
        <a class="button" >Oui</a>
        <a class="button" @click="hideConfirmChangeUid">Non</a>
      </div>
    </div>

    <div class="modal-back" v-if="supprUserVisible">
      <div class="modal">
        <h2>Supprimer {{pseudoSelected}} ?</h2>
        <a class="button" @click="deleteUser">Oui</a>
        <a class="button" @click="hideDeleteUser">Non</a>
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
import Notif from '@/components/Notif'
import axios from 'axios'
export default {
  name: 'UserDetail',
  data () {
    return {
      search: '',
      pseudoSelected: '',
      userSelected: {},
      listUsers: {},
      pseudos: {},
      supprUserVisible: false,
      changeUserVisible: false,
      changeUidVisible: false,
      confirmChangeUidVisible: false,
      menuVisible: true,
      loaderVisible: true,
      notifs: []
    }
  },
  watch:
  {
    // search users
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
    deleteUser () {
      axios.delete(`${window.core_url}users/${this.userSelected.uid}/`).then((response) => {
        delete this.listUsers[this.userSelected.uid]
        console.log(this.userSelected.uid + ' delete')
        this.hideDeleteUser()
      })
      .catch((error) => {
        console.log(error)
        this.addNotif(this.userSelected.uid + ' n\'a pas été supprimé', 'error')
      })
    },
    validUser (user) {
      var finalObj
      if (user.isValid) {
        finalObj = {'access': ''}
      } else {
        finalObj = {'access': 'true'}
      }
      axios.patch(`${window.core_url}groups/${user.uid}/`, finalObj)
        .then((response) => {
          this.addNotif('validation de ' + user.uid + ' :' + !user.isValid, 'success')
          user.isValid = !user.isValid
        })
        .catch((error) => {
          console.log(error)
          this.addNotif('Erreur requete - validation de ' + user.uid, 'error')
        })
    },
    displaySupprUser (user) {
      this.userSelected = Object.assign({}, user)
      this.supprUserVisible = !this.supprUserVisible
    },
    displayChangeUser (user) {
      this.changeUserVisible = true
      this.userSelected = Object.assign({}, user)
    },
    displayChangeUid (user) {
      this.userSelected = Object.assign({}, user)
      this.changeUidVisible = !this.changeUidVisible
    },
    displayConfirmChangeUid () {
      this.hideChangeUid()
      this.confirmChangeUidVisible = true
    },
    hideChangeUid () {
      this.changeUidVisible = false
    },
    hideConfirmChangeUid () {
      this.confirmChangeUidVisible = false
    },
    hideDeleteUser () {
      this.supprUserVisible = false
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
          this.addNotif('Erreur de la requète - change password', 'error')
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
    var listPromise = []
    // lists all users when page load
    axios.get(window.core_url + 'users/', {})
    .then((response) => {
      response.data.forEach(function (element) {
        this.listUsers[element.uid] = element
        this.listUsers[element.uid].cotisant = 'non'
        this.listUsers[element.uid].nombreSessions = '0'
        // this.listUsers[element.uid].isValid = true
        console.log(this)
        listPromise.push(
          axios.get(window.core_url + 'groups/' + element.uid + '/', {})
            .then((response) => {
              console.log(response.data.has_access)
              this.listUsers[element.uid].isValid = response.data.has_access
              console.log(this)
            }
          )
        )
      }, this)

      Promise.all(listPromise).then(
        (responses) => {
          this.pseudos = this.listUsers
        }
      )
      .catch((error) => {
        console.log(error)
        this.addNotif('Erreur requete - user valide', 'error')
      })
      this.loaderVisible = false
    })
    .catch((error) => {
      console.log(error)
      this.loaderVisible = false
      this.addNotif('Erreur de la requète - liste users', 'error')
    })
  },
  components:
  {
    'sub-menu-vertical': UserMenu,
    'infos-user': UserDetailUniq,
    'notification': Notif
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
    border-radius: 0px 0px 5px 5px;
    box-shadow: 0px 0px 10px rgba(150,150,150,0.2);
    border-width: 1px;
    border-style: solid;
    border-image: linear-gradient(to bottom, chocolate, rgba(0, 0, 0, 0)) 1 100%;
    border-top: 1px solid chocolate;
    position: relative;
    animation-name: show_description;
    animation-duration: 0.3s;
  }

  .description::before
  {
    top:0px;
    height: 1px;
    border-top:  1px solid chocolate;
    border-radius: 5px;
    width: 522px;
    position: relative;
    content: "";
    top: -12px;
    left: -11px;
    display: block;
  }
  .description h3
  {
    display: inline-block;
    min-width: 240px;
    margin: 10px;
  }

  @keyframes show_description{
    from {height: 0px}
    to {height: 250px}
  }

  /****************************/

  @-webkit-keyframes lds-ripple {
  0% {
    top: 90px;
    left: 90px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 15px;
    left: 15px;
    width: 150px;
    height: 150px;
    opacity: 0;
  }
}
@keyframes lds-ripple {
  0% {
    top: 90px;
    left: 90px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 15px;
    left: 15px;
    width: 150px;
    height: 150px;
    opacity: 0;
  }
}
.lds-ripple {
  position: relative;
  width: 200px;
  margin: auto;
}
.lds-ripple div {
  box-sizing: content-box;
  position: absolute;
  border-width: 10px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  -webkit-animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(1) {
  border-color: orange;
}
.lds-ripple div:nth-child(2) {
  border-color: orange;
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
</style>
