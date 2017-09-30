<template>
  <main class=""> 
    <sub-menu-vertical></sub-menu-vertical>
    <nav id="searchmenu">
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

    </nav>
    <infos-user v-if="pseudoSelected" v-bind:pseudo="pseudoSelected" v-bind:nom="listUsers[pseudoSelected].surname" v-bind:prenom="listUsers[pseudoSelected].commonname" v-bind:cotisant="listUsers[pseudoSelected].cotisant" v-bind:nombreSessions="listUsers[pseudoSelected].nombreSessions">

    </infos-user>

  </main>
</template>

<script>
import UserMenu from '@/components/user/UserMenu'
import UserSearchMenu from '@/components/user/UserSearchMenu'
import UserDetailUniq from '@/components/user/UserDetailUniq'
import axios from 'axios'
export default {
  name: 'UserDetail',
  data () {
    return {
      search: '',
      pseudoSelected: '',
      listUsers: {},
      msgError: ''
    }
  },
  watch:
  {
    'pseudoSelected': function (val) {

    }
  },
  computed: {
    // a computed getter
    pseudos: {
      get: function () {
        var pseudosTmp = []
        console.log('-----search:' + this.search + '--------')
        if (this.search.length > 0) {
          for (var key in this.listUsers) {
            console.log(this.listUsers[key].uid)
            console.log(this.listUsers[key].uid.indexOf(this.search))
            if (this.listUsers[key].uid.indexOf(this.search) > -1 || this.listUsers[key].commonname.indexOf(this.search) > -1 || this.listUsers[key].surname.indexOf(this.search) > -1) {
              pseudosTmp.push(this.listUsers[key])
            }
          }
        }
        console.log(pseudosTmp)
        return pseudosTmp
      }
    }
  },
  mounted: function () {
    axios.get('http://127.0.0.1:8000/users/', {})
    .then((response) => {
      console.log(response)

      response.data.forEach(function (element) {
        this.listUsers[element.uid] = element
        this.listUsers[element.uid].cotisant = 'non'
        this.listUsers[element.uid].nombreSessions = '0'
      }, this)
    })
    .catch((error) => {
      console.log(error)
      this.msgError = 'Erreur de la requète'
    })
  },
  components:
  {
    'sub-menu-vertical': UserMenu,
    'search-menu-vertical': UserSearchMenu,
    'infos-user': UserDetailUniq
  }
}

</script>