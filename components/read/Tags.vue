<template>
  <div>
    <div class="box-tags mt-4">
      <div class="label-tags">
        Tag :
      </div>
      <div class="list-tags">
        <ul>
          <li v-for="data in listTags">
            <a :href="`/tag/${data.slug}`">
              {{data.name}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'listTags',
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