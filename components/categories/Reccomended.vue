<template>
  <div>
    <div class="heading-article mb-3">
      <div class="heading-left float-left">
        <span class="baging"></span>
        <h3>Rekomendasi Kami</h3>
      </div>
    </div>
    <div class="section-recomendation">
      <div class="row">
        <div class="col-6" v-for="data in listCategories" :key="data.ID">
          <div class="box-recomendation">
            <a :href="`/read/${data.post_slug}`">
              <img v-if="data.featured_image == null || data.featured_image == ''" class="img-fluid" src="@/assets/img/no_image.jpg"/>
              <img v-else :src="data.featured_image" class="img-fluid" :alt="data.post_title" />
              <div class="short-desc">
                <p class="mb-0">{{data.post_excerpt}}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'listCategories',
    ],
    data () {
      return {
        
      }
    },
    computed: {
      
    },
    async mounted() {
      
    },
    methods: {
      
    }
  }
</script>