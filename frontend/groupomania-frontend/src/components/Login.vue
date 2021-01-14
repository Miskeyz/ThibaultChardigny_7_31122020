<template>
    <div class="form-block">
      <div class="form-block__left">
      </div>
      <form class="form-block__right" @input="unlockButton()" @submit.prevent="fetchLogin()">
        <h2>Connexion</h2>
        <label for="email" class="label label__email">Email : </label><br>
        <input type="text" id="email" class="input input__mail" name="email" placeholder="ex: jean.dupond@groupomania.fr" @input="verifEmail()"/><br>
        <label for="password" class="label label__password">Mot de passe : </label><br>
        <input type="password" id="password" class="input input__password" name="password" placeholder="**********" @input="verifMdp()"/><br>
        <p class="error" id="error"></p>
        <input type="submit" value="Connexion" id="submit" class="button" disabled/>
      </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data: function() {
      return {
        regexEmail: /^[a-z-]+[.]*[a-z-]+@groupomania.fr$/,
        regexMdp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        messageEmail: 'Merci d\'entrer un email valide',
        messageMdp: 'Merci d\'entrer un mot de passe valide'
      }
  },
  methods: {
      formVerif(regex, message, input, error) {
        if(regex.test(input.value)) {
              error.textContent = '';
              input.classList.add('green-border');
          } else {
              input.classList.remove('green-border');
              error.textContent = message;
          }      
    },
      verifEmail() {
          const input = document.getElementById('email');
          const error = document.getElementById('error');
          this.formVerif(this.regexEmail, this.messageEmail, input, error);
      },
      verifMdp() {
          const input = document.getElementById('password');
          const error = document.getElementById('error');
          this.formVerif(this.regexMdp, this.messageMdp, input, error);
      },
      unlockButton() {
          const greenBorder = document.getElementsByClassName('green-border');
          const button = document.getElementById('submit');
          if(greenBorder.length === 2) {
              button.removeAttribute('disabled');
          } else {      
              button.setAttribute('disabled', 'true');
          }
      },
      fetchLogin() {
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const errorMessage = document.getElementById('error');
          axios.post('http://localhost:3000/api/auth/login', 
          { email: email, password: password })
          .then ((response) => {
              sessionStorage.setItem('token', response.data.token);
              window.location.reload();
          })
          .catch((error) => {
            errorMessage.textContent = error.response.data;
          })
      },
  }
}
</script>


<style scoped lang="scss">

$breakpoints: 
(
	mobile: 500px,
	tablette: 900px
);

$primary-color: #E9190E;
$white-color: #fff;
$secondary-color: #2c3e50;

@mixin mobile-only
{
	@media screen and (max-width: map-get($breakpoints, mobile))
	{
		@content;
	}
}
@mixin tablette-only
{
	@media screen and (max-width: map-get($breakpoints, tablette))
	{
		@content;
	}
}

h2
{
  width: 73%;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  font-size: 2.5em;
  border-bottom: $secondary-color 2px solid;
}

.form-block
{
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  border-radius: 20px;
  box-shadow: 0px 7px 15px 0px #000000;
  width: 900px;

  @include mobile-only
  {
      width: auto;
      flex-direction: column;
  }
  @include tablette-only
  {
      width: 90%;
  }

  &__left
  {
    width: 33%;
    height: 500px;
    background: no-repeat url('../images/form.png');
    border-radius: 20px 0 0 20px;

    @include mobile-only
  {
      background: no-repeat center url('../images/header.jpg');
      width: 100%;
      border-radius: 20px 20px 0 0;
      background-size: cover;
      height: 100px;
  }
  }

  &__right
  {
    width: 67%;

    @include mobile-only
    {
        width: 100%;
        padding-bottom: 40px;
    }
  }
}

.input
{
  width: 70%;
  height: 30px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 15px;
  font-size: 1.2em;

    @include mobile-only
    {
        width: 80%;
    }

  &:hover, &:focus
  {
    border: $primary-color 2px solid;
  }
}

.label
{
  font-size: 1.3em;
}

.error
{
  margin-top: 0;
  color: $primary-color;
  font-weight: 600;
}

.green-border
{
    border: 2px solid green;
}

.button
{
    width: 25%;
    height: 40px;
    border-radius: 10px;
    margin-top: 20px;
    background-color: $primary-color;
    font-size: 1.2em;
    color: #fff;
    cursor: pointer;

    @include mobile-only
    {
        width: 35%;
    }

    &:hover
    {
      background-color: $white-color;
      color: $primary-color;
      border: 2px solid $primary-color;
    }

    &:disabled
    {
        background-color: lighten($color: $primary-color, $amount: 20%);
        &:hover, &:focus
        {
            background-color: lighten($color: $primary-color, $amount: 20%);
            color: $white-color;
            border: 2px solid lighten($color: $primary-color, $amount: 20%);
            cursor: not-allowed;
        }
    }
}

</style>
