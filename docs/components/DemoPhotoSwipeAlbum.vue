<script setup lang="ts">
import { ref } from 'vue'
import { PhotoAlbum } from '@/index'
import usePhotoSwipe from '../composables/usePhotoSwipe'
import CustomPhotoSwipeAdapter from '../components/CustomPhotoSwipeAdapter.vue'
import { getPhotos } from '../assets/photos'

// NOTE: this is default sizes setting for demo album of docs
const sizes = ref({
  size: '688px',
  sizes: [{ viewport: '(max-width: 767px)', size: 'calc(100vw - 48px)' }]
})

const data = getPhotos({ withUnsplashSourceDomain: true, withSrcset: true })
const photos = ref(data)

usePhotoSwipe({ gallery: '#demo', children: 'a' })
</script>

<template>
  <div>
    <PhotoAlbum
      id="demo"
      layout="rows"
      :photos="photos"
      :photo-renderer="CustomPhotoSwipeAdapter"
      :sizes="sizes"
    />
  </div>
</template>
