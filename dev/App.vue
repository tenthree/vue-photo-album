<script setup lang="ts">
import { ref } from 'vue'
import { LayoutType, LayoutTypes } from '@/index'
import CustomContainer from './CustomContainer.vue'
import CustomRow from './CustomRow.vue'
import CustomColumn from './CustomColumn.vue'
import CustomPhoto from './CustomPhoto.vue'
import photos from './photos'

import { PhotoAlbum } from '@/index'

const layout = ref<LayoutType>(LayoutTypes[0])
const padding = ref<number>(0)
const spacing = ref<number>(0)
const rowHeight = ref<number>(200)
const columns = ref<number>(5)
const isCustomContanier = ref<boolean>()
const isCustomRow = ref<boolean>()
const isCustomColumn = ref<boolean>()
const isCustomPhoto = ref<boolean>()
</script>

<template>
  <div class="app">
    <div
      :style="{
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        gap: '30px',
        position: 'sticky',
        top: '0',
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.7)'
      }"
    >
      <select v-model="layout">
        <option v-for="type in LayoutTypes" :key="type" :value="type">
          {{ type.charAt(0) + type.slice(1) }}
        </option>
      </select>
      <div>
        <label>
          <span>padding</span>
          <input type="range" min="0" max="50" v-model="padding" />
          <span>{{ padding }} / 50</span>
        </label>
      </div>
      <div>
        <label>
          <span>spacing</span>
          <input type="range" min="0" max="50" v-model="spacing" />
          <span>{{ spacing }} / 50</span>
        </label>
      </div>
      <div v-if="layout === LayoutTypes[0]">
        <label>
          <span>Row Height</span>
          <input type="range" min="50" max="500" v-model="rowHeight" />
          <span>{{ rowHeight }} / 500</span>
        </label>
      </div>
      <div v-if="layout === LayoutTypes[1] || layout === LayoutTypes[2]">
        <label>
          <span>Columns</span>
          <input type="range" min="1" max="10" v-model="columns" />
          <span>{{ columns }} / 10</span>
        </label>
      </div>
      <div
        :style="{
          display: 'inline-flex',
          gap: '30px'
        }"
      >
        <span>Custom</span>
        <label>
          <input type="checkbox" v-model="isCustomContanier" />
          <span>Container</span>
        </label>
        <label>
          <input type="checkbox" v-model="isCustomRow" />
          <span>Row</span>
        </label>
        <label>
          <input type="checkbox" v-model="isCustomColumn" />
          <span>Column</span>
        </label>
        <label>
          <input type="checkbox" v-model="isCustomPhoto" />
          <span>Photo</span>
        </label>
      </div>
    </div>

    <PhotoAlbum
      :photos="photos"
      :layout="layout"
      :padding="padding"
      :spacing="spacing"
      :target-row-height="rowHeight"
      :columns="columns"
      @click="(payload) => console.log(payload)"
      :container-renderer="isCustomContanier ? CustomContainer : undefined"
      :row-renderer="isCustomRow ? CustomRow : undefined"
      :column-renderer="isCustomColumn ? CustomColumn : undefined"
      :photo-renderer="isCustomPhoto ? CustomPhoto : undefined"
    />
  </div>
</template>

<style scoped>
.app {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
