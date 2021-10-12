<template>
  <div>
    <div class="container" v-if="dataAdsBottom.urlImage">
      <div class="row">
        <div class="col-lg-12">
          <div class="box-ads-bottom" v-if="showAds">
            <div class="box-close" @click="hideAds">
              <div class="btn-close">
                <p class="mb-0">Close <i class="fas fa-times"></i></p>
              </div>
            </div>
            <AdsBottom :data="dataAdsBottom"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AdsBottom from '~/components/ads/AdsBottom';
  export default {
    components : {
      AdsBottom
    },
    data() {
      return {
        scrollToTop: false,
        showAds: true,
        dataAdsBottom: {}
      }
    },
    computed: {
      ...mapGetters({
            fetchedAds: 'ads/showAds'
        }),
    },
    mounted() {
      this.url = this.fetchedAds.bottom.image_url;
      let postDataAdsBottom = {
        urlImage: this.fetchedAds.bottom.image_url,
        urlAds: this.fetchedAds.bottom.link
      }
      this.dataAdsBottom = postDataAdsBottom
    },
    methods: {
      hideAds() {
        this.showAds = false
      },
    },
  }
</script>