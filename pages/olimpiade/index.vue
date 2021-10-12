<template>
  <section id="eventPage">
    <div class="row">
      <div class="col-12 col-sm-8 col-md-8 col-lg-8" v-if="fetchlistOlimpiade.status == true">
        <div class="new-article no-border">
          <div class="heading-article">
            <div class="boxListOlimpic">
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
                        <div class="boxRangking" style="width: auto">
                          <p style="color: #000000;">Total</p>
                        </div>
                      </div>
                    </th>
                    <th>
                      <div class="rangking">
                        <div class="boxRangking" style="width: auto">
                          <p class="rankBy"  style="color: #000000;">Rank by Total</p>
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr v-for="data in fetchlistOlimpiade.data.medals">
                    <td>
                      <span>{{data.rank}}</span>
                    </td>
                    <td class="country"><img :src="data.country_flag_link"> <span>{{data.country_name}}</span></td>
                    <td><strong>{{data.gold}}</strong></td>
                    <td>{{data.silver}}</td>
                    <td>{{data.bronze}}</td>
                    <td>{{data.total}}</td>
                    <td>{{data.rank_by_total}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="listOlimpiade">
            <div class="heading-article mb-0">
              <div class="heading-left">
                <span class="baging"></span>
                <h3>Berita Olimpiade Lainnya</h3>
              </div>
            </div>
            <vue-horizontal-list :items="fetchedFilterTags" :options="options" v-if="showCarousel">
              <template v-slot:default="{ item }">
                <div class="item">
                  <div class="layer-image">
                    <div class="bg-image-artikel">
                      <div class="bg-images" :style="`background-image: url('${item.featured_image == null ? noImage : item.featured_image}')`"></div>
                      <!-- <img :src="item.featured_image"> -->
                      <div class="box-main-artikel">
                        <a :href="`/read/${item.post_slug}`">
                          <h3>{{item.post_title}}</h3>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </vue-horizontal-list>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4 col-md-4 col-lg-4">
        <sidebar-terpopuler></sidebar-terpopuler>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios';
  import VueHorizontalList from "vue-horizontal-list";
  export default {
    name: "auto-play",
    components : {
      VueHorizontalList
    },
    data () {
      return {
        showCarousel: false,
        noImage: require(`~/assets/img/no_image.jpg`),
        options: {
          responsive: [
            // responsive breakpoints to calculate how many items to show in the list at each width interval
            // it will always fall back to these:
            { end: 576, size: 2 },
            { start: 576, end: 768, size: 3 },
            { start: 768, end: 992, size: 3 },
            { start: 992, end: 1200, size: 3 },
            { start: 1200, size: 3 },
          ],
          start: 1,
        },
      }
    },
    computed: {
      ...mapGetters({
        fetchedFilterTags: 'tags/filterTags',
        fetchlistOlimpiade: 'widget/listOlimpic'
      }),
    },
    async fetch({params ,store, error, req, $http}) {
      const server = process.env.BASE_API_URL;
      let token = store.state.token

      let arrEvent = store.state.checkEvent.data
      for(var i = 0; i < arrEvent.length;i++){
        if (arrEvent[i].type == 'page') {
          var urlDetailEvent = arrEvent[i].endpoint_detail
        }
      }

      let urlOlimpic = server+`indonews/v1/${urlDetailEvent}`
      let dataOlimpic = await fetch(urlOlimpic, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      store.commit('widget/SET_LISTOLIMPIC', dataOlimpic)

      let urlTag = server+`indonews/v1/posts-tag-slug/olimpiade-tokyo-2020/1`
      let dataTag = await fetch(urlTag, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      store.commit('tags/SET_FILTER_TAGS', dataTag.post)
    },
    async mounted() {
      this.showCarousel = true
    },
    methods: {

    }
  }
</script>