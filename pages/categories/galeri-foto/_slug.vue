<template>
  <section class="layout-fullscreen">
    <div class="box-fullscreen image-detail-fullscreen">
      <div class="left-fullscreen">
        <div class="bg-left">
          <div class="box-left-screen">
            <div class="btn-close">
              <a href="/categories/galeri-foto">
                <i class="fas fa-times"></i>
              </a>
            </div>
          </div>
          <div class="content-screen">
            <client-only>
              <vue-horizontal-list :items="dataFoto.gallery" :options="options">
                <template v-slot:default="{ item }">
                  <div class="item">
                    <div class="layer-image">
                      <div class="bg-image-artikel">
                        <img :src="item.image">
                      </div>
                      <div class="img-caption">
                        <p>{{item.caption}}</p>
                      </div>
                    </div>
                  </div>
                </template>
              </vue-horizontal-list>
            </client-only>
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
                    <img :src="showLoading ? `${noImage}` : `${dataFoto.avatar}`"/>
                    <span>{{dataFoto.author}}</span>
                    <p>{{formatDateList(dataFoto.date_delimiter)}}</p>
                  </nuxt-link>
                </div>
              </div>
              <div class="desc-infografis">
                <h2>FOTO: {{dataFoto.title}}</h2>
                <div class="desc-detail-teaser">
                  <p v-html="dataFoto.teaser"></p>
                </div>
              </div>
            </div>
            <ListActionFoto ></ListActionFoto>
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
            <ListCommentFoto ></ListCommentFoto>
          </div>
          <FormCommentFoto ></FormCommentFoto>
        </div> 
      </div>
    </div>
    <modal name="modalAgreeGalleriFotoMobile">
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
    <modal name="modalTncGallyFotoMobile">
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
  import VueHorizontalList from "vue-horizontal-list";
  import ListActionFoto from '~/components/gallery-foto/ListActionFoto';
  import ListCommentFoto from '~/components/gallery-foto/ListCommentFoto';
  import FormCommentFoto from '~/components/gallery-foto/FormCommentFoto';
  export default {
    layout: 'infografis',
    name: "auto-play",
    components : {
      VueHorizontalList
    },
    head() {
      let dataFoto = this.$store.state.artikel.detail
      if (dataFoto.gallery.length == 0) {
        var urlImg = require('~/assets/img/no_image.jpg')
      }else{
        var urlImg = dataFoto.gallery[0].image
      }
      return {
        titleTemplate: dataFoto.title + ' | %s',
        meta: [
          { property : 'og:type', content: `Article` },
          { hid : 'og:title', name: 'og:title', content: dataFoto.title },
          { property : "og:description", content: dataFoto.teaser.replace(/<[^>]*>?/gm, '') },
          { property : "og:image", content: urlImg },
          { property : "og:image:width", content : "300" },
          { property : "og:image:height", content : "300" },
        ],
      }
    },
    data () {
      return {
        noImage: require(`~/assets/img/user.jpg`),
        showLoading: true,
        dataFoto: [],
        comment: '',
        scrf_token: '',
        options: {
          responsive: [{ size: 1 }],
        },
      }
    },
    computed: {
      ...mapGetters({
        
      }),
    },
    async fetch({params ,store, error, req}) {
      const server = process.env.BASE_API_URL;
      let token = store.state.token
      let urlData = server+`indonews/v1/gallery-post/${params.slug}`
      let dataDetail = await fetch(urlData, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      store.commit('artikel/SET_DETAIL', dataDetail)
      let urlComments = server+`wp/v2/comments?post=${dataDetail.id}`
      let dataComments = await fetch(urlComments, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
      store.commit('comments/SET_LIST_COMMENTS', dataComments)
    },
    async mounted() {
      this.dataFoto = this.$store.state.artikel.detail
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
        this.$modal.hide('modalAgreeGalleriFotoMobile')
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
            this.$modal.show('modalAgreeGalleriFotoMobile')
          }else{
            this.$modal.show('modalTncGallyFotoMobile')
          }
        }
      },
      async agree() {
        let postdata = {
            id_user: this.$store.state.auth.user.id,
        }
        let response = await this.pushAgreement(postdata);
        if (this.$store.state.comments.checkAgree == 'agree') {
          this.$modal.hide('modalTncGallyFotoMobile')
          this.$modal.show('modalAgreeGalleriFotoMobile')
        }else{
          this.$modal.hide('modalTncGallyFotoMobile')
          this.$modal.hide('modalAgreeGalleriFotoMobile')
        }
      },
      notAgree() {
        this.$modal.hide('modalTncGallyFotoMobile')
      },
    }
  }
</script>