<script setup lang="ts">
import { ColumnRendererMetadata } from '@/index'

const props = defineProps<ColumnRendererMetadata>()
</script>

<template>
  <div style="border: 1px solid magenta; padding: 10px">
    {{ console.log(props) }}
    <slot />
  </div>
</template>
