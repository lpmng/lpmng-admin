<template>
  <main class=""> 
    <sub-menu-vertical></sub-menu-vertical>
    <nav id="searchmenu">
        
        <input type="search" v-model="search">
        <!-- results search (use radio input to permit the utilisation of v-bind properties)-->
        <div v-for="user in pseudos">
          <input type="radio" name="search" class="search-result" v-bind:value="user.pseudo" v-bind:id="'id-'+user.pseudo" v-model="pseudoSelected"> 
          <label v-bind:for="'id-'+user.pseudo">
              {{user.pseudo}}
          </label>        
        </div>

    </nav>
    <infos-user v-if="pseudoSelected" v-bind:pseudo="pseudoSelected" v-bind:nom="listUsers[pseudoSelected].name" v-bind:prenom="listUsers[pseudoSelected].firstname" v-bind:cotisant="listUsers[pseudoSelected].cotisant" v-bind:nombreSessions="listUsers[pseudoSelected].nombreSessions">

    </infos-user>

  </main>
</template>

<script>
import UserMenu from '@/components/user/UserMenu'
import UserSearchMenu from '@/components/user/UserSearchMenu'
import UserDetailUniq from '@/components/user/UserDetailUniq'
export default {
  name: 'UserDetail',
  data () {
    return {
      search: '',
      pseudoSelected: '',
      listUsers: {
        maisonneuv: {pseudo: 'maisonneuv', name: 'maisonneuve', firstname: 'elio', cotisant: 'true', nombreSessions: '5'},
        darbouxtom: {pseudo: 'darbouxtom', name: 'darboux', firstname: 'tom', cotisant: 'true', nombreSessions: '3'},
        bouriettev: {pseudo: 'bouriettev', name: 'bouriette', firstname: 'vincent', cotisant: 'true', nombreSessions: '0'},
        berthaudmu: {pseudo: 'berthaudmu', name: 'berthaud-muller', firstname: 'gaël', cotisant: 'true', nombreSessions: '5'},
        buissonxav: {pseudo: 'buissonxav', name: 'buisson', firstname: 'xavier', cotisant: 'true', nombreSessions: '1'},
        frerenicol: {pseudo: 'frerenicol', name: 'frere', firstname: 'nicolas', cotisant: 'true', nombreSessions: '0'},
        dubusernes: {pseudo: 'dubusernes', name: 'dubus', firstname: 'ernest', cotisant: 'false', nombreSessions: '0'},
        schallanne: {pseudo: 'schallanne', name: 'schall', firstname: 'anne-gaëlle', cotisant: 'false', nombreSessions: '0'}
      }
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
            // console.log(element.pseudo)
            // /console.log(element.pseudo.indexOf(this.search))
            if (this.listUsers[key].pseudo.indexOf(this.search) > -1 || this.listUsers[key].firstname.indexOf(this.search) > -1 || this.listUsers[key].name.indexOf(this.search) > -1) {
              pseudosTmp.push(this.listUsers[key])
            }
          }
        }
        return pseudosTmp
      }
    }
  },
  components:
  {
    'sub-menu-vertical': UserMenu,
    'search-menu-vertical': UserSearchMenu,
    'infos-user': UserDetailUniq
  }
}

</script>