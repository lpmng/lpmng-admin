<template>
    <nav id="vertical-menu">
        <router-link :to="{name: 'Hello'}">
            <img src="../../src/assets/home.svg"/>
            <div>Acceuil</div>
        </router-link>
        <router-link :to="{name: 'UserIndex'}">
            <img src="../../src/assets/user.svg"/>
            <div>Utilisateurs</div>
        </router-link>
    </nav>
</template>

<script>
export default {
  name: 'menu'
}
</script>
