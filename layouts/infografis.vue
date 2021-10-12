<template>
  <div>
    <div class="fullscreen">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        favicon: this.$store.state.identity,
      }
    },
    head(){
      return {
        link: [{ 
          rel: 'icon', 
          type: 'image/x-icon', 
          href: this.favicon.logoIcon
        }]
      }
    },
    mounted() {

    },
    methods: {

    },
  }
</script>