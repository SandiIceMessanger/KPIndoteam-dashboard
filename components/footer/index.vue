<template>
  <footer class="pt-5 mt-5 pb-3">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 col-lg-4 flex-wrap mb-4 mb-md-0">
          <div class="logo_footer mb-3">
            <img :src="$store.state.identity.logo" width="640" height="360" alt="Logo" />
          </div>
          <p class="m-0 text-white copyright">Copyright ©2021 CHATNEWS</p>
          <p class="m-0 text-white copyright">All Rights Reserved</p>
        </div>
        <div class="col-12 col-md-5 col-lg-5 d-none d-sm-block">
          <div class="menu_footer">
            <ul>
              <li class="mb-2">
                <a href="tentang-kami">Tentang Kami</a>
              </li>
              <li class="mb-2">
                <a href="/kebijakan-privasi">Kebijakan Privasi</a>
              </li>
              <li class="mb-2">
                <a href="/contact">Hubungi Kami</a>
              </li>
            </ul>
          </div>
          <div class="menu_footer">
            <ul>
              <li class="mb-2">
                <a href="/pedoman-media-siber">Pedoman Media Siber</a>
              </li>
              <li class="mb-2">
                <a href="/disclaimer">Disclaimer</a>
              </li>
              <li class="mb-2">
                <a href="/kode-etik">Kode Etik</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-3 col-lg-3">
          <div class="download_apps">
            <h3>Ikuti kami:</h3>
            <a :href="$store.state.identity.facebook" class="bg-icon icon-facebook" v-if="$store.state.identity.facebook">
              <i class="fab fa-facebook"></i>
            </a>
            <a :href="$store.state.identity.instagram" class="bg-icon icon-instagram" v-if="$store.state.identity.instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a :href="$store.state.identity.twitter" class="bg-icon icon-twitter" v-if="$store.state.identity.twitter">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      <hr style="border-top: 1px solid #ff8e8e;margin-top: 30px;">
      <div class="col-12">
        <div class="powered">
          <p class="m-0 text-white text-center copyright">Powered by <a href="http://www.imq21.com/antara-digital-media" target="_blank">PT IMQ Multimedia Utama (Antara Digital)</a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    computed: {
      
    },
    mounted() {
      
    },
    methods: {
      
    },
  }
</script>