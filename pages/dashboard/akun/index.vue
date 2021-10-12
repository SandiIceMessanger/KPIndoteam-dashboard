<template>
  <section id="dashboardPage" class="akunPage">
    <client-only>
      <div class="container containerCustome my-2">
        <div class="row">
          <div class="col-12 col-sm-3 col-md-3 col-lg-3">
            <div class="dashboard-left sticky-top" v-if="$auth.loggedIn">
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
                    <a href="/dashboard"><i class="fas fa-th-large"></i>&nbsp; Dashboard</a>
                  </li>
                  <li>
                    <a href="/aktivitas"><i class="far fa-address-book"></i>&nbsp; Aktivitas</a>
                  </li>
                  <!-- <li>
                    <a href="#" class="active"><i class="far fa-user"></i>&nbsp; Kelola Akun</a>
                  </li> -->
                  <li>
                    <a href="javascript:void(0)" @click="logout"><i class="fas fa-power-off"></i>&nbsp; Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-9 col-md-9 col-lg-9">
            <div class="dashboard-right" v-if="$auth.loggedIn">
              <div class="akun-user">
                <div class="card">
                  <div class="card-header">
                    Kelola Akun
                    <div class="edit-akun float-right">
                      <a href="javascript:void(0)">
                        <i class="far fa-edit"></i> <span>Ubah</span>
                      </a>
                    </div>
                  </div>
                  <div class="card-body">
                    <table>
                    <tr>
                      <td class="label">Nama</td>
                      <td>{{$auth.user.first_name}}</td>
                    </tr>
                    <!-- <tr>
                      <td class="label">Email</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td class="label">No HP</td>
                      <td>+62 838 8237 7282</td>
                    </tr> -->
                  </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'
  import "@/assets/css/dashboard.css";
  export default {
    data () {
      return {
        
      }
    },
    computed: {
      ...mapGetters({
        
      }),
    },
    mounted() {
      
    },
    methods: {
      logout(){
        localStorage.clear();
        this.$cookies.removeAll()
        window.location.href = "/";
      }
    },
  }
</script>