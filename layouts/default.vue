<template>
  <div>
    <div id="box-notif" v-if="showNotifBox">
      <div class="notif">
        <div class="logo-notif">
          <div class="logo">
            <img :src="$store.state.identity.logo" width="640" height="48" alt="Logo"/>
          </div>
        </div>
        <div class="desc-notif">
          <h5>Aktifkan notifikasi untuk mendapatkan berita terbaru dari chatnews.id</h5>
          <p>Klik "Ya, aktifkan" untuk berlangganan berita</p>
          <div class="box-action-notif">
            <button class="remove-notif" @click="close()">Nanti saja</button>
            <button class="aktif-notif" @click="activated()">Ya, aktifkan</button>
          </div>
        </div>
      </div>
    </div>
    <Header />
    <header-sticker-news v-if="stickerNews.length > 0" :data="stickerNews"></header-sticker-news>
    <div class="content">
      <AdsLeft v-if="onShowLeftAds" :data="dataAdsLeft"/>
      <AdsRight v-if="onShowRightAds" :data="dataAdsRight"/>
      <div id="main" class="container">
        <nuxt keep-alive :keep-alive-props="{ max: 10 }" />
      </div>
    </div>
    <Footer />
    <ScrollTop />
    <AdsManagement />
    <client-only>
      <MenuBottom v-if="$auth.loggedIn"/>
    </client-only>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    components : {
      Header: () => import ('~/components/header/Header'),
      Footer: () => import ('~/components/footer'),
      ScrollTop: () => import ('~/components/scroll-to-top'),
      AdsManagement: () => import ('~/components/ads'),
      AdsLeft: () => import ('~/components/ads/AdsLeft'),
      AdsRight: () => import ('~/components/ads/AdsRight'),
      MenuBottom: () => import ('~/components/menu-bottom'),
      HeaderStickerNews: () => import ('~/components/header/HeaderStickerNews'),
    },
    data () {
      return {
        favicon: this.$store.state.identity,
        showNotifBox: false,
        onShowLeftAds: false,
        onShowRightAds: false,
        dataUser: {},
        stickerNews: [],
        dataAdsLeft: {},
        dataAdsRight: {}
      }
    },
    head(){
      return {
        htmlAttrs: {
          lang: 'id-ID',
        },
        link: [
          { 
            rel: 'icon', 
            type: 'image/x-icon', 
            href: this.favicon.logoIcon
          },
          {
            rel: "canonical",
            href: process.env.BASE_URL + this.$route.path
          },
        ]
      }
    },
    computed: {
      ...mapGetters({
        fetchedIdentity: 'identity',
        fetchedAds: 'ads/showAds',
        fetchedBannerEvent: 'bannerEvent'
      })
    },
    watch: {
      checkBoxNotif() {
        this.showNotifBox = true
      }
    },
    async mounted() {
      if (localStorage.getItem('statusAgreement') == null) {
        if (this.$store.state.auth.loggedIn == true) {
          let postdata = {
            id_user: this.$store.state.auth.user.id,
            code: Math.random().toString(36).substring(7)
          }
          await this.$store.dispatch('comments/fetchCheckAgreement', postdata)
        }
      }
      
      if (this.fetchedBannerEvent.length != 0) {
        this.onShowLeftAds = true
        this.onShowRightAds = true
        var arrEvent = this.fetchedBannerEvent
        for(var i = 0; i < arrEvent.length;i++){
          if (arrEvent[i].type == 'Image Left') {
            let postDataAdsLeft = {
              urlImage: arrEvent[i].image,
              urlAds: arrEvent[i].link
            }
            this.dataAdsLeft = postDataAdsLeft
          }
        }
        for(var i = 0; i < arrEvent.length;i++){
          if (arrEvent[i].type == 'Image Right') {
            let postDataAdsRight = {
              urlImage: arrEvent[i].image,
              urlAds: arrEvent[i].link
            }
            this.dataAdsRight = postDataAdsRight
          }
        }
      }else{
        if (this.fetchedAds.left.image_url == '') {
          this.onShow = false                
        }else{
          this.onShowLeftAds = true
          let postDataAdsLeft = {
            urlImage: this.fetchedAds.left.image_url,
            urlAds: this.fetchedAds.left.link
          }
          this.dataAdsLeft = postDataAdsLeft
        }
        if (this.fetchedAds.right.image_url == '') {
          this.onShowRightAds = false                
        }else{
          this.onShowRightAds = true
          let postDataAdsRight = {
            urlImage: this.fetchedAds.right.image_url,
            urlAds: this.fetchedAds.right.link
          }
          this.dataAdsRight = postDataAdsRight
        }
      }
      this.stickerNews = this.$store.state.stickerNews
      if (this.$route.query.authen) {
        this.$auth.loginWith('local', {
          data: {
            "authen": this.$route.query.authen,
            "session": this.$route.query.session
          }
        })
        this.$router.replace('/')
      }
      var userAgent = window.navigator.userAgent;
      if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
        this.showNotifBox = false
      }else{
        if (!localStorage.getItem('closeNotif')) {
          await new Promise(resolve => setTimeout(resolve, 5000)); // 5 sec
          this.showNotifBox = true
        }else{
          this.showNotifBox = false
          const permission = await Notification.requestPermission();
          if(permission == 'granted'){
            this.startOnMessageListener()
            this.startTokenRefreshListener()
          }
        }
      }
    },
    methods: {
      ...mapActions({
        pushSubscribe: 'subscribe/fetchSubscribe'
      }),
      close(){
        this.showNotifBox = false
        localStorage.setItem('closeNotif', true);
      },
      activated(){
        this.showNotifBox = false
        this.startOnMessageListener()
        this.startTokenRefreshListener()
        this.requestPermission();
        localStorage.setItem('closeNotif', true);
      },
      startOnMessageListener() {
        this.$fire.messaging.onMessage((payload) => {
          //console.info('Message received. ', payload)
        })
      },
      startTokenRefreshListener() {
        this.$fire.messaging.onTokenRefresh(async () => {
          try {
            const refreshedToken = await this.$fire.messaging.getToken()
            this.idToken = refreshedToken
            localStorage.setItem('tokenTime', Date.now());
          } catch (e) {
            //console.error('Unable to retrieve refreshed token ', e)
          }
        })
      },
      async requestPermission() {
        try {
          const permission = await Notification.requestPermission()
          this.permissionGranted = permission === 'granted'
          if(permission == "granted"){
            this.startOnMessageListener()
            this.startTokenRefreshListener()
          }
          let tokenNotif = await this.$fire.messaging.getToken()
          localStorage.setItem('tokenNotif', tokenNotif);
          var dateToken = new Date();
          localStorage.setItem('tokenTime', dateToken.toLocaleString("ja-JP"));
          let postdata = {
            request_token: tokenNotif,
            token: this.$store.getters.token
          }
          let response = await this.pushSubscribe(postdata);
          localStorage.Set
        } catch (e) {
          //console.error(e)
        }
      },

    },
  }
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>