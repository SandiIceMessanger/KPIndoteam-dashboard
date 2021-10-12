<template>
  <div class="fixed-header-menu">
    <nav id="navbarPrimary" class="navbar navbar-expand-lg">
      <div class="container">
        <div class="navbar-mobile" @click="onShowMenu">
          <i class="fas fa-times" v-if="expanded"></i>
          <i class="fas fa-bars" v-if="notExpanded"></i>
          <img class="iconMobileEvent" width="42" height="21" v-if="onShow" :src="this.url" data-not-lazy>
        </div>
        <div class="box-brand">
          <a class="navbar-brand" href="/">
            <img :src="$store.state.identity.logo" width="640" height="360" class="logo" alt="Logo" />
          </a>
        </div>
        <div class="box-search-mobile">
          <i class="fas fa-times" v-if="show" @click="hideShowSearch"></i>
          <i class="fas fa-search" v-if="notShow" @click="showSearch"></i>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item" v-for="data in menuCategory" :key="data.id">
              <a :href="`/categories/${data.slug}`" class="nav-link">
                {{data.title}}
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <div class="nav-user" v-if="$auth.loggedIn">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {{$auth.user.first_name}}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="/dashboard">DASHBOARD</a>
                  <a class="dropdown-item" href="javascript:void(0)" @click="logout">LOGOUT</a>
                </div>
              </div>
            </div>
            <li class="nav-item" v-else>
              <a href="javascript:void(0)" @click="openModalLogin" class="nav-link">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="boxMenuMobile pb-3" v-show="menuMobile">
      <div class="container">
        <div class="row mb-4">
          <div class="col-lg-12 p-0">
            <div class="listMenu">
              <client-only>
                <div class="box-menu-top" v-if="!$auth.loggedIn">
                  <div class="boxs" style="width: 100%;">
                    <a href="javascript:void(0)" @click="openModalLogin">Login</a>
                  </div>
                  <!-- <div class="boxs">
                    <a href="javascript:void(0)" @click="onShowMenu" v-b-modal.form-register>Register</a>
                  </div> -->
                </div>
              </client-only>
              <ul>
                <div v-for="data in menuCategory" :key="data.id" class="menu-mobile">
                  <li>
                    <a :href="`/categories/${data.slug}`">
                      {{data.title}}
                    </a>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal name="loginForm">
      <client-only>
        <div id="form-login">
          <login-form></login-form>
        </div>
      </client-only>
    </modal>
    <div class="search-mobile" v-if="boxSearch">
      <form>
        <div class="input-group">
          <input class="form-control" type="text" @keyup.enter="onSearch" v-model="search" placeholder="Cari Berita" required />
          <div @click="onSearch" class="btn primary-button btn-search"><i class="fas fa-search"></i></div>
        </div>
      </form>
    </div>
    <top-topic></top-topic>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import TopTopic from '~/components/header/TopTopic';
  import LoginForm from '~/components/form/LoginForm';
  import RegisterForm from '~/components/form/RegisterForm';
  export default {
    data () {
      return {
        search: "",
        menuMobile : false,
        expanded: false,
        show: false,
        notShow: true,
        boxSearch: false,
        notExpanded: true,
        menuCategory: [],
        scrollToBottom: false,
        onShow: false,
        url: ''
      }
    },
    computed: {
      ...mapGetters({
        fetchedMenus: 'menus',
        fetchedBannerEvent: 'bannerEvent'
      }),
    },
    async mounted() {
      let filterCategory = this.fetchedMenus.filter(dataarray => {
        return dataarray.object_type == "category";
      });
      this.menuCategory = filterCategory
      window.addEventListener('scroll', this.scrollListener)
      var arrEvent = this.fetchedBannerEvent
      var sortArray = [];
      if (this.fetchedBannerEvent.length != 0) {
          for(var i = 0; i < arrEvent.length;i++){
            if (arrEvent[i].type == 'Header Icon Mobile') {
              this.url = arrEvent[i].image
            }
            sortArray.push(arrEvent[i].type)
          }
      }
      let dataBanner = sortArray;
      const value = 'Header Icon Mobile';
      const isInArray = dataBanner.includes(value);
      if (isInArray) {
        this.onShow = true
      }else{
        this.onShow = false
      }
    },
    methods: {
      scrollListener() {
        this.scrollToBottom = window.scrollY > 56
      },
      logout(){
        localStorage.clear();
        this.$cookies.removeAll()
        location.reload()
      },
      onShowLoginMobile(){
        this.onShowMenu()
        this.$refs['form-login'].show()
      },
      onShowLogin(){
        $('#exampleModalCenter').modal('show')
      },
      onShowMenu() {
        this.hideShowSearch()
        this.menuMobile = !this.menuMobile;
        let el1 = document.getElementsByTagName("BODY")[0];
        if (this.menuMobile == true) {
          el1.classList.add("activeMenu");
          this.expanded = true
          this.notExpanded = false
        }else{
          el1.classList.remove("activeMenu");
          this.expanded = false
          this.notExpanded = true
        }
      },
      hideShowSearch(){
        this.notShow = true
        this.show = false
        this.boxSearch = false
      },
      showSearch() {
        this.notShow = false
        this.show = true
        this.boxSearch = true
        this.menuMobile = false
        let el1 = document.getElementsByTagName("BODY")[0];
        el1.classList.remove("activeMenu");
        this.expanded = false
        this.notExpanded = true

      },
      onSearch() {
        window.location.href = `/search/${this.search}`;
      },
    },
  }
</script>