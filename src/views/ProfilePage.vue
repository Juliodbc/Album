<template>

<ion-page>

<AppHeader title="Perfil" />

<ion-content>

<div class="profile">

<ion-avatar>

<img
src="https://i.pravatar.cc/300"
/>

</ion-avatar>

<h1>Colecionador</h1>

<p>colecionador@email.com</p>

<ion-card>

<ion-card-content>

<p>Total: {{ total }}</p>

<p>Coletadas: {{ collected }}</p>

<p>Conclusão: {{ progress }}%</p>

<ion-progress-bar
:value="progress / 100"
/>

</ion-card-content>

</ion-card>

<ion-button
color="danger"
expand="block"
@click="logoutUser"
>
Sair
</ion-button>

</div>

</ion-content>

<BottomNav />

</ion-page>

</template>

<script setup lang="ts">

import {
IonPage,
IonContent,
IonAvatar,
IonCard,
IonCardContent,
IonButton,
IonProgressBar
} from '@ionic/vue'

import { useRouter } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'

import { useAlbum } from '@/composables/useAlbum'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()

const {
total,
collected,
progress
} = useAlbum()

const {
logout
} = useAuth()

const logoutUser = () => {

logout()

router.push('/login')

}

</script>

<style scoped>

.profile{

padding:25px;

text-align:center;

}

ion-avatar{

width:120px;
height:120px;

margin:auto;

margin-bottom:20px;

}

</style>