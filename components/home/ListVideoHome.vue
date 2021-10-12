<template>
  <div>
    <div class="box-lists-videos">
      <div class="list-videos">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-4 col-lg-4" v-for="data in listVideo.slice(0, 3)" v-bind:key="data.id">
            <a :href="`/read/${data.slug}`">
              <div class="box-video">
                <div class="video-thumbnail" :lazy-background="`${data.featured_image == null ? noImage : data.featured_image.url}`">
                  <div class="play-icon">
                    <i class="far fa-play-circle"></i>
                  </div>
                </div>
                <div class="content-video">
                  <h2>{{convertCharacters(data.title)}}</h2>
                </div>
              </div>
            </a>
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
        listVideo: [],
      }
    },
    computed: {
      ...mapGetters({
        
      }),
    },
    async mounted() {
      this.listVideo = this.$store.state.artikel.kanalArtikel.video.lates_post
    },
    methods: {
      
    }
  }
</script>