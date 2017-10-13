<template>
    <nav id="vertical-menu">
        <router-link :to="{name: 'Hello'}">
            <img src="../../src/assets/IcoMoon/SVG/001-home.svg"/>
            <div>Accueil</div>
        </router-link>
        <router-link :to="{name: 'UserIndex'}">
            <img src="../../src/assets/IcoMoon/SVG/119-user-tie.svg"/>
            <div>Utilisateurs</div>
        </router-link>
    </nav>
</template>

<script>
export default {
  name: 'menu'
}
</script>
