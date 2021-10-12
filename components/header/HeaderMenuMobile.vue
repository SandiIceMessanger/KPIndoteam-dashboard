<template>
  <div>
    <div class="container">
      <div class="row mb-4">
        <div class="col-lg-12">
          <div class="listMenu">
            <ul>
              <li>
                <a href="/">HOME</a>
              </li>
              <div v-for="data in fetchedMenus" :key="data.id" class="menu-mobile">
                <li>
                  <a v-if="data.type != 'custom'" :href="`/${data.object}/${data.object_id}`" :data-label="`${data.title}`">
                    {{data.title}}
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LoginForm from '~/components/form/LoginForm';
  export default {
    data () {
      return {
        menuMobile : false,
      }
    },
    computed: {
      ...mapGetters({
        fetchedMenus: 'menu/menus'
      }),
    },
    async mounted() {
      await this.$store.dispatch('menu/fetchMenus');
    },
    methods: {
      
    },
  }
</script>