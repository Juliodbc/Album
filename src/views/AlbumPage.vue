<template>

<ion-page>

<AppHeader title="Meu Álbum" />

<ion-content>

<div class="content">

<ion-searchbar
v-model="search"
placeholder="Buscar jogador ou seleção"
/>

<ion-segment
v-model="filter"
>

<ion-segment-button value="all">
<ion-label>Todas</ion-label>
</ion-segment-button>

<ion-segment-button value="collected">
<ion-label>Coletadas</ion-label>
</ion-segment-button>

<ion-segment-button value="pending">
<ion-label>Pendentes</ion-label>
</ion-segment-button>

<ion-segment-button value="favorite">
<ion-label>Favoritas</ion-label>
</ion-segment-button>

</ion-segment>

<ion-card>

<ion-card-content>

<p>Total: {{ total }}</p>

<p>Coletadas: {{ collected }}</p>

<p>Pendentes: {{ pending }}</p>

<p>Raras: {{ rareCollected }}</p>

<p>Brilhantes: {{ shinyCollected }}</p>

<p>Favoritas: {{ favoriteCount }}</p>

<p>Pontos: {{ score }}</p>

<ion-progress-bar
:value="progress / 100"
/>

<p>{{ progress }}%</p>

</ion-card-content>

</ion-card>

<StickerList
:stickers="filteredStickers"
@toggle="toggleCollected"
@favorite="toggleFavorite"
/>

</div>

</ion-content>

<BottomNav />

</ion-page>

</template>

<script setup lang="ts">

import {
IonPage,
IonContent,
IonSearchbar,
IonSegment,
IonSegmentButton,
IonLabel,
IonCard,
IonCardContent,
IonProgressBar
} from '@ionic/vue'

import { onMounted } from 'vue'

import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'
import StickerList from '@/components/StickerList.vue'

import { useAlbum } from '@/composables/useAlbum'

const {
search,
filter,
filteredStickers,
total,
collected,
pending,
progress,
rareCollected,
shinyCollected,
favoriteCount,
score,
loadStickers,
toggleCollected,
toggleFavorite
} = useAlbum()

onMounted(() => {
filter.value = 'all'
loadStickers()
})

</script>

<style scoped>

.content{
padding:20px;
}

</style>
