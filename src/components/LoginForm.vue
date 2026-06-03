<template>

<form
@submit.prevent="submit"
>

<ion-item>

<ion-input
v-model="email"
label="E-mail"
label-placement="floating"
/>

</ion-item>

<ion-item>

<ion-input
v-model="password"
type="password"
label="Senha"
label-placement="floating"
/>

</ion-item>

<ion-button
expand="block"
type="submit"
>
Entrar
</ion-button>

</form>

</template>

<script setup lang="ts">

import {
IonItem,
IonInput,
IonButton
} from '@ionic/vue'

import {
ref
} from 'vue'

const email = ref('')
const password = ref('')

const emit =
defineEmits([
'login'
])

const submit = () => {

emit(
'login',
email.value,
password.value
)

}

</script>