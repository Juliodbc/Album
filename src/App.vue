<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { initDatabase } from '@/services/database'
import { IonApp, IonRouterOutlet } from "@ionic/vue";

async function waitForJeep(timeout = 3000) {
  try {
    if (typeof customElements !== 'undefined' && customElements.whenDefined) {
      const p = customElements.whenDefined('jeep-sqlite')
      const t = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
      await Promise.race([p, t])
    }
  } catch (e) {
    console.warn('jeep-sqlite não definido antes do timeout', e)
  }
}

onMounted(async () => {
  await waitForJeep()
  await initDatabase()
})
</script>
