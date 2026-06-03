<template>

<ion-page>

<AppHeader title="Álbum da Copa" />

<ion-content>

<div class="container">

<div class="card">

<h1>Bem-vindo</h1>

<LoginForm
@login="handleLogin"
/>

<ion-button
fill="clear"
expand="block"
@click="router.push('/register')"
>
Criar Conta
</ion-button>

<ion-button
fill="clear"
expand="block"
@click="router.push('/forgot-password')"
>
Esqueci minha senha
</ion-button>

</div>

</div>

</ion-content>

</ion-page>

</template>

<script setup lang="ts">

import {
IonPage,
IonContent,
IonButton
} from '@ionic/vue'

import { useRouter } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import LoginForm from '@/components/LoginForm.vue'

const router = useRouter()

const handleLogin = () => {

router.push('/album')

}

</script>

<style scoped>

.container{
padding:20px;
display:flex;
justify-content:center;
align-items:center;
min-height:100%;
}

.card{
width:100%;
max-width:450px;
background:white;
padding:25px;
border-radius:20px;
}

h1{
text-align:center;
margin-bottom:20px;
color:#0057B8;
}

</style>