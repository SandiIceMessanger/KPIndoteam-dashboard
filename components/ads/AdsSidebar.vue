<template>
    <div>
        <div class="boxAdsSidebar" v-if="linkImage">
            <a :href="linkImage" target="_blank">
                <img :src="this.urlImage" width="339" height="282" class="img-fluid">
            </a>
        </div>
        <div class="boxAdsSidebar" v-else>
            <img :src="this.urlImage" class="img-fluid">
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
        this.urlImage = this.fetchedAds.top.image_url;
        this.linkImage = this.fetchedAds.top.link
    }
}
</script>