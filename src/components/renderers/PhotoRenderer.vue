<script setup lang="ts" generic="T extends Photo = Photo">
import type { Component } from 'vue'
import { CSSProperties, ImgHTMLAttributes, computed, shallowRef } from 'vue'
import { LayoutOptions, Photo, PhotoLayout } from '@/types'
import round from '@/utils/round'

type PhotoRendererProps = {
  photo: T
  layout: PhotoLayout
  layoutOptions: LayoutOptions
  renderer?: Component
  clickable?: boolean
}

const props = defineProps<PhotoRendererProps>()
// const { photo, layout, layoutOptions, renderer, clickable } = toRefs(props)

function calcWidth(
  base: string,
  { width, photosCount }: PhotoLayout,
  { spacing, padding, containerWidth }: LayoutOptions
) {
  const gaps = spacing * (photosCount - 1) + 2 * padding * photosCount
  return `calc((${base} - ${gaps}px) / ${round(
    (containerWidth - gaps) / width,
    5
  )})`
}

function cssPhotoWidth(layout: PhotoLayout, layoutOptions: LayoutOptions) {
  return layoutOptions.layout !== 'rows'
    ? `calc(100% - ${2 * layoutOptions.padding}px)`
    : calcWidth('100%', layout, layoutOptions)
}

function calculateSizesValue(
  size: string,
  layout: PhotoLayout,
  layoutOptions: LayoutOptions
) {
  return calcWidth(
    size.match(/calc\((.*)\)/)?.[1] ?? size,
    layout,
    layoutOptions
  )
}

function srcSetAndSizes<T extends Photo = Photo>(
  photo: T,
  layout: PhotoLayout,
  layoutOptions: LayoutOptions
) {
  const images = photo.srcSet
  const srcset =
    images !== undefined && images.length > 0
      ? images
          .concat(
            images.find(({ width }) => width === photo.width) !== undefined
              ? [{ src: photo.src, width: photo.width, height: photo.height }]
              : []
          )
          .sort((a, b) => a.width - b.width)
          .map((image) => `${image.src} ${image.width}w`)
          .join(', ')
      : undefined

  const sizes =
    layoutOptions?.sizes?.sizes !== undefined
      ? layoutOptions.sizes.sizes
          .map(
            ({ viewport, size }) =>
              `${viewport} ${calculateSizesValue(size, layout, layoutOptions)}`
          )
          .concat(
            calculateSizesValue(layoutOptions.sizes.size, layout, layoutOptions)
          )
          .join(', ')
      : `${Math.ceil((layout.width / layoutOptions.containerWidth) * 100)}vw`

  return { srcset, sizes }
}

const thumbnail = computed(() => props.photo.srcSet?.[0].src)

const wrapperStyle = computed<CSSProperties>(() => {
  const width = cssPhotoWidth(props.layout, props.layoutOptions)
  const aspectRatio = props.photo.width / props.photo.height
  const padding = `${props.layoutOptions.padding}px`
  const marginBottom =
    ['columns', 'masonry'].includes(props.layoutOptions.layout) &&
    props.layout.photoIndex < props.layout.photosCount - 1
      ? `${props.layoutOptions.spacing}px`
      : undefined
  const cursor = props.clickable ? 'pointer' : undefined
  return {
    display: 'block',
    boxSizing: 'content-box',
    padding,
    marginBottom,
    aspectRatio,
    width,
    height: 'auto',
    cursor
  }
})

const wrappedStyle = shallowRef<CSSProperties>({
  display: 'block',
  boxSizing: 'content-box',
  width: '100%',
  height: '100%'
})

const imageProps = computed<ImgHTMLAttributes>(() => {
  const className = 'photo-album__photo'
  const src = props.photo.src
  const alt = props.photo.alt
  const title = props.photo.title
  const style =
    props.renderer === undefined ? wrapperStyle.value : wrappedStyle.value
  const loading = 'lazy'
  const decoding = 'async'
  return {
    className,
    src,
    alt,
    title,
    style,
    loading,
    decoding,
    ...srcSetAndSizes(props.photo, props.layout, props.layoutOptions)
  }
})
</script>

<template>
  <template v-if="renderer">
    <component :is="renderer" :style="wrapperStyle">
      <img :src="thumbnail" v-bind="imageProps" />
    </component>
  </template>
  <template v-else>
    <img :src="thumbnail" v-bind="imageProps" />
  </template>
</template>
