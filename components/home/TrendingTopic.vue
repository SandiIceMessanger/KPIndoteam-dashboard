<template>
  <div>
    <div class="boxListOlimpic" v-if="fetchlistOlimpiade.length != 0">
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
    <div class="trending-box">
      <div class="trending-list">
        <span class="baging"></span>
        <h3>Trending Topic</h3>
        <ul>
          <li v-for="data in fetchTrendingTopik" :key="data.term_id">
            <a :href="`/tag/${data.slug}`"> <span>#</span> {{data.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        isShowDetail: false
      }
    },
    computed: {
      ...mapGetters({
        fetchTrendingTopik: 'trending/trendingTopik',
        fetchlistOlimpiade: 'widget/listOlimpic'
      }),
    },
    async mounted() {
      var arrEvent = this.$store.state.checkEvent.data
      for(var i = 0; i < arrEvent.length;i++){
        if (arrEvent[i].type == 'page') {
          if (arrEvent[i].endpoint_detail) {
            this.isShowDetail = true
          }
        }
      }
    },
    methods: {
      
    },
  }
</script>