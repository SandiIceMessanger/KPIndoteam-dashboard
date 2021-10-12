<template>
  <div class="fixed-header">

    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breaking-news">
            <div class="label-breaking">
              <p>NEWS</p>
              <span>STICKER</span>
            </div>
            <div class="text-running">
              <marquee scrollamount="4" onmouseover="this.stop();" onmouseout="this.start();">
                <span v-for="item in data"><a :href="item.category[0].cat_name == 'infografis' ? `/categories/infografis/${item.post_slug}` : `/read/${item.post_slug}`">{{item.post_title}} <i class="fas fa-circle"></i></a></span>
              </marquee>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
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

    },
  }
</script>