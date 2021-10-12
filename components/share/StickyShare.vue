<template>
  <div>
    <div class="share">
      <ul>
        <p>Share: </p>
        <li v-if="isShowIndochat">
          <a id="anchor" href="javascript:void(0)" @click="goToIndochat">
            <div class="sosmed-share indochat">
              <img src="@/assets/img/logo-indochat.png"/>
            </div>
          </a>
        </li>
        <li>
          <a :href="`https://www.facebook.com/sharer/sharer.php?t=${titleRendered}&u=${fullPath}`" target="_blank">
            <div class="sosmed-share fb">
              <i class="fab fa-facebook"></i>
            </div>
          </a>
        </li>
        <li>
          <a :href="`https://twitter.com/intent/tweet?text=${titleRendered}&u=${fullPath}`" target="_blank">
            <div class="sosmed-share tw">
              <i class="fab fa-twitter"></i>
            </div>
          </a>
        </li>
        <li>
          <a :href="`https://api.whatsapp.com/send?text=${fullPath}`" target="_blank">
            <div class="sosmed-share wa">
              <i class="fab fa-whatsapp"></i>
            </div>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="copyLink(fullPath)">
            <div class="sosmed-share copy">
              <i class="far fa-clone"></i>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <modal name="linkCopied">
      <client-only>
        <div id="linkCopied">
          <div class="modal-dialog">
            <div class="modal-content">
              <p>Link Copied</p>
            </div>
          </div>
        </div>
      </client-only>
    </modal>
  </div>
</template>

<script>
  export default {
    props: [
      'data',
    ],
    data () {
      return {
        fullPath : '',
        titleRendered: '',
        isShowIndochat: false
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
      this.stripHtml(this.$store.state.artikel.detail.title.rendered)
    },
    methods: {
      goToIndochat() {
        let urlUniversal = 'https://indochat.app.link/news'
        let urlShare = process.env.BrachLink+'://share?q='+process.env.BASE_URL+'read/'+this.$route.params.slug
        window.location.replace(urlShare); setTimeout(function () {
          window.location.replace(urlUniversal); 
        }, 2000);
        //window.location = process.env.BrachLink+'://share?q='+process.env.BASE_URL+'read/'+this.$route.params.slug
      },
      stripHtml(html){
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        this.titleRendered = tmp.textContent || tmp.innerText || "";
      },
      onShowLogin(){
        if (this.$store.state.auth.loggedIn == true) {
          console.log('LoggedIn')
        }else {
          this.$refs['form-login'].show()
        }
      }
    }
  }
</script>