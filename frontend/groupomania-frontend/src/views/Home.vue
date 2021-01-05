<template>
  <div class="home">
    <HelloWorld v-if="isConnected()" />
    <Articles v-else/>
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
  },
  methods: {
    isConnected() {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      if(token && userId)
      {
        return false
      }
      else
      {
        return true
      }
    },
  }
}
</script>

