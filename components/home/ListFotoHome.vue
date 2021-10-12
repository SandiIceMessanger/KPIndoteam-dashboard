<template>
  <div>
    <div class="box-list-foto">
      <div class="list-foto">
        <div class="row">
          <div class="col-8 col-sm-8 col-md-8 col-lg-8 big-foto">
            <div class="foto">
              <a :href="`/categories/galeri-foto/${bigImage.slug}`">
                <div class="foto-big" :lazy-background="`${bigImage == false ? noImage : bigImage.featured_image.url}`">
                  <div class="count">
                    <div class="icon-camera">
                      <i class="fas fa-camera"></i> {{bigImage.totalImage}}
                    </div>
                  </div>
                  <div class="desc-foto desc-foto-big">
                    <h2>FOTO: {{bigImage.title}}</h2>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-4 col-sm-4 col-md-4 col-lg-4 small-foto">
            <div class="foto">
              <a :href="`/categories/galeri-foto/${smallImage1.slug}`">
                <div class="small-foto-top-right small-bottom" :lazy-background="`${smallImage1 == false ? noImage : smallImage1.featured_image.url}`">
                  <div class="count">
                    <div class="icon-camera">
                      <i class="fas fa-camera"></i> {{smallImage1.totalImage}}
                    </div>
                  </div>
                  <div class="desc-foto desc-foto-small">
                    <h2>FOTO:  {{smallImage1.title}}</h2>
                  </div>
                </div>
              </a>
            </div>
            <div class="foto" v-if="smallImage2 != undefined">
              <a :href="`/categories/galeri-foto/${smallImage2.slug}`">
                <div class="foto small-foto-top-right small-bottom" :lazy-background="`${smallImage2 == false ? noImage : smallImage2.featured_image.url}`">
                  <div class="count">
                    <div class="icon-camera">
                      <i class="fas fa-camera"></i> {{smallImage2.totalImage}}
                    </div>
                  </div>
                  <div class="desc-foto desc-foto-small">
                    <h2>FOTO: {{smallImage2.title}}</h2>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4 col-sm-4 col-md-4 col-lg-4 small-foto-bottom small-bottom">
            <div class="foto" v-if="smallImage3 != undefined">
              <a :href="`/categories/galeri-foto/${smallImage3.slug}`">
                <div class="smalls" :lazy-background="`${smallImage3 == false ? noImage : smallImage3.featured_image.url}`">
                  <div class="count">
                    <div class="icon-camera">
                      <i class="fas fa-camera"></i> {{smallImage3.totalImage}}
                    </div>
                  </div>
                  <div class="desc-foto desc-foto-small">
                    <h2>FOTO: {{smallImage3.title}}</h2>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-4 col-sm-4 col-md-4 col-lg-4 center-small-foto-bottom small-bottom">
            <div class="foto small-foto-top-right" v-if="smallImage4 != undefined">
              <a :href="`/categories/galeri-foto/${smallImage4.slug}`">
                <div class="smalls" :lazy-background="`${smallImage4 == false ? noImage : smallImage4.featured_image.url}`">
                  <div class="count">
                    <div class="icon-camera">
                      <i class="fas fa-camera"></i> {{smallImage4.totalImage}}
                    </div>
                  </div>
                  <div class="desc-foto desc-foto-small">
                    <h2>FOTO: {{smallImage4.title}}</h2>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-4 col-sm-4 col-md-4 col-lg-4 last-small-foto-bottom small-bottom">
            <div class="foto" v-if="smallImage5 != undefined">
              <a :href="`/categories/galeri-foto/${smallImage5.slug}`">
                <div class="smalls" :lazy-background="`${smallImage5 == false ? noImage : smallImage5.featured_image.url}`">
                  <div class="count">
                    <div class="icon-camera">
                      <i class="fas fa-camera"></i> {{smallImage5.totalImage}}
                    </div>
                  </div>
                  <div class="desc-foto desc-foto-small">
                    <h2>FOTO: {{smallImage5.title}}</h2>
                  </div>
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
        bigImage: [],
        smallImage1: [],
        smallImage2: [],
        smallImage3: [],
        smallImage4: [],
        smallImage5: []
      }
    },
    computed: {
      ...mapGetters({
        
      }),
    },
    async mounted() {
      this.bigImage = this.$store.state.artikel.kanalArtikel.['galeri-foto'].headline[0]
      this.smallImage1 = this.$store.state.artikel.kanalArtikel.['galeri-foto'].headline[1]
      this.smallImage2 = this.$store.state.artikel.kanalArtikel.['galeri-foto'].headline[2]
      this.smallImage3 = this.$store.state.artikel.kanalArtikel.['galeri-foto'].headline[3]
      this.smallImage4 = this.$store.state.artikel.kanalArtikel.['galeri-foto'].headline[4]
      this.smallImage5 = this.$store.state.artikel.kanalArtikel.['galeri-foto'].headline[5]
    },
    methods: {
      
    }
  }
</script>