<template>
    <div class="form-block">
      <div class="form-block__left">
      </div>
      <form class="form-block__right">
        <h2>Connexion</h2>
        <label for="email" class="label label__email">Email : </label><br>
        <input type="text" id="email" class="input input__mail" name="email" placeholder="ex: jean.dupond@groupomania.fr" /><br>
        <p class="error" id="email-error"></p>
        <label for="password" class="label label__password">Mot de passe : </label><br>
        <input type="password" id="password" class="input input__password" name="password" placeholder="**********" /><br>
        <p class="error" id="email-error"></p>
        <input type="submit" value="Connexion" id="submit" class="button" />
      </form>
    </div>
</template>


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
  width: 50%;

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
}

</style>
