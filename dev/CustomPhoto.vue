<script setup lang="ts">
import { PhotoRendererMetadata } from '@/index'

const props = defineProps<PhotoRendererMetadata>()
</script>

<template>
  <div title="custom photo" style="border: 1px solid cyan">
    {{ console.log(props) }}
    <slot />
  </div>
</template>
