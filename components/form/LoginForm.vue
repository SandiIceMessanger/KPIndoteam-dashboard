<template>
  <div style="display: inline-block;top: 25%;position: relative;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <img class="brand-text" src="@/assets/img/logo_tulisan.svg"/>
          <form @submit="onSubmit">
            <!-- <b-form-group>
              <b-form-input
                v-model="phone"
                type="text"
                placeholder="Enter Indochat number"
                maxlength="14"
                required
              ></b-form-input>
              <b-form-text class="onError">
                <span v-if="showError">Maaf, hanya untuk nomor Indonesia</span>
                <span v-if="showNull">No telepon tidak boleh kosong</span>
                <span v-if="showIncorrect">Periksa kembali nomor telepon Anda</span>
              </b-form-text>
            </b-form-group> -->
            <div @click="onSubmit" class="btn btn-block primary-button mt-3">LOG IN</div>
            <p class="text-center mt-2 mb-0">By signing up, you are agree with the <nuxt-link to="/#">Terms and Conditions</nuxt-link> applied.</p>
          </form>
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
        phone: '',
        showError: false,
        showNull: false,
        showIncorrect: false
      }
    },
    computed: {
      
    },
    watch: {
      phone() {
        this.showNull = false
        var a = this.phone.replace(/[^0-9]/g, '').substr(0, 9);
        if (this.phone.length == 4) {
          this.phone = a.substring(0, 4) + '-' + a.substring(4, a.length)
        }else if (this.phone.length == 9) {
          this.phone = a.substring(0, 4) + '-' + a.substring(4, 8) + '-'
        }else if (this.phone.length >= 12) {
          this.showIncorrect = false
        }
      },
    },
    async mounted() {
      
    },
    methods: {
      ...mapActions({
        pushGetOtp: 'login/fetchGetOtp'
      }),

      async onSubmit() {
        let lastUrl = window.location.href
        let session = Math.random().toString(36).substring(7);
        localStorage.setItem('session', `${session}`);
        let redirect = `${process.env.URL_REDIRECT_LOGIN}indochat/oauth2?redirecturi=${lastUrl}&session=${session}`
        window.location.href = redirect
  
        // let payload = {
        //   phone: this.phone.replace(/-/g, "")
        // }
        // if (this.phone == '') {
        //   this.showIncorrect = false
        //   this.showNull = true
        // }else if (this.phone.length <= 10) {
        //   this.showIncorrect = true
        //   this.showNull = false
        // }else{
        //   let response = await this.pushGetOtp(payload);
        //   console.log(this.phone.replace(/-/g, ""))
        // }
      },
    },
  }
</script>