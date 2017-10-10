<template>
    <nav id="submenu">
        <img src="../../src/assets/IcoMoon/SVG/323-circle-right.svg" class="hamburger" @click="displayMenu" v-if="!menuVisible"/>
        <img src="../../src/assets/IcoMoon/SVG/325-circle-left.svg" class="hamburger" @click="displayMenu" v-if="menuVisible"/>
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