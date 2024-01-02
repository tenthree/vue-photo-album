<script setup lang="ts" generic="T extends Photo = Photo">
import type { Component } from 'vue'
import { computed } from 'vue'
import { LayoutPhotoSlotContext, Photo, RowsLayoutOptions } from '@/types'
import computeRowsLayout from '@/utils/rows'
import RowRenderer from '@/components/renderers/RowRenderer.vue'

const props = defineProps<{
  photos: T[]
  layoutOptions: RowsLayoutOptions
  rowRenderer?: Component
}>()

defineSlots<{
  default: (context: LayoutPhotoSlotContext<T>) => any
}>()

const rowsLayout = computed(() =>
  computeRowsLayout<T>({
    photos: props.photos,
    layoutOptions: props.layoutOptions
  })
)
</script>

<template>
  <RowRenderer
    v-for="(row, rowIndex) in rowsLayout"
    :key="`row-${rowIndex}`"
    :layout-options="layoutOptions"
    :row-index="rowIndex"
    :rows-count="rowsLayout?.length"
    :renderer="rowRenderer"
  >
    <template v-for="{ photo, layout } in row" :key="photo.key || photo.src">
      <slot v-bind="{ photo, layout, layoutOptions }" />
    </template>
  </RowRenderer>
</template>
