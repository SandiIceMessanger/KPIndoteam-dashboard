<template>
  <div class="box-trending">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="nav-trending">
            <ul>
              <li v-for="data in fetchedTopTopik" :key="data.ID">
                <a :href="`/tag/${data.slug}`">{{data.title}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
        fetchedTopTopik: 'topTopic'
      }),
    },
    async mounted() {
      
    },
    methods: {
      
    },
  }
</script>