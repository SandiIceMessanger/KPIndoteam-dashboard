<template>
  <div>
    <div class="text-center not-found">
      <h2>Maaf, tidak ada artikel berita.</h2>
      <p>Periksa kembali berita yang ingin Anda baca, <br>atau kembali ke halaman depan.</p>
      <div class="py-5">
        <i class="fab fa-dropbox"></i>
      </div>
      <a href="/">
        Kembali ke halaman depan
      </a>
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
    mounted() {
      
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  .not-found {
    padding-top: 5rem !important;
  }
  .not-found h2{
    color: #3b3b3b !important;
    font-size: 27px !important;
  }
  .not-found p {
    color: #cfcfcf !important;
    font-size: 18px !important;
  }
  .not-found i {
    font-size: 6rem;
  }
  @media screen and (max-width: 495px) {
    .not-found {
      padding-top: 3rem !important;
    }
    .not-found .py-5 {
      padding: 2rem 0px !important;
    }
    .not-found h2{
      font-size: 22px !important;
    }
    .not-found p {
      font-size: 15px !important;
    }
    .not-found i {
      font-size: 5rem;
    }
  }
</style>