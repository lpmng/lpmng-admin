<template>
    <section id="content">
        <div class="notif positif" v-if="msgReussite">
            <img class="icon" src="../../../src/assets/IcoMoon/SVG/273-checkmark.svg"/> 
            <p>{{msgReussite}}</p>
        </div>
        <div class="notif negatif" v-if="msgError"> 
            <img class="icon" src="../../../src/assets/IcoMoon/SVG/272-cross.svg"/> 
            <p>{{msgError}}</p>
        </div>
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
              <input type="button" value="Supprimer" @click="deleteUser"/>
          </div>
          <div class="partie">
              <h2>Modification</h2>
              <label for="nom" class="vertical">Nom:</label>
              <div class="inline">
              <input type="text" name="nom" id="nom" v-model="form.nom"/>
              <input type="button" value="Modifier" @click="changeNom"/>
              </div>
              <br/>
              <label for="prenom" class="vertical">Prenom:</label>
              <div class="inline">
              <input type="text" name="prenom" id="prenom" v-model="form.prenom"/>
              <input type="button" value="Modifier" @click="changePrenom"/>
              </div>
              <br/>
              <label for="password" class="vertical">Mot de passe:</label>
              <div class="inline">
              <input type="text" name="password" id="password" v-model="form.password"/>
              <input type="button" value="Modifier"/>
              </div>
              <br/>
              <label for="nombre_sesions" class="vertical">Nombre sessions:</label>
              <div class="inline">
              <input type="text" name="nombre_sessions" id="nombre_sessions" v-model="form.nombreSessions"/>
              <input type="button" value="Modifier" @click="changeNombreSessions"/>
              </div>
              <br/>
              <label for="mail" class="vertical">Mail:</label>
              <div class="inline">
              <input type="mail" name="mail" id="mail" v-model="form.email"/>
              <input type="button" value="Modifier" @click="changeMail"/>
              </div>
              <br/>
              <label for="tel" class="vertical">Téléphone:</label>
              <div class="inline">
              <input type="tel" name="tel" id="tel" v-model="form.tel"/>
              <input type="button" value="Modifier" @click="changeTel"/>
              </div>
              <br/>
              
              <label style="position: relative;top: 12px;" class="vertical">Cotisant: </label>
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
        cotisant: false,
        nombreSessions: this.nombreSessions,
        mail: this.email,
        tel: this.tel
      },
      msgReussite: '',
      msgError: ''
    }
  },
  methods: {
    deleteUser () {
      axios.delete(window.core_url + 'users/' + this.pseudo + '/')
      .then((response) => {
        this.msgReussite = this.pseudo + ' supprimmé'
        this.msgError = ''
      })
      .catch((error) => {
        console.log(error)
        this.msgReussite = ''
        this.msgError = this.pseudo + 'non supprimé'
      })
    },
    changeNom () {
      this.patchvalue({
        surname: this.form.nom
      }, this.form.nom, 'nom', this.nom, window.core_url + 'users/' + this.pseudo + '/')
    },
    changePrenom () {
      this.patchvalue({
        commonname: this.form.prenom
      }, this.form.prenom, 'nom', this.prenom, window.core_url + 'users/' + this.pseudo + '/')
    },
    changeNombreSessions () {
      /* this.patchvalue({
        surname: this.form.nombreSessions
      }, this.form.nombreSessions, 'nom', this.nombreSessions, 'http://127.0.0.1:8000/users/' + this.pseudo + '/') */
    },
    changeMail () {
      this.patchvalue({
        mail: this.form.email
      }, this.form.email, 'nom', this.email, window.core_url + 'users/' + this.pseudo + '/')
    },
    changeTel () {
      this.patchvalue({
        tel: this.form.tel
      }, this.form.tel, 'téléphone', this.tel, window.core_url + 'users/' + this.pseudo + '/')
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
      this.form.email = val
    },
    'tel': function (val) {
      this.form.tel = val
    }
  },
  components:
  {
    'sub-menu-vertical': UserMenu
  }
}
</script>