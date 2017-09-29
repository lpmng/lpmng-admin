<template>
    <nav id="searchmenu">
        <input type="search" v-model="search">
        
            <router-link v-for="pseudo in pseudos" :to="{name: 'UserDetailUniq', params: { pseudo: pseudo }}" :key="pseudo">
                {{ pseudo }}
            </router-link>
        
    </nav>

</template>

<script>
import UserDetailUniq from '@/components/user/UserDetailUniq'
export default {
  name: 'UserSearchMenu',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    // a computed getter
    pseudos: {
      get: function () {
        var pseudosTmp = []
        pseudosTmp[0] = this.search
        return pseudosTmp
      }
    }
  },
  components:
  {
    'infosUser': UserDetailUniq
  }
}
</script>