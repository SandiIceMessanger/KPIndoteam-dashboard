<template>
  <div>
    <div class="list-comments">
      <div id="noComment-infografis" class="noComment text-center" v-if="listComment.length == 0">
        <p>Belum ada komentar di infografis ini</p>
      </div>
      <div class="lists" v-else>
        <div class="media mb-3" v-for="data in listComment">
          <img class="d-flex mr-3 rounded-circle" :src="data.author_avatar_urls[48]" alt="Avatar" />
          <div class="media-body">
            <div class="heading-comment mb-1">
              <h5 class="mt-0 mb-0">{{data.author_name}}</h5>
              <span>{{formatDateList(data.date)}}</span>
            </div>
            <p v-html="data.content.rendered"></p>
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
        listComment: [],
      }
    },
    computed: {
      
    },
    async mounted() {
      this.listComment = this.$store.state.comments.listComments
    },
    methods: {
      
    }
  }
</script>