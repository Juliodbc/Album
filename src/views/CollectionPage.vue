<template>

<ion-page>

<AppHeader title="Minha Coleção" />

<ion-content>

<div class="content">

<StickerList
:stickers="collectedOnly"
@toggle="toggleCollected"
/>

</div>

</ion-content>

<BottomNav />

</ion-page>

</template>

<script setup lang="ts">

import {
IonPage,
IonContent
} from '@ionic/vue'

import { computed } from 'vue'

import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'
import StickerList from '@/components/StickerList.vue'

import { useAlbum } from '@/composables/useAlbum'

const {
stickerList,
toggleCollected
} = useAlbum()

const collectedOnly =
computed(() =>
stickerList.value.filter(
item => item.collected
)
)

</script>

<style scoped>

.content{
padding:20px;
}

</style>