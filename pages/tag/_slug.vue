<template>
  <section id="tagPage">
    <div class="row">
      <div class="col-12 col-sm-8 col-md-8 col-lg-8">
        <div class="new-article">
          <div class="list-article">
            <div class="no-data" v-if="fetchedFilterTags === undefined">
              <no-data></no-data>
            </div>
            <ul class="list-unstyled" v-else>
              <li class="media py-3" v-for="data in fetchedFilterTags" :key="data.id">
                <div class="media-body">
                  <a :href="`/read/${data.post_slug}`">
                    <h5 class="mt-0">{{data.post_title}}</h5>
                  </a>
                  <p v-html="data.post_excerpt"></p>
                  <div class="box-user">
                    <div class="box-avatar-creator">
                      <nuxt-link to="/#">
                        <img :src="data.post_author.avatar" alt="Avatar" /><span>{{data.post_author.name}}</span>
                      </nuxt-link>
                    </div>
                    <div class="box-post-date">
                      <client-only>
                        <span><i class="fas fa-circle"></i> {{formatDateList(data.date_delimiter)}}</span>
                      </client-only>
                    </div>
                  </div>
                </div>
                <div class="img-thumb-cat">
                  <a :href="`/read/${data.post_slug}`">
                    <div class="box-label">
                      <span class="label-categories">
                        {{data.category.name}}
                      </span>
                    </div>
                    <div class="box-image-post">
                      <div class="box-no-image">
                        <div v-if="data.featured_image == false" class="no-image bg-no-image" :style="{'background':'url(' + noImage + ')','background-size': 'cover','background-repeat': 'no-repeat','background-position': 'center center'}"></div>
                        <div v-else class="bg-no-image" :style="{'background':'url(' +data.featured_image + ')','background-size': 'cover','background-repeat': 'no-repeat','background-position': 'center center'}"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </li>
              <div v-if="page != totalPage">
                <infinite-loading v-if="fetchedFilterTags.length" spinner="waveDots" @infinite="infiniteScroll">
                  <span slot="no-more"></span>
                  <span slot="no-results"></span>
                </infinite-loading>
              </div>
            </ul>
          </div>
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
  import axios from 'axios';
  import SidebarTerpopuler from '~/components/sidebar/SidebarTerpopuler';
  import NoData from '~/components/error/NoData';
  export default {
    head() {
      let slugPage = this.$route.params.slug
      if (slugPage == undefined) {
        var titlePage = ''
      }else{
        var titlePage = this.$route.params.slug.charAt(0).toUpperCase() + this.$route.params.slug.slice(1)
        titlePage = titlePage.replace(/-/g, " ").replace(/(^\w|\s\w)/g, m => m.toUpperCase())
      }
      let metaDesc = this.$store.state.tags.filterTags[0].post_excerpt
      return {
        titleTemplate: 'Berita dan Informasi Seputar ' + titlePage + ' Bridging Newstainment - %s',
        meta: [
          { hid: 'description', name : "description", content: metaDesc.replace(/<[^>]*>?/gm, '') }
        ],
      }
    },
    data () {
      return {
        page: 1,
        totalPage : '',
        noImage: require(`~/assets/img/no_image.jpg`),
      }
    },
    computed: {
      ...mapGetters({
        fetchedFilterTags: 'tags/filterTags',
      }),
      url() {
        return `${window.location.origin}/wp-json/indonews/v1/posts-tag-slug/${this.$route.params.slug}/${this.page}`;
      }
    },
    async fetch({params ,store, error, req, $http}) {
      const server = process.env.BASE_API_URL;
      let token = store.state.token

      let urlTag = server+`indonews/v1/posts-tag-slug/${params.slug}/1`
      let dataTag = await fetch(urlTag, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      store.commit('tags/SET_FILTER_TAGS', dataTag.post)
    },
    async mounted() {
      
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
                response.data.post.forEach(item => this.fetchedFilterTags.push(item));
                $state.loaded();
              } else {
                $state.complete();
              }
            })
            .catch(err => {
              $state.complete();
            });
        }, 500);
      },
    }
  }
</script>