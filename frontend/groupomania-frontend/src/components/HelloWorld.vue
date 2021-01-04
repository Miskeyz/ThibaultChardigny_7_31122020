<template>
  <div class="hello">
    <h1>Bienvenue sur le réseau social de Groupomania !</h1>
    <p class="text">Si vous possedez déjà votre compte alors connectez vous ci-dessous !</p>
    <Login />
    <p class="text">Sinon veuillez vous inscrire : <router-link to="/inscription" class="button button__inscription">Inscription</router-link></p>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'HelloWorld',
  components: {
    Login
  }
}
</script>

<style scoped lang="scss">
h1
{
  margin-top: 50px;
  margin-bottom: 0;
}

.text
{
  font-size: 1.2em;
  margin-top: 0;
}

.button
{
    width: 25%;
    height: 40px;
    border-radius: 10px;
    margin-top: 20px;
    background-color: #fd2e01;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    padding: 5px 25px;
    border: 2px black solid;
    font-size: 1em;

    &:hover
    {
      background-color: #fff;
      color: #fd2e01;
      border: 2px solid #fd2e01;
    }
}
</style>
