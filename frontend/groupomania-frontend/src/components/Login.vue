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
  methods: {
      formVerif(regex, message, input, error) {
          if(regex.test(input.value))
          {
              error.textContent = '';
              input.classList.add('green-border');
          }
          else
          {
              input.classList.remove('green-border');
              error.textContent = message;
          }
      },
      verifEmail() {
          const regex = /^[a-z-]+[.]{1}[a-z-]+@groupomania.fr$/;
          const message = 'Merci d\'entrer un email valide';
          const input = document.getElementById('email');
          const error = document.getElementById('error');
          if(regex.test(input.value))
          {
              error.textContent = '';
              input.classList.add('green-border');
          }
          else
          {
              input.classList.remove('green-border');
              error.textContent = message;
          }
      },
      verifMdp() {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          const message = 'Merci d\'entrer un mot de passe valide';
          const input = document.getElementById('password');
          const error = document.getElementById('error');
          if(regex.test(input.value))
          {
              error.textContent = '';
              input.classList.add('green-border');
          }
          else
          {
              input.classList.remove('green-border');
              error.textContent = message;
          }
      },
      unlockButton() {
          const greenBorder = document.getElementsByClassName('green-border');
          const button = document.getElementById('submit');
          if(greenBorder.length === 2)
          {
              button.removeAttribute('disabled');
          }
          else
          {      
              button.setAttribute('disabled', 'true');
          }
      },
      fetchLogin() {
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          axios.post('http://localhost:3000/api/auth/login', 
          { email: email, password: password })
          .then ((response) => {
              sessionStorage.setItem('token', response.data.token);
              sessionStorage.setItem('userId', response.data.userId);
              window.location.reload();
          });
      },
  }
}
</script>


<style scoped lang="scss">

h2
{
  width: 73%;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  font-size: 2.5em;
  border-bottom: #2C3E4F 2px solid;
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

  &__left
  {
    width: 33%;
    height: 500px;
    background: no-repeat url('../images/form.png');
    border-radius: 20px 0 0 20px;
  }

  &__right
  {
    width: 67%;
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

  &:hover, &:focus
  {
    border: #fd2e01 2px solid;
  }
}

.label
{
  font-size: 1.3em;
}

.error
{
  margin-top: 0;
  color: #fd2e01;
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
    background-color: #fd2e01;
    font-size: 1.2em;
    color: #fff;
    cursor: pointer;

    &:hover
    {
      background-color: #fff;
      color: #fd2e01;
      border: 2px solid #fd2e01;
    }

    &:disabled
    {
        background-color: lighten($color: #fd2e01, $amount: 20%);
        &:hover, &:focus
        {
            background-color: lighten($color: #fd2e01, $amount: 20%);
            color: #fff;
            border: 2px solid lighten($color: #fd2e01, $amount: 20%);
            cursor: not-allowed;
        }
    }
}

</style>
