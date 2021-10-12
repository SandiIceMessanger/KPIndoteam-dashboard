<template>
  <header>
    <div class="navbarTop navbar-inverse navbar-static-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <!-- <div class="topContact float-left">
              <ul>
                <li>
                  <b-icon-telephone></b-icon-telephone> {{$store.state.identity.phone}}
                </li>
                <li>
                  <nuxt-link to="/#"><b-icon-envelope></b-icon-envelope> {{$store.state.identity.email}}</nuxt-link>
                </li>
              </ul>
            </div> -->
            <div class="top-date float-left">
              <p class="mb-0 text-white">{{ timestamp }} </p>
            </div>
            <div class="top-search float-right">
              <div class="form-search">
                <div class="input-group">
                  <client-only>
                    <div class="iconHeader mr-2" v-show="onShow" style="display: none;">
                      <img :src="this.url" width="78" height="39" data-not-lazy style="width: 78px;border-radius: 0px;">
                    </div>
                  </client-only>
                  <input class="form-control" type="text" @keyup.enter="onSearch" v-model="search" placeholder="Cari Berita..." required />
                </div>
                <div @click="onSearch" class="btn primary-button btn-search"><i class="fas fa-search"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <header-menu></header-menu>
    </client-only>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex'
  import HeaderMenu from '~/components/header/HeaderMenu';
  export default {
    data () {
      return {
        timestamp: "",
        search: "",
        onShow: false,
        url: ''
      }
    },
    computed: {
        ...mapGetters({
            fetchedBannerEvent: 'bannerEvent'
        }),
    },
    created() {
      setInterval(this.getNow, 1000);
    },
    async mounted() {
      var arrEvent = this.fetchedBannerEvent
      var sortArray = [];
      if (this.fetchedBannerEvent.length != 0) {
          for(var i = 0; i < arrEvent.length;i++){
            if (arrEvent[i].type == 'Header Icon') {
              this.url = arrEvent[i].image
            }
            sortArray.push(arrEvent[i].type)
          }
      }
      let dataBanner = sortArray;
      const value = 'Header Icon';
      const isInArray = dataBanner.includes(value);
      if (isInArray) {
        this.onShow = true
      }else{
        this.onShow = false
      }
    },
    methods: {
      getNow: function() {
        let arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
        let arrhari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
        let date = new Date();
        let hari = date.getDay();
        let tanggal = date.getDate();
        let bulan = date.getMonth();
        let tahun = date.getFullYear();
        let datetimes = arrhari[hari]+", "+tanggal+" "+arrbulan[bulan]+" "+tahun;
        this.timestamp = datetimes;
      },
      onSearch() {
        window.location.href = `/search/${this.search}`;
      },
    },
  }
</script>
