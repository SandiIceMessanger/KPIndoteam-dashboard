<template>
<section id="detailPage">
  <div class="container-detail">
    <div class="row">
      <div class="col-12 col-sm-8 col-md-8 col-lg-8">
        <nav aria-label="breadcrumb" class="breadcrumb-detail">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item">
              <a href="/covid">Covid</a>
            </li>
            <li class="breadcrumb-item">
              <a href="/corona">Corona</a>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>


  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8 mx-auto">
          <div class="about-us">
            <sembilan-belas />
            <h2>Artikel Tentang Covid</h2>
              <p>
                covid merupakan penyakit berbentuk mahkota membara melanglang buana sepanjang masa
              </p>
            <sembilan-dua />
          </div>
          
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
  import "@/assets/css/about.css";
  import SembilanBelas from "~/components/sembilan-belas/MasalahBaru";
  import SembilanDua   from "~/components/sembilan-belas/MasalahLama";

  export default {
    components : {
      SembilanBelas,
      SembilanDua
    },
    data () {
      return {
        
      }
    },
    head() {
      return {
        titleTemplate: 'Covid Membludak - %s',
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