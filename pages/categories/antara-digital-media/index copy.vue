<template>
  <section id="categoryPage">
    <breadcrumb :dataTitle="titlePage" v-if="fetchedKanalCategoryImq !== undefined"></breadcrumb>
    <div class="slide-category" v-if="fetchedKanalCategoryImq !== undefined">
      <!-- <list-master-kanal-imq></list-master-kanal-imq> -->
    </div>
    <div class="row">
      <div class="col-12 col-sm-8 col-md-8 col-lg-8">
        <div class="new-article no-border">
          <div class="heading-article" v-if="fetchedKanalCategoryImq !== undefined">
            <div class="heading-left float-left">
              <span class="baging"></span>
              <h3>Terbaru di <em v-html="titlePage" style="font-style: inherit;"></em></h3>
            </div>
          </div>
          <SkeletonBoxVertikal v-if="showLoading"></SkeletonBoxVertikal>
          <div class="no-data" v-if="fetchedKanalCategoryImq === undefined">
            <no-data></no-data>
          </div>
          <ListArticleCategoriesImq v-else :listData="fetchedKanalCategoryImq"></ListArticleCategoriesImq>
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
  import ListMasterKanalImq from '~/components/categories/ListMasterKanalImq';
  import SkeletonBoxHorizontal from '~/components/skeleton/SkeletonBoxHorizontal';
  import SkeletonBoxVertikal from '~/components/skeleton/SkeletonBoxVertikal';
  import Breadcrumb from '~/components/categories/Breadcrumb';
  import Reccomended from '~/components/categories/Reccomended';
  import ListArticleCategoriesImq from '~/components/categories/ListArticleCategoryImq';
  import SidebarTerpopuler from '~/components/sidebar/SidebarTerpopuler';
  import NoData from '~/components/error/NoData';
  export default {
    head() {
      let titlePage = `Anatara Digital Media IMQ`
      let metaDesc = this.$store.state.artikel.kanalArtikelCategoryImq.kanal_description
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
        fetchedKanalCategoryImq: 'artikel/kanalArtikelCategoryImq'
      })
    },
    async fetch({params ,store, error, req}) {
      let urlKanalWidgetImq = `https://www.satukanegeri.com/api/post`
      let dataKanalWidgetImq = await fetch(urlKanalWidgetImq, { headers: {"Authorization" : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE1IiwidXNlcm5hbWUiOiJpbmRvY2hhdCIsImlhdCI6MTYzMzMxMjA3MiwiZXhwIjoxNjMzMzMwMDcyfQ.e9ofNaBXBTyCEqYJgYsUxnFR4yEF0nRjSHCTZGTm08o`} }).then(res => res.json())
      if (dataKanalWidgetImq !== '') {
        store.commit('artikel/SET_KANAL_CATEGORY_IMQ', dataKanalWidgetImq.data)
      }
    },
    async mounted() {
      this.showLoading = false
      console.log(this.fetchedKanalCategoryImq)
    },
    methods: {
    }
  }
</script>