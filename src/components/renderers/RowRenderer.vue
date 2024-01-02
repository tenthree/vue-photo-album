<script setup lang="ts" generic="T extends Photo = Photo">
import { Photo, RowsLayoutOptions } from '@/types'
import type { Component } from 'vue'
import { CSSProperties, computed } from 'vue'

type RowFrameProps = {
  layoutOptions: RowsLayoutOptions
  rowIndex: number
  rowsCount?: number
  renderer?: Component
}

const props = defineProps<RowFrameProps>()

const className = 'photo-album__row'

const style = computed<CSSProperties>(() => {
  const display = 'flex'
  const flexFlow = 'row nowrap'
  const alignItems = 'start'
  const justifyContent = 'space-between'
  const marginBottom =
    props.rowsCount !== undefined && props.rowIndex < props.rowsCount - 1
      ? `${props.layoutOptions.spacing}px`
      : undefined
  return { display, flexFlow, alignItems, justifyContent, marginBottom }
})

const rowWrapper = computed(() => props.renderer ?? 'div')
</script>

<template>
  <Component :is="rowWrapper" :class="className" :style="style">
    <slot />
  </Component>
</template>
