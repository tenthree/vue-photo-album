<script setup lang="ts">
import { RowRendererMetadata } from '@/index'

const props = defineProps<RowRendererMetadata>()
</script>

<template>
  <div :style="{ border: '1px solid magenta', padding: '10px' }">
    {{ console.log(props) }}
    <slot />
  </div>
</template>
