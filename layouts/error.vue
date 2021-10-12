<template>
  <div>
    <client-only>
      <div class="container">
        <div class="row">
          <div class="col-lg-12 py-5">
            <div class="text-center not-found pt-4" v-if="error.statusCode == 404">
              <h2>Maaf, halaman tidak ditemukan.</h2>
              <p>Periksa kembali link yang ingin kamu tuju atau kembali ke halaman depan.</p>
              <div class="py-5">
                <i class="fab fa-dropbox"></i>
              </div>
              <a href="/">
                Kembali ke halaman depan
              </a>
            </div>
            <div class="text-center not-found not-auth pt-4" v-if="error.statusCode == 401">
              <h2>{{error.status}}</h2>
              <p>No authorization found.</p>
              <div class="py-2">
                <i class="fas fa-key"></i>
              </div>
            </div>
            <div class="text-center not-found error500 pt-4" v-if="error.statusCode == 500">
              <h2>Maaf, sedang terjadi kesalahan.</h2>
              <p>Mohon ulangi kembali</p>
              <div class="py-5">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <a href="/">
                Kembali ke halaman depan
              </a>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    data () {
      return {
        
      }
    },
    mounted() {

    },
    methods: {

    },
  }
</script>