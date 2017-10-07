<template>
  <main class=""> 
    <sub-menu-vertical></sub-menu-vertical>
    <nav id="searchmenu">
        <img src="../../../src/assets/menu.svg" class="hamburger" @click="displayMenu"/>
        <div id="searchmenu-content" v-if="menuVisible">
        <div class="infos negatif" v-if="msgError">{{msgError}}</div>
        <input type="search" v-model="search">
        <!-- results search (use radio input to permit the utilisation of v-bind properties)-->
        <div v-for="user in pseudos">
          <input type="radio" name="search" class="search-result" v-bind:value="user.uid" v-bind:id="'id-'+user.uid" v-model="pseudoSelected"> 
          <label v-bind:for="'id-'+user.uid">
              
              <div>{{user.uid}}</div>
              <small>{{user.commonname}} {{user.surname}}</small>
              <div class="separateur"></div>
          </label>        
        </div>
        </div>
    </nav>
    <infos-user v-if="pseudoSelected" v-bind:pseudo="pseudoSelected"                        v-bind:nom="listUsers[pseudoSelected].surname" 
                                      v-bind:prenom="listUsers[pseudoSelected].commonname"  v-bind:cotisant="listUsers[pseudoSelected].cotisant" 
                                      v-bind:nombreSessions="listUsers[pseudoSelected].nombreSessions"
                                      v-bind:tel="listUsers[pseudoSelected].tel"            v-bind:mail="listUsers[pseudoSelected].mail">

    </infos-user>

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