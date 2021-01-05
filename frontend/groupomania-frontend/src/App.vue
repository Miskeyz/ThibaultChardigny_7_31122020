<template>
  <div id="app">
    <div class="nav-container">
      <div id="nav">
        <router-link to="/"><img src="./images/logo_blanc.png" alt="" /></router-link>
        <router-link to="/inscription" class="lien__inscription" v-if="isConnected()">Inscription</router-link>
        <a href="#" class="lien_inscription" @click="disconnect()" v-else>Déconnexion</a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['disconnect']),
    isConnected() {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      if(token && userId)
      {
        return false
      }
      else
      {
        return true
      }
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: -8px;
}

.nav-container
{
  background: linear-gradient(180deg, rgba(180,0,0,1) 0%, rgba(251,47,2,1) 100%);
}

#nav {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    font-weight: bold;
    font-size: 1.2em;
    color: #fff;
    text-decoration: none;
    padding-left: 15px;
    padding-right: 15px;
  }

  img
  {
    padding-top: 5px;
  }
}

.lien
{
  &__inscription
  {
    margin-top: 16px;
    border-bottom: 2px solid #fd2e01;
    padding-bottom: 16px;

    &:hover
    {
      border-bottom: 2px solid #fff;
    }
  }
}
</style>
