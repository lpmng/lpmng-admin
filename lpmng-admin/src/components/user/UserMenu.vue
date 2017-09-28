<template>
    <sub-menu-vertical v-bind:links="links" v-bind:title="title" ></sub-menu-vertical>
</template>

<script>
import SubMenu from '@/components/SubMenu'
export default {
  name: 'UserMenu',
  data () {
    return {
      title: 'User',
      links: [
        {
          id: 1,
          link: 'UserDetail',
          text: 'All users'
        },
        {
          id: 2,
          link: 'UserCreate',
          text: 'Create a user'
        }
      ]
    }
  },
  components:
  {
    'sub-menu-vertical': SubMenu
  }
}
</script>