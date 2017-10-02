<template>
    <section id="content">
        <div class="infos positif" v-if="msgReussite">{{msgReussite}}</div>
        <div class="infos negatif" v-if="msgError">{{msgError}}</div>
        <h1>{{this.pseudo}}</h1>
        <div class="description">
          <div class="partie center">
              <h2>Informations</h2>
              <div class="info"><h3>Nom:</h3>{{nom}}</div>
              <div class="info"><h3>Prenom:</h3>{{prenom}}</div>
              <div class="info"><h3>Cotisant:</h3>{{cotisant}}</div>
              <div class="info"><h3>Nombre session:</h3>{{nombreSessions}}</div>
              <div class="info"><h3>Mail:</h3>{{mail}}</div>
              <div class="info"><h3>Téléphone:</h3>{{tel}}</div>
              <input type="button" value="Supprimer"/>
          </div>
          <div class="partie">
              <h2>Modification</h2>
              <label for="nom" class="vertical">Nom:</label>
              <input type="text" name="nom" id="nom" v-model="form.nom"/>
              <input type="button" value="Modifier" @click="changeNom"/>
              <br/>
              <label for="prenom" class="vertical">Prenom:</label>
              <input type="text" name="prenom" id="prenom" v-model="form.prenom"/>
              <input type="button" value="Modifier" @click="changePrenom"/>
              <br/>
              <label for="password" class="vertical">Mot de passe:</label>
              <input type="text" name="password" id="password" v-model="form.password"/>
              <input type="button" value="Modifier"/>
              <br/>
              <label for="nombre_sesions" class="vertical">Nombre sessions:</label>
              <input type="text" name="nombre_sessions" id="nombre_sessions" v-model="form.nombreSessions"/>
              <input type="button" value="Modifier" @click="changeNombreSessions"/>
              <br/>
              <label for="mail" class="vertical">Mail:</label>
              <input type="mail" name="mail" id="mail" v-model="form.mail"/>
              <input type="button" value="Modifier" @click="changeMail"/>
              <br/>
              <label for="tel" class="vertical">Téléphone:</label>
              <input type="tel" name="tel" id="tel" v-model="form.tel"/>
              <input type="button" value="Modifier" @click="changeTel"/>
              <br/>
              
              <input type="radio" name="cotisant" value="false" id="cotisant" class="round-radio" checked> 
              <label for="cotisant">
                  <div class="radio">
                      <div class="in"></div>
                  </div>
                  Non cotisant
              </label>
              <input type="radio" name="cotisant" value="true" id="nonCotisant" class="round-radio"> 
              <label for="nonCotisant">
                  <div class="radio">
                  
                      <div class="in"></div>
                    </div>
                  Cotisant
              </label>
              <input type="button" value="Modifier"/>
              <br/>
          </div>
          <div class="partie">
              <h2>Liste des sessions</h2>
          </div>
        </div>
    </section>
</template>

<script>
import UserMenu from '@/components/user/UserMenu'
import UserSearchMenu from '@/components/user/UserSearchMenu'
import axios from 'axios'
export default {
  name: 'UserDetailUniq',
  props: ['pseudo', 'nom', 'prenom', 'cotisant', 'nombreSessions', 'mail', 'tel'],
  data () {
    return {
      form: {
        password: '',
        nom: this.nom,
        prenom: this.prenom,
        cotisant: this.cotisant,
        nombreSessions: this.nombreSessions,
        mail: this.mail,
        tel: this.tel
      },
      msgReussite: '',
      msgError: ''
    }
  },
  methods: {
    changeNom () {
      this.patchvalue({
        surname: this.form.nom
      }, this.form.nom, 'nom', this.nom, 'http://127.0.0.1:8000/users/' + this.pseudo + '/')
    },
    changePrenom () {
      this.patchvalue({
        commonname: this.form.prenom
      }, this.form.prenom, 'nom', this.prenom, 'http://127.0.0.1:8000/users/' + this.pseudo + '/')
    },
    changeNombreSessions () {
      /* this.patchvalue({
        surname: this.form.nombreSessions
      }, this.form.nombreSessions, 'nom', this.nombreSessions, 'http://127.0.0.1:8000/users/' + this.pseudo + '/') */
    },
    changeMail () {
      this.patchvalue({
        mail: this.form.mail
      }, this.form.mail, 'nom', this.mail, 'http://127.0.0.1:8000/users/' + this.pseudo + '/')
    },
    changeTel () {
      this.patchvalue({
        tel: this.form.tel
      }, this.form.tel, 'téléphone', this.tel, 'http://127.0.0.1:8000/users/' + this.pseudo + '/')
    },
    patchvalue (requestArgs, newValue, localFieldName, valueToUpdate, url) {
      axios.patch(url, requestArgs)
      .then((response) => {
        valueToUpdate = newValue
        this.msgReussite = localFieldName + ' mis à jour'
        this.msgError = ''
      })
      .catch((error) => {
        console.log(error)
        this.msgReussite = ''
        this.msgError = localFieldName + ': error'
      })
    }
  },
  watch:
  {
    'nom': function (val) {
      this.form.nom = val
    },
    'prenom': function (val) {
      this.form.prenom = val
    },
    'cotisant': function (val) {
      this.form.cotisant = val
    },
    'nombreSessions': function (val) {
      this.form.nombreSessions = val
    },
    'mail': function (val) {
      this.form.mail = val
    },
    'tel': function (val) {
      this.form.tel = val
    }
  },
  components:
  {
    'sub-menu-vertical': UserMenu,
    'search-menu-vertical': UserSearchMenu
  }
}
</script>