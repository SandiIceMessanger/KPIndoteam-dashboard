<template>
  <div>
    <home-carousel></home-carousel>
    <list-article></list-article>
    <div class="boxPopup" v-if="showPopup">
      <modal name="modalHomepage" class="modalHomepage">
        <div id="popup-video">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div class="boxVideo" data-not-lazy>
                  <h1>mkmkmkmkmkm</h1>
                  <iframe :src="linkVideo" :title="`${titleVideo}`" frameborder="0" allow="autoplay" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
  import HomeCarousel from '~/components/home/HomeCarousel';
  import ListArticle from '~/components/home/ListArticle';
  export default {
    head() {
      let schemaData = this.structureData
      return {
        titleTemplate: 'Bridging Newstainment | %s',

        __dangerouslyDisableSanitizers: ['script'],script: [{ innerHTML: JSON.stringify(schemaData), type: 'application/ld+json' }],
        
        meta: [
          { hid: 'keywords', name: 'keywords', content: 'berita hari ini, berita terkini, berita terbaru, info berita, peristiwa, lifestyle, kecelakaan, kriminal, hukum, berita unik, Politik, liputan khusus, Indonesia, Internasional' },
          { property : 'og:type', content: `Article` },
          { property : "og:image", content: process.env.BASE_URL+'/no_image.jpg' },
          { property : "og:image:width", content : "300" },
          { property : "og:image:height", content : "300" },
        ],
      }
    },
    data () {
      return {
        linkVideo: '',
        titleVideo: '',
        showPopup: false,
        structureData: {
          "@context": "https://schema.org/",
          "@type": "Article",
          "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": process.env.BASE_URL
          },
          "headline": "Bridging Newstainment | Chatnews",
          "image": process.env.BASE_URL+'favicon.ico',
          "author": {
          "@type": "Organization",
          "name": "Chatnews"
          },
          "publisher": {
          "@type": "Organization",
          "name": "Chatnews",
          "logo": {
          "@type": "ImageObject",
          "url": process.env.BASE_URL+'favicon.ico'
          }
          },
          "datePublished": "2021-08-17",
          "dateModified": ''
        }
      }
    },
    computed: {
      
    },
    async fetch({params ,store, error, req}) {
      const server = process.env.BASE_API_URL;
      let token = store.state.token

      let tokenimq = store.state.tokenimq

      let urlDataHeadline = server+`indonews/v1/headline`
      let dataHeadline = await fetch(urlDataHeadline, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      store.commit('artikel/SET_HEADLINE', dataHeadline)

      let urlDataSubHeadline = server+`indonews/v1/subheadline`
      let dataSubHeadline = await fetch(urlDataSubHeadline, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      store.commit('artikel/SET_SUBHEADLINE', dataSubHeadline)

      let urlTrendingTopic = server+`indonews/v1/trending-topics`
      let dataTrendingTopic = await fetch(urlTrendingTopic, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      store.commit('trending/SET_TRENDING_TOPIK', dataTrendingTopic)

      let urlKanalWidget = server+`indonews/v1/playlist-kanal/antara-digital-media`
      let urlKanalWidgetImq = `https://www.satukanegeri.com/api/post`
      
      let dataKanalWidget = await fetch(urlKanalWidget, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      if (dataKanalWidget !== '') {
        store.commit('artikel/SET_KANAL_CATEGORY', dataKanalWidget)
      }

      let dataKanalWidgetImq = await fetch(urlKanalWidgetImq, { headers: {"Authorization" : `Bearer ${tokenimq}`} }).then(res => res.json())
      if (dataKanalWidgetImq !== '') {
        store.commit('artikel/SET_KANAL_CATEGORY_IMQ', dataKanalWidgetImq.data)
      }

      let urlListArtikel = server+`wp/v2/posts?per_page=10&page=1&_embed`
      let dataListArtikel = await fetch(urlListArtikel, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      store.commit('artikel/SET_ARTIKELS', dataListArtikel)
      var arrMenus = store.state.menus;
      var arrListRes = {};
      var sortArray = [];
      var countSort = 0;

      if(arrMenus[0].object_type == 'category'){
        for(var i=0;i<arrMenus.length;i++){
          var slugCat = arrMenus[i].slug;
          let urlKanal = server+`indonews/v1/playlist-kanal/`+slugCat
          let dataKanal = await fetch(urlKanal, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json()) 
          arrListRes[slugCat]=dataKanal;
          if(countSort == 2){
            sortArray.push('video');
            sortArray.push(slugCat);
          }else if(countSort == 4){
            sortArray.push('galeri-foto');
            sortArray.push(slugCat);
          }else{
            if(slugCat != 'video' && slugCat != 'galeri-foto'){
              if(slugCat == 'infografis'){
                sortArray.push('infografis');
              }else{
                sortArray.push(slugCat);  
              }
            }
          }
          countSort = countSort + 1;
        }
        store.commit('artikel/SET_KANAL', sortArray);
        store.commit('artikel/SET_KANAL_ARTIKEL', arrListRes);
      }
    },
    async mounted() {
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
      if (this.$store.state.ads.showAds.video.link) {
        this.showPopup = true
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 sec
        this.$modal.show('modalHomepage')
        this.linkVideo = this.$store.state.ads.showAds.video.link
        this.titleVideo = this.$store.state.ads.showAds.video.title
      }else{
        this.$modal.hide('modalHomepage')
        this.showPopup = false
      }
    },
    methods: {
      
    }
  }
</script>