<template>
  <div>
    <div class="scroll-artikel">
      <div class="card">
        <div class="card-header">
          <h6 class="mb-0">
            <a href="https://www.satukanegeri.com/" target="_blank">
              <img src="~/assets/img/logo_satukan_negeri.png" width="115" height="54" style="width: 115px;position: relative;top: 2px;">
            </a>
            <a href="/categories/antara-digital-media" class="more">Lihat lainnya <i class="fas fa-chevron-right"></i></a>
          </h6>
        </div>
        <div class="card-body">
          <div class="list-kanal">
            <div class="media" v-for="data in fetchedKanalCategory.lates_post.slice(0, 3)" v-bind:key="data.id">
              <div class="media-body">
                <div class="desc-artikel">
                  <a :href="`/read/${data.slug}`">
                    <h3 class="mt-0 mb-2">{{data.title}}</h3>
                  </a>
                </div>
                <div class="box-user">
                  <div class="box-post-date">
                    <client-only>
                      <span>{{formatDateList(data.date_delimiter)}}</span>
                    </client-only>
                  </div>
                </div>
              </div>
              <div class="media-aside media-aside-right align-self-start">
                <div class="img-thumb">
                  <a :href="`/read/${data.slug}`">
                    <div>
                      <img :src="data.featured_image.url" class="bg-img-thumb" :alt="data.title">
                    </div>
                  </a>
                </div>
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

      }
    },
    computed: {
      ...mapGetters({
        fetchedKanalCategory: 'artikel/kanalArtikelCategory'
      }),
    },
    async mounted() {
      
    },
    methods: {
      
    },
  }
</script>