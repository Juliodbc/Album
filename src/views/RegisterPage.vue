<template>

<ion-page>

<AppHeader title="Cadastro" />

<ion-content>

<div class="container">

<div class="card">

<h1>Criar Conta</h1>

<RegisterForm
@register="handleRegister"
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
import RegisterForm from '@/components/RegisterForm.vue'

import {
useAuth
} from '@/composables/useAuth'

const router = useRouter()

const {
register
} = useAuth()

const handleRegister = (

name:string,
email:string,
password:string

) => {

try{

register(
name,
email,
password
)

alert(
'Cadastro realizado com sucesso!'
)

router.push('/login')

}catch(error:any){

alert(
error.message
)

}

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