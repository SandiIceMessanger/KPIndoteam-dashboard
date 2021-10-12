<template>
  <section id="categoryPage">
    <breadcrumb :dataTitle="titlePage" v-if="fetchedCategory !== undefined"></breadcrumb>
    <div class="slide-category" v-if="fetchedCategory !== undefined">
      <list-master-kanal></list-master-kanal>
    </div>
    <div class="row">
      <div class="col-12 col-sm-8 col-md-8 col-lg-8">
        <div class="new-article no-border">
          <div class="heading-article" v-if="fetchedCategory !== undefined">
            <div class="heading-left float-left">
              <span class="baging"></span>
              <h3>Terbaru di <em v-html="titlePage" style="font-style: inherit;"></em></h3>
            </div>
          </div>
          <SkeletonBoxVertikal v-if="showLoading"></SkeletonBoxVertikal>
          <div class="no-data" v-if="fetchedCategory === undefined">
            <no-data></no-data>
          </div>
          <ListArticleCategory v-else :listArticleCategories="fetchedCategory"></ListArticleCategory>
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
  import "@/assets/css/category.css";
  import ListMasterKanal from '~/components/categories/ListMasterKanal';
  import SkeletonBoxHorizontal from '~/components/skeleton/SkeletonBoxHorizontal';
  import SkeletonBoxVertikal from '~/components/skeleton/SkeletonBoxVertikal';
  import Breadcrumb from '~/components/categories/Breadcrumb';
  import Reccomended from '~/components/categories/Reccomended';
  import ListArticleCategory from '~/components/categories/ListArticleCategory';
  import SidebarTerpopuler from '~/components/sidebar/SidebarTerpopuler';
  import NoData from '~/components/error/NoData';
  export default {
    head() {
      let titlePage = this.$route.params.slug.charAt(0).toUpperCase() + this.$route.params.slug.slice(1)
      let metaDesc = this.$store.state.artikel.kanalArtikelCategory.kanal_description
      return {
        titleTemplate: 'Berita Seputar ' + titlePage + ' terkini Bridging Newstainment - %s',
        meta: [
          { hid: 'description', name : "description", content: metaDesc }
        ],
      }
    },
    data () {
      return {
        titlePage: '',
        showLoading: true,
        showLoadingRecomended: true,
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

      let urlDataCategory = server+`indonews/v1/posts-category/${params.slug}/1`
      let dataCategory = await fetch(urlDataCategory, { 
        headers: {"Authorization" : `Bearer ${token}`} 
      }).then(res => res.json())
      .catch(e => {
        error({ statusCode: 404, message: 'Post not found' })
      })
      store.commit('artikel/SET_CATEGORY', dataCategory.post)

      if (dataCategory.post !== undefined) {
        let urlKanal = server+`indonews/v1/playlist-kanal/${params.slug}`
        let dataKanal = await fetch(urlKanal, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
        store.commit('artikel/SET_KANAL_CATEGORY', dataKanal)
      }
    },
    async mounted() {
      let slug = this.$route.params.slug
      if (this.$store.state.artikel.category != undefined) {
        this.titlePage = this.$store.state.artikel.category[0].category.name
      }
      this.showLoading = false
    },
    methods: {
    }
  }
</script>