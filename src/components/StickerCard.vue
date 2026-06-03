<template>

<ion-card class="sticker-card">

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

import {
IonCard,
IonCardHeader,
IonCardTitle,
IonCardSubtitle,
IonCardContent,
IonButton,
IonBadge
} from '@ionic/vue'

import {
Sticker
} from '@/data/stickers'

defineProps<{
sticker: Sticker
}>()

defineEmits([
'toggle'
])

</script>

<style scoped>

.sticker-card{

border-radius:18px;

overflow:hidden;

border:3px solid #FFD700;

box-shadow:
0 8px 25px
rgba(0,0,0,.15);

transition:.3s;

}

.sticker-card:hover{

transform:
translateY(-5px);

}

img{

width:100%;
height:220px;

object-fit:cover;

}

.btn{

margin-top:12px;

}

</style>