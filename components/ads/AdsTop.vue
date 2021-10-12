<template>
    <div>
        <img :src="this.url" class="img-fluid">
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            url: ''
        }
    },
    computed: {
        ...mapGetters({
            fetchedAds: 'ads/showAds'
        }),
    },
    async mounted() {
        this.url = this.fetchedAds.top.image_url;
    }
}
</script>