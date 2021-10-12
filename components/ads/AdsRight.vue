<template>
    <div class="boxImgAds adsRight sticky-top" :style="`width: ${widthRight}px`"> 
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
            widthRight: '',
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
            // Select a div with the id 'mydiv'
            var mydiv = document.getElementById('main');
        
            // Get all offsets
            var offset = mydiv.getBoundingClientRect();
        
            // Offset of the div from the right side of the viewport
            var offsetRight = document.documentElement.clientWidth - offset.right;

            this.widthRight = offsetRight + 10
            this.window.height = window.innerHeight - 183;
        },
    }
}
</script>