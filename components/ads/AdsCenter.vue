<template>
    <div> 
        <div v-if="linkImage">
            <a :href="linkImage" target="_blank">
                <img :src="this.urlImage" class="img-fluid" width="732" height="270">
            </a>
        </div>
        <div class="boxAdsSidebar" v-else>
            <img :src="this.urlImage" class="img-fluid" width="732" height="270">
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            urlImage: '',
            linkImage: ''
        }
    },
    computed: {
        ...mapGetters({
            fetchedAds: 'ads/showAds'
        }),
    },
    async mounted() {
        this.urlImage = this.fetchedAds.center.image_url;
        this.linkImage = this.fetchedAds.center.link
    },
    methods: {

    },
}
</script>