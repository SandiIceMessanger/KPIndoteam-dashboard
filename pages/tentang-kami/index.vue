<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8 mx-auto">
          <div class="about-us">
            <h2>Tentang Kami</h2>
            <p>Chatnews merupakan portal berita yang menjadi fitur aplikasi messenger Indochat. Untuk menjangkau pengguna lebih luas, Chatnews juga bisa diakses melalui mobile maupun desktop. Tagline kami adalah “Bridging Newstainment”.</p>
            <p>Chatnews menyajikan informasi akurat terkini, faktual dan menginspirasi pembaca. Redaksi Chatnews dikelola oleh jurnalis berpengalaman dan taat pada kode etik jurnalistik yang ditetapkan Dewan Pers.</p>
            <p>Chatnews juga menjalin kerja sama dengan Antara Digital sebagai saluran informasi terkait pembangunan di seluruh daerah Indonesia. Selain berita-berita pembangunan daerah, Chatnews juga menyajikan keragaman konten, seperti gaya hidup, kesehatan, entertainment, otomotif, sport dan lain-lain.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "@/assets/css/about.css";
  import SidebarTopikTerkait from '~/components/sidebar/SidebarTopikTerkait';
  import SidebarTerpopuler from '~/components/sidebar/SidebarTerpopuler';
  export default {
    data () {
      return {
        
      }
    },
    head() {
      return {
        titleTemplate: 'Tentang Kami - %s',
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