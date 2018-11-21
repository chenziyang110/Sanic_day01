<template>
    <div>热力图</div>
</template>
<script>
export default {
    name: 'visited-hotmap',
    data() {
        return {
            hotmapID: ''
        }
    },
    created() {
        this.hotmapID = this.$route.params.id
        console.log(this.hotmapID)
    },
    mounted() {}

}
</script>
