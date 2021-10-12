<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-sm-8 col-md-8 col-lg-8">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">
              <span v-html="dataTitle"></span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'dataTitle',
    ],
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