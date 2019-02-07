<template>
  <main >
    <section id="content">
      <h1><img src="/static/eclair.svg"/>LPMNG-Admin<img src="/static/eclair.svg"/></h1>
      <div class="notif-log" v-if="isLog">Vous êtes connecté</div>
      <div class="notif-error" v-if="error">erreur de connexion: code {{error}}</div>
      <form>
         <div class="input">
            <label for="nom">Pseudo:</label>
            <input type="text" placeholder="pseudo" v-model="username"/>
          </div>
          <div class="input">
            <label for="nom">Mot de passe:</label>
            <input type="password" placeholder="Mot de passe" v-model="password"/>
          </div>
          <div class="center">
            <input type="submit" value="Se connecter" @click="login()"/>
          </div>
      </form>
    </section>
  </main>
</template>

<script>
import UtilsAuth from '@/utils/UtilsAuth'

export default {
  name: 'hello',
  data () {
    return {
      password: '',
      username: '',
      notifs: [],
      isLog: false,
      error: ''
    }
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.isLog = false
    } else {
      this.isLog = true
    }
  },
  methods: {
    login () {
      UtilsAuth.getToken(this.username, this.password, this.$router, () => {
        this.$router.replace({ name: 'UserIndex' })
      }, (error) => {
        this.error = error
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1
  {
    font-weight: 800;
    text-shadow: 0px 0px 8px rgba(0,0,0,0.2);
  }
  h1 img
  {
    height: 1em;
    vertical-align: middle;
    margin-left: 5px;
    margin-right: 2px
  }
  form
  {
    margin: auto;
    width: 300px;
    border-radius: 5px;
    padding: 50px;
    padding-top: 50px;
    background-color: rgba(240,240,240,0.8);
    padding-top: 10px;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.2);
    padding-bottom: 15px;
    padding-top: 30px;
  }

  #content h2
  {
    color:black;
    margin-bottom: 10px;
    font-weight: 100;
  }
  #content
  {
    background-image: url("/static/back1.jpg");
    background-size:cover;
  }

  .input
  {
    margin-top: 10px;
    min-width: 300px;
  }

  form input[type="text"],input[type="password"]
  {
    display: block;
    box-shadow: none;
    border:none;
    background-color: transparent;
    border-bottom: 1px solid rgb(150,150,150);
    width: calc(100% - 35px);
    border-radius: 0;
    margin-left: 10px;
    margin-top: 3px;
  }

  .notif-log,.notif-error
  {
    max-width: 500px;
    margin: auto;
    font-size: 1.2em;
    padding: 10px;
    margin-bottom: 20px;
    text-align: center;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.2);

    color:white;
  }

  .notif-log
  {
      background-color: green;
  }

  .notif-error
  {
      background-color: #c53131;
  }


</style>
