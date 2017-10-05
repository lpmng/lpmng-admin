<template>
    <nav id="submenu">
        <img src="../../src/assets/menu.svg" class="hamburger" @click="displayMenu"/>
        <div id="submenu-content" v-if="menuVisible">
            <h2>{{title}}</h2>
            <router-link v-for="link in links" :to="{name: link.link}" :key="link.id">
                {{ link.text }}
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'submenu',
  props: ['links', 'title'],
  data () {
    return {
      menuVisible: true
    }
  },
  methods: {
    displayMenu () {
      console.log('wout')
      this.menuVisible = !this.menuVisible
    }
  },
  mounted: function () {
  }
}
</script>