<script setup lang="ts">
import { type RowRendererMetadata } from '@/index'

defineProps<RowRendererMetadata>()
</script>

<template>
  <div class="custom-row">
    <!-- <div class="custom-row__glow"></div> -->
    <slot />
  </div>
</template>

<style>
.custom-row {
  position: relative;
  padding: 15px;
  border: 1px solid teal;
  border-radius: 10px;
  overflow: hidden;
}

/* .custom-row__glow {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  filter: blur(20px);
}

.custom-row::before,
.custom-row__glow::before {
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

.custom-row::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: 4px;
  top: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  background: var(--vp-c-bg);
  border-radius: 7px;
}

@keyframes rotate {
  100% {
    transform: translate(-50%, -50%) rotate(1turn);
  }
} */
</style>
