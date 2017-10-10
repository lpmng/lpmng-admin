<template>
  <main class=""> 
    <sub-menu-vertical></sub-menu-vertical>
    <section id="content">
        <h1>Ajouter un utilisateur</h1>
        <div class="infos positif" v-if="msgReussite">{{msgReussite}}</div>
        <div class="infos negatif" v-if="msgError">{{msgError}}</div>
        <form>

            <div class="partie">
                <div class="input">
                <label for="nom">Nom:</label>
                <input type="text" name="nom" id="nom" v-model="form.nom"/>
                </div>
                <div class="input">
                <label for="prenom">Prénom:</label>
                <input type="text" name="prenom" id="prenom" v-model="form.prenom"/>
                </div>                
            </div>
            <div class="partie">
                    <div class="input">
                    <label for="pseudo">Pseudo:</label>
                    <input type="text" name="pseudo" id="pseudo" v-model="form.pseudo"/>
                    </div>
                    <div class="input">
                    <label for="password">Mot de passe:</label>
                    <input type="password" name="password" id="password" v-model="form.password"/>
                    </div>
            </div>
            <div class="partie">
                    <div class="input">
                    <label for="mail">Mail:</label>
                    <input type="mail" name="pseudo" id="mail" v-model="form.mail"/>
                    </div>
                    <div class="input">
                    <label for="telephone">Téléphone:</label>
                    <input type="tel" name="telephone" id="telephone" v-model="form.telephone"/>
                    </div>
            </div>
            <div class="partie">               
                <label style="position: relative;top: 12px;">Cotisant: </label>
                <input type="checkbox" name="cotisant" value="false" id="cotisant" class="round-radio" v-model="form.cotisant"> 
                
                <label title="If check the product will go in debt" for="cotisant">    
                  
                    <div class="slider button-big">
                        <div class="puce">
                            
                        </div>    
                    </div>
                    <span class="textActiv text">
                        Oui
                    </span>
                    <span class="textUnactiv text">
                        Non
                    </span>
                </label>
                 
            </div>
            <div class="partie no-line">
                <div class="center">
                    <a class="button" @click="createUser">Creer</a>
                </div>
            </div>
        </form>
    </section>
  </main>
</template>

<script>
import UserMenu from '@/components/user/UserMenu'
import axios from 'axios'
export default {
  name: 'UserCreate',
  data () {
    return {
      form: {
        password: '',
        nom: '',
        prenom: '',
        cotisant: false,
        pseudo: '',
        mail: '',
        telephone: 'none'
      },
      msgReussite: '',
      msgError: ''
    }
  },
  methods: {
    createUser () {
      scroll(0, 0)
      console.log('---- yop ----')
      console.log('pass:' + this.form.password)
      console.log('nom:' + this.form.nom)
      console.log('pren:' + this.form.prenom)
      console.log('co:' + this.form.cotisant)
      console.log('pseudo:' + this.form.pseudo)
      console.log('mail:' + this.form.mail)
      // verify informations
      if (
      this.form.password.length > 2 &&
      this.form.nom.length > 2 &&
      this.form.prenom.length > 2 &&
      this.form.pseudo.length > 2 &&
      this.form.mail.length > 2) {
        // do request
        axios.post(window.core_url + 'users/', {
          uid: this.form.pseudo.toLowerCase(),
          commonname: this.form.prenom,
          surname: this.form.nom,
          mail: this.form.mail,
          password: this.form.password,
          tel: this.form.telephone
        })
        .then((response) => {
          this.msgReussite = 'réussi'
          this.msgError = ''
          this.form.prenom = ''
          this.form.nom = ''
          this.form.password = ''
        })
        .catch((error) => {
          console.log(error)
          this.msgReussite = ''
          this.msgError = 'Une erreur est survenu'
        })
      } else {
        this.msgReussite = ''
        this.msgError = 'Les champs sont incomplets'
      }
    }
  },
  components:
  {
    'sub-menu-vertical': UserMenu
  },
  watch:
  {
    'form.nom': function (val) {
      var pseudoTmp = val + this.form.prenom
      this.form.pseudo = pseudoTmp.substring(0, 10).toLowerCase()
      this.form.mail = pseudoTmp.substring(0, 10).toLowerCase() + '@eisti.eu'
    },
    'form.prenom': function (val) {
      var pseudoTmp = this.form.nom + val
      this.form.pseudo = pseudoTmp.substring(0, 10).toLowerCase()
      this.form.mail = pseudoTmp.substring(0, 10).toLowerCase() + '@eisti.eu'
    }
  },
  computed: {
    /* pseudo: {
      set: function (newValue) {
        this.pseudo = newValue.toLowerCase()
        this.form.pseudo = newValue.toLowerCase()
        this.form.mail = newValue + '@eisti.eu'
      }
    } */
  }
}
</script>