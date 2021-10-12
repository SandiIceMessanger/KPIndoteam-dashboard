<template>
  <div>
    <div class="section-recomendation skeleton-horizontal">
      <b-row>
        <b-col cols="6" lg="">
          <div class="box-recomendation">
            <a href="#">
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image"></span>
              </div>
              <div class="o-media__body">
                <div class="o-vertical-spacing">
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content"></span>
                  </p>
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content-bottom"></span>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </b-col>
        <b-col cols="6" lg="">
          <div class="box-recomendation">
            <a href="#">
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image"></span>
              </div>
              <div class="o-media__body">
                <div class="o-vertical-spacing">
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content"></span>
                  </p>
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content-bottom"></span>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </b-col>
        <b-col cols="6" lg="">
          <div class="box-recomendation">
            <a href="#">
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image"></span>
              </div>
              <div class="o-media__body">
                <div class="o-vertical-spacing">
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content"></span>
                  </p>
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content-bottom"></span>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </b-col>
        <b-col cols="6" lg="">
          <div class="box-recomendation">
            <a href="#">
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image"></span>
              </div>
              <div class="o-media__body">
                <div class="o-vertical-spacing">
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content"></span>
                  </p>
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content-bottom"></span>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </b-col>
        <b-col cols="6" lg="">
          <div class="box-recomendation">
            <a href="#">
              <div class="o-media__figure">
                <span class="skeleton-box skeleton-image"></span>
              </div>
              <div class="o-media__body">
                <div class="o-vertical-spacing">
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content"></span>
                  </p>
                  <p class="mb-0">
                    <span class="skeleton-box skeleton-content-bottom"></span>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </b-col>
      </b-row>
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
  .o-vertical-spacing {
    padding-top: 10px;
  }
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

  .blog-post__headline {
    font-size: 1.25em;
    font-weight: bold;
  }
  .blog-post__meta {
    font-size: 0.85em;
    color: #6b6b6b;
  }
  .o-media__body {
    flex-grow: 1;
  }
</style>