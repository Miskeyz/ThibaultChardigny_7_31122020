<template>
    <div class="content">
        <div class="header">
            <h1>Bonjour {{ this.userPrenom }} !</h1>
        </div>
        <div class='body body-block'>
            <div class="articles">
                <form @input="unlockButton" @submit.prevent="fetchCreateArticle" class="form-article">
                    <textarea placeholder="Que voulez vous partager à vos collègues ?" id="textarea" @input="verifTextarea" required></textarea><br>
                    <input type="submit" id="publier" class="button" value="Publier" disabled />
                </form>
                <div v-for="item in articleList" v-bind:key="item.id">
                    <div class="last-articles">
                        <div class="last-articles__row">
                            <div>
                                <h2 class="last-articles__heading">{{ item.prenom }} {{ item.nom }}</h2>
                            </div>
                            <div>
                                <button class="last-articles__button" :id="item.id" v-show="isConnected(item.userId)" @click="modify(item.id)">Modifier</button>
                                <button class="last-articles__button" id="delete" v-show="isConnected(item.userId)" @click="fetchDeleteArticle(item.id)">Supprimer</button>
                            </div>
                        </div>
                        <p class="last-articles__content">
                            {{ item.content }}
                        </p>
                    </div>
                </div>
            </div>
                <div class="popup-modify" v-show="isClicked">
                    <div class="popup-modify__form">
                        <form @input="unlockButton" @submit.prevent="fetchModifyArticle(article[0].id)" class="form-article">
                            <textarea id="modify-textarea" required v-model="article[0].content"></textarea><br>
                            <input type="submit" id="publier" class="button" value="Sauver" @click="confirm()" />
                            <button class="popup-modify__closeme" @click.prevent="confirm()">X</button>
                        </form>   
                    </div>
                </div>
                <div class="opacity-block" v-show="isClicked">
            </div>
        </div>
        <button class="delete-button" @click.prevent="fetchDeleteUser()">Supprimer mon compte</button>
    </div>
</template>

<script>
import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import { mapActions } from 'vuex';

export default {
  name: 'Articles',
  data: function() {
      return {
        articleList: [],
        article: [
            {
                content: '',
                userId: 0,
            }
        ],
        userNom: '',
        userPrenom: '',
        userIsAdmin: 0,
        isClicked: false,
        token: sessionStorage.getItem('token'),
        userId: '',
        textInput: document.getElementById('textarea'),
      }
  },
  created () {
    this.fetchGetAllArticles();
    this.fetchGetUserInfos();
  },
  methods: {
      ...mapActions(['formVerif']),
      verifTextarea() {
          const regex = /^[A-Za-z0-9-,.;:!@#€$ùèçéëêîïà&“'’_/§?\s()]+$/;
          const input = document.getElementById('textarea');
          if(regex.test(input.value)) {
              input.classList.add('green-border-articles');
          } else {
              input.classList.remove('green-border-articles');
          }
      },
      unlockButton() {
          const greenBorder = document.getElementsByClassName('green-border-articles');
          const button = document.getElementById('publier');
          if(greenBorder.length === 1) {
              button.removeAttribute('disabled');
          } else {      
              button.setAttribute('disabled', 'true');
          }
      },
      fetchCreateArticle() {
          const content = document.getElementById('textarea').value;
          axios.post('http://localhost:3000/api/article', 
          { content: content, userId: this.userId }, {headers: { 'Authorization': this.token }});
          window.location.reload();
      },
      fetchModifyArticle(id) {
          const content = document.getElementById('modify-textarea').value;
          const userId = this.article[0].userId;
          console.log(userId);
          axios.put('http://localhost:3000/api/article/' + id, 
          { content: content, authorId: this.article[0].userId, userId: this.userId, id: id }, {headers: { 'Authorization': this.token }});
          window.location.reload();
      },
      fetchDeleteArticle(id) {
          axios.delete('http://localhost:3000/api/article/' + id, 
          { data: { id: id }, headers: {'Authorization': this.token}});
          window.location.reload();
      },
      fetchGetAllArticles() {
          axios.get('http://localhost:3000/api/article', { headers: { 'Authorization': this.token }})
          .then((response) => {
              const results = JSON.parse(response.data);
              this.articleList = results;
          });
      },
      fetchGetUserInfos() {
            const token = sessionStorage.getItem('token');
            const decodedToken = jsonwebtoken.verify(token, "RANDOM_TOKEN_SECRET");
            this.userId = decodedToken.userId;
            axios.get('http://localhost:3000/api/auth/' + this.userId, { headers: { 'Authorization': this.token }})
          .then((response) => {
              const results = JSON.parse(response.data);
              this.userNom = results[0].nom;
              this.userPrenom = results[0].prenom;
              this.userIsAdmin = results[0].admin;
          });
      },
      fetchDeleteUser() {
          axios.delete('http://localhost:3000/api/auth/' + this.userId, 
          { headers: {'Authorization': this.token}});
          sessionStorage.removeItem('token');
          window.location.reload();
      },
      modify(id)
      {
        axios.get('http://localhost:3000/api/article/' + id, { headers: { 'Authorization': this.token }})
        .then((response) => {
            const results = JSON.parse(response.data);
            this.article = results;
        });
        return this.isClicked = true;
        
      },
      confirm()
      {
          this.isClicked = false;
      },
      isConnected(id)
      {
        const token = sessionStorage.getItem('token');
        const decodedToken = jsonwebtoken.verify(token, "RANDOM_TOKEN_SECRET");
        this.userId = decodedToken.userId;
          if((this.userId == id) || this.userIsAdmin === 1) {
              return true;
          } else {
              return false;
          }
      },
  }
}
</script>

<style scoped lang='scss'>

$breakpoints: 
(
	mobile: 500px,
	tablette: 900px
);

$primary-color: #E9190E;
$white-color: #fff;
$secondary-color: #2c3e50;

@mixin mobile-only {
	@media screen and (max-width: map-get($breakpoints, mobile)) {
		@content;
	}
}
@mixin tablette-only {
	@media screen and (max-width: map-get($breakpoints, tablette)) {
		@content;
	}
}

h1
{
    color: $white-color;
    padding-top: 210px;
    font-size: 2.5em;
    margin-bottom: 0;

    @include mobile-only
    {
        font-size: 2em;
        padding-top: 230px;
    }
}

.delete-button
{
    margin-top: 50px;
    margin-bottom: 50px;
    color: $primary-color;
    background-color: $white-color;
    border-radius: 10px;
    cursor: pointer;
    padding: 3px 5px;
    &:hover, &:focus
    {
        background-color: $primary-color;
        color: $white-color;
    }
}

textarea
{
    width: 80%;
    margin-top: 20px;
    height: 100px;
    border-radius: 20px;
    border: 2px solid $secondary-color;
    padding: 15px;
    color: $secondary-color;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 1em;

    &:hover, &:focus
    {
        border: $primary-color 2px solid;
    }
}

.form-article
{
    width: 100%;
    height: 200px;
    margin-bottom: 50px;
}

.last-articles
{
    width: 80%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: $white-color;
    text-align: left;
    padding: 5px 20px;

    &__heading
    {
        font-size: 1em;
        margin-bottom: 0;
        @include mobile-only
        {
            text-align: left;
        }
    }

    &__content
    {
        font-size: 0.9em;
    }

    &__like
    {
        border-radius: 30px;
        padding: 5px 15px;
        border-color: $primary-color;
        color: $primary-color;
        background-color: $white-color;
        font-weight: 600;
        &--liked
        {
            background-color: $primary-color;
            color: $white-color;
        }
    }

    &__row
    {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include mobile-only
        {
            flex-direction: column;
        }
    }

    &__button
    {
        margin-right: 10px;
        border-radius: 30px;
        padding: 5px 15px;
        border-color: $primary-color;
        color: $primary-color;
        background-color: $white-color;
        font-weight: 600;
        text-align: center;
        cursor: pointer;

        @include mobile-only
        {
            margin-top: 10px;
        }
        &:hover, &:focus
        {
            background-color: $primary-color;
            color: $white-color;
        }
    }
}

.content
{
    background-color: #eeeeee;
    border-radius: 50px 50px 0 0;
    width: 1200px;
    margin: auto;

    @include mobile-only
    {
        width: auto;
    }

    @include tablette-only
    {
        width: auto;
    }
}

.body
{
    display: flex;
}

.profil
{
    flex: 1;
}

.articles
{
    flex: 2;
}

.header
{
    height: 300px;
    margin-top: 50px;
    border-radius: 50px 50px 0 0;
    background: url('../images/header.jpg') no-repeat;
    box-shadow: 0px 0px 10px 0px #000000;

    @include mobile-only
    {
        background: url('../images/header.jpg') no-repeat center;
        background-size: cover;
    }
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

.green-border-articles
{
    border: 2px solid green;
}

.opacity-block
{
    width: 200%;
    height: 200%;
    margin-left: -200px;
    margin-top: -350px;
    position: absolute;
    background: $white-color;
    opacity: 70%;

    @include mobile-only
    {
        width: 200%;
        top: 450px;
        left: 0;
    }
}

#modify-textarea
{
    width: 90%;
    height: 350px;
    @include mobile-only
    {
        margin-top: 5px;
        height: 320px;
        width: 85%;
    }
}

.popup-modify
{
    position: fixed;
    width: 100%;
    height: 100%;
    transform: translate(-18%, -40%);
    z-index: 10;

    @include mobile-only
    {
        width: 100%;
        height: 365px;
        transform: translate(-16%, -100%);
    }

    @include tablette-only
    {
        width: 100%;
        height: 365px;
        transform: translate(-21.5%, -140%);
    }



    &__form
    {
        border-radius: 35px;
        width: 50%;
        height: 50%;
        margin: auto;
        margin-top: 50vh;
        background-color: $white-color;
        transform: translateY(-50%);

        @include mobile-only
        {
            width: 55%;
            height: 100%;
            border-radius: 25px;
        }
    }

    &__closeme
    {
        border-radius: 50%;
        padding: 2px 7px;
        font-size: 1.4em;
        font-weight: 600;
        color: $white-color;
        border-color: $primary-color;
        background-color: $primary-color;
        position: absolute;
        top: -10px;
        right: -10px;
        cursor: pointer;

        @include mobile-only
        {
            top: -10px;
            right: -10px;
        }
        &:hover, &:focus
        {
            background-color: $white-color;
            color: $primary-color;
        }
    }
}

</style>