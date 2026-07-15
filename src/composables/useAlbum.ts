import { ref, computed, watch } from 'vue'

import { Sticker } from '@/data/stickers'
import { useAuth } from '@/composables/useAuth'
import {
  getAlbumStats,
  listStickersFromDb,
  toggleStickerCollected,
  toggleStickerFavorite,
  listCollectionHistory
} from '@/services/database'

interface CollectionHistoryItem {
  id: number
  name: string
  team: string
  image: string
  rarity: string
  collected_at: string | null
}

const stickerList = ref<Sticker[]>([])
const search = ref('')
const filter = ref('all')
const total = ref(0)
const collected = ref(0)
const pending = ref(0)
const rareCollected = ref(0)
const shinyCollected = ref(0)
const favoriteCount = ref(0)
const score = ref(0)
const progress = ref(0)
const history = ref<CollectionHistoryItem[]>([])
const loading = ref(false)

export function useAlbum() {

  const { user } = useAuth()

  const loadStats = async () => {
    if (!user.value?.id) return

    const stats =
      await getAlbumStats(user.value.id)

    total.value = stats.total
    collected.value = stats.collected
    pending.value = stats.pending
    rareCollected.value = stats.rareCollected
    shinyCollected.value = stats.shinyCollected
    favoriteCount.value = stats.favoriteCount
    score.value = stats.score
    progress.value = stats.progress
  }

  const loadStickers = async () => {
    if (!user.value?.id) return

    loading.value = true

    stickerList.value =
      await listStickersFromDb(
        user.value.id,
        search.value,
        filter.value
      )

    await Promise.all([loadStats(), loadHistory()])

    loading.value = false
  }

  const loadHistory = async () => {
    if (!user.value?.id) return

    history.value =
      await listCollectionHistory(user.value.id)
  }

  const toggleCollected = async (
    id: number
  ) => {

    if (!user.value?.id) return

    await toggleStickerCollected(
      user.value.id,
      id
    )

    await loadStickers()

  }

  const toggleFavorite = async (
    id: number
  ) => {
    if (!user.value?.id) return

    await toggleStickerFavorite(
      user.value.id,
      id
    )

    await loadStickers()
  }

  watch(
    [search, filter],
    () => {
      loadStickers()
    }
  )

  const filteredStickers =
    computed(() => stickerList.value)

  return {

    stickerList,

    search,

    filter,

    filteredStickers,

    total,

    collected,

    pending,

    rareCollected,

    shinyCollected,

    favoriteCount,

    score,

    progress,

    history,

    loading,

    loadStickers,

    loadStats,

    loadHistory,

    toggleCollected,

    toggleFavorite

  }
}
