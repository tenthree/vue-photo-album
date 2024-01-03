<script setup lang="ts" generic="T extends Photo = Photo">
import { ColumnsLayoutOptions, Photo } from '@/types'
import type { Component } from 'vue'
import { CSSProperties, computed } from 'vue'
import round from '@/utils/round'

type ColumnFrameProps = {
  layoutOptions: ColumnsLayoutOptions
  columnIndex: number
  columnsCount: number
  columnsGaps?: number[]
  columnsRatios?: number[]
  renderer?: Component
}

const props = defineProps<ColumnFrameProps>()

function cssJustifyContent(layoutOptions: ColumnsLayoutOptions) {
  return layoutOptions.layout === 'columns' ? 'space-between' : 'flex-start'
}

function cssColumnWidth({
  layoutOptions,
  columnIndex,
  columnsCount,
  columnsGaps,
  columnsRatios
}: ColumnFrameProps) {
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
  const width = cssColumnWidth({
    layoutOptions: props.layoutOptions,
    columnIndex: props.columnIndex,
    columnsCount: props.columnsCount,
    columnsGaps: props.columnsGaps,
    columnsRatios: props.columnsRatios
  })

  return { display, flexFlow, alignItems, justifyContent, width }
})

const columnWrapper = computed(() => props.renderer ?? 'div')
</script>

<template>
  <component :is="columnWrapper" :class="className" :style="style">
    <slot />
  </component>
</template>
