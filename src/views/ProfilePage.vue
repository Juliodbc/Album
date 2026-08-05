<template>
  <ion-page>
    <AppHeader title="Perfil" />

    <ion-content :fullscreen="true">
      <div class="profile">
        <div class="profile-header">
          <ion-avatar class="avatar">
            <img :src="avatarUrl" alt="Avatar" />
          </ion-avatar>

          <div class="user-text">
            <h1>{{ displayName }}</h1>
            <p>{{ displayEmail }}</p>
          </div>
        </div>

        <ion-card class="profile-card stats-card">
          <ion-card-header>
            <ion-card-subtitle>Resumo do álbum</ion-card-subtitle>
            <ion-card-title>Seu progresso</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <div class="stats-grid">
              <div class="stat">
                <strong>{{ total }}</strong>
                <span>Total</span>
              </div>

              <div class="stat">
                <strong>{{ collected }}</strong>
                <span>Coletadas</span>
              </div>

              <div class="stat">
                <strong>{{ favoriteCount }}</strong>
                <span>Favoritas</span>
              </div>

              <div class="stat">
                <strong>{{ score }}</strong>
                <span>Pontos</span>
              </div>
            </div>

            <div class="progress-area">
              <div class="progress-title">
                <span>Progresso do álbum</span>
                <strong>{{ progress }}%</strong>
              </div>

              <ion-progress-bar :value="progress / 100" />
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card class="profile-card info-card">
          <ion-card-header>
            <ion-card-title>Detalhes do perfil</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <div class="info-item">
              <span>Nome</span>
              <strong>{{ displayName }}</strong>
            </div>

            <div class="info-item">
              <span>E-mail</span>
              <strong>{{ displayEmail }}</strong>
            </div>

            <div class="info-item">
              <span>Status</span>
              <strong>Colecionador</strong>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-button expand="block" class="logout-btn" color="danger" @click="logoutUser">
          Sair da Conta
        </ion-button>
      </div>
    </ion-content>

    <BottomNav />
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue"
import {
  IonPage,
  IonContent,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonProgressBar
} from "@ionic/vue"
import { useRouter } from "vue-router"

import AppHeader from "@/components/AppHeader.vue"
import BottomNav from "@/components/BottomNav.vue"
import { useAlbum } from "@/composables/useAlbum"
import { useAuth } from "@/composables/useAuth"

const router = useRouter()
const { total, collected, progress, score, favoriteCount, loadStats } = useAlbum()
const { user, logout } = useAuth()

const displayName = computed(() => user.value?.name || "Colecionador")
const displayEmail = computed(() => user.value?.email || "colecionador@email.com")
const avatarUrl = computed(
  () =>
    user.value?.email
      ? `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(user.value.email)}`
      : "https://i.pravatar.cc/300"
)

const logoutUser = () => {
  logout()
  router.replace("/login")
}

onMounted(async () => {
  await loadStats()
})
</script>

<style scoped>

.profile {
  padding: 24px;
  max-width: 760px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px 18px;
  background: linear-gradient(135deg, rgba(0, 87, 184, 0.14), rgba(0, 166, 81, 0.14));
  border-radius: 24px;
  margin-bottom: 20px;
}

.avatar {
  width: 110px;
  height: 110px;
  border: 4px solid var(--ion-color-primary);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.14);
}

.user-text h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.user-text p {
  margin: 8px 0 0;
  color: var(--ion-color-medium);
  font-size: 15px;
}

.profile-card {
  border-radius: 22px;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 18px;
}

.stat {
  background: rgba(0, 87, 184, 0.06);
  border-radius: 18px;
  padding: 18px 14px;
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 22px;
  color: var(--ion-color-primary);
  margin-bottom: 6px;
}

.stat span {
  font-size: 13px;
  color: var(--ion-color-medium);
}

.progress-area {
  margin-top: 4px;
}

.progress-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
}

ion-progress-bar {
  height: 12px;
  border-radius: 20px;
  overflow: hidden;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.info-item:last-child {
  border-bottom: none;
}

.info-item span {
  color: var(--ion-color-medium);
  font-size: 14px;
}

.info-item strong {
  font-size: 15px;
}

.logout-btn {
  margin-top: 18px;
  --border-radius: 14px;
  height: 52px;
  font-weight: 700;
}

</style>