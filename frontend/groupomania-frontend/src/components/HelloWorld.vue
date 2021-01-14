<template>
  <div class="hello">
    <h1>Bienvenue sur le réseau social de Groupomania !</h1>
    <p class="text">Si vous possedez déjà votre compte alors connectez vous ci-dessous !</p>
    <Login />
    <p class="text">Sinon veuillez vous inscrire :</p> <router-link to="/inscription" class="button button__inscription">Inscription</router-link>
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

$primary-color: #E9190E;
$white-color: #fff;
$secondary-color: #2c3e50;

$breakpoints: 
(
	mobile: 500px,
	tablette: 900px
);

@mixin mobile-only
{
	@media screen and (max-width: map-get($breakpoints, mobile))
	{
		@content;
	}
}

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
    background-color: $primary-color;
    color: $white-color;
    cursor: pointer;
    text-decoration: none;
    padding: 5px 25px;
    border: 2px black solid;
    font-size: 1.2em;
    font-weight: 500;

    &:hover
    {
      background-color: $white-color;
      color: $primary-color;
      border: 2px solid $primary-color;
    }
}
</style>
