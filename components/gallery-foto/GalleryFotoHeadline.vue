<template>
  <div>
    <div class="row">
      <div class="col-8 col-sm-8 col-md-8 col-lg-8 big-photo-kanal">
        <div class="master-chanel">
          <a :href="`/categories/galeri-foto/${bigImage.slug}`">
            <div class="bg-image-master" v-if="bigImage.featured_image" :style="{background: `url(${bigImage.featured_image.url == null ? noImage : bigImage.featured_image.url})`}">
              <div class="desc-foto desc-foto-big">
                <h2>FOTO: {{bigImage.title}}</h2>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="col-4 col-sm-4 col-md-4 col-lg-4 small-photo-kanal">
        <div class="list-foto-small">
          <a v-if="smallImage1" :href="`/categories/galeri-foto/${smallImage1.slug}`">
            <div class="small-image" v-if="smallImage1.featured_image" :style="{background: `url(${smallImage1.featured_image.url == null ? noImage : smallImage1.featured_image.url})`}">
              <div class="desc-foto">
                <h2>FOTO: {{smallImage1.title}}</h2>
              </div>
            </div>
          </a>
          <a v-if="smallImage2" :href="`/categories/galeri-foto/${smallImage2.slug}`">
            <div class="small-image" v-if="smallImage2.featured_image" :style="{background: `url(${smallImage2.featured_image.url == null ? noImage : smallImage2.featured_image.url})`}">
              <div class="desc-foto">
                <h2>FOTO: {{smallImage2.title}}</h2>
              </div>
            </div>
          </a>
          <a v-if="smallImage3" :href="`/categories/galeri-foto/${smallImage3.slug}`">
            <div class="small-image" v-if="smallImage3.featured_image" :style="{background: `url(${smallImage3.featured_image.url == null ? noImage : smallImage3.featured_image.url})`}">
              <div class="desc-foto">
                <h2>FOTO: {{smallImage3.title}}</h2>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        listGalleryFoto: [],
        bigImage: [],
        smallImage1: [],
        smallImage2: [],
        smallImage3: [],
        noImage: require(`~/assets/img/no_image.jpg`)
      }
    },
    computed: {
      
    },
    async mounted() {
      this.listGalleryFoto = this.$store.state.artikel.kanalArtikelCategory
      this.bigImage = this.listGalleryFoto.headline[0]
      this.smallImage1 = this.listGalleryFoto.headline[1]
      this.smallImage2 = this.listGalleryFoto.headline[2]
      this.smallImage3 = this.listGalleryFoto.headline[3]
    },
    methods: {
      
    }
  }
</script>