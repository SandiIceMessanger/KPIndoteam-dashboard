<template>
  <section class="layout-fullscreen">
    <div class="box-fullscreen">
      <div class="left-fullscreen">
        <div class="bg-left">
          <div class="box-left-screen">
            <div class="btn-close">
              <a href="/categories/infografis">
                <i class="fas fa-times"></i>
              </a>
            </div>
          </div>
          <div class="content-screen">
            <div class="loading text-center" v-if="showLoading">
              <i class="fas fa-spinner"></i>
            </div>
            <img :src="imgInfografis" />
          </div>
        </div>
      </div>
      <div class="right-fullscreen">
        <div class="bg-right">
          <div class="right-top">
            <div class="box-desc">
              <div class="box-user">
                <div class="box-avatar-creator">
                  <nuxt-link to="#">
                    <img :src="showLoading ? `${noImage}` : `${imgAuthor}`"/>
                    <span v-if="dataInfografis._embedded">{{dataInfografis._embedded.author[0].name}}</span>
                    <p>{{formatDateList(dataInfografis.date_gmt)}}</p>
                  </nuxt-link>
                </div>
              </div>
              <div class="desc-infografis">
                <div class="desc-detail-teaser">
                  <p v-if="dataInfografis.content" v-html="dataInfografis.content.rendered"></p>
                </div>
              </div>
            </div>
            <ListActionInfografis ></ListActionInfografis>
          </div>
          <div class="box-comment-mobile">
            <div class="form-comment">
              <div class="form">
                <div class="form-group mb-0">
                  <textarea class="form-control" v-model="comment" placeholder="Komentar Anda..." maxlength="1000"></textarea>
                  <input type="hidden" name="_csrf" v-model="scrf_token">
                </div>
                <button type="button" @click="onShowNotice" :disabled="comment.length < 5" class="btn btn-primary float-right primary-button"><i class="far fa-paper-plane"></i></button>
              </div>
            </div>
          </div>
          <div class="right-bottom">
            <ListCommentInfografis></ListCommentInfografis>
          </div>
          <FormCommentInfografis></FormCommentInfografis>
        </div> 
      </div>
    </div>
    <modal name="modalAgreeInfografisMobile">
      <client-only>
        <div id="form-login">
          <div id="modalNotice" class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div class="text-expression text-center">
                  <p class="mb-0">Apakah Anda yakin dengan komentar ini?</p>
                  <div class="box-btns mt-4">
                    <button class="yes" @click="onSubmit">
                      YA
                    </button>
                    <button class="no" @click="hideModal">
                      TIDAK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </client-only>
    </modal>
    <modal name="modalTncInfografisMobile">
      <client-only>
        <div id="form-login">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div class="popupNoticeTnC">
                  <p class="text-muted tnc">Berkomentarlah secara bijak dan bertanggung jawab. Komentar sepenuhnya menjadi tanggung jawab Anda seperti yang diatur dalam UU ITE, <a href="/tnc-komentar" target="_blank">Selengkapnya <i class="fas fa-chevron-right"></i></a></p>
                  <button class="agree" @click="agree">Setuju</button>&nbsp;
                  <button class="not-agree" @click="notAgree">Tidak setuju</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </client-only>
    </modal>
    <modal name="loginForm">
      <client-only>
        <div id="form-login">
          <login-form></login-form>
        </div>
      </client-only>
    </modal>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import "@/assets/css/fullscreen.css";
  import ListActionInfografis from '~/components/infografis/ListActionInfografis';
  import ListCommentInfografis from '~/components/infografis/ListCommentInfografis';
  import FormCommentInfografis from '~/components/infografis/FormCommentInfografis';
  export default {
    layout: 'infografis',
    components : {
      
    },
    head() {
      let dataInfografis = this.$store.state.artikel.detail
      return {
        titleTemplate: dataInfografis.title.rendered + ' | %s',
        meta: [
          { property : 'og:type', content: `Article` },
          { hid : 'og:title', name: 'og:title', content: dataInfografis.title.rendered },
          { property : "og:description", content: dataInfografis.excerpt.rendered.replace(/<[^>]*>?/gm, '') },
          { property : "og:image", content: dataInfografis._embedded[`wp:featuredmedia`][0].source_url },
          { property : "og:image:width", content : "300" },
          { property : "og:image:height", content : "300" },
        ],
      }
    },
    data () {
      return {
        noImage: require(`~/assets/img/user.jpg`),
        showLoading: true,
        dataInfografis: [],
        imgInfografis: '',
        comment: '',
        imgAuthor: '',
        scrf_token: ''
      }
    },
    computed: {
      ...mapGetters({
        
      }),
    },
    async fetch({params ,store, error, req}) {
      const server = process.env.BASE_API_URL;
      let token = store.state.token
      let urlData = server+`wp/v2/posts?slug=${params.slug}&_embed`
      let dataDetail = await fetch(urlData, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      let resDetail = [];
      if(dataDetail.length > 0){
        resDetail = dataDetail[0]
        let urlComments = server+`wp/v2/comments?post=${dataDetail[0].id}`
        let dataComments = await fetch(urlComments, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
        store.commit('comments/SET_LIST_COMMENTS', dataComments)
      }
      store.commit('artikel/SET_DETAIL', resDetail)
    },
    created () {
      if (this.$store.state.artikel.detail.length == 0) {
        this.$router.push( "/not-found" )
      }
    },
    async mounted() {
      this.dataInfografis = this.$store.state.artikel.detail
      this.imgInfografis = this.dataInfografis._embedded[`wp:featuredmedia`][0].source_url
      this.imgAuthor = this.dataInfografis._embedded.author[0].avatar_urls['48']
      this.showLoading = false
      if (this.$store.state.auth.loggedIn == false) {
        this.scrf_token = Date.now()
      }else{
        this.scrf_token = this.$store.state.auth.user.csrf_token
      }
    },
    methods: {
      ...mapActions({
        pushComment: 'comments/fetchSubmitComment',
        checkAgreement: 'comments/fetchCheckAgreement',
        pushAgreement: 'comments/fetchSubmitAgreement'
      }),
      async onSubmit() {
        let postdata = {
          content: this.comment,
          post: this.$store.state.artikel.detail.id,
          id_user: this.$store.state.auth.user.id,
          _csrf: this.$store.state.auth.user.csrf_token,
          web_push_token: localStorage.getItem('tokenNotif'),
          web_push_token_update_time: localStorage.getItem('tokenTime'),
          slug: this.$route.params.slug
          //status: 'hold'
        }
        let response = await this.pushComment(postdata);
        this.comment = ''
        location.reload();
        this.hideModal()
      },
      hideModal() {
        this.$modal.hide('modalAgreeInfografisMobile')
      },
      async onShowNotice() {
        if (this.$store.state.auth.loggedIn == false) {
          this.openModalLogin()
        }else{
          let postdata = {
            id_user: this.$store.state.auth.user.id,
            code: Math.random().toString(36).substring(7)
          }
          let response = await this.checkAgreement(postdata);
          if (this.$store.state.comments.checkAgree == 'agree') {
            this.$modal.show('modalAgreeInfografisMobile')
          }else{
            this.$modal.show('modalTncInfografisMobile')
          }
        }
      },
      async agree() {
        let postdata = {
            id_user: this.$store.state.auth.user.id,
        }
        let response = await this.pushAgreement(postdata);
        if (this.$store.state.comments.checkAgree == 'agree') {
          this.$modal.hide('modalTncInfografisMobile')
          this.$modal.show('modalAgreeInfografisMobile')
        }else{
          this.$modal.hide('modalTncInfografisMobile')
          this.$modal.hide('modalAgreeInfografisMobile')
        }
      },
      notAgree() {
        this.$modal.hide('modalTncInfografisMobile')
      },
    }
  }
</script>