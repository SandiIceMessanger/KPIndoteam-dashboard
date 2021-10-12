<template>
  <div>
    <div class="section-recomendation skeleton-horizontal">
      <div class="row mb-2">
        <div class="col-6 col-lg-3">
          <div class="box-recomendation">
            <a href="#">
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image skeleton-infografis"></span>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="box-recomendation">
            <a href="#">
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image skeleton-infografis"></span>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="box-recomendation">
            <a href="#">
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image skeleton-infografis"></span>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="box-recomendation">
            <a href="#">
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image skeleton-infografis"></span>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="box-recomendation">
            <a href="#">
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image skeleton-infografis"></span>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6 d-block d-sm-none">
          <div class="box-recomendation">
            <a href="#">
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image skeleton-infografis"></span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="d-none d-sm-block">
        <div class="row">
          <div class="col-6 col-lg-3">
            <div class="box-recomendation">
              <a href="#">
                <div class="o-media__figure">
                  <span class="skeleton-box skeleton-image skeleton-infografis"></span>
                </div>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-3">
            <div class="box-recomendation">
              <a href="#">
                <div class="o-media__figure">
                  <span class="skeleton-box skeleton-image skeleton-infografis"></span>
                </div>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-3">
            <div class="box-recomendation">
              <a href="#">
                <div class="o-media__figure">
                  <span class="skeleton-box skeleton-image skeleton-infografis"></span>
                </div>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-3">
            <div class="box-recomendation">
              <a href="#">
                <div class="o-media__figure">
                  <span class="skeleton-box skeleton-image skeleton-infografis"></span>
                </div>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-3">
            <div class="box-recomendation">
              <a href="#">
                <div class="o-media__figure">
                  <span class="skeleton-box skeleton-image skeleton-infografis"></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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

<style>
  .skeleton-box::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
    -webkit-animation: shimmer 2s infinite;
            animation: shimmer 2s infinite;
    content: "";
  }
  @-webkit-keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
</style>