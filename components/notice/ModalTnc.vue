<template>
  <div>
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    },
    computed: {
      
    },
    mounted() {
      
    },
    methods: {
      agree() {
        this.$modal.hide('modalTnc')
        this.$modal.show('modalAgree')
      },
      notAgree() {
        this.$modal.hide('modalTnc')
      }
    },
  }
</script>