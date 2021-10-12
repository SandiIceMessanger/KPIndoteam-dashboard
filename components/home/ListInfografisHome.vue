<template>
  <div>
    <div class="box-lists-infografis" v-if="this.listInfografis != undefined">
      <div class="list-infografis">
        <div class="row">
          <div class="col-6 col-sm-12 col-md-4 col-lg-4 p-infografis p-right" v-for="data in listInfografis.slice(0, 3)" v-bind:key="data.id">
            <div class="image-infografis">
              <a :href="`/categories/infografis/${data.slug}`">
                <img :src="`${data.featured_image == null ? noImage : data.featured_image.url}`" alt="Infografis" />
              </a>
            </div>
          </div>
          <div class="col-6 col-sm-12 col-md-4 col-lg-4 more-infografis p-infografis" v-if="listInfografis != undefined">
            <div class="bg-infografis">
              <a href="/categories/infografis">
                <div class="text-more-infografis">
                  <i class="far fa-arrow-alt-circle-right"></i>
                  <p>Lihat lainnya</p>
                </div>
              </a>
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
    components : {
      
    },
    data () {
      return {
        listInfografis: []
      }
    },
    computed: {
      ...mapGetters({
        
      }),
    },
    async mounted() {
      this.listInfografis = this.$store.state.artikel.kanalArtikel.infografis.headline
    },
    methods: {
      
    }
  }
</script>