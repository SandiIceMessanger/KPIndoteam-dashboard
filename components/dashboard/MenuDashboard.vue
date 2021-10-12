<template>
  <div>
    <div class="box-dashboard-left" v-if="$auth.loggedIn">
      <div class="avatar-user">
        <div class="media">
          <div class="media-aside align-self-center mr-3">
            <img :src="$auth.user.avatar"/>
          </div>
          <div class="media-body">
            <h5 class="mt-3 mb-0">{{$auth.user.first_name}}</h5>
            <div class="status-user">
              <i class="fas fa-circle"></i> <span>Online</span>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-user">
        <ul>
          <li>
            <a href="#" class="active"><i class="fas fa-th-large"></i>&nbsp; Dashboard</a>
          </li>
          <li>
            <a href="/dashboard/aktivitas"><i class="far fa-address-book"></i>&nbsp; Aktivitas</a>
          </li>
          <!-- <li>
            <a href="/dashboard/akun"><i class="far fa-user"></i>&nbsp; Kelola Akun</a>
          </li> -->
          <li>
            <a href="javascript:void(0)" @click="logout"><i class="fas fa-power-off"></i>&nbsp; Logout</a>
          </li>
        </ul>
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
      logout(){
        localStorage.clear();
        this.$cookies.removeAll()
        window.location.href = "/";
      }
    }
  }
</script>