<template>
<div>
    <div id="app">
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
    <div>
      <form @submit.prevent="signup">
        <label name='prenom' >Prénom : </label>
        <input type="text" name="prenom" id="prenom" class="prenom" /><br>
        <label name='nom'>Nom : </label>
        <input type="text" name="nom" id="nom" class="nom" /><br>
        <label name='email' >Email : </label>
        <input type="email" name="email" id="email" class="email" /><br>
        <label name='Password'>Password : </label>
        <input type="password" name="password" id="password" class="password" /><br>
        <input type="submit" name="submit" id="submit" value="Envoyer" class="submit" />
      </form>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    signup: function() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const nom = document.getElementById('nom').value;
      const prenom = document.getElementById('prenom').value;
      axios.post(`http://localhost:3000/api/auth/signup`,{ email: email, password: password, nom: nom, prenom: prenom });
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
