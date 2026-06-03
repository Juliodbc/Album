<template>
  <ion-header>
    <ion-toolbar class="toolbar">

      <ion-title>
        {{ title }}
      </ion-title>

    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/vue'

defineProps<{
  title: string
}>()
</script>

<style scoped>

.toolbar{

  --background:
  linear-gradient(
    90deg,
    #0057B8,
    #00A651
  );

  --color:white;

}

ion-title{

  font-weight:700;
  text-align:center;

}

</style>