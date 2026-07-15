<template>

<div class="grid">

<StickerCard

v-for="
sticker
in stickers
"

:key="sticker.id"

:sticker="sticker"

@toggle="
$emit(
'toggle',
$event
)
"
@favorite="
$emit(
'favorite',
$event
)
"

/>

</div>

</template>

<script setup lang="ts">

import StickerCard from './StickerCard.vue'

import {
Sticker
} from '@/data/stickers'

defineProps<{
stickers: Sticker[]
}>()

defineEmits([
'toggle',
'favorite'
])

</script>

<style scoped>

.grid{

display:grid;

grid-template-columns:
repeat(
auto-fill,
minmax(
220px,
1fr
)
);

gap:20px;

}

</style>