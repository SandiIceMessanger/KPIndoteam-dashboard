<template>
  <div>
    <div class="list-expresion my-4">
      <ul>
        <li>
          <a href="javascript:void(0)" @click="onShowNitice('suka', 'srv_good')" title="Suka">
            <img src="@/assets/img/emoticon/suka.svg" class="img-fluid" alt="Suka">
            <p class="percent mb-0">{{parseFloat(expression_good).toFixed(1)}}%</p>
            <p class="mb-0">Suka</p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="onShowNitice('lucu', 'srv_v_good')" title="Lucu">
            <img src="@/assets/img/emoticon/lucu.svg" class="img-fluid" alt="Lucu">
            <p class="percent mb-0">{{parseFloat(expression_very_good).toFixed(1)}}%</p>
            <p class="mb-0">Lucu</p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="onShowNitice('kaget', 'srv_avg')" title="Kaget">
            <img src="@/assets/img/emoticon/kaget.svg" class="img-fluid" alt="Kaget">
            <p class="percent mb-0">{{parseFloat(expression_avg).toFixed(1)}}%</p>
            <p class="mb-0">Kaget</p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="onShowNitice('sedih', 'srv_poor')" title="Sedih">
            <img src="@/assets/img/emoticon/sedih.svg" class="img-fluid" alt="Sedih">
            <p class="percent mb-0">{{parseFloat(expression_poor).toFixed(1)}}%</p>
            <p class="mb-0">Sedih</p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="onShowNitice('marah', 'srv_v_poor')" title="Marah">
            <img src="@/assets/img/emoticon/marah.svg" class="img-fluid" alt="Marah">
            <p class="percent mb-0">{{parseFloat(expression_very_poor).toFixed(1)}}%</p>
            <p class="mb-0">Marah</p>
          </a>
        </li>
      </ul>
    </div>
    <modal name="modalConfirmation">
      <client-only>
        <div id="modalNotice">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="text-expression text-center py-4">
                <p class="mb-0">Apakah Anda yakin {{expression}} dengan artikel ini?</p>
                <div class="box-btns mt-4">
                  <button class="yes" @click="onExpresion(val)">
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
        expression: {},
        expression_good: 0,
        expression_very_good: 0,
        expression_avg: 0,
        expression_poor: 0,
        expression_very_poor: 0,
      }
    },
    computed: {
      
    },
    async mounted() {
      this.expression = this.$store.state.expression.countExpressions['Data Survey']
      this.expression_good = this.expression.good
      this.expression_very_good = this.expression['very-good']
      this.expression_avg = this.expression.avg
      this.expression_poor = this.expression.poor
      this.expression_very_poor = this.expression['very-poor']
    },
    methods: {
      ...mapActions({
        pushExpression: 'expression/fetchExpression'
      }),
      async onExpresion(id) {
        let postdata = {
          response_status: id,
          post: this.$store.state.artikel.detail.id,
          id_user: this.$store.state.auth.user.id,
          web_push_token: localStorage.getItem('tokenNotif'),
          web_push_token_update_time: localStorage.getItem('tokenTime')
        }
        let response = await this.pushExpression(postdata);
        this.$modal.hide('modalConfirmation');
      },
      onShowNitice(expression, val) {
        if (this.$store.state.auth.loggedIn == true) {
          this.val = val
          this.expression = expression
          this.$modal.show('modalConfirmation')
        }else {
          this.openModalLogin()
        }
      },
      hideModal() {
        this.$modal.hide('modalConfirmation');
      },
    }
  }
</script>