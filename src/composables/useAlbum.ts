import { ref, computed, watch } from 'vue'

import { Sticker } from '@/data/stickers'
import { useAuth } from '@/composables/useAuth'
import {
  getAlbumStats,
  listStickersFromDb,
  toggleStickerCollected
} from '@/services/database'

const stickerList = ref<Sticker[]>([])
const search = ref('')
const filter = ref('all')
const total = ref(0)
const collected = ref(0)
const pending = ref(0)
const rareCollected = ref(0)
const shinyCollected = ref(0)
const progress = ref(0)
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

    await loadStats()

    loading.value = false
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

    progress,

    loading,

    loadStickers,

    loadStats,

    toggleCollected

  }
}
