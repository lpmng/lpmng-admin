<template>
    <nav id="searchmenu">
        <input type="search">
        
            <router-link v-for="pseudo in pseudos" :to="{name: 'UserDetailUniq', params: { pseudo: pseudo }}" :key="pseudo">
                {{ pseudo }}
            </router-link>
        
    </nav>
</template>

<script>
export default {
  name: 'UserSearchMenu',
  data () {
    return {
      pseudos: ['maisonneuv', 'darboutom', 'berthaumu', 'buissonxav', 'frerenicol', 'dubusernes', 'bouriettev']
    }
  }
}
</script>