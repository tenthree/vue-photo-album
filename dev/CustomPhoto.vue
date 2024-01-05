<script setup lang="ts">
import { PhotoRendererMetadata } from '@/types'

defineProps<PhotoRendererMetadata>()
</script>

<template>
  <div title="custom photo" style="border: 1px solid cyan">
    <slot />
  </div>
</template>
