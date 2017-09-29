<template>
    <section id="content">
        <h1>{{this.pseudo}}</h1>
        <div class="description">
          <div class="partie center">
              <h2>Informations</h2>
              <div class="info"><h3>Nom:</h3>{{nom}}</div>
              <div class="info"><h3>Prenom:</h3>{{prenom}}</div>
              <div class="info"><h3>Cotisant:</h3>{{cotisant}}</div>
              <div class="info"><h3>Nombre session:</h3>{{nombreSessions}}</div>
              <input type="button" value="Supprimer"/>
          </div>
          <div class="partie">
              <h2>Modification</h2>
              <label for="nom" class="vertical">Nom:</label>
              <input type="text" name="nom" id="nom"/>
              <input type="button" value="Modifier"/>
              <br/>
              <label for="prenom" class="vertical">Prenom:</label>
              <input type="text" name="prenom" id="prenom"/>
              <input type="button" value="Modifier"/>
              <br/>
              <label for="password" class="vertical">Mot de passe:</label>
              <input type="text" name="password" id="password"/>
              <input type="button" value="Modifier"/>
              <br/>
              <label for="nombre_sesions" class="vertical">Nombre sessions:</label>
              <input type="text" name="nombre_sessions" id="nombre_sessions"/>
              <input type="button" value="Modifier"/>
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
export default {
  name: 'UserDetailUniq',
  props: ['pseudo', 'nom', 'prenom', 'cotisant', 'nombreSessions'],
  data () {
    return {

    }
  },
  components:
  {
    'sub-menu-vertical': UserMenu,
    'search-menu-vertical': UserSearchMenu
  }
}
</script>