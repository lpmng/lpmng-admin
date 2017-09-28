<template>
    <nav id="vertical-menu">
        <router-link :to="{name: 'Hello'}">
            <img src="../../src/assets/home.svg"/>
            <div>Home</div>
        </router-link>
        <router-link :to="{name: 'About'}">
            <img src="../../src/assets/about.svg"/>
            <div>About</div>
        </router-link>
        <router-link :to="{name: 'UserIndex'}">
            <img src="../../src/assets/user.svg"/>
            <div>User</div>
        </router-link>
    </nav>
</template>

<script>
export default {
  name: 'menu'
}
</script>
