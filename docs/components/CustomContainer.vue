<script setup lang="ts">
import { type ContainerRendererMetadata } from '@/index'

defineProps<ContainerRendererMetadata>()
</script>

<template>
  <div class="custom-container">
    <div class="custom-container__glow"></div>
    <slot />
  </div>
</template>

<style>
.custom-container {
  position: relative;
  padding: 15px;
  border: 1px solid teal;
  border-radius: 10px;
  overflow: hidden;
}

/* .custom-container__glow {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  filter: blur(20px);
}

.custom-container::before,
.custom-container__glow::before {
  content: '';
  z-index: -2;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%) rotate(0deg);
  position: absolute;
  width: 99999px;
  height: 99999px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-image: conic-gradient(
    rgba(0, 0, 0, 0),
    #3bb584,
    rgba(0, 0, 0, 0) 25%
  );
  animation: rotate 4s linear infinite;
}

.custom-container::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: 8px;
  top: 8px;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  background: var(--vp-c-bg);
  border-radius: 7px;
}

@keyframes rotate {
  100% {
    transform: translate(-50%, -50%) rotate(1turn);
  }
} */
</style>
