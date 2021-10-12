<template>
  <section id="slide-top">
    <div class="row">
      <div class="col-sm-12 col-lg-8">
        <SkeletonCarousel v-if="showLoadingCarousel"></SkeletonCarousel>
        <div class="box-slide">
          <div id="carouselMaster" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div v-for="(data, index) in fetchHeadline" :key="data.id" class="carousel-item" :class="{ 'active': index === 0 }">
                <div class="box-img">
                  <a rel="preload" :href="`/read/${data.slug}`">
                    <img class="d-block w-100" :src="data.featured_image[0]" :alt="data.title">
                    <div class="box-caption">
                      <h1>{{convertCharacters(data.title)}}</h1>
                      <div class="caption-info">
                        <div class="caption-date">
                          <client-only>
                            <i class="far fa-calendar-alt"></i> {{formatDateList(data.date_delimiter)}}
                          </client-only>
                        </div>
                        <div class="caption-seperator">|</div>
                        <div class="caption-comment">
                          {{data.category.cat_name}}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselMaster" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselMaster" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div class="d-none d-sm-block mt-3 list-headline">
            <div class="row">
              <div class="col-sm-4 col-lg-4" v-for="data in subHeadline" :key="data.id">
                <div class="box-headline">
                  <a :href="data.category[0].cat_name == 'Infografis' ? `/categories/infografis/${data.slug}` : `/read/${data.slug}`">
                    <div class="img-headline">
                      <div class="label-category">
                        <span v-html="data.category[0].cat_name"></span>
                      </div>
                      <img v-if="!data.featured_image[0]" src="@/assets/img/no_image.jpg" alt="No Image" />
                      <img v-else :src="data.featured_image[0]" :alt="data.title" />
                    </div>
                    <div class="content-headline">
                      <h2>{{data.title}}</h2>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-none d-sm-none d-lg-block col-sm-4 col-lg-4">
        <div class="boxWidget">
          <div class="sidebar-top">
            <sidebar-ads v-if="this.$store.state.widget.listOlimpic.length == 0"></sidebar-ads>
            <trending-topic></trending-topic>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SkeletonCarousel from '~/components/skeleton/SkeletonCarousel';
  import SidebarAds from '~/components/sidebar/SidebarAds';
  import TrendingTopic from '~/components/home/TrendingTopic';
  export default {
    data () {
      return {
        showLoadingCarousel: true,
        subHeadline: [],
      }
    },
    computed: {
      ...mapGetters({
        fetchHeadline: 'artikel/headline',
        fetchSubHeadline: 'artikel/subHeadline',
      }),
    },
    async mounted() {
      this.showLoadingCarousel = false
      this.subHeadline = this.fetchSubHeadline
    },
    methods: {

    },
  }
</script>