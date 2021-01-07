<template>
    <div class="content">
        <div class="header">
            <h1>Bonjour Thibault !</h1>
        </div>
        <div class='body body-block'>
            <div class="profil">
                <h2>Profil</h2>
                <p>Thibault Chardigny</p>
                <p>Né le 04/09/1991</p>
            </div>
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
                        <button @click="liked(item.id)" class="last-articles__like" id="like">J'aime</button>
                    </div>
                </div>
            </div>
                <div class="popup-modify" v-show="isClicked">
                    <div class="popup-modify__form">
                        <form @input="unlockButton" @submit.prevent="fetchModifyArticle(article[0].id)" class="form-article">
                            <textarea id="modify-textarea" required v-model="article[0].content"></textarea><br>
                            <input type="submit" id="publier" class="button" value="Publier" @click="confirm()" />
                            <button class="popup-modify__closeme" @click.prevent="confirm()">X</button>
                        </form>   
                    </div>
                </div>
                <div class="opacity-block" v-show="isClicked">
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';

export default {
  name: 'Articles',
  data: function() {
      return{
          articleList: [],
          article: [
              {
                  content: '',
              }
          ],
          isClicked: false,
          token: sessionStorage.getItem('token'),
          userId: '',
      }
  },
  created () {
    this.fetchGetAllArticles();
  },
  methods: {
      verifTextarea() {
          const regex = /^[A-Za-z0-9-,.;:!@#€$ùèçéà&“'_/§?\s()]+$/;
          const input = document.getElementById('textarea');
          if(regex.test(input.value))
          {
              input.classList.add('green-border-articles');
          }
          else
          {
              input.classList.remove('green-border-articles');
          }
      },
      unlockButton() {
          const greenBorder = document.getElementsByClassName('green-border-articles');
          const button = document.getElementById('publier');
          if(greenBorder.length === 1)
          {
              button.removeAttribute('disabled');
          }
          else
          {      
              button.setAttribute('disabled', 'true');
          }
      },
      liked(id) {
          const likeButton = document.getElementById('like');
          const isLiked = document.getElementsByClassName('last-articles__like--liked').length;
          if(isLiked != 0)
          {
              likeButton.classList.remove('last-articles__like--liked'); 
          }
          else
          {
              likeButton.classList.add('last-articles__like--liked');
          }
          axios.post('http://localhost:3000/api/article/' + id + '/like', 
          { isLiked: isLiked, id: id }, {headers: { 'Authorization': this.token }});
      },
      fetchCreateArticle() {
          const content = document.getElementById('textarea').value;
          axios.post('http://localhost:3000/api/article', 
          { content: content, userId: this.userId }, {headers: { 'Authorization': this.token }});
          window.location.reload();
      },
      fetchModifyArticle(id) {
          const content = document.getElementById('modify-textarea').value;
          axios.put('http://localhost:3000/api/article/' + id, 
          { content: content, userId: this.userId, id: id }, {headers: { 'Authorization': this.token }});
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
          if(this.userId == id)
          {
              return true;
          }
          else
          {
              return false;
          }
      },
  }
}
</script>

<style scoped lang='scss'>

h1
{
    color: #fff;
    padding-top: 220px;
    font-size: 2.5em;
}

#modify-textarea
{
    width: 90%;
    height: 350px;
}

textarea
{
    width: 80%;
    margin-top: 20px;
    height: 100px;
    border-radius: 20px;
    border: 2px solid #2c3e50;
    padding: 15px;
    color: #2c3e50;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 1em;

    &:hover, &:focus
    {
        border: #fd2e01 2px solid;
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
    background-color: #fff;
    text-align: left;
    padding: 5px 20px;

    &__heading
    {
        font-size: 1em;
        margin-bottom: 0;
    }

    &__content
    {
        font-size: 0.9em;
    }

    &__like
    {
        border-radius: 30px;
        padding: 5px 15px;
        border-color: #fd2e01;
        color: #fd2e01;
        background-color: #fff;
        font-weight: 600;
        &--liked
        {
            background-color: #fd2e01;
            color: #fff;
        }
    }

    &__row
    {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__button
    {
        margin-right: 10px;
        border-radius: 30px;
        padding: 5px 15px;
        border-color: #fd2e01;
        color: #fd2e01;
        background-color: #fff;
        font-weight: 600;
        text-align: center;
        cursor: pointer;
        &:hover, &:focus
        {
            background-color: #fd2e01;
            color: #fff;
        }
    }
}

.content
{
    background-color: #eeeeee;
    border-radius: 50px 50px 0 0;
    width: 1200px;
    margin: auto;
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
    background: url(../images/header.jpg) no-repeat;
    box-shadow: 0px 0px 10px 0px #000000;
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
    background: #fff;
    opacity: 70%;
}

.popup-modify
{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;

    &__form
    {
        border-radius: 35px;
        width: 50%;
        height: 50%;
        margin: auto;
        margin-top: 50vh;
        background-color: #fff;
        transform: translateY(-50%);
    }

    &__closeme
    {
        border-radius: 50%;
        padding: 2px 7px;
        font-size: 1.4em;
        font-weight: 600;
        color: #fff;
        border-color: #fd2e01;
        background-color: #fd2e01;
        position: absolute;
        top: -10px;
        right: -10px;
        cursor: pointer;
        &:hover, &:focus
        {
            background-color: #fff;
            color: #fd2e01;
        }
    }
}

</style>