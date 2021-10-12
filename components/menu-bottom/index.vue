<template>
  <div class="menu-bottom">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <a href="/">
            <i class="fas fa-home"></i>
            <p>Beranda</p>
          </a>
        </div>
        <div class="col-4">
          <div class="dashboard">
            <a href="/dashboard">
              <img :src="$auth.user.avatar"/>
              <p>Dashboard</p>
            </a>
          </div>
        </div>
        <div class="col-4">
          <a href="javascript:void(0)" @click="logout">
            <i class="fas fa-power-off"></i>
            <p>Logout</p>
          </a>
        </div>
      </div>
    </div>
  </div>
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
      logout(){
        localStorage.clear();
        this.$cookies.removeAll()
        location.reload()
      }
    },
  }
</script>