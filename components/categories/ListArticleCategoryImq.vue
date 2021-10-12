<template>
  <div>
    <div class="list-article">
      <ul class="list-unstyled">
        <li class="media py-3" v-for="data in listData.populer.slice(0, 3)" v-bind:key="data.id">
            <div class="media-body">
            <a :href="`/read/${data.post_slug}`">
              <h5 class="mt-0">{{data.post_title}}</h5>
            </a>
            <p v-html="data.post_excerpt"></p>
            <div class="box-user">
              <div class="box-avatar-creator">
                <nuxt-link to="/#" v-if="data.post_author">
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
                <span class="label-categories" v-if="data.category" v-html="data.category.name"></span>
              </div>
              <div class="box-image-post">
                <div class="box-no-image">
                  <div v-if="data.featured_image == false" class="no-image bg-no-image" :style="{'background':'url(' + noImage + ')','background-size': 'cover','background-repeat': 'no-repeat','background-position': 'center center'}"></div>
                  <div v-else class="bg-no-image" :style="{'background':'url(' + data.featured_image + ')','background-size': 'cover','background-repeat': 'no-repeat','background-position': 'center center'}"></div>
                </div>
              </div>
            </a>
          </div>
        </li>
        <infinite-loading v-if="listData.length" spinner="waveDots" @infinite="infiniteScroll">
          <span slot="no-more"></span>
          <span slot="no-results"></span>
        </infinite-loading>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    props: [
      'listData',
    ],
    data () {
      return {
        noImage: require(`~/assets/img/no_image.jpg`),
        page: 1,
      }
    },
    computed: {
      url() {
        return `https://www.satukanegeri.com/api/post/limit/start`;
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
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE1IiwidXNlcm5hbWUiOiJpbmRvY2hhdCIsImlhdCI6MTYzMzA1Mjk5MCwiZXhwIjoxNjMzMDcwOTkwfQ.PREgh_CkThw-Kns7oKvtFf3o2fUea2jtQVd-hYbH-qY`
              },
            })
            .then(response => {
              if (response.data.post.length > 1) {
                response.data.post.forEach(item => this.listData.push(item));
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