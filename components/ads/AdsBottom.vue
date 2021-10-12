<template>
    <div>
        <div v-if="data.urlAds">
            <a :href="data.urlAds" target="_blank">
                <img :src="data.urlImage" class="img-fluid" width="1105" height="65">
            </a>
        </div>
        <div class="boxAdsSidebar" v-else>
            <img :src="data.urlImage" class="img-fluid" width="1105" height="65">
        </div>
    </div>
</template>

<script>
export default {
    props: [
      'data',
    ]
}
</script>