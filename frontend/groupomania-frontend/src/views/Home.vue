<template>
  <div class="home">
    <HelloWorld v-show="false" />
    <Articles v-show="true"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Articles from '@/components/Articles.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Articles
  }
}
</script>

