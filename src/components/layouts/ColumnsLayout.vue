<script setup lang="ts" generic="T extends Photo = Photo">
import type { Component } from 'vue'
import { computed } from 'vue'
import { ColumnsLayoutOptions, LayoutPhotoSlotContext, Photo } from '@/types'
import computeColumnsLayout from '@/utils/columns'
import ColumnRenderer from '@/components/renderers/ColumnRenderer.vue'

const props = defineProps<{
  photos: T[]
  layoutOptions: ColumnsLayoutOptions
  columnRenderer?: Component
}>()

defineSlots<{
  default: (context: LayoutPhotoSlotContext<T>) => any
}>()

const columnsLayout = computed(() =>
  computeColumnsLayout<T>({
    photos: props.photos,
    layoutOptions: props.layoutOptions
  })
)

const columnsModel = computed(() => {
  return columnsLayout.value?.columnsModel
})
const columnsCount = computed(() => columnsModel.value?.length ?? 0)
const columnsGaps = computed(() => columnsLayout.value?.columnsGaps)
const columnsRatios = computed(() => columnsLayout.value?.columnsRatios)
</script>

<template>
  <ColumnRenderer
    v-for="(column, columnIndex) in columnsModel"
    :key="`column-${columnIndex}`"
    :layout-options="layoutOptions"
    :column-index="columnIndex"
    :columns-count="columnsCount"
    :columns-gaps="columnsGaps"
    :columns-ratios="columnsRatios"
    :renderer="columnRenderer"
  >
    <template v-for="{ photo, layout } in column" :key="photo.key || photo.src">
      <slot v-bind="{ photo, layout, layoutOptions }" />
    </template>
  </ColumnRenderer>
</template>
