<template>
  <div>
    <div class="thumb-foto">
      <div class="row">
        <div class="col-6 col-sm-4 col-md-3 col-lg-3" v-for="data in ListGallery" v-bind:key="data.id">
          <div class="box-foto">
            <a :href="`/categories/galeri-foto/${data.post_slug}`">
              <img :src="data.featured_image">
              <div class="count">
                <div class="icon-camera">
                  <i class="fas fa-camera"></i> {{data.totalImage}}
                </div>
              </div>
              <div class="content-foto">
                <h3>FOTO: {{convertCharacters(data.post_title)}}</h3>
              </div>
            </a>
          </div>    
        </div>
      </div>
      <div v-if="page != totalPage">
        <infinite-loading v-if="ListGallery.length" spinner="waveDots" @infinite="infiniteScroll">
          <span slot="no-more"></span>
          <span slot="no-results"></span>
        </infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    props: [
      'ListGallery',
    ],
    data () {
      return {
        totalPage : '',
        page: 1,
      }
    },
    computed: {
      url() {
        return `${window.location.origin}/wp-json/indonews/v1/posts-category/galeri-foto/${this.page}`;
      },
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
                response.data.post.forEach(item => this.ListGallery.push(item));
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