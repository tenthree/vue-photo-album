<script setup lang="ts">
import { ref, computed } from 'vue'
import { type PhotoAlbumProps } from '@/types'
import { type FakeImgOptions, getPhotos } from '../assets/photos'

type DemoPhotoAlbumProps = Partial<PhotoAlbumProps> & {
  limited?: number
  withSrcset?: boolean
  withAuthor?: boolean
  withFakeImg?: boolean
  fakeImgOptions?: FakeImgOptions
}

const props = defineProps<DemoPhotoAlbumProps>()

// NOTE: this is default sizes setting for demo album of docs
const sizes = computed(() => {
  return (
    props.sizes ?? {
      size: '688px',
      sizes: [{ viewport: '(max-width: 767px)', size: 'calc(100vw - 48px)' }]
    }
  )
})

const data = getPhotos({
  limited: props.limited,
  withSrcset: props.withSrcset,
  withAuthor: props.withAuthor,
  withFakeImgDomain: props.withFakeImg,
  fakeImgOptions: props.fakeImgOptions
})
const photos = ref(data)
</script>

<template>
  <PhotoAlbum v-bind="$props" :sizes="sizes" :photos="photos" />
</template>
