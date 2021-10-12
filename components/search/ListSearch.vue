<template>
  <div>
    <div class="list-article">
      <div class="not-found" v-if="listSearch.length == 0">
        <p>No article found</p>  
      </div>
      <ul class="list-unstyled">
        <li class="media py-3" v-for="data in listSearch">
          <div class="media-body">
            <a :href="`/read/${data.slug}`">
              <h5 class="mt-0">{{data.title.rendered}}</h5>
            </a>
            <p v-html="data.excerpt.rendered"></p>
            <div class="box-user">
              <div class="box-avatar-creator">
                <nuxt-link to="/#">
                  <img :src="data._embedded.author[0].avatar_urls[48]" alt="Avatar" /><span>{{data._embedded.author[0].name}}</span>
                </nuxt-link>
              </div>
              <div class="box-post-date">
                <span><i class="fas fa-circle"></i> {{formatDate(data.date)}}</span>
              </div>
            </div>
          </div>
          <div class="img-thumb-cat">
            <a href="#">
              <div class="box-label">
                <span class="label-categories">
                  {{data._embedded[`wp:term`][0][0].name}}
                </span>
              </div>
              <div class="box-image-post">
                <div class="box-no-image">
                  <div v-if="!data._embedded[`wp:featuredmedia`]" class="bg-no-image" :style="{'background':'url(' + noImage + ')','background-size': 'cover','background-repeat': 'no-repeat','background-position': 'center center'}"></div>
                  <div v-if="data._embedded[`wp:featuredmedia`]" class="bg-no-image" :style="{'background':'url(' + data._embedded[`wp:featuredmedia`][0].media_details.sizes.thumbnail.source_url + ')','background-size': 'cover','background-repeat': 'no-repeat','background-position': 'center center'}"></div>
                </div>
              </div>
            </a>
          </div>
        </li>
        <div v-if="page != totalPage">
          <infinite-loading v-if="listSearch.length" spinner="waveDots" @infinite="infiniteScroll">
            <span slot="no-more"></span>
            <span slot="no-results"></span>
          </infinite-loading>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        noImage: require(`~/assets/img/no_image.jpg`),
        totalPage : '',
        page: 1,
        listSearch: {}
      }
    },
    computed: {
      url() {
        return `${window.location.origin}/wp-json/wp/v2/posts?search=${this.$route.params.slug}&per_page=10&page=${this.page}&_embed`;
      },
    },
    async mounted() {
      this.listSearch = this.$store.state.artikel.search
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
              this.totalPage = response.headers['x-wp-totalpages']
              if (response.data.length > 1) {
                response.data.forEach(item => this.listSearch.push(item));
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