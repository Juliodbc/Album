import { ref, computed } from 'vue'

import {
  stickers,
  Sticker
} from '@/data/stickers'

const savedStickers =
  localStorage.getItem('stickers')

const stickerList =
ref<Sticker[]>(

  savedStickers
    ? JSON.parse(savedStickers)
    : stickers

)

const search = ref('')
const filter = ref('all')

export function useAlbum() {

  const save = () => {

    localStorage.setItem(
      'stickers',
      JSON.stringify(
        stickerList.value
      )
    )

  }

  const toggleCollected = (
    id: number
  ) => {

    const sticker =
      stickerList.value.find(
        item => item.id === id
      )

    if (!sticker) return

    sticker.collected =
      !sticker.collected

    save()

  }

  const filteredStickers =
  computed(() => {

    return stickerList.value.filter(
      sticker => {

        const searchText =
          search.value.toLowerCase()

        const matchesSearch =

          sticker.name
          .toLowerCase()
          .includes(searchText)

          ||

          sticker.team
          .toLowerCase()
          .includes(searchText)

        if (
          filter.value ===
          'collected'
        ) {

          return (
            matchesSearch &&
            sticker.collected
          )

        }

        if (
          filter.value ===
          'pending'
        ) {

          return (
            matchesSearch &&
            !sticker.collected
          )

        }

        return matchesSearch

      }
    )

  })

  const total =
  computed(() =>
    stickerList.value.length
  )

  const collected =
  computed(() =>

    stickerList.value.filter(
      sticker =>
      sticker.collected
    ).length

  )

  const pending =
  computed(() =>

    total.value -
    collected.value

  )

  const progress =
  computed(() =>

    total.value === 0
      ? 0
      : Math.round(
          (
            collected.value /
            total.value
          ) * 100
        )

  )

  return {

    stickerList,

    search,

    filter,

    filteredStickers,

    total,

    collected,

    pending,

    progress,

    toggleCollected

  }
}