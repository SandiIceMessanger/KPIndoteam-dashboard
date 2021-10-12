<template>
  <div>
    <div id="modalNotice" class="modal-dialog">
      <div class="modal-content">
        <div class="text-expression text-center py-4">
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
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    props: [
      'data',
    ],
    data () {
      return {
        
      }
    },
    computed: {
      
    },
    mounted() {
      
    },
    methods: {
      ...mapActions({
        pushComment: 'comments/fetchSubmitComment'
      }),
      async onSubmit() {
        let postdata = {
          content: this.data,
          post: this.$store.state.artikel.detail.ID,
          id_user: this.$store.state.auth.user.id
        }
        let response = await this.pushComment(postdata);
        //this.onShowNotifComment()
        this.$modal.hide('modalAgree')
        location.reload();
      },
      hideModal() {
        this.$modal.hide('modalAgree')
      }
    },
  }
</script>