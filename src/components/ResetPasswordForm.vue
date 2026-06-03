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

<ion-button
expand="block"
type="submit"
>
Enviar
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

const emit =
defineEmits([
'reset'
])

const submit = () => {

emit(
'reset',
email.value
)

}

</script>