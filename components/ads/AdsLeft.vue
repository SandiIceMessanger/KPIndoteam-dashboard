<template>
    <div class="boxImgAds adsLeft sticky-top" :style="`width: ${widthLeft}px`"> 
        <div v-if="data.urlAds">
            <a :href="data.urlAds" target="_blank">
                <img :src="data.urlImage" class="img-fluid" :style="`height: ${window.height}px`">
            </a>
        </div>
        <div class="boxAdsSidebar" v-else>
            <img :src="data.urlImage" class="img-fluid" :style="`height: ${window.height}px`">
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props: [
      'data',
    ],
    data() {
        return {
            url: '',
            window: {
                width: 0,
                height: 0
            },
            widthLeft: '',
        }
    },
    computed: {
        ...mapGetters({
            
        }),
    },
    created() {
      if (process.browser){
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      }
    },
    destroyed() {
      if (process.browser){
        window.removeEventListener('resize', this.handleResize);
      }
    },
    async mounted() {
        
    },
    methods: {
        handleResize() {
            this.window.width = window.innerWidth;

            // Select a div with the id 'mydiv'
            var mydiv = document.getElementById('main');
            
            // Get all offsets
            var offset = mydiv.getBoundingClientRect();
            
            // Offset of the div from the left side of the viewport
            var offsetLeft = offset.left;

            this.widthLeft = offsetLeft + 10
            this.window.height = window.innerHeight - 183;
        },
    }
}
</script>
    