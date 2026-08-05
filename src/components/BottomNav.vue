<template>
  <ion-footer>
    <ion-toolbar class="toolbar">
      <div class="nav">
        <button
          class="tab-button"
          :class="{ active: isActive('/album') }"
          @click="navigate('/album')"
          type="button"
        >
          <ion-icon :icon="icons.album" />
          <span>Álbum</span>
        </button>

        <button
          class="tab-button"
          :class="{ active: isActive('/collection') }"
          @click="navigate('/collection')"
          type="button"
        >
          <ion-icon :icon="icons.collection" />
          <span>Coleção</span>
        </button>

        <button
          class="tab-button"
          :class="{ active: isActive('/statistics') }"
          @click="navigate('/statistics')"
          type="button"
        >
          <ion-icon :icon="icons.statistics" />
          <span>Estatísticas</span>
        </button>

        <button
          class="tab-button"
          :class="{ active: isActive('/achievements') }"
          @click="navigate('/achievements')"
          type="button"
        >
          <ion-icon :icon="icons.achievements" />
          <span>Conquistas</span>
        </button>

        <button
          class="tab-button profile-button"
          :class="{ active: isActive('/profile') }"
          @click="navigate('/profile')"
          type="button"
        >
          <div class="profile-ring">
            <ion-icon :icon="icons.profile" />
          </div>
          <span>Perfil</span>
        </button>
      </div>
    </ion-toolbar>
  </ion-footer>
</template>

<script setup lang="ts">
import { IonFooter, IonToolbar, IonIcon } from '@ionic/vue'
import { useRouter, useRoute } from 'vue-router'
import {
  home,
  albums,
  statsChart,
  ribbon,
  personCircle
} from 'ionicons/icons'

const router = useRouter()
const route = useRoute()

const icons = {
  album: albums,
  collection: home,
  statistics: statsChart,
  achievements: ribbon,
  profile: personCircle
}

const navigate = (path: string) => {
  if (route.path !== path) {
    router.push(path)
  }
}

const isActive = (path: string) => route.path === path
</script>

<style scoped>
.toolbar {
  --background: transparent;
  padding: 10px 12px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
}

.nav {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 26px;
  padding: 10px;
  box-shadow: 0 -6px 28px rgba(0, 0, 0, 0.08);
}

.tab-button {
  border: none;
  background: transparent;
  color: var(--ion-color-medium);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 6px;
  border-radius: 18px;
  transition: transform 180ms ease, background 180ms ease, color 180ms ease;
  font-size: 11px;
  min-height: 70px;
}

.tab-button ion-icon {
  font-size: 24px;
}

.tab-button span {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.tab-button.active {
  color: var(--ion-color-primary);
  background: rgba(0, 87, 184, 0.12);
  transform: translateY(-2px);
}

.tab-button.active ion-icon {
  filter: drop-shadow(0 3px 8px rgba(0, 87, 184, 0.28));
}

.profile-button {
  position: relative;
}

.profile-ring {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.18);
}

.profile-button.active .profile-ring {
  background: linear-gradient(135deg, rgba(0, 87, 184, 0.18), rgba(0, 166, 81, 0.18));
  box-shadow: 0 16px 28px rgba(0, 87, 184, 0.14);
}

.profile-button ion-icon {
  font-size: 22px;
}
</style>
