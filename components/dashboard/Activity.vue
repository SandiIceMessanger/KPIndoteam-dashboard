<template>
  <div>
    <div class="activity-user">
      <div class="card">
        <div class="card-header">Riwayat Aktivitas</div>
        <div class="card-body">
          <div class="mt-4 mb-0">
            <SkeletonDashboardActivity v-if="showLoading"></SkeletonDashboardActivity>
            <client-only>
              <div v-if="$auth.loggedIn">
                <div v-if="listActivity.length > 0">
                  <div class="list-activity mb-3 pb-3" v-for="data in listActivity.slice(0, 4)">
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
                  <div class="more-activity text-center">
                    <a href="/dashboard/aktivitas">Lihat semua aktivitas</a>
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
</template>

<script>
  export default {
    props: [
      'listActivity',
    ],
    data () {
      return {
        showLoading: true
      }
    },
    computed: {
      
    },
    async mounted() {
      this.showLoading = false
    },
    methods: {
      
    }
  }
</script>