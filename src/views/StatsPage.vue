<template>

<ion-page>

<AppHeader title="Estatísticas" />

<ion-content>

<div class="content">

<ion-card>

<ion-card-header>
<ion-card-title>Resumo</ion-card-title>
</ion-card-header>

<ion-card-content>

<p>Total de figurinhas: {{ total }}</p>
<p>Coletadas: {{ collected }}</p>
<p>Pendentes: {{ pending }}</p>
<p>Raras coletadas: {{ rareCollected }}</p>
<p>Brilhantes coletadas: {{ shinyCollected }}</p>
<p>Favoritas: {{ favoriteCount }}</p>
<p>Pontuação: {{ score }}</p>

<ion-progress-bar
:value="progress / 100"
/>

<p>{{ progress }}% do álbum completo</p>

</ion-card-content>

</ion-card>

<ion-card>

<ion-card-header>
<ion-card-title>Histórico de Coleta</ion-card-title>
</ion-card-header>

<ion-card-content>

<div v-if="history.length === 0">
<p>Nenhuma figurinha coletada ainda.</p>
</div>

<ion-list v-else>
<ion-item
v-for="item in history"
:key="item.id"
>
<ion-thumbnail slot="start">
<img :src="item.image" alt="" />
</ion-thumbnail>

<ion-label>
<h2>{{ item.name }}</h2>
<p>{{ item.team }} • {{ item.rarity }}</p>
<p class="history-date">{{ formatDate(item.collected_at) }}</p>
</ion-label>
</ion-item>
</ion-list>

</ion-card-content>

</ion-card>

</div>

</ion-content>

<BottomNav />

</ion-page>

</template>

<script setup lang="ts">

import {
IonPage,
IonContent,
IonCard,
IonCardHeader,
IonCardTitle,
IonCardContent,
IonProgressBar,
IonList,
IonItem,
IonThumbnail,
IonLabel
} from '@ionic/vue'

import { onMounted } from 'vue'

import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'
import { useAlbum } from '@/composables/useAlbum'

const {
total,
collected,
pending,
rareCollected,
shinyCollected,
favoriteCount,
score,
progress,
history,
loadHistory,
loadStats
} = useAlbum()

const formatDate = (date: string | null) => {
  if (!date) return ''

  return new Intl.DateTimeFormat(
    'pt-BR',
    {
      dateStyle: 'short',
      timeStyle: 'short'
    }
  ).format(new Date(date))
}

onMounted(async () => {
  await Promise.all([loadStats(), loadHistory()])
})

</script>

<style scoped>

.content {
  padding: 20px;
}

.history-date {
  font-size: 0.85rem;
  color: var(--ion-color-medium);
}

ion-thumbnail {
  width: 56px;
  height: 56px;
  overflow: hidden;
  border-radius: 8px;
}

ion-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
