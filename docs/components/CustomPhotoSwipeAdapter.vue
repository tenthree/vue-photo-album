<script setup lang="ts">
import { computed } from 'vue'
import { type PhotoRendererMetadata } from '@/index'

const props = defineProps<PhotoRendererMetadata>()
const largePhoto = computed(() => props.photo.srcSet?.[0] ?? props.photo)
</script>

<template>
  <a
    :href="largePhoto.src"
    :data-pswp-width="largePhoto.width"
    :data-pswp-height="largePhoto.height"
    :data-pswp-srcset="imageProps.srcset"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
</template>
