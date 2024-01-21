<script setup lang="ts" generic="T extends Photo = Photo">
import {
  ColumnRendererMetadata,
  ColumnRendererProps,
  ColumnsLayoutOptions,
  Photo
} from '@/types'
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import round from '@/utils/round'

const props = defineProps<ColumnRendererProps>()

function cssJustifyContent(layoutOptions: ColumnsLayoutOptions) {
  return layoutOptions.layout === 'columns' ? 'space-between' : 'flex-start'
}

function cssColumnWidth({
  layoutOptions,
  columnIndex,
  columnsCount,
  columnsGaps,
  columnsRatios
}: ColumnRendererProps) {
  const { layout, spacing, padding } = layoutOptions

  if (
    layout === 'masonry' ||
    columnsGaps === undefined ||
    columnsRatios === undefined
  ) {
    return `calc((100% - ${spacing * (columnsCount - 1)}px) / ${columnsCount})`
  }

  const totalRatio = columnsRatios.reduce((acc, ratio) => acc + ratio, 0)

  const totalAdjustedGaps = columnsRatios.reduce(
    (acc, ratio, index) =>
      acc + (columnsGaps[columnIndex] - columnsGaps[index]) * ratio,
    0
  )

  return `calc((100% - ${round(
    (columnsCount - 1) * spacing +
      2 * columnsCount * padding +
      totalAdjustedGaps,
    3
  )}px) * ${round(columnsRatios[columnIndex] / totalRatio, 5)} + ${
    2 * padding
  }px)`
}

const className = 'photo-album__column'

const style = computed<CSSProperties>(() => {
  const display = 'flex'
  const flexFlow = 'column nowrap'
  const alignItems = 'flex-start'
  const justifyContent = cssJustifyContent(props.layoutOptions)
  const width = cssColumnWidth(props)

  return { display, flexFlow, alignItems, justifyContent, width }
})

const columnWrapper = computed(() => props.renderer ?? 'div')

const metadata = computed<ColumnRendererMetadata>(() => {
  return {
    layoutOptions: props.layoutOptions,
    columnData: props.columnData,
    columnIndex: props.columnIndex,
    columnsCount: props.columnsCount,
    columnsGaps: props.columnsGaps,
    columnsRatios: props.columnsRatios
  }
})
</script>

<template>
  <component
    :is="columnWrapper"
    :class="className"
    :style="style"
    v-bind="metadata"
  >
    <slot />
  </component>
</template>
