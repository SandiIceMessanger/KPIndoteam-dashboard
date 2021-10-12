<template>
  <section id="dashboardPage">
    <div class="container containerCustome my-2">
      <div class="row">
        <div class="col-12 col-sm-3 col-md-3 col-lg-3">
          <SkeletonDashboardMenu v-if="showLoading"></SkeletonDashboardMenu>
          <client-only>
            <div class="dashboard-left sticky-top">
              <menu-dashboard></menu-dashboard>
            </div>
          </client-only>
        </div>
        <div class="col-12 col-sm-9 col-md-9 col-lg-9">
          <div class="dashboard-right">
            <activity :listActivity="fetchedActivity"></activity>
            <recomendation></recomendation>
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
  import MenuDashboard from '~/components/dashboard/MenuDashboard';
  import Activity from '~/components/dashboard/Activity';
  import Recomendation from '~/components/dashboard/Recomendation';
  import SkeletonDashboardActivity from '~/components/skeleton/SkeletonDashboardActivity';
  export default {
    //middleware: 'authenticated',
    data () {
      return {
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

    },
  }
</script>