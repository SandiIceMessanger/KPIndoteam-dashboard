<template>
  <section id="searchPage">
    <div class="row">
      <div class="col-12 col-sm-8 col-md-8 col-lg-8">
        <div class="new-article no-border list-search">
          <div class="heading-article mt-3">
            <div class="heading-left float-left">
              <span class="baging"></span>
              <h3 v-if="titlePage">Pencarian "{{titlePage}}"</h3>
            </div>
          </div>
          <SkeletonBoxVertikal v-if="showLoading"></SkeletonBoxVertikal>
          <ListSearch></ListSearch>
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
  import SkeletonBoxVertikal from '~/components/skeleton/SkeletonBoxVertikal';
  import ListSearch from '~/components/search/ListSearch';
  import SidebarTerpopuler from '~/components/sidebar/SidebarTerpopuler';
  export default {
    head() {
      let slugPage = this.$route.params.slug
      if (slugPage == undefined) {
        var titlePage = ''
      }else{
        var titlePage = this.$route.params.slug.charAt(0).toUpperCase() + this.$route.params.slug.slice(1)
      }
      let metaDesc = this.$store.state.artikel.search[0].excerpt.rendered
      return {
        titleTemplate: 'Hasil Pencarian Berita Seputar ' + titlePage + ' Bridging Newstainment - %s',
        meta: [
          { hid: 'description', name : "description", content: metaDesc.replace(/<[^>]*>?/gm, '') }
        ],
      }
    },
    data () {
      return {
        titlePage: '',
        showLoading: true,
        showLoadingRecomended: true
      }
    },
    computed: {
      ...mapGetters({
        fetchedSearch: 'artikel/search'
      }),
    },
    async fetch({params ,store, error, req}) {
      const server = process.env.BASE_API_URL;
      let token = store.state.token
      let urlSearch = server+`wp/v2/posts?search=${params.slug}&per_page=10&page=1&_embed`
      let dataSearch = await fetch(urlSearch, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      store.commit('artikel/SET_LIST_SEARCH', dataSearch)
    },
    created () {
      
    },
    async mounted() {
      this.titlePage = this.$route.params.slug
      this.showLoading = false
    },
    methods: {
    }
  }
</script>