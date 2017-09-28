<template>
  <main class=""> 
    <sub-menu-vertical></sub-menu-vertical>
    <section id="content">
    </section>
  </main>
</template>

<script>
import UserMenu from '@/components/user/UserMenu'
export default {
  name: 'UserIndex',
  data () {
    return {
    }
  },
  components:
  {
    'sub-menu-vertical': UserMenu
  }
}
</script>