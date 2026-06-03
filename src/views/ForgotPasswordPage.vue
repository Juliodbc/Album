<template>

<ion-page>

<AppHeader title="Recuperar Senha"/>

<ion-content>

<div class="container">

<div class="card">

<h1>Recuperação</h1>

<ResetPasswordForm
@reset="handleReset"
/>

</div>

</div>

</ion-content>

</ion-page>

</template>

<script setup lang="ts">

import {
IonPage,
IonContent
} from '@ionic/vue'

import { useRouter } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import ResetPasswordForm from '@/components/ResetPasswordForm.vue'

const router = useRouter()

const handleReset = () => {

router.push('/login')

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
color:#0057B8;
}

</style>