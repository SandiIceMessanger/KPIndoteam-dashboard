<template>
  <section id="mains">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-8">
        <AdsCenter class="mb-4" v-if="isShowAds"/>
        <div class="boxListOlimpic d-block d-sm-block d-lg-none" v-if="fetchlistOlimpiade.length != 0">
          <div class="listOlimpic">
            <div class="headingOlimpic">
              <h3 v-html="this.fetchlistOlimpiade.data.title"></h3>
            </div>
            <table>
              <tr class="noHover">
                <th colspan="2">Negara</th>
                <th>
                  <div class="rangking">
                    <div class="boxRangking rangking1">
                      <p>1</p>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="rangking">
                    <div class="boxRangking rangking2">
                      <p>2</p>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="rangking">
                    <div class="boxRangking rangking3">
                      <p>3</p>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="rangking">
                    <div class="boxRangking">
                      <p><i class="fa fa-sitemap" aria-hidden="true"></i></p>
                    </div>
                  </div>
                </th>
              </tr>
              <tr v-for="data in fetchlistOlimpiade.data.medals">
                <td>
                  <span>{{data.rank}}</span>
                </td>
                <td class="country"><img :src="data.country_flag_link" style="height: 24px;"> <span>{{data.country_name}}</span></td>
                <td><strong>{{data.gold}}</strong></td>
                <td>{{data.silver}}</td>
                <td>{{data.bronze}}</td>
                <td>{{data.total}}</td>
              </tr>
            </table>
            <div class="moreTournament" v-if="isShowDetail">
              <div class="btnSelengkapnya">
                <a href="/olimpiade"><p>Selengkapnya <i class="fas fa-chevron-right"></i></p></a>
              </div>
            </div>
          </div>
        </div>
        <div v-for="(data, index) in listKanal" class="new-article">
          <div class="heading-article" v-if="fetchedKanalList[data] != undefined">
            <div class="heading-left float-left">
              <span class="baging"></span>
              <h3>{{data}}</h3>
            </div>
            <div class="heading-right float-right">
              <span></span>
              <p>
                <a :href="`/categories/${data}`">Lihat lainnya <i class="fas fa-chevron-right"></i></a>
              </p>
            </div>
          </div>
          <div class="box-artikel" v-if="data != 'video' && data != 'galeri-foto' && data != 'infografis'">
            <div class="row" v-if="fetchedKanalList[data].headline != undefined">
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 d-none d-sm-block">
                <div class="main-artikel">
                  <div class="slide-main-artikel">
                    <vue-horizontal-list :items="fetchedKanalList[data].headline" :options="options" >
                      <template v-slot:default="{ item }">
                        <div class="item">
                          <div class="layer-image">
                            <div class="label-category">
                              <span>{{stripHtml(item.category.name)}}</span>
                            </div>
                            <div class="bg-image-artikel" :lazy-background="`${item.featured_image == null ? noImage : item.featured_image.url}`">
                              <div class="box-main-artikel">
                                <a :href="`/read/${item.slug}`">
                                  <h3>{{item.title}}</h3>
                                </a>
                                <div class="box-user">
                                  <div class="box-avatar-creator">
                                    <nuxt-link to="/#">
                                      <img :src="item.avatar" :alt="item.title" /><span>{{item.author}}</span>
                                    </nuxt-link>
                                  </div>
                                  <div class="box-post-date">
                                    <client-only>
                                      <span><i class="fas fa-circle"></i> {{formatDateList(item.date_delimiter)}}</span>
                                    </client-only>
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
              </div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                <div class="scroll-artikel">
                  <div class="card">
                    <div class="card-header">
                      <h6 class="mb-0">Terkini di {{data}}</h6>
                    </div>
                    <div class="card-body">
                      <div class="list-kanal">
                        <div class="media" v-for="item in fetchedKanalList[data].lates_post" v-bind:key="item.id">
                          <div class="media-body">
                            <div class="desc-artikel">
                              <a :href="`/read/${item.slug}`">
                                <h3 class="mt-0 mb-2">{{convertCharacters(item.title)}}</h3>
                              </a>
                            </div>
                            <div class="box-user">
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
                                  <img :src="item.featured_image.url" width="100" height="90" class="bg-img-thumb" :alt="item.title">
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
          <div v-if="data == 'lifestyle'">
            <div class="bannerLifestyle mt-3" v-if="dataBannerLifestyle.urlBanner">
              <div v-if="dataBannerLifestyle.linkBanner">
                <a :href="dataBannerLifestyle.linkBanner" target="_blank">
                  <img width="732" height="228" :src="dataBannerLifestyle.urlBanner" :title="dataBannerLifestyle.titleBanner">
                </a>
              </div>
              <div v-else>
                <img width="732" height="228" :src="dataBannerLifestyle.urlBanner" :title="dataBannerLifestyle.titleBanner">
              </div>
            </div>
          </div>
          <div v-if="fetchedKanalList['video'] != undefined">
            <list-video-home v-if="data == 'video'"></list-video-home>
          </div>
          <div v-if="fetchedKanalList['galeri-foto'] != undefined">
            <list-foto-home v-if="data == 'galeri-foto'"></list-foto-home>
          </div>
          <div v-if="fetchedKanalList['infografis'] != undefined">
            <list-infografis-home v-if="data == 'infografis'"></list-infografis-home>
          </div>
        </div>
        <div class="widget-partner widget-partner-mobile" v-if="isHome">
          <WidgetPartnerImq />
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-4 d-none d-lg-block">
        <div class="widget-partner" v-if="isHome">
          <WidgetPartnerImq />
        </div>
        <sidebar-terpopuler></sidebar-terpopuler>
      </div>
      
    </div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'
  import VueHorizontalList from "vue-horizontal-list";
  import SkeletonBoxVertikal from '~/components/skeleton/SkeletonBoxVertikal';
  import AdsCenter from '~/components/ads/AdsCenter';
  import ListFotoHome from '~/components/home/ListFotoHome';
  import ListVideoHome from '~/components/home/ListVideoHome';
  import ListInfografisHome from '~/components/home/ListInfografisHome';
  import WidgetPartner from '~/components/sidebar/WidgetPartner';
  import WidgetPartnerImq from '~/components/sidebar/WidgetPartnerImq';
  
  import SidebarTerpopuler from '~/components/sidebar/SidebarTerpopuler';
  export default {
    name: "auto-play",
    components : {
      VueHorizontalList
    },
    data () {
      return {
        isShowAds: false,
        showLoading: true,
        isShowDetail: false,
        isHome: false,
        dataBannerLifestyle: {},
        options: {
          autoplay: { play: false, repeat: true, speed: 6000 },
        },
        listKanal: []
      }
    },
    computed: {
      ...mapGetters({
        fetchedKanal: 'artikel/kanal',
        fetchedKanalList: 'artikel/kanalArtikel',
        fetchlistOlimpiade: 'widget/listOlimpic'
      }),
    },
    async mounted() {
      let postdata = {
        urlBanner: this.$store.state.ads.showAds.middle.image_url,
        linkBanner: this.$store.state.ads.showAds.middle.link,
        titleBanner: this.$store.state.ads.showAds.middle.title
      }
      this.dataBannerLifestyle = postdata
      if (this.$store.state.ads.showAds.center.image_url) {
        this.isShowAds = true
      }
      var arrEvent = this.$store.state.checkEvent.data
      for(var i = 0; i < arrEvent.length;i++){
        if (arrEvent[i].type == 'page') {
          if (arrEvent[i].endpoint_detail) {
            this.isShowDetail = true
          }
        }
      }
      let urlHome = $nuxt.$route.path
      if (urlHome == '/') {
        this.isHome = true
      }
      this.listKanal = this.fetchedKanal
      this.showLoading = false
    },
    methods: {

    }
  }
</script>