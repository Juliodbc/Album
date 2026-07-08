<template>

<ion-page>

<AppHeader title="Conquistas" />

<ion-content>

<div class="content">

<ion-card>

<ion-card-header>
<ion-card-title>Progresso do Album</ion-card-title>
<ion-card-subtitle>
{{ stats.collected }} de {{ stats.total }} figurinhas coletadas
</ion-card-subtitle>
</ion-card-header>

<ion-card-content>

<ion-progress-bar
:value="stats.progress / 100"
/>

<div class="summary">

<ion-badge color="primary">
{{ stats.progress }}%
</ion-badge>

<ion-badge color="secondary">
Raras: {{ stats.rareCollected }}
</ion-badge>

<ion-badge color="tertiary">
Brilhantes: {{ stats.shinyCollected }}
</ion-badge>

</div>

</ion-card-content>

</ion-card>

<div class="grid">

<ion-card
v-for="achievement in achievements"
:key="achievement.id"
:class="[
'achievement-card',
achievement.desbloqueada ? 'unlocked' : 'locked'
]"
>

<ion-card-header>

<div class="achievement-heading">

<ion-icon
:icon="iconFor(achievement.icone)"
/>

<div>

<ion-card-title>
{{ achievement.nome }}
</ion-card-title>

<ion-card-subtitle>
{{ achievement.descricao }}
</ion-card-subtitle>

</div>

</div>

</ion-card-header>

<ion-card-content>

<div class="status-row">

<ion-badge
:color="achievement.desbloqueada ? 'success' : 'medium'"
>
{{
achievement.desbloqueada
? 'Desbloqueada'
: 'Bloqueada'
}}
</ion-badge>

<span>
{{
achievement.data_desbloqueio
? formatDate(achievement.data_desbloqueio)
: 'Sem data'
}}
</span>

</div>

</ion-card-content>

</ion-card>

</div>

</div>

</ion-content>

<BottomNav />

</ion-page>

</template>

<script setup lang="ts">

import { onMounted } from 'vue'

import {
IonBadge,
IonCard,
IonCardContent,
IonCardHeader,
IonCardSubtitle,
IonCardTitle,
IonContent,
IonIcon,
IonPage,
IonProgressBar
} from '@ionic/vue'

import {
albumsOutline,
constructOutline,
diamondOutline,
footballOutline,
medalOutline,
ribbonOutline,
sparklesOutline,
starHalfOutline,
starOutline,
trophyOutline
} from 'ionicons/icons'

import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'
import { useAchievements } from '@/composables/useAchievements'

const {
achievements,
stats,
loadAchievements
} = useAchievements()

const icons: Record<string, string> = {
  'albums-outline': albumsOutline,
  'construct-outline': constructOutline,
  'diamond-outline': diamondOutline,
  'football-outline': footballOutline,
  'medal-outline': medalOutline,
  'ribbon-outline': ribbonOutline,
  'sparkles-outline': sparklesOutline,
  'star-half-outline': starHalfOutline,
  'star-outline': starOutline,
  'trophy-outline': trophyOutline
}

const iconFor = (icon: string) => {
  return icons[icon] || trophyOutline
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat(
    'pt-BR',
    {
      dateStyle: 'short',
      timeStyle: 'short'
    }
  ).format(new Date(date))
}

onMounted(() => {
  loadAchievements()
})

</script>

<style scoped>

.content{
padding:20px;
}

.summary{
display:flex;
gap:8px;
flex-wrap:wrap;
margin-top:12px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
gap:16px;
}

.achievement-card{
border-radius:8px;
}

.achievement-card.locked{
opacity:.62;
filter:grayscale(1);
}

.achievement-card.unlocked{
border:2px solid var(--ion-color-success);
}

.achievement-heading{
display:flex;
gap:12px;
align-items:flex-start;
}

ion-icon{
font-size:34px;
color:var(--ion-color-primary);
flex:0 0 auto;
}

.status-row{
display:flex;
justify-content:space-between;
gap:12px;
align-items:center;
font-size:14px;
}

</style>
