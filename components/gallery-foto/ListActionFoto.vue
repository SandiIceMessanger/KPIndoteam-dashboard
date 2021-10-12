<template>
  <div>
    <div class="box-action">
      <div class="action-left">
        <div class="action-wrapper">
          <div class="box-comment-icon"><i class="far fa-comments"></i></div>
          <strong>{{countComment}}</strong>
        </div>
      </div>
      <div class="action-right">
        <div class="box-action-right">
          <p>Share to</p>
          <div class="list-share">
            <a v-if="isShowIndochat" href="javascript:void(0)" @click="goToIndochat">
              <div class="icon-box indochat">
                <img src="@/assets/img/logo-indochat.png"/>
              </div>
            </a>
            <a :href="`https://api.whatsapp.com/send?text=${fullPath}`" target="_blank">
              <div class="icon-box wa-icon">
                <i class="fab fa-whatsapp"></i>
              </div>
            </a>
            <a :href="`https://www.facebook.com/sharer/sharer.php?t=${titleRendered}&u=${fullPath}`" target="_blank">
              <div class="icon-box fb-icon">
                <i class="fab fa-facebook"></i>
              </div>
            </a>
            <a :href="`https://twitter.com/intent/tweet?text=${titleRendered}&u=${fullPath}`" target="_blank">
              <div class="icon-box twiit-icon">
                <i class="fab fa-twitter"></i>
              </div>
            </a>
            <a href="javascript:void(0)" @click="copyLink(fullPath)">
              <div class="icon-box copy-icon">
                <i class="far fa-clone"></i>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data () {
      return {
        countComment: '',
        fullPath : '',
        isShowIndochat: true,
        titleRendered: 'Gallery Photo - Channel Enews'
      }
    },
    computed: {
      
    },
    async mounted() {
      var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        this.isShowIndochat = true
      }
      this.fullPath = window.location.href
      this.countComment = this.$store.state.comments.listComments.length
    },
    methods: {
      ...mapActions({
        pushLove: 'expression/fetchExpression'
      }),
      goToIndochat() {
        let urlUniversal = 'https://indochat.app.link/news'
        let urlShare = process.env.BrachLink+'://share?q='+process.env.BASE_URL+'read/'+this.$route.params.slug
        window.location.replace(urlShare); setTimeout(function () {
          window.location.replace(urlUniversal); 
        }, 2000);
      },
      async love(expression, val) {
        if (this.$store.state.auth.loggedIn == true) {
          let postdata = {
            response_status: val,
            post: this.$store.state.artikel.detail.id,
            id_user: this.$store.state.auth.user.id
          }
          let response = await this.pushLove(postdata);
        }else {
          this.openModalLogin()
        }
      }
    }
  }
</script>