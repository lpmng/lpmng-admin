<template>
  <main>
    <section id="content">
      <h1>About</h1>
    </section>
  </main>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
  // mettre les methodes a la suite de la liste
  // mounted lancé au debut
  /* ,components:{
    'nomdutag':moncomponent
  } */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
