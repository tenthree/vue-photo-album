<script setup lang="ts">
import { ContainerRendererProps } from '@/index'

const props = defineProps<ContainerRendererProps>()
</script>

<template>
  <div style="border: 1px solid teal; padding: 10px">
    {{ console.log(props) }}
    <slot />
  </div>
</template>
