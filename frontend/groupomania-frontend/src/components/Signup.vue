<template>
    <div class="form-block">
      <div class="form-block__top">
      </div>
        <form class="form-block__bottom">
            <h2>Inscription</h2>
            <div class="row">
                <label for="nom" class="label">Nom</label>
                <input type="text" id="name" class="input input__nom" placeholder="ex: Dupond" @input.prevent="verif()"/>
            </div>
            <div class="row">
                <label for="prenom" class="label">Prénom</label>
                <input type="text" id="prenom" class="input input__prenom" placeholder="ex: Jean"/>
            </div>
            <div class="row">
                <label for="email" class="label label__email">Email</label>
                <input type="text" id="email" class="input input__mail" name="email" placeholder="ex: jean.dupond@groupomania.fr" />
            </div>
            <p class="text">Veuillez renseigner votre adresse email interne à Groupomania uniquement.</p>
            <div class="row">
                <label for="password" class="label label__password">Mot de passe</label>
                <input type="password" id="password" class="input input__password" name="password" placeholder="**********" />
            </div>
            <p class="text">Veuillez choisir un mot de passe entre 8 et 12 caractères comprenant au moins une 
            lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial (!-*+@#_/:?$€).</p>
            <p class="error" id="error"></p>
            <div class="row">
                <input type="submit" value="Inscription" id="submit" class="button" />
            </div>
        
      </form>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
      verif() {
          const regexNom = /^[A-Za-z-]*$/;
          const messageNom = 'Merci d\'entrer un nom et un prénom valide !';
          const inputNom = document.getElementById('name');
          const error = document.getElementById('error');
          if(regexNom.test(inputNom.value))
          {
              error.textContent = '';
              inputNom.classList.add('green-border');
          }
          else
          {
              inputNom.classList.remove('green-border');
              error.textContent = messageNom;
          }
      }
  }
}
</script>

<style scoped lang="scss">
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
  border-bottom: #2C3E4F 2px solid;
}

.text
{
  font-size: 0.9em;
  margin-top: -10px;
  padding-left: 185px;
  text-align: justify;
}

.form-block
{
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 20px;
  box-shadow: 0px 7px 15px 0px #000000;
  width: 900px;

  &__top
  {
    width: 100%;
    height: 200px;
    background: no-repeat url('../images/signup.png');
    border-radius: 20px 20px 0 0;
  }

  &__bottom
  {
      padding-left: 150px;
      padding-right: 150px;
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

  &:hover, &:focus
  {
    border: #fd2e01 2px solid;
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
  color: #fd2e01;
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
}

</style>
