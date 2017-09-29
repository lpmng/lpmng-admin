<template>
  <main class=""> 
    <sub-menu-vertical></sub-menu-vertical>
    <section id="content">
        <h1>Create a user</h1>
        <form>
            <div class="partie">
                <div class="title">
                    Status
                </div>
                <div class="form">
                    <input type="radio" name="cotisant" value="false" id="cotisant" class="round-radio" v-model="form.cotisant" checked > 
                    <label for="cotisant">
                        <div class="radio">
                            <div class="in"></div>
                        </div>
                        Non cotisant
                    </label>
                    <input type="radio" name="cotisant" value="true" id="nonCotisant" class="round-radio" v-model="form.cotisant"> 
                    <label for="nonCotisant">
                        <div class="radio">
                       
                            <div class="in"></div>
                         </div>
                        Cotisant
                    </label>
                </div>
            </div>
            <div class="partie">
                <div class="title">
                    Informations personelles
                </div>
                <div class="form">
                    <div class="input">
                    <label for="nom">Nom:</label>
                    <input type="text" name="nom" id="nom" v-model="form.nom"/>
                    </div>
                    <div class="input">
                    <label for="prenom">Prénom:</label>
                    <input type="text" name="prenom" id="prenom" v-model="form.prenom"/>
                    </div>
                </div>
            </div>
            <div class="partie">
                <div class="title">
                    Authentification
                </div>
                <div class="form">
                    <div class="input">
                    <label for="pseudo">Pseudo:</label>
                    <input type="text" name="pseudo" id="pseudo" v-model="pseudo"/>
                    </div>
                    <div class="input">
                    <label for="password">Mot de passe:</label>
                    <input type="password" name="password" id="password" v-model="form.password"/>
                    </div>
                </div>
            </div>
            <div class="partie no-line">
                <div class="form">
                    <input type="button" value="Creer" @click="createUser">
                </div>
            </div>
        </form>
    </section>
  </main>
</template>

<script>
import UserMenu from '@/components/user/UserMenu'
export default {
  name: 'UserCreate',
  data () {
    return {
      form: {
        password: '',
        nom: '',
        prenom: '',
        cotisant: 'false',
        pseudo: ''
      }
    }
  },
  methods: {
    createUser () {
      console.log('---- yop ----')
      console.log('pass:' + this.form.password)
      console.log('nom:' + this.form.nom)
      console.log('pren:' + this.form.prenom)
      console.log('co:' + this.form.cotisant)
      console.log('pseudo:' + this.form.pseudo)
    }
  },
  components:
  {
    'sub-menu-vertical': UserMenu
  },
  watch:
  {
    'form.nom': function (val) {

    }
  },
  computed: {
    // a computed getter
    pseudo: {
      get: function () {
        var pseudoTmp = this.form.nom + this.form.prenom
        this.form.pseudo = pseudoTmp
        return pseudoTmp.substring(0, 10)
      },
      set: function (newValue) {
        this.form.pseudo = newValue
      }
    }
  }
}
</script>