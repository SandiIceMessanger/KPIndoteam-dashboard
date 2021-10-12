<template>
  <section id="galleryPage">
    <breadcrumb :dataTitle="titlePage"></breadcrumb>
    <div class="foto-kanal">
      <GalleryFotoHeadline></GalleryFotoHeadline>
    </div>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <div class="new-article no-border">
          <div class="heading-article">
            <div class="heading-left float-left">
              <span class="baging"></span>
              <h3>Terbaru di Gallery Foto</h3>
            </div>
          </div>
          <div class="list-foto mt-4">
            <ListGalleryFoto :ListGallery="fetchedCategory"></ListGalleryFoto>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'
  import "@/assets/css/category.css";
  import GalleryFotoHeadline from "~/components/gallery-foto/GalleryFotoHeadline";
  import ListGalleryFoto from "~/components/gallery-foto/ListGalleryFoto";
  export default {
    head() {
      return {
        titleTemplate: 'Galeri Foto | %s',
      }
    },
    data () {
      return {
        titlePage: 'Galeri Foto',
        showLoading: true,
        showLoadingRecomended: true
      }
    },
    computed: {
      ...mapGetters({
        fetchedCategory: 'artikel/category'
      })
    },
    async fetch({params ,store, error, req}) {
      const server = process.env.BASE_API_URL;
      let token = store.state.token
      let urlKanal = server+`indonews/v1/playlist-kanal/galeri-foto`
      let dataKanal = await fetch(urlKanal, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      if (dataKanal !== '') {
        store.commit('artikel/SET_KANAL_CATEGORY', dataKanal)
      }
      let urlDataCategory = server+`indonews/v1/posts-category/galeri-foto/1`
      let dataCategory = await fetch(urlDataCategory, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      let resCat = [];
      if(dataCategory.post.length > 0){
        resCat = dataCategory.post
      }
      store.commit('artikel/SET_CATEGORY', resCat)
    },
    async mounted() {
      
    },
    methods: {
      
    }
  }
</script>