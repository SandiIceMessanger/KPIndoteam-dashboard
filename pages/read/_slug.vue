<template>
  <section id="detailPage">
    <div class="container-detail">
      <div class="row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <nav aria-label="breadcrumb" class="breadcrumb-detail">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li class="breadcrumb-item">
                <a v-if="fetchedDetail._embedded" :href="`/categories/${fetchedDetail._embedded[`wp:term`][0][0].slug}`" v-html="fetchedDetail._embedded[`wp:term`][0][0].name"></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page" v-if="fetchedDetail.title">
                {{convertCharacters(fetchedDetail.title.rendered)}}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-8">
          <SkeletonDetailArtikel v-if="showLoading" class="mt-4"></SkeletonDetailArtikel>
          <client-only>
            <read-artikel v-if="fetchedDetail.title" :data="fetchedDetail"></read-artikel>
          </client-only>
          <tags :listTags="fetchedListTags"></tags>
          <hr>
          <expresion></expresion>
          <comments></comments>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-4">
          <client-only>
          <sidebar-topik-terkait v-if="fetchedTopikTerkait.length != 0" :listTopikTerkait="fetchedTopikTerkait"></sidebar-topik-terkait>
          </client-only>
          <sidebar-terpopuler></sidebar-terpopuler>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import "@/assets/css/detail.css";
  import ReadArtikel from '~/components/read/ReadArtikel';
  import Tags from '~/components/read/Tags';
  import Comments from '~/components/read/Comments';
  import Expresion from '~/components/read/Expresion';
  import SkeletonDetailArtikel from '~/components/skeleton/SkeletonDetailArtikel';
  import SidebarTopikTerkait from '~/components/sidebar/SidebarTopikTerkait';
  import SidebarTerpopuler from '~/components/sidebar/SidebarTerpopuler';
  export default {
    head() {
      let dataDetail = this.$store.state.artikel.detail
      var arrTags = this.$store.state.tags.listTag;
      var arrListTag = []
      for(var i = 0; i < arrTags.length;i++){
        arrListTag.push(arrTags[i].name);
      }
      let schemaData = this.structureData
      if (dataDetail.length != 0) {
        let urlPath = this.$store.state.urlPath
        if (dataDetail._embedded[`wp:featuredmedia`]) {
          var urlImg = dataDetail._embedded[`wp:featuredmedia`][0].source_url
        }else{
          var urlImg = require('~/assets/img/no_image.jpg')
        }
        return {
          titleTemplate: dataDetail.title.rendered + ' | %s',

          meta: [
            { property : 'type', content: `Article` },
            { hid : 'title', name: 'title', content: dataDetail.title.rendered },
            { hid: 'description', name : "description", content: dataDetail.excerpt.rendered.replace(/<[^>]*>?/gm, '') },
            { hid: 'keywords', name: 'keywords', content: arrListTag },
            { property : "og:image", content: urlImg },
            { property : "og:image:width", content : "300" },
            { property : "og:image:height", content : "300" },
            { name: 'twitter:card', content: 'summary_large_image'},
            { name: 'twitter:site', content: '@ChatnewsID'},
            { name: 'twitter:creator', content: '@ChatnewsID'},
            { name: 'twitter:title', content: dataDetail.title.rendered},
            { name: 'twitter:description', content: dataDetail.excerpt.rendered.replace(/<[^>]*>?/gm, '') },
            { name: 'twitter:image', content: urlImg },
          ],
          script: [
            { hid: 'twitter', type: 'text/javascript', src: 'https://platform.twitter.com/widgets.js'},
            { hid: 'instagram', type: 'text/javascript', src: 'https://www.instagram.com/embed.js'},
            { type: 'text/javascript', src: '/js/branchio.js'},
            { innerHTML: JSON.stringify(schemaData), type: 'application/ld+json' }
          ],
          
        }
      }
    },
    data () {
      return {
        showLoading: true,
        structureData: {
          "@context": "https://schema.org",
          "@type": "Article",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://chatnews.id/read/serangan-bom-bunuh-diri-di-bandara-kabul-tewaskan-60-warga-afghanistan-dan-13-tentara-as"
          },
          "headline": "",
          "image": "",
          "author": {
            "@type": "Person",
            "name": ""
          },
          "publisher": {
            "@type": "Organization",
            "name": "Chatnews",
            "logo": {
              "@type": "ImageObject",
              "url": "https://chatnews.id/favicon.ico"
            }
          },
          "datePublished": "2021-08-27",
          "dateModified": ""
        }
      }
    },
    computed: {
      ...mapGetters({
        fetchedDetail: 'artikel/detail',
        fetchedListTags: 'tags/listTag',
        fetchedTopikTerkait: 'artikel/topikTerkait'
      }),
    },
    async fetch({params ,store, error, req, get}) {
      const server = process.env.BASE_API_URL;
      let token = store.state.token
      let urlData = server+`wp/v2/posts?slug=${params.slug}&_embed`
      let dataDetail = await fetch(urlData, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      let resDetail = [];
      if(dataDetail.length > 0){
        resDetail = dataDetail[0]
        let urlTopikTerkait = server+`indonews/v1/related-posts/${dataDetail[0].id}`
        let dataTopikTerkait = await fetch(urlTopikTerkait, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
        store.commit('artikel/SET_TOPIK_TERKAIT', dataTopikTerkait)
        let urlListTag = server+`wp/v2/tags?include=${dataDetail[0].tags}`
        let dataListTag = await fetch(urlListTag, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
        store.commit('tags/SET_LIST_TAG', dataListTag)
        if (store.state.auth.loggedIn == false) {
          let urlView = server+`indonews/v1/viewspost/${dataDetail[0].id}`
          let dataView = await fetch(urlView, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
        }
        let urlComments = server+`wp/v2/comments?post=${dataDetail[0].id}&code=${Math.random().toString(36).substring(7)}`
        let dataComments = await fetch(urlComments, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
        store.commit('comments/SET_LIST_COMMENTS', dataComments)
        let urlExpression = server+`indonews/v1/get-survey-post/${dataDetail[0].id}`
        let dataExpression = await fetch(urlExpression, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
        store.commit('expression/SET_COUNT_EXPRESSIONS', dataExpression)
      }
      store.commit('artikel/SET_DETAIL', resDetail)
    },
    created () {
      if (this.$store.state.artikel.detail.length == 0) {
        this.$router.push( "/not-found" )
      }
    },
    async mounted() {
      this.structureData.headline = this.$store.state.artikel.detail.title.rendered
      this.structureData.image = this.$store.state.artikel.detail._embedded['wp:featuredmedia'][0].source_url
      this.structureData.author.name = this.$store.state.artikel.detail._embedded.author[0].name
      this.structureData.mainEntityOfPage['@id'] = process.env.BASE_URL+ '/read/' +this.$nuxt.$route.params.slug

      var dt = new Date();
      var monthNow = '';
      var dateNow = '';
      if(dt.getMonth() < 8){
          monthNow = '0'+(dt.getMonth()+1)
      }else{
          monthNow = dt.getMonth()+1
      }
      if(dt.getDate() < 10){
          dateNow = '0'+dt.getDate()
      }else{
          dateNow = dt.getDate()
      }
      this.structureData.dateModified = dt.getFullYear() +'-'+ monthNow+'-'+dateNow
      window.onload = () => {
        instgrm.Embeds.process()
      }
      this.showLoading = false
      // if (this.$auth.loggedIn == true) {
      //   let data = {
      //     isLogin: true,
      //     idPost: this.$store.state.artikel.detail.id,
      //     id_user: this.$store.state.auth.user.id,
      //     web_push_token: localStorage.getItem('tokenNotif'),
      //     web_push_token_update_time: localStorage.getItem('tokenTime')
      //   }
      //   await this.$store.dispatch('artikel/fetchViewPost', data)
      // }else {
      //   let data = {
      //     idPost: this.$store.state.artikel.detail.id,
      //     isLogin: false,
      //     token: this.$store.state.token
      //   }
      //   await this.$store.dispatch('artikel/fetchViewPost', data)
      // }
    },
    methods: {
      
    }
  }
</script>