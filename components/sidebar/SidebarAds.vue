<template>
  <div class="ads-sidebar img-sidebar-top" v-if="urlImage">
    <AdsSidebar />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import AdsSidebar from '~/components/ads/AdsSidebar';
  export default {
    data() {
      return {
        urlImage: ''
      }
    },
    computed: {
      ...mapGetters({
        fetchedAds: 'ads/showAds'
      }),
    },
    async mounted() {
      this.urlImage = this.fetchedAds.top.image_url;
    },
    methods: {
      
    },
  }
</script>