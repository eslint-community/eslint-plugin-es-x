<template>
    <div>
        <layout />
        <div v-if="updateEvent" class="popup">
            A new version is available.<br>
            <button @click="reload">Refresh</button>
        </div>
    </div>
</template>

<script>
import Layout from "@default-theme/Layout.vue" //eslint-disable-line mysticatea/node/no-missing-import
export default {
    name: "LayoutWithPopup",
    components: {
        Layout,
    },
    data() {
        return { updateEvent: null }
    },
    mounted() {
        this.$on("sw-cached", this.onCached)
        this.$on("sw-updated", this.onUpdated)
    },
    methods: {
        onCached(e) {
            e.update()
        },
        onUpdated(e) {
            this.updateEvent = e
        },
        reload() {
            if (this.updateEvent) {
                this.updateEvent.skipWaiting().then(() => {
                    location.reload(true)
                })
                this.updateEvent = null
            }
        },
    },
}
</script>

<style scoped>
.popup {
    position: fixed;
    right: 1em;
    bottom: 1em;
    padding: 1em;
    border: 1px solid #4caf50;
    border-radius: 3px;
    background: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
    text-align: center;
    animation: PopupEnter 0.333s;
}
.popup button {
    margin-top: 0.5em;
    padding: 0.25em 2em;
}
@keyframes PopupEnter {
    0% {
        opacity: 0;
        transform: translate(0, 50%) scale(0.5);
    }
    100% {
        opacity: 1;
        transform: none;
    }
}
</style>
