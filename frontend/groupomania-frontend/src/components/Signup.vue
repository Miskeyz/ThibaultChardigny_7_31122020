<template>
    <div class="form-block">
      <div class="form-block__top">
      </div>
        <form class="form-block__bottom" @input="unlockButton()" @submit.prevent="fetchSignup()">
            <h2>Inscription</h2>
            <div class="row">
                <label for="nom" class="label">Nom</label>
                <input type="text" id="name" class="input input__nom" placeholder="ex: Dupond" @input="verifNom()"/>
            </div>
            <div class="row">
                <label for="prenom" class="label">Prénom</label>
                <input type="text" id="prenom" class="input input__prenom" placeholder="ex: Jean" @input="verifPrenom()"/>
            </div>
            <div class="row">
                <label for="email" class="label label__email">Email</label>
                <input type="text" id="email" class="input input__mail" name="email" placeholder="ex: jean.dupond@groupomania.fr" @input="verifEmail()"/>
            </div>
            <p class="text">Veuillez renseigner votre adresse email interne à Groupomania uniquement (ex: jean@groupomania.fr)</p>
            <div class="row">
                <label for="password" class="label label__password">Mot de passe</label>
                <input type="password" id="password" class="input input__password" name="password" placeholder="**********" @input="verifMdp()"/>
            </div>
            <p class="text">Veuillez choisir un mot de passe de plus de 8 caractères comprenant au moins une 
            lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial (!-*+@#_/:?$€).</p>
            <p class="error" id="error"></p>
            <div class="row">
                <input type="submit" value="Inscription" id="submit" class="button" disabled/>
            </div>        
      </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data: function() {
      return { 
        regexNom: /^[A-Za-z-\s]*$/,
        regexPrenom: /^[A-Za-z-\s]*$/,
        regexEmail: /^[a-z-]+[.]*[a-z-]+@groupomania.fr$/,
        regexMdp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        messageNom: 'Merci d\'entrer un nom valide !',
        messagePrenom: 'Merci d\'entrer un prénom valide !',
        messageEmail: 'Merci d\'entrer un email valide (voir notice ci-dessus)',
        messageMdp: 'Merci d\'entrer un mot de passe valide (voir notice ci-dessus)'
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
      verifNom() {
          const input = document.getElementById('name');
          const error = document.getElementById('error');
          this.formVerif(this.regexNom, this.messageNom, input, error);
      },
      verifPrenom() {
          const input = document.getElementById('prenom');
          const error = document.getElementById('error');
          this.formVerif(this.regexPrenom, this.messagePrenom, input, error);
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
          if(greenBorder.length === 4) {
              button.removeAttribute('disabled');
          } else {      
              button.setAttribute('disabled', 'true');
          }
      },
      fetchSignup() {
          const nom = document.getElementById('name').value;
          const prenom = document.getElementById('prenom').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const errorContent = document.getElementById('error');
          axios.post('http://localhost:3000/api/auth/signup',
          { nom: nom, prenom: prenom, email: email, password: password })
          .then((response) => {
            console.log(response.status);
            window.location = 'http://localhost:8080';
          })
          .catch((error) => {
            errorContent.textContent = error.response.data;
          });
      }
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

h1
{
  margin-top: 50px;
  margin-bottom: 0;
}

h2
{
  width: 100%;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  font-size: 2.5em;
  border-bottom: $secondary-color 2px solid;
}

.text
{
  font-size: 0.9em;
  margin-top: -10px;
  padding-left: 185px;
  text-align: justify;
  @include mobile-only
  {
      padding-left: 0;
      margin-top: 10px;
  }
  @include tablette-only
  {
      padding-left: 0;
      margin-top: 10px;
      text-align: center;
  }
}

.form-block
{
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 20px;
  box-shadow: 0px 7px 15px 0px #000000;
  width: 900px;

  @include mobile-only
  {
      width: auto;
  }

  @include tablette-only
  {
      width: 90%;
  }

  &__top
  {
    width: 100%;
    height: 200px;
    background: no-repeat url('../images/signup.png');
    border-radius: 20px 20px 0 0;

    @include mobile-only
    {
        background: center url('../images/signup.png');
        background-size: cover;
    }
  }

  &__bottom
  {
      padding-left: 150px;
      padding-right: 150px;

      @include mobile-only
      {
          padding: 15px;
      }

      @include tablette-only
      {
          padding-left: 50px;
          padding-right: 50px;
      }
  }
}

.input
{
  width: 66%;
  height: 30px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-left: 15px;
  font-size: 1.2em;

  @include mobile-only
  {
      width: 100%;
  }

  &:hover, &:focus
  {
    border: $primary-color 2px solid;
  }
}

.green-border
{
    border: 2px solid green;
}

.row
{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.label
{
  font-size: 1.3em;
  margin-right: 10px;
  margin-bottom: 10px;
}

.error
{
  margin-top: 0;
  color: $primary-color;
  font-weight: 600;
}

.button
{
    width: 25%;
    margin: auto;
    height: 40px;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 50px;
    background-color: $primary-color;
    font-size: 1.2em;
    color: $white-color;
    cursor: pointer;

    @include mobile-only
    {
        width: 50%;
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
