<template>
  <section id="dashboardPage">
    <div class="container containerCustome my-2">
      <div class="row">
        <div class="col-12 col-sm-3 col-md-3 col-lg-3">
          <SkeletonDashboardMenu v-if="showLoading"></SkeletonDashboardMenu>
          <client-only>
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
                    <a href="#" class="active"><i class="far fa-address-book"></i>&nbsp; Aktivitas</a>
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
          </client-only>
        </div>
        <div class="col-12 col-sm-9 col-md-9 col-lg-9">
          <div class="dashboard-right">
            <div class="activity-user">
              <div class="card">
                <div class="card-header">Riwayat Aktivitas</div>
                <div class="card-body">
                  <div class="mb-0">
                  <SkeletonDashboardActivity v-if="showLoading"></SkeletonDashboardActivity>
                  <client-only>
                    <div class="more-activity more-activity-list" v-if="$auth.loggedIn">
                      <div v-if="fetchedActivity.length > 0">
                        <div class="list-activity mb-3 pb-3" v-for="data in fetchedActivity">
                          <div class="media">
                            <div class="media-aside align-self-start mr-3">
                              <img :src="$auth.user.avatar"/>
                            </div>
                            <div class="media-body">
                              <div class="desc-activity-user pt-1">
                                <p class="mb-0"><span>{{$auth.user.first_name}}</span> 
                                  <em v-if="data.status == 'comment_post'">mengomentari</em>
                                  <em v-if="data.status == 'survey_post'">survei</em>
                                  <em v-if="data.status == 'view_post'">membaca</em>  
                                  <span><a :href="`/read/${data.post_slug}`">{{data.post_title}}</a></span>
                                </p>
                                <div class="action-activity">
                                  <p class="mb-0"><i class="far fa-clock"></i> {{formatDateList(data.activity_date)}}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="no-data my-4" v-else>
                        <center>
                          <i class="fab fa-dropbox"></i>
                          <div class="card">
                            <div class="card-body">
                              Maaf, tidak ada riwayat aktivitas Anda.
                            </div>
                          </div>
                        </center>
                      </div>
                    </div>
                  </client-only>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'
  import "@/assets/css/dashboard.css";
  import SkeletonDashboardMenu from '~/components/skeleton/SkeletonDashboardMenu';
  import SkeletonDashboardActivity from '~/components/skeleton/SkeletonDashboardActivity';
  export default {
    data () {
      return {
        noImage: require(`~/assets/img/no_image.jpg`),
        showLoading: true
      }
    },
    computed: {
      ...mapGetters({
        fetchedActivity: 'dashboard/activity'
      }),
    },
    async mounted() {
      this.showLoading = false
      let idUser = this.$store.state.auth.user.id
      await this.$store.dispatch('dashboard/fetchActivity', idUser)
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