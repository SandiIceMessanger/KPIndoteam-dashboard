<template>
  <section id="infografisPage">
    <breadcrumb :dataTitle="titlePage"></breadcrumb>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <div class="new-article no-border">
          <div class="list-infografis">
            <div class="heading-article">
              <div class="heading-left float-left">
                <span class="baging"></span>
                <h3>Terbaru di Infografis</h3>
              </div>
            </div>
            <SkeletonBox v-if="showLoading" class="mt-4"></SkeletonBox>
            <div class="mt-4">
              <div class="thumb-infografik">
                <figure v-for="data in listInfografis" v-bind:key="data.id">
                  <a :href="`/categories/infografis/${data.post_slug}`">
                    <img :src="data.featured_image" />
                  </a>
                </figure>
              </div>
              <div v-if="page != totalPage">
                <infinite-loading v-if="listInfografis.length" spinner="waveDots" @infinite="infiniteScroll">
                  <span slot="no-more"></span>
                  <span slot="no-results"></span>
                </infinite-loading>
              </div>
            </div>
          </div>
        </div>
        <div class="empty" v-if="showNoContent">
          <i class="fab fa-dropbox"></i>
          <p>No content found</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'
  import "@/assets/css/masonry.css";
  import axios from 'axios';
  import SkeletonBox from '~/components/skeleton/SkeletonBox';
  export default {
    head() {
      return {
        titleTemplate: 'Infografis | %s',
      }
    },
    data () {
      return {
        titlePage: 'Infografis',
        listInfografis: [],
        showLoading: true,
        showNoContent: false,
        totalPage : '',
        page: 1,
      }
    },
    computed: {
      url() {
        return `${window.location.origin}/wp-json/indonews/v1/posts-category/infografis/${this.page}`;
      },
    },
    async fetch({params ,store, error, req}) {
      const server = process.env.BASE_API_URL;
      let token = store.state.token
      let urlDataCategory = server+`indonews/v1/posts-category/infografis/1`
      let dataCategory = await fetch(urlDataCategory, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      let resCat = [];
      if(dataCategory.post.length > 0){
        resCat = dataCategory.post
      }
      store.commit('artikel/SET_CATEGORY', resCat)
    },
    async mounted() {
      this.listInfografis = this.$store.state.artikel.category
      console.log(this.listInfografis)
      this.showLoading = false
      if (this.listInfografis.length == 0) {
        this.showNoContent = true
      }
    },
    methods: {
      infiniteScroll($state) {
        setTimeout(() => {
          this.page++;
          axios
            .get(this.url, {
              headers: {
                'Authorization': `Bearer ${this.$store.state.token}`
              },
            })
            .then(response => {
              this.totalPage = response.data.total_pages
              if (response.data.post.length > 1) {
                response.data.post.forEach(item => this.listInfografis.push(item));
                $state.loaded();
              } else {
                $state.complete();
              }
            })
            .catch(err => {
              console.log(err);
            });
        },500);
      },
    }
  }
</script>

<style scoped>
  .empty i {
    color: #dddddd;
    font-size: 6rem;
  }
</style>