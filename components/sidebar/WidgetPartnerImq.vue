<template>
  <div>
    <div class="scroll-artikel">
      <div class="card">
        <div class="card-header">
          <h6 class="mb-0">
            <a href="https://www.satukanegeri.com/" target="_blank">
              <img src="~/assets/img/logo_satukan_negeri-old.png" width="115" height="54" style="width: 115px;position: relative;top: 2px;">
            </a>
            <a href="/categories/antara-digital-media" class="more">Lihat lainnya <i class="fas fa-chevron-right"></i></a>
          </h6>
        </div>
        <div class="card-body">
          <div class="list-kanal">
            <div class="media" v-for="data in fetchedKanalCategoryImq.home.slice(0, 3)" v-bind:key="data.id">
              <div class="media-body">
                <div class="desc-artikel">
                  <a :href="data.url" target="_blank">
                    <h3 class="mt-0 mb-2">{{data.post_title}}</h3>
                  </a>
                </div>
                <div class="box-user">
                  <div class="box-post-date">
                    <client-only>
                      <span>{{formatDateList(data.post_date)}}</span>
                    </client-only>
                  </div>
                </div>
              </div>
              <div class="media-aside media-aside-right align-self-start">
                <div class="img-thumb" style="border: 1px solid rgba(0,0,0,.125); border-radius: 8px;">
                  <a :href="data.url" target="_blank">
                    <div class="bg-img-thumb" :style="{background: `url(${data.image.thumbnail == null ? noImage : data.image.thumbnail})`}" />
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
        fetchedKanalCategoryImq: 'artikel/kanalArtikelCategoryImq'
      }),
    },
    async mounted() {
      console.log(this.fetchedKanalCategoryImq);
    },
    methods: {
      
    },
  }
</script>