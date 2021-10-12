<template>
  <div>
    <div class="comments">
      <div class="card my-4">
        <h5 class="card-header">Tinggalkan Komentar:</h5>
        <div class="card-body">
          <form>
            <div class="form-group mb-0">
              <textarea class="form-control" rows="4" placeholder="Komentar Anda..." maxlength="1000" v-model="content"></textarea>
              <input type="hidden" name="_csrf" v-model="scrf_token">
              <span class="text-muted">{{1000 - content.length}} Karakter tersisa</span>
            </div>
            <div class="boxSubmit">
              <button v-if="content.length > 10" type="button" class="btn btn-primary float-right primary-button" @click="onShowNotice">Submit</button>
              <div class="spinner" v-if="onShowSpinner">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i>
              </div>
            </div>
          </form>
        </div>
      </div>
      <list-comments :listCommentar="fetchedListComment"></list-comments>
      <modal name="modalAgree">
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
      <modal name="modalTnc">
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
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import ListComments from '~/components/read/ListComments';
  import LoginForm from '~/components/form/LoginForm';
  export default {
    data () {
      return {
        content: '',
        onShowSpinner: false,
        scrf_token: '',
        listKomentars: []
      }
    },
    computed: {
      ...mapGetters({
        fetchedListComment: 'comments/listComments'
      }),
    },
    async mounted() {
      this.listKomentars = this.$store.state.comments.listComments
      //console.log(this.fetchedListComment)
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
        pushAgreement: 'comments/fetchSubmitAgreement',
        pushGetComment: 'comments/fetchGetComment'
      }),
      async onSubmit() {
        let postdata = {
          content: this.content,
          post: this.$store.state.artikel.detail.id,
          id_user: this.$store.state.auth.user.id,
          _csrf: this.$store.state.auth.user.csrf_token,
          web_push_token: localStorage.getItem('tokenNotif'),
          web_push_token_update_time: localStorage.getItem('tokenTime'),
          slug: this.$route.params.slug
          //status: 'hold'
        }
        let response = await this.pushComment(postdata);
        let payload = {
          idPost: this.$store.state.artikel.detail.id,
          tokenGlobal: this.$store.state.token
        }
        await this.pushGetComment(payload)
        this.content = ''
        this.hideModal()
      },
      async onShowNotice() {
        this.onShowSpinner = true
        if (this.$store.state.auth.loggedIn == false) {
          this.openModalLogin()
        }else{
          let checkAgrement = localStorage.getItem('statusAgreement')
          if (!checkAgrement) {
            let postdata = {
              id_user: this.$store.state.auth.user.id,
              code: Math.random().toString(36).substring(7)
            }
            let response = await this.checkAgreement(postdata);
            if (this.$store.state.comments.checkAgree == 'agree') {
              this.$modal.show('modalAgree')
              this.onShowSpinner = false
            }
          }else{
            this.$modal.show('modalAgree')
            this.onShowSpinner = false
          }
        }
      },
      hideModal() {
        this.$modal.hide('modalAgree')
      },
      async agree() {
        let postdata = {
            id_user: this.$store.state.auth.user.id,
        }
        let response = await this.pushAgreement(postdata);
        if (this.$store.state.comments.checkAgree == 'agree') {
          this.$modal.hide('modalTnc')
          this.$modal.show('modalAgree')
        }else{
          this.$modal.hide('modalTnc')
          this.$modal.hide('modalAgree')
        }
      },
      notAgree() {
        this.$modal.hide('modalTnc')
      }
    }
  }
</script>