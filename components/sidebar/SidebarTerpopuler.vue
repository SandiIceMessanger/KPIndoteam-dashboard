<template>
  <div class="populer-box sticky-top">
    <div class="populer-list">
      <div class="heading-article">
        <div class="heading-left float-left">
          <span class="baging"></span>
          <h3>Terpopuler</h3>
        </div>
      </div>
      <ul>
        <li v-for="(data, index) in fetchedPopular.slice(0, 7)" :key="data.id">
          <a :href="`/read/${data.post_slug}`">
            <div class="num">
              <span>{{index+1}}</span>
            </div>
            <p>{{convertCharacters(data.post_title)}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        
      }
    },
    computed: {
      ...mapGetters({
        fetchedPopular: 'popular'
      }),
    },
    async mounted() {
      
    },
    methods: {
      
    },
  }
</script>