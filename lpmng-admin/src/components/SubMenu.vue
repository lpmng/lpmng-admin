<template>
    <nav id="submenu">
        <h2>{{title}}</h2>
        <router-link v-for="link in links" :to="{name: link.link}" :key="link.id">
            {{ link.text }}
        </router-link>
    </nav>
</template>

<script>
export default {
  name: 'submenu',
  props: ['links', 'title'],
  mounted: function () {
  }
}
</script>