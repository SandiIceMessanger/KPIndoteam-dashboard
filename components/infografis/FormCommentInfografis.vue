<template>
  <div>
    <div class="box-comment-desktop">
      <div class="form-comment">
        <div class="form">
          <div class="form-group mb-0">
            <textarea class="form-control" placeholder="Komentar Anda..." maxlength="500" v-model="comment"></textarea>
            <input type="hidden" name="_csrf" v-model="scrf_token">
          </div>
          <button class="btn btn-primary float-right primary-button" @click="onShowNotice" :disabled="comment.length < 5"><i class="far fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
    <modal name="modalAgreeInfografis">
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
    <modal name="modalTncInfografis">
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
</template>

<script>
  import { mapActions } from 'vuex';
  import LoginForm from '~/components/form/LoginForm';
  export default {
    data () {
      return {
        countComment: '',
        comment: '',
        scrf_token: ''
      }
    },
    computed: {
      
    },
    async mounted() {
      this.countComment = this.$store.state.comments.listComments.length
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
        this.$modal.hide('modalAgreeInfografis')
      },
      async onShowNotice() {
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
          }
          if(this.$store.state.comments.checkAgree == 'agree'){
            this.$modal.show('modalAgreeInfografis')
          }else{
            this.$modal.show('modalTncInfografis')
          }
        }
      },
      async agree() {
        let postdata = {
            id_user: this.$store.state.auth.user.id,
        }
        let response = await this.pushAgreement(postdata);
        if (this.$store.state.comments.checkAgree == 'agree') {
          this.$modal.hide('modalTncInfografis')
          this.$modal.show('modalAgreeInfografis')
        }else{
          this.$modal.hide('modalTncInfografis')
          this.$modal.hide('modalAgreeInfografis')
        }
      },
      notAgree() {
        this.$modal.hide('modalTncInfografis')
      },
    }
  }
</script>