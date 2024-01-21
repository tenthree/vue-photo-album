<script setup lang="ts" generic="T extends Photo = Photo">
import type { Component } from 'vue'
import { computed } from 'vue'
import { ColumnsLayoutOptions, LayoutPhotoSlotContext, Photo } from '@/types'
import computeMasonryLayout from '@/utils/masonry'
import ColumnRenderer from '@/components/renderers/ColumnRenderer.vue'

const props = defineProps<{
  photos: T[]
  layoutOptions: ColumnsLayoutOptions
  columnRenderer?: Component
}>()

defineSlots<{
  default: (context: LayoutPhotoSlotContext<T>) => any
}>()

const masonryLayout = computed(() =>
  computeMasonryLayout<T>({
    photos: props.photos,
    layoutOptions: props.layoutOptions
  })
)

const columnsCount = computed(() => masonryLayout.value?.length ?? 0)
</script>

<template>
  <ColumnRenderer
    v-for="(column, columnIndex) in masonryLayout"
    :key="`masonry-column-${columnIndex}`"
    :layout-options="layoutOptions"
    :column-data="column"
    :column-index="columnIndex"
    :columns-count="columnsCount"
    :renderer="columnRenderer"
  >
    <template v-for="{ photo, layout } in column" :key="photo.key || photo.src">
      <slot v-bind="{ photo, layout, layoutOptions }" />
    </template>
  </ColumnRenderer>
</template>
