<template>
  <div>
    <div class="box-info">
      <div class="card">
        <div class="card-body">
          <div class="mb-2" v-html="address"></div>
          <div class="listContact">
            <p><i class="fas fa-phone-alt"></i>&nbsp; {{$store.state.identity.phone}}</p>
            <p><i class="fas fa-fax"></i>&nbsp; {{$store.state.identity.email}}</p>
            <p><i class="far fa-envelope"></i>&nbsp; {{$store.state.identity.email}}</p>
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
        address: ''
      }
    },
    computed: {
      
    },
    mounted() {
      this.address = this.$store.state.identity.address
    },
    methods: {
      
    }
  }
</script>