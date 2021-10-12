<template>
  <div>
    <a @click="scrollTop" v-show="scrollToTop" :class="$auth.loggedIn ? 'scroll-top scroll-login' : 'scroll-top'">
      <i class="fas fa-chevron-up"></i>
      <p class="mb-0">Back To <br>Top</p>
    </a>    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        scrollToTop: false,
      }
    },
    computed: {
      
    },
    mounted() {
      window.addEventListener('scroll', this.scrollListener)
    },
    methods: {
      scrollTop() {
        this.intervalId = setInterval(() => {
          if (window.pageYOffset === 0) {
            clearInterval(this.intervalId)
          }
          window.scroll(0, window.pageYOffset - 50)
        }, 20)
      },
      scrollListener() {
        this.scrollToTop = window.scrollY > 200
      }
    },
  }
</script>