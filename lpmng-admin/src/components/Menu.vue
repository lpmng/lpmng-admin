<template>
    <nav id="vertical-menu">
        <router-link :to="{name: 'Hello'}">
            <img src="../../src/assets/helium/home.svg"/>
            <div>Acceuil</div>
        </router-link>
        <router-link :to="{name: 'UserIndex'}">
            <img src="../../src/assets/helium/girl.svg"/>
            <div>Utilisateurs</div>
        </router-link>
    </nav>
</template>

<script>
export default {
  name: 'menu'
}
</script>
