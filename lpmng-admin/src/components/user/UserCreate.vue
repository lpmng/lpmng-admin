<template>
  <main class="">
    <sub-menu-vertical></sub-menu-vertical>
    <section id="content">
        <h1>Ajouter un utilisateur</h1>
        <div class="infos positif" v-if="msgReussite">{{msgReussite}}</div>
        <div class="infos negatif" v-if="msgError">{{msgError}}</div>
        <form v-on:submit="createUser">
            <div class="partie">
                <div class="input">
                <label for="nom">Nom:</label>
                <input type="text" name="nom" id="nom" v-model="form.surname"/>
                </div>
                <div class="input">
                <label for="prenom">Prénom:</label>
                <input type="text" name="prenom" id="prenom" v-model="form.commonname"/>
                </div>
            </div>
            <div class="partie">
                    <div class="input">
                    <label for="pseudo">Pseudo:</label>
                    <input type="text" name="pseudo" id="pseudo" v-model="form.uid"/>
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
                    <input type="tel" name="telephone" id="telephone" v-model="form.tel"/>
                    </div>
            </div>
            <div class="partie">
                <label style="position: relative;top: 12px;">Cotisant: </label>
                <input type="checkbox" name="cotisant" value="false" id="cotisant" class="round-radio" v-model="form.cotisant">

                <label title="If check the product will go in debt" for="cotisant">

                    <div class="slider button-big">
                        <div class="puce"></div>
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
                    <input class="button" type="submit" value="Créer"/>
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
        surname: '',
        commonname: '',
        cotisant: false,
        uid: '',
        mail: '',
        tel: ''
      },
      msgReussite: '',
      msgError: ''
    }
  },
  methods: {
    createUser (e) {
      e.preventDefault()
      scroll(0, 0)
      // verify informations
      if (
      this.form.password.length > 2 &&
      this.form.surname.length > 2 &&
      this.form.commonname.length > 2 &&
      this.form.uid.length > 2 &&
      this.form.mail.length > 2) {
        // do request
        axios.post(window.core_url + 'users/', this.prepareRequest(this.form))
        .then((response) => {
          this.msgReussite = 'réussi'
          this.msgError = ''
          this.form.commonname = ''
          this.form.surname = ''
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
    },
    generatePseudo () {
      let pseudoTmp = this.form.surname + this.form.commonname
      this.form.uid = pseudoTmp
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z]/gi, '') // Remove non alphabet character
        .substring(0, 10)
        .toLowerCase()

      if (this.form.uid.length > 0) {
        this.form.mail = this.form.uid + '@eisti.eu'
      } else {
        this.form.mail = ''
      }
    },
    prepareRequest (obj) {
      let finalObj = {}
      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          finalObj[key] = this.prepareRequest(obj[key])
        } else if (typeof obj[key] !== 'string' || obj[key].length > 0) {
          finalObj[key] = obj[key]
        }
      }
      return finalObj
    }
  },
  components:
  {
    'sub-menu-vertical': UserMenu
  },
  watch:
  {
    'form.commonname': function () {
      this.generatePseudo()
    },
    'form.surname': function () {
      this.generatePseudo()
    }
  }
}
</script>
