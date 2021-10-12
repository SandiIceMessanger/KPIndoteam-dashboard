<template>
  <div>
    <div class="comments">
      <div class="list-comments">
        <div class="heading-comments mb-2" v-if="listCommentar.length > 0">
          <span>{{listCommentar.length}} komentar</span>
        </div>
        <div class="media mb-2" v-if="listCommentar.length > 0" v-for="data in listCommentar">
          <img class="d-flex mr-3 rounded-circle" :src="data.author_avatar_urls[48]" alt="Avatar" data-not-lazy />
          <div class="media-body">
            <div class="heading-comment mb-2">
              <h5 class="mt-0 mb-0">{{data.author_name}}</h5>
              <span>{{formatDateList(data.date)}}</span>
            </div>
            <p v-html="data.content.rendered"></p>
            <div class="lapor text-right mt-3">
            </div>
          </div>
        </div>
        <div class="no-comments text-center" v-if="listCommentar.length == 0">
          <h5 class="mb-0">Belum ada komentar.</h5>
          <p class="mb-0">Jadilah yang pertama berkomentar di sini</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'listCommentar',
    ],
    data () {
      return {
      
      }
    },
    computed: {
    
    },
    async mounted() {

    },
    methods: {

    }
  }
</script>