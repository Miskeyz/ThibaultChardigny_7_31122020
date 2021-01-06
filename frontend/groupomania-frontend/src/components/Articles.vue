<template>
    <div class="content">
        <div class="header">
            <h1>Bonjour Thibault !</h1>
        </div>
        <div class='body'>
            <div class="profil">
                <h2>Profil</h2>
                <p>Thibault Chardigny</p>
                <p>Né le 04/09/1991</p>
            </div>
            <div class="articles">
                <form @input="unlockButton" @submit.prevent="fetchCreateArticle" class="form-article">
                    <textarea placeholder="Que voulez vous partager à vos collègues ?" id="textarea" @input="verifTextarea"></textarea><br>
                    <input type="submit" id="publier" class="button" value="Publier" disabled />
                </form>
                <div v-for="item in articleList" v-bind:key="item.id">
                    <div class="last-articles" v-if="isClicked">
                        <div class="last-articles__row">
                            <div>
                                <h2 class="last-articles__heading">{{ item.prenom }} {{ item.nom }}</h2>
                            </div>
                            <div>
                                <button class="last-articles__button" id="modify" v-show="isConnected(item.userId)" @click="modify()">Modifier</button>
                                <button class="last-articles__button" id="delete" v-show="isConnected(item.userId)" @click="fetchDeleteArticle(item.id)">Supprimer</button>
                            </div>
                        </div>
                        <p class="last-articles__content">
                            {{ item.content }}
                        </p>
                        <button @click="liked" class="last-articles__like" id="like">J'aime</button>
                    </div>
                    <div class="last-articles" v-else>
                        <div>
                            <h2 class="last-articles__heading">Thibault Chardigny</h2>
                        </div>
                        <form @submit.prevent="fetchModifyArticle">
                        <textarea id="modify-textarea">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took 
                            a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 
                            1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </textarea>
                        <input @click="confirm" class="last-articles__button" id="submitModify" value="Valider" /></form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Articles',
  data: function() {
      return{
          isClicked: true,
          articleList: []
      }
  },
  created () {
    this.fetchGetAllArticles();
  },
  methods: {
      verifTextarea() {
          const regex = /^[A-Za-z0-9-,.;!@#€$ùèçéà&“'_/§?\s()]+$/;
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
      liked() {
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
      },
      fetchCreateArticle() {
          const content = document.getElementById('textarea').value;
          const userId = sessionStorage.getItem('userId');
          axios.post('http://localhost:3000/api/article', 
          { content: content, userId: userId });
          window.location.reload();
      },
      fetchModifyArticle(id) {
          const content = document.getElementById('textarea').value;
          const userId = sessionStorage.getItem('userId');
          axios.put('http://localhost:3000/api/article/:' + id, 
          { content: content, userId: userId, id: id });
      },
      fetchDeleteArticle(id) {
          const userId = sessionStorage.getItem('userId');
          axios.delete('http://localhost:3000/api/article/:' + id, 
          { userId: userId, id: id });
      },
      fetchGetAllArticles() {
          axios.get('http://localhost:3000/api/article')
          .then((response) => {
              const results = JSON.parse(response.data);
              this.articleList = results;
          });
      },
      modify()
      {
        this.isClicked = false;
      },
      confirm()
      {
          this.isClicked = true;
      },
      isConnected(id)
      {
          const userId = sessionStorage.getItem('userId');
          if(userId == id)
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
    height: 200px;
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

</style>