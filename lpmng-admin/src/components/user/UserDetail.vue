<template>
  <main class=""> 
    <sub-menu-vertical></sub-menu-vertical>
    <section id="content" class="searchUser">
      <h1>Rechercher un utilisateur</h1>
      <div class="infos negatif" v-if="msgError">{{msgError}}</div>
      <input type="search" v-model="search">
    
    <!-- results search (use radio input to permit the utilisation of v-bind properties)-->
      <div v-for="user in pseudos" class="searchResult">
        <input type="radio" name="search" class="search-result" v-bind:value="user.uid" v-bind:id="'id-'+user.uid" v-model="pseudoSelected"> 
        <label v-bind:for="'id-'+user.uid">
            
            <div class="username">{{user.uid}}</div>
            <div class="name">{{user.commonname}} {{user.surname}}</div>
            <div class="actions">
              <img src="../../../src/assets/helium/confirm.svg" class="button"/>
              <img src="../../../src/assets/helium/edit.svg" class="button" @click="displayChangeUser"/>
              <img src="../../../src/assets/helium/delete.svg" class="button" @click="displaySupprUser" v-bind:pseudo="user.uid"/>
            </div>
        </label>        
      </div>
    </section>
    <!--
    <infos-user v-if="pseudoSelected" v-bind:pseudo="pseudoSelected"                        v-bind:nom="listUsers[pseudoSelected].surname" 
                                      v-bind:prenom="listUsers[pseudoSelected].commonname"  v-bind:cotisant="listUsers[pseudoSelected].cotisant" 
                                      v-bind:nombreSessions="listUsers[pseudoSelected].nombreSessions"
                                      v-bind:tel="listUsers[pseudoSelected].tel"            v-bind:mail="listUsers[pseudoSelected].mail">

    </infos-user>
    -->

    <!--    ================== Modals ===================    !-->

    <!-- delete modal -->
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
        <form>
          <!-- nom -->
          <div class="input">
          <label for="nom">Nom:</label>
          <input type="text" name="nom" id="nom"/>
          <a class="button">Modifier</a>
          </div>
          <!-- prenom -->
          <div class="input">
          <label for="prenom">Prénom:</label>
          <input type="text" name="prenom" id="prenom"/>
          <a class="button">Modifier</a>
          </div>
          <!-- mail -->
          <div class="input">
          <label for="mail">Mail:</label>
          <input type="mail" name="pseudo" id="mail"/>
          <a class="button">Modifier</a>
          </div>
          <!-- tel -->
          <div class="input">
          <label for="telephone">Téléphone:</label>
          <input type="tel" name="telephone" id="telephone"/>
          <a class="button">Modifier</a>
          </div>

          <div class="input">
          <label for="password">Mot de passe:</label>
          <input type="password" name="password" id="password"/>
          <a class="button">Modifier</a>
          </div>

        </form>
        <a class="button" @click="displayChangeUser">Retour</a>
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
      console.log('yo')
      var pseudosTmp = []
      console.log('-----search:' + this.search + '--------')
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
    displayChangeUser () {
      this.changeUserVisible = !this.changeUserVisible
    },
    displayMenu () {
      console.log('wout')
      this.menuVisible = !this.menuVisible
    }
  },
  mounted: function () {
    axios.get(window.core_url + 'users/', {})
    .then((response) => {
      console.log(response)

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