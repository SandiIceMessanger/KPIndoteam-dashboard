<template>
  <div>
    <div class="artikel-detail" >
      <h1 class="mt-4 mb-3">
        {{convertCharacters(data.title.rendered)}}
      </h1>
      <div class="headingReadArtikel">
        <div class="box-author">
          <div class="media">
            <div class="media-aside align-self-center">
              <img :src="data._embedded.author[0].avatar_urls[48]" alt="Avatar" />
            </div>
            <div class="media-body">
              <p class="lead">Author : <span>{{data._embedded.author[0].name}}</span></p>
              <span class="text-muted">{{formatDate(data.date)}}</span>
            </div>  
          </div>
        </div>
        <div class="boxShare">
          <div class="sticky-share">
            <sticky-share :data="data.title.rendered"></sticky-share>
          </div>
        </div>
      </div>
      <hr>
      <div class="content-detail">
        <!-- <div class="sticky-share">
          <sticky-share :data="data.title.rendered"></sticky-share>
        </div> -->
        <div class="master-image mb-3" v-if="data._embedded['wp:term'][0][0].name != 'Video'">
          <div v-if="data._embedded['wp:featuredmedia']">
            <img :src="data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url" :alt="data.title.rendered" />
            <span v-html="data._embedded['wp:featuredmedia'][0].caption.rendered"></span>
          </div>
        </div>
        <p v-html="data.content.rendered"></p>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
  import StickyShare from '~/components/share/StickyShare';
  export default {
    props: [
      'data',
    ],
    data () {
      return {
        
      }
    },
    computed: {

    },
    async mounted() {
      
    },
    methods: {
      
    }
  }
</script>