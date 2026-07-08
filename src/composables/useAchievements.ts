import { ref } from 'vue'

import { useAuth } from '@/composables/useAuth'
import {
  Achievement,
  getAlbumStats,
  listAchievements,
  AlbumStats
} from '@/services/database'

const achievements = ref<Achievement[]>([])
const stats = ref<AlbumStats>({
  total: 0,
  collected: 0,
  pending: 0,
  rareCollected: 0,
  shinyCollected: 0,
  progress: 0
})
const loading = ref(false)

export function useAchievements() {
  const { user } = useAuth()

  const loadAchievements = async () => {
    if (!user.value?.id) return

    loading.value = true

    achievements.value =
      await listAchievements(user.value.id)

    stats.value =
      await getAlbumStats(user.value.id)

    loading.value = false
  }

  return {
    achievements,
    stats,
    loading,
    loadAchievements
  }
}
