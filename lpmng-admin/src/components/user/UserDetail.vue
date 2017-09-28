<template>
  <main class=""> 
    <sub-menu-vertical></sub-menu-vertical>
    <search-menu-vertical></search-menu-vertical>
    <section id="content">
        <h1>Liste des utilisateurs</h1>
    </section>
  </main>
</template>

<script>
import UserMenu from '@/components/user/UserMenu'
import UserSearchMenu from '@/components/user/UserSearchMenu'
export default {
  name: 'UserDetail',
  data () {
    return {
    }
  },
  components:
  {
    'sub-menu-vertical': UserMenu,
    'search-menu-vertical': UserSearchMenu
  }
}
</script>