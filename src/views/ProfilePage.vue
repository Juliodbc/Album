<template>
  <ion-page>

    <AppHeader title="Perfil" />

    <ion-content :fullscreen="true">

      <div class="profile">

        <div class="profile-header">

          <ion-avatar class="avatar">
            <img
              src="https://i.pravatar.cc/300"
              alt="Avatar"
            />
          </ion-avatar>

          <h1>
            {{ user?.name || "Colecionador" }}
          </h1>

          <p>
            {{ user?.email || "colecionador@email.com" }}
          </p>

        </div>

        <ion-card class="stats-card">

          <ion-card-content>

            <div class="stats">

              <div class="stat">
                <h2>{{ total }}</h2>
                <span>Total</span>
              </div>

              <div class="stat">
                <h2>{{ collected }}</h2>
                <span>Coletadas</span>
              </div>

              <div class="stat">
                <h2>{{ progress }}%</h2>
                <span>Conclusão</span>
              </div>

            </div>

            <div class="progress-area">

              <div class="progress-title">

                <span>Progresso do Álbum</span>

                <strong>{{ progress }}%</strong>

              </div>

              <ion-progress-bar
                :value="progress / 100"
              />

            </div>

          </ion-card-content>

        </ion-card>

        <ion-card class="info-card">

          <ion-card-content>

            <div class="info-item">
              <span>Nome</span>
              <strong>{{ user?.name || "-" }}</strong>
            </div>

            <div class="info-item">
              <span>E-mail</span>
              <strong>{{ user?.email || "-" }}</strong>
            </div>

            <div class="info-item">
              <span>Status</span>
              <strong>Colecionador</strong>
            </div>

          </ion-card-content>

        </ion-card>

        <ion-button
          expand="block"
          class="logout-btn"
          color="danger"
          @click="logoutUser"
        >
          Sair da Conta
        </ion-button>

      </div>

    </ion-content>

    <BottomNav />

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonButton,
  IonProgressBar
} from "@ionic/vue";

import { useRouter } from "vue-router";

import AppHeader from "@/components/AppHeader.vue";
import BottomNav from "@/components/BottomNav.vue";

import { useAlbum } from "@/composables/useAlbum";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();

const {
  total,
  collected,
  progress
} = useAlbum();

const {
  user,
  logout
} = useAuth();

const logoutUser = () => {
  logout();
  router.replace("/login");
};
</script>

<style scoped>

.profile{
  padding:24px;
  max-width:700px;
  margin:auto;
}

.profile-header{
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-bottom:24px;
}

.avatar{
  width:130px;
  height:130px;
  margin-bottom:18px;
  border:4px solid var(--ion-color-primary);
  box-shadow:0 10px 25px rgba(0,0,0,.18);
}

.profile-header h1{
  margin:0;
  font-size:28px;
  font-weight:700;
}

.profile-header p{
  margin-top:8px;
  color:gray;
  font-size:15px;
}

.stats-card,
.info-card{
  border-radius:20px;
  margin-bottom:20px;
  box-shadow:0 8px 25px rgba(0,0,0,.08);
}

.stats{
  display:flex;
  justify-content:space-between;
  text-align:center;
  margin-bottom:22px;
}

.stat{
  flex:1;
}

.stat h2{
  margin:0;
  color:var(--ion-color-primary);
  font-size:28px;
}

.stat span{
  font-size:13px;
  color:gray;
}

.progress-area{
  margin-top:10px;
}

.progress-title{
  display:flex;
  justify-content:space-between;
  margin-bottom:10px;
  font-size:14px;
}

ion-progress-bar{
  height:12px;
  border-radius:20px;
}

.info-item{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:16px 0;
  border-bottom:1px solid rgba(0,0,0,.08);
}

.info-item:last-child{
  border-bottom:none;
}

.info-item span{
  color:gray;
  font-size:14px;
}

.info-item strong{
  font-size:15px;
}

.logout-btn{
  margin-top:25px;
  --border-radius:14px;
  height:50px;
  font-weight:600;
}

</style>