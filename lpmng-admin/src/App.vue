<template>
  <div id="app"> 
    <menu-vertical></menu-vertical>
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
export default {
  name: 'app',
  components:
  {
    'menu-vertical': Menu
  }
}
</script>

<style>


</style>
