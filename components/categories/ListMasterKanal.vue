<template>
  <div>
    <div class="row" v-if="fetchedKanalCategory.length != 0">
      <div class="col-12 col-sm-8 col-md-8 col-lg-8">
        <div class="master-chanel">
          <SkeletonCarousel v-if="showLoadingCarousel"></SkeletonCarousel>
          <vue-horizontal-list :items="fetchedKanalCategory.headline" :options="options" v-if="showCarousel">
            <template v-slot:default="{ item }">
              <div class="item">
                <div class="layer-image">
                  <div class="bg-image-artikel" :style="{background: `url(${item.featured_image == null ? noImage : item.featured_image.url})`}">
                    <div class="box-main-artikel">
                      <div class="caption">
                        <a :href="`/read/${item.slug}`">
                          <h2>{{item.title}}</h2>
                        </a>
                        <div class="caption-info">
                          <div class="caption-date">
                            <client-only>
                              <i class="fa fa-calendar-o" aria-hidden="true"></i> {{formatDateList(item.date_delimiter)}}
                            </client-only>
                          </div>
                          <div class="caption-seperator">|</div>
                          <div class="caption-comment">
                            <i class="fa fa-comment-o" aria-hidden="true"></i> {{item.author}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </vue-horizontal-list>
        </div>
      </div>
      <div class="col-12 col-sm-4 col-md-4 col-lg-4">
        <div class="scroll-artikel">
          <div class="heading-article">
            <div class="heading-left">
              <span class="baging"></span>
              <h3>Trending</h3>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h6 class="mb-0" v-if="isPartner">
                <a href="https://www.satukanegeri.com/" target="_blank">
                  <img src="~/assets/img/logo_satukan_negeri-old.png" style="width: 125px;">
                </a>
              </h6>
              <h6 class="mb-0" v-else>Trending di  <span v-html="titlePage"></span></h6>
            </div>
            <div class="card-body">
              <div class="list-kanal">
                <div class="media" v-for="item in fetchedKanalCategory.trending" v-bind:key="item.id">
                  <div class="media-body">
                    <div class="desc-artikel">
                      <a :href="`/read/${item.slug}`">
                        <h3 class="mt-0 mb-2">{{item.title}}</h3>
                      </a>
                    </div>
                    <div class="box-user" v-if="isPartner">
                      <div class="box-avatar-creator">
                        <nuxt-link to="/#">
                          <img :src="item.avatar" :alt="item.author" /><span>{{item.author}}</span>
                        </nuxt-link>
                      </div>
                      <div class="box-post-date" style="margin-top: -5px;padding-left: 28px;">
                        <client-only>
                          <span>| {{formatDateList(item.date_delimiter)}}</span>
                        </client-only>
                      </div>
                    </div>
                    <div class="box-user" v-else>
                      <div class="box-avatar-creator">
                        <nuxt-link to="/#">
                          <img :src="item.avatar" :alt="item.author" /><span>{{item.author}}</span>
                        </nuxt-link>
                      </div>
                      <div class="box-post-date">
                        <client-only>
                          <span><i class="fas fa-circle"></i> {{formatDateList(item.date_delimiter)}}</span>
                        </client-only>
                      </div>
                    </div>
                  </div>
                  <div class="media-aside media-aside-right align-self-start">
                    <div class="img-thumb">
                      <a :href="`/read/${item.slug}`">
                        <div class="box-noImage" v-if="item.featured_image == null">
                          <div class="bg-img-thumb no-image" :lazy-background="`${noImage}`"></div>
                        </div>
                        <div v-else>
                          <img :src="item.featured_image.url" class="bg-img-thumb" :alt="item.title">
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
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SkeletonCarousel from '~/components/skeleton/SkeletonCarousel';
  import VueHorizontalList from "vue-horizontal-list";
  export default {
    name: "left-right-slot",
    components : {
      VueHorizontalList
    },
    data () {
      return {
        isPartner: false,
        titlePage: '',
        showCarousel: false,
        showLoadingCarousel: true,
        noImage: require(`~/assets/img/no_image.jpg`),
        options: {
          responsive: [{ size: 1 }],
        },
      }
    },
    computed: {
      ...mapGetters({
        fetchedKanalCategory: 'artikel/kanalArtikelCategory'
      })
    },
    async mounted() {
      let urlPartner = this.$route.params.slug
      if (urlPartner == 'antara-digital-media') {
        this.isPartner = true
      }
      this.showLoadingCarousel = false
      this.showCarousel = true
      this.titlePage = this.$store.state.artikel.category[0].category.name
    },
    methods: {
    
    }
  }
</script>