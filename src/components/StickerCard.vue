<template>

<ion-card class="sticker-card" :style="{ borderColor: borderColor }">

<img
:src="sticker.image"
alt=""
>

<ion-card-header>

<ion-card-title>
{{ sticker.name }}
</ion-card-title>

<ion-card-subtitle>
{{ sticker.team }}
</ion-card-subtitle>

</ion-card-header>

<ion-card-content>

<ion-badge
:color="rarityColor"
>
{{ sticker.rarity }}
</ion-badge>

<ion-badge
:color="
sticker.collected
? 'success'
: 'warning'
"
>

{{
sticker.collected
? 'Coletada'
: 'Pendente'
}}

</ion-badge>

<ion-button
fill="clear"
class="favorite-btn"
@click="$emit('favorite', sticker.id)"
>
<ion-icon
:icon="favoriteIcon"
/>
{{ sticker.favorite ? 'Favorita' : 'Favoritar' }}
</ion-button>

<p
v-if="sticker.collected && sticker.collected_at"
class="collected-at"
>
Coletada em {{ formattedCollectedAt }}
</p>

<ion-button
expand="block"
class="btn"
@click="
$emit(
'toggle',
sticker.id
)
"
>

{{
sticker.collected
? 'Remover'
: 'Coletar'
}}

</ion-button>

</ion-card-content>

</ion-card>

</template>

<script setup lang="ts">

import { computed } from 'vue'

import {
IonCard,
IonCardHeader,
IonCardTitle,
IonCardSubtitle,
IonCardContent,
IonButton,
IonBadge,
IonIcon
} from '@ionic/vue'

import {
heart,
heartOutline
} from 'ionicons/icons'

import type {
Sticker
} from '@/data/stickers'

const props = defineProps<{
sticker: Sticker
}>()

const rarityColor = computed(() => {
  if (props.sticker.rarity === 'brilhante') return 'tertiary'
  if (props.sticker.rarity === 'rara') return 'primary'
  return 'medium'
})

const borderColor = computed(() => {
  if (props.sticker.rarity === 'brilhante') return 'var(--ion-color-tertiary)'
  if (props.sticker.rarity === 'rara') return 'var(--ion-color-secondary)'
  return 'rgba(0,0,0,0.06)'
})

const favoriteIcon = computed(() => {
  return props.sticker.favorite ? heart : heartOutline
})

const formattedCollectedAt = computed(() => {
  if (!props.sticker.collected_at) return ''

  return new Intl.DateTimeFormat(
    'pt-BR',
    {
      dateStyle: 'short',
      timeStyle: 'short'
    }
  ).format(new Date(props.sticker.collected_at))
})

defineEmits([
'toggle',
'favorite'
])

</script>

<style scoped>

.sticker-card{

border-radius:12px;
overflow:hidden;
border:2px solid var(--ion-card-border, rgba(0,0,0,0.06));
background:var(--ion-card-background);
box-shadow:0 6px 18px rgba(31,45,51,0.06);
transition:transform .22s ease, box-shadow .22s ease;

}

.sticker-card:hover{

transform:
translateY(-5px);

}

img{

width:100%;
height:200px;
object-fit:cover;

}

.btn{

margin-top:12px;


@media (max-width: 600px) {
  img { height: 160px; }
}

@media (min-width: 1200px) {
  img { height: 240px; }
}
}

</style>
