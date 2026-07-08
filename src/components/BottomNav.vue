<template>

<ion-footer>

<ion-toolbar>

<div class="nav">

<ion-button
fill="clear"
@click="router.push('/album')"
>
Album
</ion-button>

<ion-button
fill="clear"
@click="router.push('/collection')"
>
Colecao
</ion-button>

<ion-button
fill="clear"
@click="router.push('/achievements')"
>
Conquistas
</ion-button>

<ion-button
fill="clear"
@click="router.push('/profile')"
>
Perfil
</ion-button>

</div>

</ion-toolbar>

</ion-footer>

</template>

<script setup lang="ts">
import {
IonFooter,
IonToolbar,
IonButton
} from '@ionic/vue'

import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>

.nav{

display:flex;
justify-content:space-around;
gap:4px;

}

ion-button{
font-size:12px;
}

</style>
