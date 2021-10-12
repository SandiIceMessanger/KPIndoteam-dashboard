<template>
  <div>
    <div class="recomendation-user">
      <div class="card">
        <div class="card-header">
          Rekomendasi Artikel
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-6 col-lg-3" v-for="(data, index) in fetchedPopular.slice(0, 8)" :key="data.ID">
              <div class="box-recomendation mb-4">
                <a :href="`/read/${data.post_slug}`">
                  <div class="box-no-image" v-if="data.featured_image == false">
                    <div class="bg-no-image" :style="{'background':'url(' + noImage + ')','background-size': 'cover','background-repeat': 'no-repeat','background-position': 'center center'}"></div>
                  </div>
                  <div v-else class="img-recomendation">
                    <img :src="data.featured_image" :alt="data.post_title" />
                  </div>
                  <div class="short-desc">
                    <p class="mb-0">
                      {{data.post_title}}
                    </p>
                  </div>
                </a>
              </div>
            </div>
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
        noImage: require(`~/assets/img/no_image.jpg`),
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
      
    }
  }
</script>