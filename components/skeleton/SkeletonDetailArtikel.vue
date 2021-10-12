<template>
  <div>
    <div class="section-recomendation skeleton-detail">
      <div class="row mb-2">
        <div class="col-12">
          <div class="box-recomendation">
            <a href="#">
              <ul class="o-vertical-spacing o-vertical-spacing--l p-0">
                <li class="blog-post o-media">
                  <div class="o-media__figure">
                    <span class="skeleton-box skeleton-image"></span>
                  </div>
                  <div class="o-media__body">
                    <div class="o-vertical-spacing">
                      <p>
                        <span class="skeleton-box skeleton-content skeleton-artikel1"></span>
                      </p>
                      <p><span class="skeleton-box skeleton-content skeleton-artikel2"></span></p>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image skeleton-infografis"></span>
              </div>
              <div class="o-media__body">
                <div class="o-vertical-spacing">
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content"></span>
                  </p>
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content skeleton-content2"></span>
                  </p>
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content skeleton-content3"></span>
                  </p>
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content skeleton-content4"></span>
                  </p>
                </div>
              </div>
            </a>
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